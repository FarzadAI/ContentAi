/**
 * Cinematic intro choreography.
 *
 * One ordered timeline drives the whole first load, so the sequence is
 * readable in a single place instead of being scattered across delay values
 * in a dozen stylesheets. Total run ≈ 3s, then the page settles into ambient
 * motion only.
 */
export const INTRO_STAGES = [
  'background', // depth layers fade in
  'level', // «−۱» picks up its crimson accent
  'headline',
  'subheadline',
  'actions',
  'trust',
  'preview', // product preview card enters
  'goal', // «هوش مصنوعی» becomes selected
  'verdict', // evaluation card floats in
  'advice', // «من جات بودم...»
] as const;

export type IntroStage = (typeof INTRO_STAGES)[number];

/** Milliseconds from mount for each stage. */
export const STAGE_TIMINGS: Record<IntroStage, number> = {
  background: 0,
  level: 260,
  headline: 480,
  subheadline: 760,
  actions: 1000,
  trust: 1180,
  preview: 1360,
  goal: 1850,
  verdict: 2600,
  advice: 2850,
};

export const LAST_STAGE_INDEX = INTRO_STAGES.length - 1;

export function stageIndex(stage: IntroStage): number {
  return INTRO_STAGES.indexOf(stage);
}
