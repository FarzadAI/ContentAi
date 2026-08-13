/**
 * DEMO / MOCK DATA — not real catalogue content.
 *
 * Every number below (match score, verdict metric) is placeholder UI data used
 * to demonstrate the recommendation surface. Nothing here is a real course,
 * a real evaluation, or a real business metric. When the recommendation API
 * lands, replace `getRecommendationForGoal` with a fetch that returns the same
 * `Recommendation` shape — no component change required.
 */

export type GoalId = 'income' | 'ai' | 'freelance' | 'web' | 'content';

export interface Goal {
  id: GoalId;
  label: string;
}

export interface Verdict {
  /** «اجرایی بودن» — 0–10 */
  execution: number;
  /** «مناسب مبتدی» — 0–10 */
  beginnerFit: number;
  /** «حاشیه» — qualitative on purpose */
  noise: string;
  /** «ارزش نسبت به قیمت» */
  value: string;
}

export interface Advice {
  text: string;
  why: string;
}

export interface Recommendation {
  id: string;
  goalId: GoalId;
  /** Card label above the title, e.g. «پیشنهاد برای تو» */
  label: string;
  title: string;
  /** Match percentage, 0–100 */
  score: number;
  level: string;
  dailyTime: string;
  budget: string;
  reasons: string[];
  verdict: Verdict;
  advice: Advice;
}

export const GOALS: Goal[] = [
  { id: 'income', label: 'درآمد بیشتر' },
  { id: 'ai', label: 'هوش مصنوعی' },
  { id: 'freelance', label: 'شروع فریلنسری' },
  { id: 'web', label: 'ساخت سایت' },
  { id: 'content', label: 'تولید محتوا' },
];

/** The goal the cinematic intro selects on first load. */
export const DEFAULT_GOAL_ID: GoalId = 'ai';

const RECOMMENDATIONS: Record<GoalId, Recommendation> = {
  ai: {
    id: 'rec-ai',
    goalId: 'ai',
    label: 'پیشنهاد برای تو',
    title: 'مسیر کاربردی هوش مصنوعی برای کارهای روزمره',
    score: 89,
    level: 'مبتدی',
    dailyTime: 'روزی ۱ ساعت',
    budget: 'بودجه متوسط',
    reasons: ['مناسب سطح تو', 'جمع‌وجور', 'اجرایی'],
    verdict: { execution: 8.8, beginnerFit: 9.1, noise: 'کم', value: 'بالا' },
    advice: {
      text: 'بین این دوتا، گزینه دوم رو انتخاب می‌کردم.',
      why: 'کوتاه‌تره و برای سطح تو مناسب‌تره.',
    },
  },
  income: {
    id: 'rec-income',
    goalId: 'income',
    label: 'پیشنهاد برای تو',
    title: 'از مهارتی که داری تا اولین درآمد جدی',
    score: 84,
    level: 'مقدماتی',
    dailyTime: 'روزی ۱ ساعت و نیم',
    budget: 'بودجه کم',
    reasons: ['قدم‌به‌قدم', 'بدون حاشیه', 'قابل اجرا کنار شغل'],
    verdict: { execution: 9.0, beginnerFit: 8.4, noise: 'کم', value: 'بالا' },
    advice: {
      text: 'اگه جای تو بودم، اول همین مسیر رو تموم می‌کردم.',
      why: 'قبل از خرید دوره‌های گران‌تر، جواب می‌ده که یه بار کامل تا خروجی بری.',
    },
  },
  freelance: {
    id: 'rec-freelance',
    goalId: 'freelance',
    label: 'پیشنهاد برای تو',
    title: 'فریلنسری از صفر تا اولین پروژه واقعی',
    score: 86,
    level: 'مبتدی',
    dailyTime: 'روزی ۱ ساعت',
    budget: 'بودجه کم',
    reasons: ['خروجی‌محور', 'مناسب شروع', 'نمونه‌کار می‌سازی'],
    verdict: { execution: 8.6, beginnerFit: 9.3, noise: 'خیلی کم', value: 'بالا' },
    advice: {
      text: 'من جای تو، دوره جامع نمی‌خریدم.',
      why: 'برای شروع فریلنسری، یه مسیر کوتاه و یه نمونه‌کار واقعی کافیه.',
    },
  },
  web: {
    id: 'rec-web',
    goalId: 'web',
    label: 'پیشنهاد برای تو',
    title: 'ساخت و انتشار اولین سایت واقعی',
    score: 81,
    level: 'مبتدی',
    dailyTime: 'روزی ۲ ساعت',
    budget: 'بودجه متوسط',
    reasons: ['پروژه‌محور', 'به‌روز', 'تا انتشار می‌بردت'],
    verdict: { execution: 8.9, beginnerFit: 8.2, noise: 'متوسط', value: 'متوسط' },
    advice: {
      text: 'بین این دوتا، گزینه به‌روزتر رو برمی‌داشتم.',
      why: 'تو این حوزه، محتوای دو سال پیش خیلی زود قدیمی می‌شه.',
    },
  },
  content: {
    id: 'rec-content',
    goalId: 'content',
    label: 'پیشنهاد برای تو',
    title: 'تولید محتوای منظم بدون فرسوده شدن',
    score: 78,
    level: 'مقدماتی',
    dailyTime: 'روزی ۴۵ دقیقه',
    budget: 'بودجه کم',
    reasons: ['مناسب سطح تو', 'کم‌حجم', 'قابل ادامه دادن'],
    verdict: { execution: 8.3, beginnerFit: 8.8, noise: 'کم', value: 'بالا' },
    advice: {
      text: 'اگه جات بودم، فعلاً سراغ دوره‌های گران نمی‌رفتم.',
      why: 'اول یه ماه منظم تولید کن، بعد تصمیم بگیر کجا کم داری.',
    },
  },
};

export function getRecommendationForGoal(goalId: GoalId): Recommendation {
  return RECOMMENDATIONS[goalId];
}
