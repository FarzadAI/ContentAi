import type { Advice } from '../../data/recommendations';
import styles from './RecommendationPreview.module.css';

interface AdviceCardProps {
  advice: Advice;
}

/**
 * The signature card: the platform speaking in the first person. This is the
 * one place the brand voice is allowed to be personal — short, specific,
 * and always followed by a reason.
 */
export function AdviceCard({ advice }: AdviceCardProps) {
  return (
    <article className={styles.adviceCard}>
      <h3 className={styles.adviceTitle}>من جات بودم...</h3>
      <p className={styles.adviceText}>{advice.text}</p>
      <p className={styles.adviceWhy}>{advice.why}</p>
    </article>
  );
}
