import { useCallback, useEffect, useId, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS, ROUTES } from '../../routes';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuId = useId();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Route changes always close the drawer.
  useEffect(() => closeMenu(), [location.pathname, closeMenu]);

  // Escape closes it, and the page behind it does not scroll while it is open.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  const goToDiscover = useCallback(() => {
    closeMenu();
    navigate(ROUTES.discover);
  }, [closeMenu, navigate]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link className={styles.brand} to={ROUTES.home}>
          <span className={styles.mark} aria-hidden="true">
            −۱
          </span>
          <span className={styles.wordmark}>طبقه منفی یک</span>
        </Link>

        <nav className={styles.nav} aria-label="ناوبری اصلی">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                  }
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconButton} data-desktop-only="true" type="button" aria-label="جست‌وجو">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.5" />
              <path d="m16 16 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

          <button
            className={styles.iconButton}
            data-mobile-only="true"
            type="button"
            aria-label={menuOpen ? 'بستن منو' : 'منو'}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>

          <button className={styles.headerCta} type="button" onClick={goToDiscover}>
            برام انتخاب کن
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={styles.drawer} id={menuId} data-open={menuOpen ? 'true' : 'false'} hidden={!menuOpen}>
        <nav aria-label="ناوبری موبایل">
          <ul className={styles.drawerList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${styles.drawerLink} ${styles.drawerLinkActive}` : styles.drawerLink
                  }
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button className={styles.drawerCta} type="button" onClick={goToDiscover}>
          برام انتخاب کن
        </button>
      </div>
    </header>
  );
}
