import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { setReducedMotion } from './test/setup';

describe('App / hero', () => {
  it('renders the headline as the single h1', () => {
    render(<App />);

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('کمتر دوره بخر.');
    expect(headings[0]).toHaveTextContent('بهتر انتخاب کن.');
  });

  it('renders the subheadline and both calls to action', () => {
    render(<App />);

    expect(screen.getByText(/دوره‌ها، مدرس‌ها و مسیرهای آموزشی رو بررسی و فیلتر می‌کنه/)).toBeVisible();
    // primary CTA appears in the header (desktop) and in the hero
    expect(screen.getAllByRole('button', { name: 'برام انتخاب کن' }).length).toBeGreaterThanOrEqual(
      1,
    );
    expect(screen.getByRole('button', { name: 'خودم می‌گردم' })).toBeVisible();
    expect(screen.getByRole('link', { name: /یه دوره تو ذهنته؟ بررسیش کن/ })).toBeVisible();
  });

  it('shows the trust row and the next-section peek', () => {
    render(<App />);

    for (const point of ['بررسی مستقل', 'مقایسه واقعی', 'مسیر شخصی', 'دسترسی معتبر']) {
      expect(screen.getByText(point)).toBeVisible();
    }

    expect(screen.getByRole('heading', { name: 'این هفته ارزش دیدن دارن' })).toBeVisible();
  });

  it('moves focus to the goal chips when the primary CTA is pressed', async () => {
    const user = userEvent.setup();
    render(<App />);

    const [cta] = screen.getAllByRole('button', { name: 'برام انتخاب کن' });
    await user.click(cta);

    expect(screen.getByRole('button', { name: 'درآمد بیشتر' })).toHaveFocus();
  });

  it('with reduced motion, all hero content is revealed immediately', () => {
    setReducedMotion(true);
    const { container } = render(<App />);

    const pending = container.querySelectorAll('[data-revealed="false"]');
    expect(pending).toHaveLength(0);
  });

  it('without reduced motion, content starts hidden and then reveals', async () => {
    setReducedMotion(false);
    const { container } = render(<App />);

    expect(container.querySelectorAll('[data-revealed="false"]').length).toBeGreaterThan(0);

    await waitFor(
      () => {
        expect(container.querySelectorAll('[data-revealed="false"]')).toHaveLength(0);
      },
      { timeout: 5000 },
    );
  });
});
