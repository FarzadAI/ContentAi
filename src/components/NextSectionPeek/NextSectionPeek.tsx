import { WEEKLY_PICKS } from '../../data/weeklyPicks';
import { formatScore } from '../../lib/persian';
import styles from './NextSectionPeek.module.css';

/**
 * The top edge of the next section, deliberately left inside the fold so the
 * hero reads as the start of a page rather than a closed poster.
 */
export function NextSectionPeek() {
  return (
    <section className={styles.section} aria-labelledby="weekly-heading">
      <h2 className={styles.heading} id="weekly-heading">
        این هفته ارزش دیدن دارن
      </h2>

      <ul className={styles.rail}>
        {WEEKLY_PICKS.map((pick) => (
          <li key={pick.id}>
            <article className={styles.course}>
              <span className={styles.topic}>{pick.topic}</span>
              <h3 className={styles.courseTitle}>{pick.title}</h3>
              <p className={styles.courseMeta}>
                {pick.duration} · {pick.level}
              </p>
              <p className={styles.courseScore}>
                {formatScore(pick.score)}
                <small>/۱۰</small>
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
