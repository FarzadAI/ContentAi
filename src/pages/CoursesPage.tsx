import { useMemo, useState } from 'react';
import { COURSES, TOPICS } from '../data/catalog';
import { CourseCard } from '../components/CourseCard/CourseCard';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { toPersianDigits } from '../lib/persian';
import page from './pages.module.css';

const ALL = 'همه';

export default function CoursesPage() {
  const [topic, setTopic] = useState<string>(ALL);

  const visible = useMemo(
    () => (topic === ALL ? COURSES : COURSES.filter((course) => course.topic === topic)),
    [topic],
  );

  return (
    <div className={page.page}>
      <PageHeader
        eyebrow="دوره‌ها"
        title="هرچی بررسی کردیم، اینجاست"
        lead="فهرست کوتاه است و عمداً کوتاه می‌ماند. هر دوره‌ای که وارد این فهرست می‌شود، بررسی شده و نقطه‌ضعفش هم نوشته شده."
      />

      <div className={page.filters} role="group" aria-label="فیلتر موضوع">
        {[ALL, ...TOPICS].map((item) => (
          <button
            key={item}
            className={page.filter}
            type="button"
            aria-pressed={topic === item}
            onClick={() => setTopic(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className={page.count} aria-live="polite">
        {toPersianDigits(visible.length)} دوره
      </p>

      <div className={page.grid}>
        {visible.map((course) => (
          <CourseCard key={course.id} course={course} showNotFor />
        ))}
      </div>
    </div>
  );
}
