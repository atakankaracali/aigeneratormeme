export const normalizeMemeText = (text: string): string =>
    text.trim().replace(/\s+/g, " ");