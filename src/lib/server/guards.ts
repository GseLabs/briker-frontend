import { redirect } from "@sveltejs/kit";
import type { SchemaRole } from "$lib/api";
import { createServerApi } from "$lib/api/server";
import type { Cookies } from "@sveltejs/kit";
import { env } from "$env/dynamic/public";

export function requireAuth(locals: App.Locals) {
	if (!locals.user) {
		throw redirect(302, "/login");
	}
}

export function requireVerified(locals: App.Locals) {
	requireAuth(locals);
	if (!locals.user!.emailVerified) {
		// TODO: Custom page for unverified users maybe
		throw redirect(302, "/verify-email");
	}

	if (!locals.user!.phoneVerified) {
		// TODO: Custom page for unverified users maybe
		throw redirect(302, "/verify-phone");
	}
}

export function requireRole(locals: App.Locals, cookies: Cookies, ...roles: SchemaRole[]) {
	requireVerified(locals);
	if (!roles.includes(locals.user!.role as SchemaRole)) {
		const deleteOptions = {
			path: "/",
			domain: env.PUBLIC_COOKIE_DOMAIN
		};
		cookies.delete("access_token", deleteOptions);
		cookies.delete("refresh_token", deleteOptions);
		throw redirect(302, "/login?error=ERR_WRONG_ROLE");
	}
}

export async function requireStripeOnboarding(locals: App.Locals, cookies: Cookies) {
	requireVerified(locals);

	const userRole = locals.user!.role as SchemaRole;

	// Skip check for admins - they don't need Stripe onboarding
	if (userRole === "admin") {
		return;
	}

	const api = createServerApi(cookies);

	if (userRole === "vendor") {
		if (!api?.vendor) {
			throw redirect(302, "/");
		}

		try {
			const onboardingStatus = await api.vendor.vendorOnboardingStatusGet();
			if (!onboardingStatus.stripeActive) {
				throw redirect(302, "/onboarding");
			}
		} catch (error: any) {
			// Check if it's already a redirect error
			if (error && typeof error === "object" && "status" in error) {
				throw error;
			}
			throw redirect(302, "/");
		}
	} else if (userRole === "courier") {
		if (!api?.courier) {
			throw redirect(302, "/");
		}

		try {
			const onboardingStatus = await api.courier.courierOnboardingStatusGet();
			if (!onboardingStatus.stripeActive) {
				throw redirect(302, "/onboarding");
			}
		} catch (error: any) {
			// Check if it's already a redirect error
			if (error && typeof error === "object" && "status" in error) {
				throw error;
			}
			throw redirect(302, "/");
		}
	}
}

export async function requireStripeOnboardingComplete(locals: App.Locals, cookies: Cookies) {
	requireVerified(locals);

	const userRole = locals.user!.role as SchemaRole;

	// Skip check for admins - they don't need Stripe onboarding
	if (userRole === "admin") {
		return;
	}

	const api = createServerApi(cookies);

	if (userRole === "vendor") {
		if (!api?.vendor) {
			throw redirect(302, "/onboarding?status=error");
		}

		try {
			const onboardingStatus = await api.vendor.vendorOnboardingStatusGet();
			// If Stripe is already active, redirect to dashboard with complete status
			if (onboardingStatus.stripeActive) {
				throw redirect(302, "/dashboard?onboarding=complete");
			}
		} catch (error: any) {
			// If it's already a redirect error, re-throw it
			if (error && typeof error === "object" && "status" in error) {
				throw error;
			}
			// For API errors, redirect with error status
			throw redirect(302, "/onboarding?status=error");
		}
	} else if (userRole === "courier") {
		if (!api?.courier) {
			throw redirect(302, "/onboarding?status=error");
		}

		try {
			const onboardingStatus = await api.courier.courierOnboardingStatusGet();
			// If Stripe is already active, redirect to dashboard with complete status
			if (onboardingStatus.stripeActive) {
				throw redirect(302, "/dashboard?onboarding=complete");
			}
		} catch (error: any) {
			// If it's already a redirect error, re-throw it
			if (error && typeof error === "object" && "status" in error) {
				throw error;
			}
			// For API errors, redirect with error status
			throw redirect(302, "/onboarding?status=error");
		}
	}
}
