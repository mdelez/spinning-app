const UNITS_PER_TOKEN = 100;

export function unitsToTokens(units: number): number {
    return units / UNITS_PER_TOKEN;
}

export function unitsToTokensText(units: number): string {
    const tokenPrice = units / UNITS_PER_TOKEN;

    return tokenPrice > 1 ? `${tokenPrice} tokens` : `${tokenPrice} token`;
}
