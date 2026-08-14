import { Reveal } from '../Reveal/Reveal';
import styles from './Hero.module.css';

const TRUST_POINTS = ['بررسی مستقل', 'مقایسه واقعی', 'مسیر شخصی', 'دسترسی معتبر'];

/** Editorial trust line — deliberately not badges, not counters, not claims. */
export function TrustRow() {
  return (
    <Reveal at="trust" as="ul" className={styles.trust}>
      {TRUST_POINTS.map((point) => (
        <li key={point} className={styles.trustItem}>
          {point}
        </li>
      ))}
    </Reveal>
  );
}
