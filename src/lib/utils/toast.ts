import { toast } from "svelte-sonner";
import * as m from "$lib/paraglide/messages";

export type MessageKeys = keyof typeof m;

export function showErrorToast(query: { error?: Error | null }, customMessage?: string) {
	if (query.error) {
		const message = customMessage || m["common.error"]();
		toast.error(`${message}: ${query.error.message}`);
	}
}

export function showErrorToastByKey(errorKey: string | null, customMessage?: string) {
	if (errorKey) {
		const message =
			(customMessage ? customMessage + ": " : "") +
			((m as any)[errorKey] ? (m as any)[errorKey]() : m["common.error"]());
		toast.error(message);
	}
}

export function showSuccessToastByKey(messageKey: string, customMessage?: string) {
	const message =
		(customMessage ? customMessage + ": " : "") +
		((m as any)[messageKey] ? (m as any)[messageKey]() : m["common.success"]());
	toast.success(message);
}
