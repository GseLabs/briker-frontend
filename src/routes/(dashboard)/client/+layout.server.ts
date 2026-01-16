import { requireRole } from "$lib/server/guards";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	requireRole(locals, cookies, "client");

	return {
		user: locals.user!
	};
};
