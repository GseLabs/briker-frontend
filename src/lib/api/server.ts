import {
	AuthApi,
	UserApi,
	VerificationApi,
	CourierApi,
	VendorApi,
	MarketplaceApi,
	Configuration
} from "./client";
import { env } from "$env/dynamic/public";
import type { Cookies } from "@sveltejs/kit";

export const createServerApi = (
	cookies: Cookies,
	onCookieSet?: (name: string, value: string, options: any) => void
) => {
	const hasAccessToken = cookies.get("access_token");
	const hasRefreshToken = cookies.get("refresh_token");

	if (!hasAccessToken && !hasRefreshToken) {
		return null;
	}

	let currentAccessToken = hasAccessToken;
	let currentRefreshToken = hasRefreshToken;

	const getConfig = () => {
		return new Configuration({
			basePath: env.PUBLIC_API_BASE_PATH,
			headers: {
				Authorization: `Bearer ${currentAccessToken || ""}`,
				"Content-Type": "application/json"
			},
			credentials: "include"
		});
	};

	const performRefresh = async () => {
		if (!currentRefreshToken) {
			throw new Error("No refresh token available");
		}

		const authApi = new AuthApi(
			new Configuration({
				basePath: env.PUBLIC_API_BASE_PATH,
				headers: { "Content-Type": "application/json" },
				credentials: "include"
			})
		);

		const response = await authApi.authRefreshPost({
			body: { refreshToken: currentRefreshToken }
		});

		if (response.accessToken) {
			// TODO: do this better, like in a utility function
			const getTokenExpiration = (token: string): number => {
				try {
					const payload = JSON.parse(atob(token.split(".")[1]));
					const exp = payload.exp;
					const now = Math.floor(Date.now() / 1000);
					return Math.max(0, exp - now);
				} catch {
					return 60 * 15; // fallback 15 minutes
				}
			};

			const cookieOptions = {
				path: "/",
				domain: env.PUBLIC_COOKIE_DOMAIN,
				httpOnly: true,
				secure:
					process.env.NODE_ENV === "production" && env.PUBLIC_API_BASE_PATH.startsWith("https"),
				sameSite: "lax" as const,
				maxAge: getTokenExpiration(response.accessToken)
			};

			cookies.set("access_token", response.accessToken, cookieOptions);
			onCookieSet?.("access_token", response.accessToken, cookieOptions);
			currentAccessToken = response.accessToken;

			if (response.refreshToken) {
				const refreshCookieOptions = {
					...cookieOptions,
					maxAge: getTokenExpiration(response.refreshToken) || 60 * 60 * 24 * 30 // fallback 30 days
				};
				cookies.set("refresh_token", response.refreshToken, refreshCookieOptions);
				onCookieSet?.("refresh_token", response.refreshToken, refreshCookieOptions);
				currentRefreshToken = response.refreshToken;
			}

			return response.accessToken;
		}

		throw new Error("Refresh response missing access token");
	};

	const wrap = <T extends object>(ApiClass: new (config: Configuration) => T) => {
		return new Proxy(
			{},
			{
				get: (_, prop) => {
					const getInstance = () => new ApiClass(getConfig());
					const instance = getInstance();
					const value = (instance as any)[prop];

					if (typeof value === "function") {
						return async (...args: any[]) => {
							try {
								return await value.bind(getInstance())(...args);
							} catch (error: any) {
								const status = error?.response?.status || error?.status;

								if (status === 401 && currentRefreshToken) {
									try {
										await performRefresh();
										const newInstance = getInstance();
										const newMethod = (newInstance as any)[prop];
										return await newMethod.apply(newInstance, args);
									} catch (refreshError: any) {
										const refreshStatus = refreshError?.response?.status || refreshError?.status;

										const deleteOptions = {
											path: "/",
											domain: env.PUBLIC_COOKIE_DOMAIN
										};

										cookies.delete("access_token", deleteOptions);
										cookies.delete("refresh_token", deleteOptions);
										onCookieSet?.("access_token", "", { ...deleteOptions, maxAge: 0 });
										onCookieSet?.("refresh_token", "", { ...deleteOptions, maxAge: 0 });

										throw refreshError;
									}
								}
								throw error;
							}
						};
					}
					return value;
				}
			}
		);
	};

	return {
		auth: wrap(AuthApi) as AuthApi,
		user: wrap(UserApi) as UserApi,
		courier: wrap(CourierApi) as CourierApi,
		marketplace: wrap(MarketplaceApi) as MarketplaceApi,
		verification: wrap(VerificationApi) as VerificationApi,
		vendor: wrap(VendorApi) as VendorApi
	};
};
