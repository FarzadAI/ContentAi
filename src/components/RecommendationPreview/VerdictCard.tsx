import type { CSSProperties } from 'react';
import type { Verdict } from '../../data/recommendations';
import { formatScore } from '../../lib/persian';
import styles from './RecommendationPreview.module.css';

interface VerdictCardProps {
  verdict: Verdict;
  /** Bars only fill once the card is actually on screen. */
  active: boolean;
}

export function VerdictCard({ verdict, active }: VerdictCardProps) {
  const scoreRows = [
    { key: 'execution', label: 'اجرایی بودن', value: verdict.execution },
    { key: 'beginnerFit', label: 'مناسب مبتدی', value: verdict.beginnerFit },
  ];

  const plainRows = [
    { key: 'noise', label: 'حاشیه', value: verdict.noise },
    { key: 'value', label: 'ارزش نسبت به قیمت', value: verdict.value },
  ];

  return (
    <article className={styles.verdictCard}>
      <h3 className={styles.verdictTitle}>حکم طبقه منفی یک</h3>

      <dl className={styles.scores}>
        {scoreRows.map((row) => (
          <div key={row.key} className={styles.scoreRow}>
            <dt className={styles.scoreLabel}>{row.label}</dt>
            <dd className={styles.scoreValue}>
              {formatScore(row.value)}
              <small>/۱۰</small>
            </dd>
            <span
              className={styles.scoreBar}
              style={{ '--value': `${row.value * 10}%` } as CSSProperties}
              data-active={active ? 'true' : 'false'}
            >
              <i />
            </span>
          </div>
        ))}

        {plainRows.map((row) => (
          <div key={row.key} className={`${styles.scoreRow} ${styles.scoreRowPlain}`}>
            <dt className={styles.scoreLabel}>{row.label}</dt>
            <dd className={styles.scoreValue}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
