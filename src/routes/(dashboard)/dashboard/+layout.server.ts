import { requireRole, requireStripeOnboarding } from "$lib/server/guards";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	requireRole(locals, cookies, "admin", "vendor");
	await requireStripeOnboarding(locals, cookies);

	return {
		user: locals.user!
	};
};
