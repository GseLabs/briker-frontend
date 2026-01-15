import { redirect } from "@sveltejs/kit";
import type { SchemaRole } from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.user) {
		return {
			user: locals.user,
			role: locals.user.role as SchemaRole
		};
	}

	const hasStatusParam =
		url.searchParams.has("status") ||
		url.searchParams.has("success") ||
		url.searchParams.has("onboarding");

	if (hasStatusParam) {
		return {
			user: null,
			role: null
		};
	}

	throw redirect(302, "/login");
};
