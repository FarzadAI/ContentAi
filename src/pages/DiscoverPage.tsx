import { useEffect } from 'react';
import { GOALS } from '../data/recommendations';
import { getCoursesForGoal } from '../data/catalog';
import { useRecommendation } from '../hooks/useRecommendation';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { CourseCard } from '../components/CourseCard/CourseCard';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { AdviceCard } from '../components/RecommendationPreview/AdviceCard';
import { GoalChips } from '../components/RecommendationPreview/GoalChips';
import { RecommendationCard } from '../components/RecommendationPreview/RecommendationCard';
import { VerdictCard } from '../components/RecommendationPreview/VerdictCard';
import page from './pages.module.css';
import styles from './DiscoverPage.module.css';

/** The full-size version of the hero's preview: one goal in, one answer out. */
export default function DiscoverPage() {
  const reducedMotion = usePrefersReducedMotion();
  const { selectedGoalId, status, result, selectGoal } = useRecommendation({
    instant: reducedMotion,
  });

  // Arrive with an answer already on screen rather than an empty page.
  useEffect(() => {
    if (selectedGoalId === null) selectGoal('ai');
  }, [selectedGoalId, selectGoal]);

  const alternatives = selectedGoalId
    ? getCoursesForGoal(selectedGoalId).slice(0, 3)
    : [];

  return (
    <div className={page.page}>
      <PageHeader
        eyebrow="کشف"
        title="چی به درد من می‌خوره؟"
        lead="هدفت رو انتخاب کن؛ به‌جای فهرست بی‌پایان، یک پیشنهاد با دلیل می‌گیری."
      />

      <div className={`${page.panel} ${styles.panel}`}>
        <GoalChips goals={GOALS} selectedId={selectedGoalId} onSelect={selectGoal} />

        <div
          className={styles.results}
          aria-live="polite"
          aria-busy={status === 'loading'}
          data-status={status}
        >
          {result === null ? (
            <p className={page.empty}>یکی از هدف‌ها رو انتخاب کن.</p>
          ) : (
            <>
              <div className={styles.primary}>
                <RecommendationCard
                  key={result.id}
                  recommendation={result}
                  stale={status === 'loading'}
                />
              </div>
              <div className={styles.side}>
                <VerdictCard verdict={result.verdict} active />
                <AdviceCard advice={result.advice} />
              </div>
            </>
          )}
        </div>
      </div>

      {alternatives.length > 0 && (
        <section className={page.section}>
          <h2 className={page.sectionTitle}>گزینه‌های دیگر همین هدف</h2>
          <p className={page.sectionLead}>
            اگر پیشنهاد بالا با شرایطت جور نبود، این‌ها نزدیک‌ترین‌ها هستند.
          </p>
          <div className={page.grid}>
            {alternatives.map((course) => (
              <CourseCard key={course.id} course={course} showNotFor />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
