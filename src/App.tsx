import { useCallback } from 'react';
import { HeroSection } from './components/Hero/HeroSection';
import { LevelBackground } from './components/LevelBackground/LevelBackground';
import { NextSectionPeek } from './components/NextSectionPeek/NextSectionPeek';
import { SiteHeader } from './components/SiteHeader/SiteHeader';
import { IntroProvider } from './intro/IntroProvider';

/**
 * Brings the user to the recommendation surface and hands them the controls.
 * TODO(product): swap for the full recommendation wizard (route or modal)
 * once it exists — the CTA contract stays the same.
 */
function focusGoalChips() {
  const chips = document.getElementById('goal-chips');
  const preview = document.getElementById('recommendation-preview');

  preview?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  chips?.querySelector('button')?.focus({ preventScroll: true });
}

function scrollToWeeklyPicks() {
  document.getElementById('weekly-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  const onPrimaryAction = useCallback(() => focusGoalChips(), []);
  const onSecondaryAction = useCallback(() => scrollToWeeklyPicks(), []);

  return (
    <IntroProvider>
      <LevelBackground />
      <SiteHeader onPrimaryAction={onPrimaryAction} />
      <main>
        <HeroSection onPrimaryAction={onPrimaryAction} onSecondaryAction={onSecondaryAction} />
        <NextSectionPeek />
      </main>
    </IntroProvider>
  );
}
