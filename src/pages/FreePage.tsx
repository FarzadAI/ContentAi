import { COURSES } from '../data/catalog';
import { CourseCard } from '../components/CourseCard/CourseCard';
import { PageHeader } from '../components/PageHeader/PageHeader';
import page from './pages.module.css';

export default function FreePage() {
  const free = COURSES.filter((course) => course.priceTier === 'free');

  return (
    <div className={page.page}>
      <PageHeader
        eyebrow="رایگان‌ها"
        title="قبل از خرید، این‌ها را ببین"
        lead="بعضی وقت‌ها جواب سؤالت رایگان هم پیدا می‌شود. اگر رایگانش کافی است، دلیلی ندارد پول بدهی."
      />

      {free.length === 0 ? (
        <p className={page.empty}>فعلاً چیزی در این فهرست نیست؛ به‌زودی پر می‌شود.</p>
      ) : (
        <div className={page.grid}>
          {free.map((course) => (
            <CourseCard key={course.id} course={course} showNotFor />
          ))}
        </div>
      )}

      <section className={page.section}>
        <h2 className={page.sectionTitle}>چرا این فهرست کوتاه است؟</h2>
        <p className={page.sectionLead}>
          چون هر چیز رایگانی ارزش وقت گذاشتن ندارد. این‌ها همان‌قدر بررسی شده‌اند که بقیه.
        </p>
      </section>
    </div>
  );
}
