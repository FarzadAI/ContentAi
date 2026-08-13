import { Reveal } from '../Reveal/Reveal';
import styles from './SiteHeader.module.css';

const NAV_ITEMS = [
  { href: '#discover', label: 'کشف' },
  { href: '#paths', label: 'مسیرها' },
  { href: '#courses', label: 'دوره‌ها' },
  { href: '#group-buy', label: 'خرید گروهی' },
  { href: '#free', label: 'رایگان‌ها' },
  { href: '#compare', label: 'مقایسه' },
];

interface SiteHeaderProps {
  onPrimaryAction: () => void;
}

export function SiteHeader({ onPrimaryAction }: SiteHeaderProps) {
  return (
    <Reveal at="headline" as="header" variant="fade" className={styles.header}>
      <a className={styles.brand} href="#top">
        <span className={styles.mark} aria-hidden="true">
          −۱
        </span>
        <span className={styles.wordmark}>طبقه منفی یک</span>
      </a>

      {/* Desktop-only navigation; mobile keeps logo + menu + profile. */}
      <nav className={styles.nav} aria-label="ناوبری اصلی">
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a className={styles.navLink} href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        <button className={styles.iconButton} type="button" aria-label="جست‌وجو">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="m16 16 3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button className={styles.iconButton} type="button" aria-label="حساب کاربری">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M4.9 19.8c1.1-3.5 3.8-5.3 7.1-5.3s6 1.8 7.1 5.3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button className={styles.iconButton} data-mobile-only="true" type="button" aria-label="منو">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path
              d="M4 7h16M4 12h16M4 17h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button className={styles.headerCta} type="button" onClick={onPrimaryAction}>
          برام انتخاب کن
        </button>
      </div>
    </Reveal>
  );
}
