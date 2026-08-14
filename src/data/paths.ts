/**
 * DEMO / MOCK DATA — learning paths for «مسیرها».
 * Each path is an ordered set of catalogue courses plus the reason the order
 * matters. No fake enrolment numbers or completion rates.
 */

import type { GoalId } from './recommendations';

export interface PathStep {
  courseId: string;
  /** Why this step sits here and not somewhere else. */
  note: string;
}

export interface LearningPath {
  id: string;
  title: string;
  goalId: GoalId;
  summary: string;
  totalDuration: string;
  level: string;
  steps: PathStep[];
}

export const PATHS: LearningPath[] = [
  {
    id: 'path-ai-daily',
    title: 'هوش مصنوعی برای کارهای روزمره',
    goalId: 'ai',
    summary: 'از «بلدم باهاش حرف بزنم» تا «کارم رو باهاش سبک کردم».',
    totalDuration: '۱۱ ساعت',
    level: 'مبتدی تا متوسط',
    steps: [
      { courseId: 'llm-for-non-devs', note: 'اول زبان مشترک با ابزار؛ بدون این، بقیه مسیر هدر می‌ره.' },
      { courseId: 'ai-workflow-automation', note: 'بعد از تسلط پایه، سراغ خودکارسازی کارهای تکراری.' },
    ],
  },
  {
    id: 'path-freelance-start',
    title: 'شروع فریلنسری تا اولین درآمد',
    goalId: 'freelance',
    summary: 'یک نمونه‌کار واقعی، بعد اولین مشتری، بعد قیمت‌گذاری درست.',
    totalDuration: '۹ ساعت',
    level: 'مبتدی',
    steps: [
      { courseId: 'freelance-first-project', note: 'تا نمونه‌کار نداشته باشی، بحث قیمت بی‌معنیه.' },
      { courseId: 'freelance-pricing', note: 'وقتی اولین پروژه رو گرفتی، این رو ببین؛ نه زودتر.' },
    ],
  },
  {
    id: 'path-web-ship',
    title: 'از ایده تا سایت منتشرشده',
    goalId: 'web',
    summary: 'اگه عجله داری بدون کد، اگه می‌خوای یاد بگیری با کد.',
    totalDuration: '۱۴ ساعت',
    level: 'مبتدی تا متوسط',
    steps: [
      { courseId: 'no-code-site', note: 'برای رسیدن سریع به یه چیز واقعی و منتشرشده.' },
      { courseId: 'ship-your-first-site', note: 'اگه خواستی خودت کنترل کامل داشته باشی.' },
    ],
  },
  {
    id: 'path-content-steady',
    title: 'تولید محتوای پایدار',
    goalId: 'content',
    summary: 'اول نظم، بعد کیفیت تصویر. برعکسش معمولاً شکست می‌خوره.',
    totalDuration: '۱۰ ساعت',
    level: 'مبتدی',
    steps: [
      { courseId: 'content-that-lasts', note: 'اول ریتم تولید؛ این چیزیه که اکثراً روش گیر می‌کنن.' },
      { courseId: 'video-editing-basics', note: 'وقتی نظم داشتی، کیفیت اجرا رو ببر بالا.' },
    ],
  },
];

export function getPathsForGoal(goalId: GoalId): LearningPath[] {
  return PATHS.filter((path) => path.goalId === goalId);
}
