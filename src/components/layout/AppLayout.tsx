import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LevelBackground } from '../LevelBackground/LevelBackground';
import { SiteFooter } from '../SiteFooter/SiteFooter';
import { SiteHeader } from '../SiteHeader/SiteHeader';
import styles from './AppLayout.module.css';

/** Sends the reader to the top of each new page, the way a page load would. */
function useScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
}

export function AppLayout() {
  useScrollToTopOnNavigate();

  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#main">
        پرش به محتوای اصلی
      </a>

      <LevelBackground />
      <SiteHeader />

      <main className={styles.main} id="main" tabIndex={-1}>
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}
