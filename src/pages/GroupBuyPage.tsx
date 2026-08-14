import { COURSES } from '../data/catalog';
import { CourseCard } from '../components/CourseCard/CourseCard';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { toPersianDigits } from '../lib/persian';
import page from './pages.module.css';
import styles from './GroupBuyPage.module.css';

/**
 * No participant counters or countdowns here: we do not have that data yet,
 * and inventing it would be exactly the pressure tactic this brand is against.
 */
const STEPS = [
  {
    title: 'دوره را انتخاب می‌کنی',
    body: 'از میان دوره‌هایی که بررسی شده‌اند و امکان خرید گروهی دارند.',
  },
  {
    title: 'اسمت را می‌گذاری',
    body: 'وقتی تعداد کافی جمع شد، خرید گروهی فعال می‌شود. تا آن لحظه پولی جابه‌جا نمی‌شود.',
  },
  {
    title: 'با قیمت گروهی می‌خری',
    body: 'اگر گروه تشکیل نشد، هیچ اتفاقی نمی‌افتد و خبرش را می‌دهیم.',
  },
];

export default function GroupBuyPage() {
  const eligible = COURSES.filter((course) => course.priceTier !== 'free').slice(0, 3);

  return (
    <div className={page.page}>
      <PageHeader
        eyebrow="خرید گروهی"
        title="با هم ارزان‌تر، بدون فشار فروش"
        lead="خرید گروهی یعنی چند نفر که همان دوره را می‌خواهند، با هم بخرند. نه شمارش معکوس، نه «فقط تا امشب»."
      />

      <ol className={styles.steps}>
        {STEPS.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.index} aria-hidden="true">
              {toPersianDigits(index + 1)}
            </span>
            <h2 className={styles.stepTitle}>{step.title}</h2>
            <p className={styles.stepBody}>{step.body}</p>
          </li>
        ))}
      </ol>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>دوره‌هایی که می‌شود گروهی خرید</h2>
        <p className={page.sectionLead}>
          فعلاً همین‌ها؛ هر دوره‌ای که بررسی شود و ناشرش موافق باشد، اضافه می‌شود.
        </p>
        <div className={page.grid}>
          {eligible.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <p className={styles.note}>
        هنوز گروهی فعال نیست. وقتی راه بیفتد، همین‌جا اعلام می‌شود.
      </p>
    </div>
  );
}
