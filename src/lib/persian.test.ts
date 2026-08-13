import { describe, expect, it } from 'vitest';
import { formatPercent, formatScore, toPersianDigits } from './persian';

describe('persian digits', () => {
  it('converts every latin digit', () => {
    expect(toPersianDigits('0123456789')).toBe('۰۱۲۳۴۵۶۷۸۹');
  });

  it('keeps non-digit characters untouched', () => {
    expect(toPersianDigits('روزی ۱ ساعت')).toBe('روزی ۱ ساعت');
    expect(toPersianDigits('8.8/10')).toBe('۸.۸/۱۰');
  });

  it('formats a match percentage', () => {
    expect(formatPercent(89)).toBe('۸۹٪');
  });

  it('formats scores with one decimal', () => {
    expect(formatScore(8.8)).toBe('۸.۸');
    expect(formatScore(9)).toBe('۹.۰');
  });
});
