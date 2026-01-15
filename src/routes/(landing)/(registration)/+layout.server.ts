import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
	try {
		/*if (locals.user) {
			throw redirect(302, "/dashboard");
		}*/
	} catch (error: any) {
		if (error?.status === 302) throw error;
		return {};
	}
};
