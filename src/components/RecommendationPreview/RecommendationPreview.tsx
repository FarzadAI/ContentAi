import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DEFAULT_GOAL_ID,
  GOALS,
  type GoalId,
  type Recommendation,
  getRecommendationForGoal,
} from '../../data/recommendations';
import { useHasReached, useIntro } from '../../intro/IntroContext';
import { Reveal } from '../Reveal/Reveal';
import { AdviceCard } from './AdviceCard';
import { GoalChips } from './GoalChips';
import { RecommendationCard } from './RecommendationCard';
import { VerdictCard } from './VerdictCard';
import styles from './RecommendationPreview.module.css';

type PreviewStatus = 'idle' | 'loading' | 'success';

/** Short enough to read as responsiveness, long enough to read as thinking. */
const EVALUATION_DELAY = 420;

/**
 * The product itself, in miniature: pick a goal, get one considered answer.
 *
 * State machine: idle → loading → success. Selecting a new goal returns to
 * loading while keeping the previous answer on screen, so the card never
 * collapses and the layout never jumps.
 *
 * Data is mock (see data/recommendations.ts); swapping `getRecommendationForGoal`
 * for an API call is the only change needed to make this live.
 */
export function RecommendationPreview() {
  const { reducedMotion } = useIntro();
  const introReachedGoal = useHasReached('goal');
  const verdictRevealed = useHasReached('verdict');

  const [selectedGoalId, setSelectedGoalId] = useState<GoalId | null>(null);
  const [status, setStatus] = useState<PreviewStatus>('idle');
  const [result, setResult] = useState<Recommendation | null>(null);
  const timerRef = useRef<number | null>(null);

  const selectGoal = useCallback(
    (goalId: GoalId) => {
      setSelectedGoalId(goalId);
      setStatus('loading');

      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(
        () => {
          setResult(getRecommendationForGoal(goalId));
          setStatus('success');
        },
        reducedMotion ? 0 : EVALUATION_DELAY,
      );
    },
    [reducedMotion],
  );

  // Stage 7 of the intro: the preview picks a goal on the user's behalf.
  useEffect(() => {
    if (introReachedGoal && selectedGoalId === null) selectGoal(DEFAULT_GOAL_ID);
  }, [introReachedGoal, selectedGoalId, selectGoal]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  /* The floating cards are always in the layout so the page reserves their
     space from first paint; they stay invisible (and out of the a11y tree)
     until both the answer exists and the timeline reaches them. */
  const shown = result ?? getRecommendationForGoal(DEFAULT_GOAL_ID);

  return (
    <div className={styles.stack} id="recommendation-preview">
      <Reveal at="preview" as="article" variant="float" className={styles.card}>
        <header className={styles.cardHead}>
          <h2 className={styles.cardTitle}>چی به درد من می‌خوره؟</h2>
          <p className={styles.cardHint}>هدفت رو انتخاب کن</p>
        </header>

        <GoalChips goals={GOALS} selectedId={selectedGoalId} onSelect={selectGoal} />

        <div
          className={styles.resultArea}
          data-status={status}
          aria-live="polite"
          aria-busy={status === 'loading'}
        >
          {status === 'loading' && (
            <>
              {/* A hairline is the whole loading state: it sits on the card's
                  divider and never covers the answer being replaced. */}
              <span className={styles.loadingBar} aria-hidden="true">
                <i />
              </span>
              <span className="visually-hidden">در حال بررسی دوره‌ها…</span>
            </>
          )}

          {result === null && status !== 'loading' && (
            <p className={styles.placeholder}>
              یکی از هدف‌ها رو انتخاب کن تا ببینی چی بهت می‌خوره.
            </p>
          )}

          {result !== null && (
            /* keyed by recommendation so the match dial re-animates per answer */
            <RecommendationCard
              key={result.id}
              recommendation={result}
              stale={status === 'loading'}
            />
          )}
        </div>
      </Reveal>

      <Reveal at="verdict" variant="float" className={styles.floating}>
        <VerdictCard verdict={shown.verdict} active={verdictRevealed} />
      </Reveal>

      <Reveal at="advice" variant="float" className={styles.floatingAdvice}>
        <AdviceCard advice={shown.advice} />
      </Reveal>
    </div>
  );
}
