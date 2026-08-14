import { RecommendationPreview } from '../RecommendationPreview/RecommendationPreview';
import { HeroActions } from './HeroActions';
import { HeroContent } from './HeroContent';
import { TrustRow } from './TrustRow';
import styles from './Hero.module.css';

interface HeroSectionProps {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

/**
 * Asymmetric split on desktop (≈56% copy / ≈44% product preview, copy on the
 * right in RTL); a single stacked column on mobile, ordered so the primary CTA
 * lands inside the first view.
 */
export function HeroSection({ onPrimaryAction, onSecondaryAction }: HeroSectionProps) {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-heading">
      <div className={styles.copy}>
        <HeroContent />
        <HeroActions onPrimaryAction={onPrimaryAction} onSecondaryAction={onSecondaryAction} />
        <TrustRow />
      </div>

      <div className={styles.visual}>
        <RecommendationPreview />
      </div>
    </section>
  );
}
