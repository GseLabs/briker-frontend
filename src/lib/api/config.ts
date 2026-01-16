import { env } from "$env/dynamic/public";
import { Configuration } from "./client";

export const createApiConfig = (accessToken?: string) => {
	const headers: Record<string, string> = {};

	if (accessToken) {
		headers.Authorization = `Bearer ${accessToken}`;
	}

	const basePath = env.PUBLIC_API_BASE_PATH || env.RAILWAY_SERVICE_BACKEND_URL || "http://localhost";

	return new Configuration({
		basePath,
		credentials: "include",
		headers
	});
};

export const apiConfig = createApiConfig();
