import { createContext, useContext } from 'react';
import { type IntroStage, LAST_STAGE_INDEX, stageIndex } from './stages';

export interface IntroContextValue {
  /** Index of the last stage that has fired. -1 = nothing revealed yet. */
  currentIndex: number;
  reducedMotion: boolean;
}

export const IntroContext = createContext<IntroContextValue>({
  currentIndex: LAST_STAGE_INDEX,
  reducedMotion: true,
});

export function useIntro() {
  return useContext(IntroContext);
}

/** True once the timeline has reached `stage`. */
export function useHasReached(stage: IntroStage): boolean {
  const { currentIndex } = useIntro();
  return currentIndex >= stageIndex(stage);
}
