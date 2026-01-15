import { writable } from "svelte/store";
import {
	AuthApi,
	UserApi,
	VerificationApi,
	AdminApi,
	CourierApi,
	VendorApi,
	MarketplaceApi
} from "./client";
import type { RoutesLoginRequest, RoutesMeResponse } from "./client";
import { createApiConfig } from "./config";
import { browser } from "$app/environment";

type WrappedAPI<T> = {
	[K in keyof T]: T[K] extends (...args: infer A) => infer R
		? (...args: A) => R extends Promise<infer U> ? Promise<U> : Promise<R>
		: T[K];
};

const createApiInstances = () => {
	const config = createApiConfig();
	return {
		authApi: new AuthApi(config),
		userApi: new UserApi(config),
		verificationApi: new VerificationApi(config),
		adminApi: new AdminApi(config),
		courierApi: new CourierApi(config),
		vendorApi: new VendorApi(config),
		marketplaceApi: new MarketplaceApi(config)
	};
};

let apiInstances = createApiInstances();

// Stores
export const isAuthenticated = writable(false);
export const currentUser = writable<RoutesMeResponse | null>(null);

let refreshing: Promise<boolean> | null = null;

const refresh = async (): Promise<boolean> => {
	if (refreshing) return refreshing;

	refreshing = apiInstances.authApi
		.authRefreshPost({ body: {} })
		.then(() => {
			if (browser) {
				apiInstances = createApiInstances();
			}
			return true;
		})
		.catch(() => false)
		.finally(() => {
			refreshing = null;
		});

	return refreshing;
};

const withRefresh = async <T>(fn: () => Promise<T>): Promise<T> => {
	try {
		return await fn();
	} catch (error: any) {
		const status = error?.status || error?.response?.status;
		if (status === 401 && browser && (await refresh())) {
			const fnName = fn.name || "apiCall";
			const freshInstances = createApiInstances();
			return await fn();
		}
		throw error;
	}
};

export const checkAuth = async () => {
	try {
		const user = await withRefresh(() => apiInstances.userApi.meGet());
		isAuthenticated.set(true);
		currentUser.set(user);
		return { authenticated: true, user };
	} catch {
		isAuthenticated.set(false);
		currentUser.set(null);
		return { authenticated: false, user: null };
	}
};

export const login = async (credentials: RoutesLoginRequest) => {
	const response = await apiInstances.authApi.authLoginPost({ body: credentials });
	if (browser) {
		apiInstances = createApiInstances();
	}
	await checkAuth();
	return response;
};

export const logout = async () => {
	try {
		await apiInstances.authApi.authLogoutPost();
	} catch {}
	isAuthenticated.set(false);
	currentUser.set(null);
	if (browser) {
		apiInstances = createApiInstances();
	}
};

const wrap = <T extends object>(
	target: T,
	instanceType: keyof ReturnType<typeof createApiInstances>
): T =>
	new Proxy(target, {
		get: (obj, prop) => {
			const value = obj[prop as keyof T];
			return typeof value === "function"
				? (...args: any[]) =>
						withRefresh(() => {
							const fresh = createApiInstances();
							const freshObj = fresh[instanceType];
							if (!freshObj) {
								throw new Error(`API instance not found for key: ${String(instanceType)}`);
							}
							const freshMethod = (freshObj as any)[prop];
							return freshMethod.apply(freshObj, args);
						})
				: value;
		}
	}) as T;

export const api = {
	auth: wrap(apiInstances.authApi, "authApi") as WrappedAPI<AuthApi>,
	user: wrap(apiInstances.userApi, "userApi") as WrappedAPI<UserApi>,
	verification: wrap(
		apiInstances.verificationApi,
		"verificationApi"
	) as WrappedAPI<VerificationApi>,
	admin: wrap(apiInstances.adminApi, "adminApi") as WrappedAPI<AdminApi>,
	courier: wrap(apiInstances.courierApi, "courierApi") as WrappedAPI<CourierApi>,
	vendor: wrap(apiInstances.vendorApi, "vendorApi") as WrappedAPI<VendorApi>,
	marketplace: wrap(apiInstances.marketplaceApi, "marketplaceApi") as WrappedAPI<MarketplaceApi>
};
