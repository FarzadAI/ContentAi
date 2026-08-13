/**
 * DEMO / MOCK DATA — placeholder cards for the «این هفته ارزش دیدن دارن»
 * section peeking below the hero fold. Scores are illustrative UI data,
 * not published evaluations.
 */

export interface WeeklyPick {
  id: string;
  topic: string;
  title: string;
  duration: string;
  level: string;
  score: number;
}

export const WEEKLY_PICKS: WeeklyPick[] = [
  {
    id: 'pick-llm-basics',
    topic: 'هوش مصنوعی',
    title: 'کار با مدل‌های زبانی برای غیربرنامه‌نویس‌ها',
    duration: '۴ ساعت',
    level: 'مقدماتی',
    score: 8.8,
  },
  {
    id: 'pick-first-client',
    topic: 'فریلنسری',
    title: 'از نمونه‌کار تا اولین مشتری',
    duration: '۶ ساعت',
    level: 'مقدماتی',
    score: 9.1,
  },
  {
    id: 'pick-ship-site',
    topic: 'ساخت سایت',
    title: 'یک سایت واقعی که بالا بیاد و بمونه',
    duration: '۹ ساعت',
    level: 'متوسط',
    score: 8.4,
  },
];
