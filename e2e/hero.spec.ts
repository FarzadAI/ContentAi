import { expect, test, type Page } from '@playwright/test';

const BREAKPOINTS = [320, 360, 390, 430, 768, 1024, 1280, 1440];

/** Waits for the intro choreography to finish and webfonts to settle. */
async function settle(page: Page) {
  await page.waitForFunction(
    () => document.querySelectorAll('[data-revealed="false"]').length === 0,
    undefined,
    { timeout: 10_000 },
  );
  await page.evaluate(() => document.fonts.ready);
}

test.describe('hero', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the headline, subheadline and calls to action', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('کمتر دوره بخر.');
    await expect(heading).toContainText('بهتر انتخاب کن.');

    await expect(page.getByText(/دوره‌ها، مدرس‌ها و مسیرهای آموزشی رو بررسی و فیلتر می‌کنه/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'خودم می‌گردم' })).toBeVisible();
    await expect(page.getByRole('link', { name: /یه دوره تو ذهنته؟ بررسیش کن/ })).toBeVisible();
  });

  test('primary CTA sits inside the first view', async ({ page }) => {
    await settle(page);

    const cta = page.getByRole('button', { name: 'برام انتخاب کن' }).last();
    await expect(cta).toBeVisible();

    const box = await cta.boundingBox();
    const viewport = page.viewportSize();
    expect(box).not.toBeNull();
    expect(viewport).not.toBeNull();
    // fully above the fold, without scrolling
    expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height);
  });

  test('the page is in Persian and lays out right-to-left', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fa');

    const direction = await page.evaluate(() => getComputedStyle(document.body).direction);
    expect(direction).toBe('rtl');
  });

  test('the intro selects «هوش مصنوعی» and reveals the recommendation', async ({ page }) => {
    await settle(page);

    await expect(page.getByRole('button', { name: 'هوش مصنوعی' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.getByText('پیشنهاد برای تو')).toBeVisible();
    await expect(page.getByText('۸۹٪')).toBeVisible();
    await expect(page.getByText('مبتدی · روزی ۱ ساعت · بودجه متوسط')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'حکم طبقه منفی یک' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'من جات بودم...' })).toBeVisible();
  });

  test('choosing another goal updates the recommendation', async ({ page }) => {
    await settle(page);

    await page.getByRole('button', { name: 'ساخت سایت' }).click();

    await expect(page.getByText('ساخت و انتشار اولین سایت واقعی')).toBeVisible();
    await expect(page.getByText('۸۱٪')).toBeVisible();
    await expect(page.getByRole('button', { name: 'ساخت سایت' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.getByRole('button', { name: 'هوش مصنوعی' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  test('goal chips are reachable and operable by keyboard', async ({ page }) => {
    await settle(page);

    const chip = page.getByRole('button', { name: 'تولید محتوا' });
    await chip.focus();
    await expect(chip).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(chip).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByText('تولید محتوای منظم بدون فرسوده شدن')).toBeVisible();
  });

  test('next section peeks below the hero', async ({ page }) => {
    await settle(page);
    await expect(page.getByRole('heading', { name: 'این هفته ارزش دیدن دارن' })).toBeVisible();
  });

  test('no horizontal overflow at any supported width', async ({ page }) => {
    for (const width of BREAKPOINTS) {
      await page.setViewportSize({ width, height: 844 });
      await settle(page);

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));

      expect(
        overflow.scrollWidth,
        `horizontal overflow at ${width}px`,
      ).toBeLessThanOrEqual(overflow.clientWidth + 1);
    }
  });
});

test.describe('reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });

  test('content is complete and interactive without waiting for animation', async ({ page }) => {
    await page.goto('/');

    // no reveal is pending, right away
    await expect(page.locator('[data-revealed="false"]')).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await page.getByRole('button', { name: 'درآمد بیشتر' }).click();
    await expect(page.getByText('از مهارتی که داری تا اولین درآمد جدی')).toBeVisible();
  });
});

test.describe('visual regression', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });

  test('hero matches its baseline', async ({ page }, testInfo) => {
    await page.goto('/');
    await settle(page);

    await expect(page).toHaveScreenshot(`hero-${testInfo.project.name}.png`, {
      fullPage: false,
      animations: 'disabled',
      maxDiffPixelRatio: 0.01,
    });
  });
});
