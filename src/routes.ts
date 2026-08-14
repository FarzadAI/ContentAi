export const ROUTES = {
  home: '/',
  discover: '/discover',
  paths: '/paths',
  courses: '/courses',
  groupBuy: '/group-buy',
  free: '/free',
  compare: '/compare',
} as const;

export interface NavItem {
  to: string;
  label: string;
}

/** Primary navigation, in the order the product wants them read. */
export const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.discover, label: 'کشف' },
  { to: ROUTES.paths, label: 'مسیرها' },
  { to: ROUTES.courses, label: 'دوره‌ها' },
  { to: ROUTES.groupBuy, label: 'خرید گروهی' },
  { to: ROUTES.free, label: 'رایگان‌ها' },
  { to: ROUTES.compare, label: 'مقایسه' },
];
