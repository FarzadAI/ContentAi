import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

let reducedMotion = true;

/**
 * jsdom has no matchMedia. Tests default to "reduce", which makes the intro
 * timeline resolve immediately and keeps assertions deterministic; the
 * reduced-motion path is a first-class behaviour, so this exercises it too.
 */
export function setReducedMotion(value: boolean) {
  reducedMotion = value;
}

beforeEach(() => {
  reducedMotion = true;

  vi.stubGlobal(
    'matchMedia',
    (query: string): MediaQueryList =>
      ({
        matches: query.includes('prefers-reduced-motion') ? reducedMotion : false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  );

  // jsdom does not implement scrollIntoView
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
