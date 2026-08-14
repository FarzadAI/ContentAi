import { describe, expect, it } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
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

    expect(
      screen.getByText(/دوره‌ها، مدرس‌ها و مسیرهای آموزشی رو بررسی و فیلتر می‌کنه/),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'برام انتخاب کن' }).length).toBeGreaterThanOrEqual(
      1,
    );
    expect(screen.getByRole('button', { name: 'خودم می‌گردم' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /یه دوره تو ذهنته؟ بررسیش کن/ })).toBeInTheDocument();
  });

  it('shows the trust row and the next-section peek', () => {
    render(<App />);

    for (const point of ['بررسی مستقل', 'مقایسه واقعی', 'مسیر شخصی', 'دسترسی معتبر']) {
      expect(screen.getByText(point)).toBeInTheDocument();
    }

    expect(screen.getByRole('heading', { name: 'این هفته ارزش دیدن دارن' })).toBeInTheDocument();
  });

  it('with reduced motion, all hero content is revealed immediately', () => {
    setReducedMotion(true);
    const { container } = render(<App />);

    expect(container.querySelectorAll('[data-revealed="false"]')).toHaveLength(0);
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

describe('App / navigation', () => {
  it('the primary CTA takes the reader to «کشف»', async () => {
    const user = userEvent.setup();
    render(<App />);

    const [cta] = screen.getAllByRole('button', { name: 'برام انتخاب کن' });
    await user.click(cta);

    expect(await screen.findByRole('heading', { level: 1, name: 'چی به درد من می‌خوره؟' })).toBeInTheDocument();
  });

  it('«خودم می‌گردم» takes the reader to the catalogue', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'خودم می‌گردم' }));

    expect(
      await screen.findByRole('heading', { level: 1, name: 'هرچی بررسی کردیم، اینجاست' }),
    ).toBeInTheDocument();
  });

  it('the mobile menu opens, navigates, and closes again', async () => {
    const user = userEvent.setup();
    render(<App />);

    const menuButton = screen.getByRole('button', { name: 'منو' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);
    expect(screen.getByRole('button', { name: 'بستن منو' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    const drawer = screen.getByRole('navigation', { name: 'ناوبری موبایل' });
    await user.click(within(drawer).getByRole('link', { name: 'مسیرها' }));

    expect(
      await screen.findByRole('heading', { level: 1, name: 'ترتیب، مهم‌تر از تعداد است' }),
    ).toBeInTheDocument();
    // navigating closes the drawer
    expect(screen.getByRole('button', { name: 'منو' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders a 404 page for an unknown route', async () => {
    window.location.hash = '#/does-not-exist';
    render(<App />);

    expect(
      await screen.findByRole('heading', { level: 1, name: 'این صفحه پیدا نشد' }),
    ).toBeInTheDocument();

    window.location.hash = '';
  });
});
