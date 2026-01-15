/**
 * Convertit une entrée de prix (string ou number) en nombre de centimes
 * Gère les formats avec virgule et point décimal
 */
export function parsePrice(inputValue: string | number): number {
	if (typeof inputValue === "number") return inputValue;
	const cleaned = inputValue.toString().replace(/[^\d.,]/g, "");
	const normalized = cleaned.replace(",", ".");
	return parseFloat(normalized) || 0;
}

/**
 * Formate un prix en centimes pour l'affichage en euros
 */
export function formatPriceDisplay(priceInCents: number): string {
	return (priceInCents / 100).toFixed(2);
}

/**
 * Convertit un prix d'euros vers centimes
 */
export function eurosToCents(euros: number): number {
	return Math.round(euros * 100);
}
