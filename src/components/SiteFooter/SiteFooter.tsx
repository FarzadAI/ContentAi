import { Link } from 'react-router-dom';
import { NAV_ITEMS, ROUTES } from '../../routes';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <Link className={styles.brand} to={ROUTES.home}>
            <span className={styles.mark} aria-hidden="true">
              −۱
            </span>
            <span>طبقه منفی یک</span>
          </Link>
          <p className={styles.line}>کمتر دوره بخر. بهتر انتخاب کن.</p>
        </div>

        <nav aria-label="ناوبری پاورقی">
          <ul className={styles.links}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link className={styles.link} to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className={styles.note}>
        بررسی‌ها مستقل‌اند و به خرید هیچ دوره‌ای وابسته نیستند. اعداد این نسخه نمایشی‌اند.
      </p>
    </footer>
  );
}
