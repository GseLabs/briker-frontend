import { env } from "$env/dynamic/public";
import { Configuration } from "./client";

export const createApiConfig = (accessToken?: string) => {
	const headers: Record<string, string> = {};

	if (accessToken) {
		headers.Authorization = `Bearer ${accessToken}`;
	}

	return new Configuration({
		basePath: env.PUBLIC_API_BASE_PATH,
		credentials: "include",
		headers
	});
};

export const apiConfig = createApiConfig();
