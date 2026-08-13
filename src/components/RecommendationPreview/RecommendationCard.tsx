import type { CSSProperties } from 'react';
import type { Recommendation } from '../../data/recommendations';
import { formatPercent } from '../../lib/persian';
import styles from './RecommendationPreview.module.css';

/** r=19 → 2πr, used to drive the match dial with stroke-dashoffset. */
const DIAL_CIRCUMFERENCE = 119.38;

interface RecommendationCardProps {
  recommendation: Recommendation;
  /** Dim while a new goal is being evaluated, instead of unmounting (no CLS). */
  stale: boolean;
}

export function RecommendationCard({ recommendation, stale }: RecommendationCardProps) {
  const dialStyle = {
    '--dial-length': DIAL_CIRCUMFERENCE,
    '--dial-offset': DIAL_CIRCUMFERENCE * (1 - recommendation.score / 100),
  } as CSSProperties;

  return (
    <div className={styles.result} data-stale={stale ? 'true' : 'false'}>
      <div className={styles.resultHead}>
        <div className={styles.resultHeadText}>
          <p className={styles.resultLabel}>{recommendation.label}</p>
          <p className={styles.resultTitle}>{recommendation.title}</p>
        </div>

        <div className={styles.match}>
          <svg className={styles.matchDial} viewBox="0 0 44 44" style={dialStyle} aria-hidden="true">
            <circle className={styles.matchTrack} cx="22" cy="22" r="19" />
            <circle className={styles.matchValue} cx="22" cy="22" r="19" />
          </svg>
          <span className={styles.matchNumber}>{formatPercent(recommendation.score)}</span>
          <span className={styles.matchCaption}>تطابق</span>
        </div>
      </div>

      <p className={styles.resultMeta}>
        {recommendation.level} · {recommendation.dailyTime} · {recommendation.budget}
      </p>

      <ul className={styles.reasons}>
        {recommendation.reasons.map((reason) => (
          <li key={reason} className={styles.reason}>
            {reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
