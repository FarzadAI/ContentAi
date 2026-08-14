import { useCallback, useEffect, useRef, useState } from 'react';
import {
  type GoalId,
  type Recommendation,
  getRecommendationForGoal,
} from '../data/recommendations';

export type RecommendationStatus = 'idle' | 'loading' | 'success';

/** Short enough to read as responsiveness, long enough to read as thinking. */
const EVALUATION_DELAY = 420;

interface UseRecommendationOptions {
  /** Reduced motion still gets the state change, just without the wait. */
  instant?: boolean;
}

/**
 * The recommendation state machine, shared by the hero preview and «کشف».
 *
 * idle → loading → success. A new goal returns to loading while the previous
 * answer stays on screen, so nothing collapses mid-thought.
 */
export function useRecommendation({ instant = false }: UseRecommendationOptions = {}) {
  const [selectedGoalId, setSelectedGoalId] = useState<GoalId | null>(null);
  const [status, setStatus] = useState<RecommendationStatus>('idle');
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
        instant ? 0 : EVALUATION_DELAY,
      );
    },
    [instant],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  return { selectedGoalId, status, result, selectGoal };
}
