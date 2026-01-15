// See https://svelte.dev/docs/kit/types#app.d.ts

import type { RoutesMeResponse } from "$lib/api";

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user?: RoutesMeResponse | null;
		}
	}
}

export {};
