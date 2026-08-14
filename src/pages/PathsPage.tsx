import { PATHS } from '../data/paths';
import { getCourseById } from '../data/catalog';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { toPersianDigits } from '../lib/persian';
import page from './pages.module.css';
import styles from './PathsPage.module.css';

export default function PathsPage() {
  return (
    <div className={page.page}>
      <PageHeader
        eyebrow="مسیرها"
        title="ترتیب، مهم‌تر از تعداد است"
        lead="مسیر یعنی چند دوره که به ترتیب درست کنار هم چیده شده‌اند؛ با دلیلِ اینکه چرا این ترتیب."
      />

      <div className={styles.paths}>
        {PATHS.map((path) => (
          <article key={path.id} className={styles.path}>
            <header className={styles.pathHead}>
              <h2 className={styles.pathTitle}>{path.title}</h2>
              <p className={styles.pathSummary}>{path.summary}</p>
              <p className={styles.pathMeta}>
                {path.totalDuration} · {path.level} · {toPersianDigits(path.steps.length)} قدم
              </p>
            </header>

            {/* Numbered because the order genuinely carries information here. */}
            <ol className={styles.steps}>
              {path.steps.map((step, index) => {
                const course = getCourseById(step.courseId);
                if (!course) return null;

                return (
                  <li key={step.courseId} className={styles.step}>
                    <span className={styles.stepIndex} aria-hidden="true">
                      {toPersianDigits(index + 1)}
                    </span>
                    <div className={styles.stepBody}>
                      <h3 className={styles.stepTitle}>{course.title}</h3>
                      <p className={styles.stepMeta}>
                        {course.duration} · {course.level}
                      </p>
                      <p className={styles.stepNote}>{step.note}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}
