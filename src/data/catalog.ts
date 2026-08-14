/**
 * DEMO / MOCK CATALOGUE — not real courses, not real evaluations.
 *
 * Scores are placeholder UI data so the evaluation surfaces have something
 * honest-shaped to render. No participant counts, revenue, or ratings are
 * invented anywhere: if we do not have the data, the UI does not show a number.
 *
 * Replace `COURSES` with an API response of the same shape to go live.
 */

import type { GoalId } from './recommendations';

export type PriceTier = 'free' | 'low' | 'medium' | 'high';

export interface Course {
  id: string;
  title: string;
  topic: string;
  /** Which goals this course serves; drives «کشف» and «مقایسه». */
  goals: GoalId[];
  level: string;
  duration: string;
  priceTier: PriceTier;
  /** «حکم طبقه منفی یک» — 0–10 */
  execution: number;
  beginnerFit: number;
  noise: string;
  valueForMoney: string;
  /** One line on who should not take it. Honesty is the brand. */
  notFor: string;
  tags: string[];
}

export const PRICE_TIER_LABEL: Record<PriceTier, string> = {
  free: 'رایگان',
  low: 'بودجه کم',
  medium: 'بودجه متوسط',
  high: 'بودجه بالا',
};

export const COURSES: Course[] = [
  {
    id: 'llm-for-non-devs',
    title: 'کار با مدل‌های زبانی برای غیربرنامه‌نویس‌ها',
    topic: 'هوش مصنوعی',
    goals: ['ai', 'content'],
    level: 'مقدماتی',
    duration: '۴ ساعت',
    priceTier: 'low',
    execution: 8.8,
    beginnerFit: 9.1,
    noise: 'کم',
    valueForMoney: 'بالا',
    notFor: 'اگه دنبال آموزش کدنویسی مدل هستی، این مسیر تو نیست.',
    tags: ['جمع‌وجور', 'اجرایی', 'به‌روز'],
  },
  {
    id: 'ai-workflow-automation',
    title: 'خودکارسازی کارهای تکراری با ابزارهای هوش مصنوعی',
    topic: 'هوش مصنوعی',
    goals: ['ai', 'income'],
    level: 'متوسط',
    duration: '۷ ساعت',
    priceTier: 'medium',
    execution: 9.0,
    beginnerFit: 7.4,
    noise: 'کم',
    valueForMoney: 'بالا',
    notFor: 'اگه هنوز با ابزارهای پایه راحت نیستی، زوده.',
    tags: ['پروژه‌محور', 'کاربردی'],
  },
  {
    id: 'freelance-first-project',
    title: 'از نمونه‌کار تا اولین مشتری',
    topic: 'فریلنسری',
    goals: ['freelance', 'income'],
    level: 'مقدماتی',
    duration: '۶ ساعت',
    priceTier: 'low',
    execution: 8.6,
    beginnerFit: 9.3,
    noise: 'خیلی کم',
    valueForMoney: 'بالا',
    notFor: 'اگه دنبال میان‌بر و درآمد سریعی، انتظارت برآورده نمی‌شه.',
    tags: ['خروجی‌محور', 'نمونه‌کار می‌سازی'],
  },
  {
    id: 'freelance-pricing',
    title: 'قیمت‌گذاری و مذاکره برای فریلنسرها',
    topic: 'فریلنسری',
    goals: ['freelance', 'income'],
    level: 'متوسط',
    duration: '۳ ساعت',
    priceTier: 'low',
    execution: 8.4,
    beginnerFit: 7.8,
    noise: 'کم',
    valueForMoney: 'بالا',
    notFor: 'برای کسی که هنوز اولین پروژه‌اش را نگرفته، زود است.',
    tags: ['کوتاه', 'مهارت نرم'],
  },
  {
    id: 'ship-your-first-site',
    title: 'یک سایت واقعی که بالا بیاد و بمونه',
    topic: 'ساخت سایت',
    goals: ['web'],
    level: 'مقدماتی',
    duration: '۹ ساعت',
    priceTier: 'medium',
    execution: 8.9,
    beginnerFit: 8.2,
    noise: 'متوسط',
    valueForMoney: 'متوسط',
    notFor: 'اگه فقط یه صفحه ساده می‌خوای، این بیش از نیازته.',
    tags: ['پروژه‌محور', 'تا انتشار'],
  },
  {
    id: 'no-code-site',
    title: 'ساخت سایت بدون کد، برای کسب‌وکار کوچک',
    topic: 'ساخت سایت',
    goals: ['web', 'income'],
    level: 'مبتدی',
    duration: '۵ ساعت',
    priceTier: 'low',
    execution: 8.1,
    beginnerFit: 9.4,
    noise: 'کم',
    valueForMoney: 'بالا',
    notFor: 'اگه می‌خوای برنامه‌نویسی یاد بگیری، این مسیر میان‌بره، نه آموزش.',
    tags: ['سریع', 'بدون کد'],
  },
  {
    id: 'content-that-lasts',
    title: 'تولید محتوای منظم بدون فرسوده شدن',
    topic: 'تولید محتوا',
    goals: ['content'],
    level: 'مقدماتی',
    duration: '۴ ساعت',
    priceTier: 'free',
    execution: 8.3,
    beginnerFit: 8.8,
    noise: 'کم',
    valueForMoney: 'بالا',
    notFor: 'اگه دنبال ترفند رشد انفجاری هستی، اینجا خبری نیست.',
    tags: ['کم‌حجم', 'قابل ادامه دادن'],
  },
  {
    id: 'video-editing-basics',
    title: 'تدوین ویدیو در حد کاربردی، نه حرفه‌ای',
    topic: 'تولید محتوا',
    goals: ['content', 'freelance'],
    level: 'مبتدی',
    duration: '۶ ساعت',
    priceTier: 'medium',
    execution: 7.9,
    beginnerFit: 9.0,
    noise: 'متوسط',
    valueForMoney: 'متوسط',
    notFor: 'برای کار تدوین سینمایی و رنگ حرفه‌ای کافی نیست.',
    tags: ['مهارت پایه'],
  },
  {
    id: 'skill-to-income',
    title: 'از مهارتی که داری تا اولین درآمد جدی',
    topic: 'درآمد',
    goals: ['income'],
    level: 'مقدماتی',
    duration: '۵ ساعت',
    priceTier: 'low',
    execution: 9.0,
    beginnerFit: 8.4,
    noise: 'کم',
    valueForMoney: 'بالا',
    notFor: 'اگه هیچ مهارت پایه‌ای نداری، اول باید یکی رو انتخاب کنی.',
    tags: ['قدم‌به‌قدم', 'کنار شغل'],
  },
];

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((course) => course.id === id);
}

export function getCoursesForGoal(goalId: GoalId): Course[] {
  return COURSES.filter((course) => course.goals.includes(goalId));
}

export const TOPICS: string[] = [...new Set(COURSES.map((course) => course.topic))];

/** Courses the team put forward this week — the section under the hero fold. */
export const WEEKLY_PICK_IDS = ['llm-for-non-devs', 'freelance-first-project', 'ship-your-first-site'];

export const FREE_COURSE_IDS = COURSES.filter((c) => c.priceTier === 'free').map((c) => c.id);
