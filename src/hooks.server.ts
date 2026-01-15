import type { Handle } from "@sveltejs/kit";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { sequence } from "@sveltejs/kit/hooks";
import { createServerApi } from "$lib/api";

const handleAuth: Handle = async ({ event, resolve }) => {
	const serverApi = createServerApi(event.cookies, (name, value, options) => {
		event.cookies.set(name, value, options);
	});

	if (serverApi) {
		try {
			event.locals.user = await serverApi.user.meGet();
		} catch (error: any) {
			if (error?.status !== 401 && error?.response?.status !== 401) {
				console.error("Auth error:", error);
			}
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};

const rtlLangs = ["ar", "he", "fa", "ur", "arc", "az", "ku", "syr", "ff"];
const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace("%paraglide.lang%", locale)
					.replace("%paraglide.dir%", rtlLangs.includes(locale) ? "rtl" : "ltr")
		});
	});

export const handle: Handle = sequence(handleAuth, handleParaglide);
