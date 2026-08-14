import { type Course, PRICE_TIER_LABEL } from '../../data/catalog';
import { formatScore } from '../../lib/persian';
import styles from './CourseCard.module.css';

interface CourseCardProps {
  course: Course;
  /** «برای چه کسی مناسب نیست» is the honest half; show it where there's room. */
  showNotFor?: boolean;
}

export function CourseCard({ course, showNotFor = false }: CourseCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.topic}>{course.topic}</span>
        <p className={styles.score}>
          {formatScore(course.execution)}
          <small>/۱۰</small>
        </p>
      </div>

      <h3 className={styles.title}>{course.title}</h3>

      <p className={styles.meta}>
        {course.duration} · {course.level} · {PRICE_TIER_LABEL[course.priceTier]}
      </p>

      <ul className={styles.tags}>
        {course.tags.map((tag) => (
          <li key={tag} className={styles.tag}>
            {tag}
          </li>
        ))}
      </ul>

      {showNotFor && (
        <p className={styles.notFor}>
          <span className={styles.notForLabel}>مناسب نیست اگر:</span> {course.notFor}
        </p>
      )}
    </article>
  );
}
