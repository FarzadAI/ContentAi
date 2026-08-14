import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { IntroProvider } from './intro/IntroProvider';
import ComparePage from './pages/ComparePage';
import CoursesPage from './pages/CoursesPage';
import DiscoverPage from './pages/DiscoverPage';
import FreePage from './pages/FreePage';
import GroupBuyPage from './pages/GroupBuyPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import PathsPage from './pages/PathsPage';
import { ROUTES } from './routes';

/**
 * Hash routing keeps the site deployable as plain static files — no server
 * rewrite rules, and it survives being embedded or opened from a file path.
 */
export default function App() {
  return (
    <IntroProvider>
      <HashRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.discover} element={<DiscoverPage />} />
            <Route path={ROUTES.paths} element={<PathsPage />} />
            <Route path={ROUTES.courses} element={<CoursesPage />} />
            <Route path={ROUTES.groupBuy} element={<GroupBuyPage />} />
            <Route path={ROUTES.free} element={<FreePage />} />
            <Route path={ROUTES.compare} element={<ComparePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </IntroProvider>
  );
}
