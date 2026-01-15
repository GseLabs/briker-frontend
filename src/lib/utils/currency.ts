export function formatCurrency(
	cents: number | null | undefined,
	options: {
		locale?: string;
		currency?: string;
		minimumFractionDigits?: number;
		maximumFractionDigits?: number;
	} = {}
): string {
	if (cents === null || cents === undefined) {
		return "0.00 €";
	}

	const {
		locale = "fr-FR",
		currency = "EUR",
		minimumFractionDigits = 2,
		maximumFractionDigits = 2
	} = options;

	const amount = cents / 100;

	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		minimumFractionDigits,
		maximumFractionDigits
	}).format(amount);
}

export function centsToEuros(cents: number | null | undefined): number {
	if (cents === null || cents === undefined) {
		return 0;
	}
	return cents / 100;
}

export function eurosToCents(euros: number | null | undefined): number {
	if (euros === null || euros === undefined) {
		return 0;
	}
	return Math.round(euros * 100);
}
