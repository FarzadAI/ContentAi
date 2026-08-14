const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const;

/**
 * Converts every Latin digit in a string to its Persian counterpart.
 * The UI is single-script by rule: no mixed ۸۹٪ / 89% inside the same view.
 */
export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

/** 89 → «۸۹٪» */
export function formatPercent(value: number): string {
  return `${toPersianDigits(Math.round(value))}٪`;
}

/** 8.8 → «۸.۸» (always one decimal, so score rows stay aligned) */
export function formatScore(value: number): string {
  return toPersianDigits(value.toFixed(1));
}
