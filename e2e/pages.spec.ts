import { expect, test, type Page } from '@playwright/test';

const WIDTHS = [320, 360, 390, 430, 768, 1024, 1280, 1440];

const PAGES = [
  { hash: '#/discover', heading: 'چی به درد من می‌خوره؟', nav: 'کشف' },
  { hash: '#/paths', heading: 'ترتیب، مهم‌تر از تعداد است', nav: 'مسیرها' },
  { hash: '#/courses', heading: 'هرچی بررسی کردیم، اینجاست', nav: 'دوره‌ها' },
  { hash: '#/group-buy', heading: 'با هم ارزان‌تر، بدون فشار فروش', nav: 'خرید گروهی' },
  { hash: '#/free', heading: 'قبل از خرید، این‌ها را ببین', nav: 'رایگان‌ها' },
  { hash: '#/compare', heading: 'دو تا را کنار هم بگذار', nav: 'مقایسه' },
];

async function settle(page: Page) {
  await page.waitForFunction(
    () => document.querySelectorAll('[data-revealed="false"]').length === 0,
    undefined,
    { timeout: 10_000 },
  );
  await page.evaluate(() => document.fonts.ready);
}

test.describe('sub-pages', () => {
  for (const target of PAGES) {
    test(`${target.nav} renders with its own h1`, async ({ page }) => {
      await page.goto(`/${target.hash}`);
      await settle(page);

      await expect(page.getByRole('heading', { level: 1, name: target.heading })).toBeVisible();
      // exactly one h1 per page
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(page.getByRole('contentinfo')).toBeVisible();
    });
  }

  test('every page stays free of horizontal overflow at every width', async ({ page }) => {
    for (const target of PAGES) {
      await page.goto(`/${target.hash}`);
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 844 });
        await settle(page);

        const overflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));

        expect(
          overflow.scrollWidth,
          `overflow on ${target.nav} at ${width}px`,
        ).toBeLessThanOrEqual(overflow.clientWidth + 1);
      }
    }
  });

  test('the catalogue filters by topic', async ({ page }) => {
    await page.goto('/#/courses');
    await settle(page);

    await expect(page.getByRole('heading', { name: 'از نمونه‌کار تا اولین مشتری' })).toBeVisible();

    await page.getByRole('button', { name: 'هوش مصنوعی' }).click();

    await expect(page.getByRole('button', { name: 'هوش مصنوعی' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.getByRole('heading', { name: 'از نمونه‌کار تا اولین مشتری' })).toHaveCount(0);
    await expect(
      page.getByRole('heading', { name: 'کار با مدل‌های زبانی برای غیربرنامه‌نویس‌ها' }),
    ).toBeVisible();
  });

  test('comparison updates when a side changes', async ({ page }) => {
    await page.goto('/#/compare');
    await settle(page);

    await page.getByLabel('گزینه دوم').selectOption('freelance-first-project');

    await expect(
      page.getByRole('columnheader', { name: 'از نمونه‌کار تا اولین مشتری' }),
    ).toBeVisible();
    await expect(page.getByText('۹.۳/۱۰')).toBeVisible();
  });

  test('«کشف» answers with a recommendation', async ({ page }) => {
    await page.goto('/#/discover');
    await settle(page);

    await expect(page.getByText('پیشنهاد برای تو')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'حکم طبقه منفی یک' })).toBeVisible();

    await page.getByRole('button', { name: 'ساخت سایت' }).click();
    await expect(page.getByText('ساخت و انتشار اولین سایت واقعی')).toBeVisible();
  });
});

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('the drawer opens, navigates, and closes', async ({ page }) => {
    await page.goto('/');
    await settle(page);

    const menu = page.getByRole('button', { name: 'منو' });
    await expect(menu).toHaveAttribute('aria-expanded', 'false');

    // closed means actually not on screen, not just aria-expanded=false
    const drawer = page.getByRole('navigation', { name: 'ناوبری موبایل' });
    await expect(drawer).toBeHidden();

    await menu.click();
    await expect(drawer).toBeVisible();
    await drawer.getByRole('link', { name: 'رایگان‌ها' }).click();

    await expect(
      page.getByRole('heading', { level: 1, name: 'قبل از خرید، این‌ها را ببین' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'منو' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    await expect(drawer).toBeHidden();
  });
});

test.describe('sub-page visual regression', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });

  for (const target of [
    { hash: '#/discover', name: 'discover' },
    { hash: '#/courses', name: 'courses' },
  ]) {
    test(`${target.name} matches its baseline`, async ({ page }, testInfo) => {
      await page.goto(`/${target.hash}`);
      await settle(page);

      await expect(page).toHaveScreenshot(`${target.name}-${testInfo.project.name}.png`, {
        animations: 'disabled',
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});
