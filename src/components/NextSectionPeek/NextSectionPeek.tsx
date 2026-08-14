import { Link } from 'react-router-dom';
import { COURSES, WEEKLY_PICK_IDS } from '../../data/catalog';
import { CourseCard } from '../CourseCard/CourseCard';
import { ROUTES } from '../../routes';
import styles from './NextSectionPeek.module.css';

const PICKS = WEEKLY_PICK_IDS.map((id) => COURSES.find((course) => course.id === id)).filter(
  (course): course is (typeof COURSES)[number] => course !== undefined,
);

/**
 * The top edge of the next section, deliberately left inside the fold so the
 * hero reads as the start of a page rather than a closed poster.
 */
export function NextSectionPeek() {
  return (
    <section className={styles.section} aria-labelledby="weekly-heading">
      <div className={styles.head}>
        <h2 className={styles.heading} id="weekly-heading">
          این هفته ارزش دیدن دارن
        </h2>
        <Link className={styles.more} to={ROUTES.courses}>
          همه دوره‌ها
          <span aria-hidden="true"> ←</span>
        </Link>
      </div>

      <ul className={styles.rail}>
        {PICKS.map((course) => (
          <li key={course.id} className={styles.railItem}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </section>
  );
}
