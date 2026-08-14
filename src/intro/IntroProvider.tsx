import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { IntroContext } from './IntroContext';
import { INTRO_STAGES, LAST_STAGE_INDEX, STAGE_TIMINGS } from './stages';

interface IntroProviderProps {
  children: ReactNode;
}

/**
 * Runs the first-load choreography. With reduced motion requested, every stage
 * is considered already fired: the content is complete and interactive
 * immediately, nothing is gated behind an animation.
 */
export function IntroProvider({ children }: IntroProviderProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(() => (reducedMotion ? LAST_STAGE_INDEX : -1));

  useEffect(() => {
    if (reducedMotion) {
      setCurrentIndex(LAST_STAGE_INDEX);
      return;
    }

    const timers = INTRO_STAGES.map((stage, index) =>
      window.setTimeout(() => {
        setCurrentIndex((previous) => Math.max(previous, index));
      }, STAGE_TIMINGS[stage]),
    );

    return () => timers.forEach(window.clearTimeout);
  }, [reducedMotion]);

  const value = useMemo(() => ({ currentIndex, reducedMotion }), [currentIndex, reducedMotion]);

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}
