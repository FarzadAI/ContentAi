import { useHasReached } from '../../intro/IntroContext';
import styles from './LevelBackground.module.css';

const LEVELS = [
  { id: 'level-0', label: '۰' },
  { id: 'level-minus-1', label: '−۱' },
  { id: 'level-minus-2', label: '−۲' },
] as const;

/**
 * The brand's «طبقه منفی یک» idea, abstracted: three faint depth planes with
 * level markers, where −۱ is the one carrying light. No basements, no
 * parking-garage literalism — a reader should notice the −۱ only on second look.
 *
 * Purely decorative, so it is hidden from assistive tech; nothing here carries
 * information that is not also in the text.
 */
export function LevelBackground() {
  const lit = useHasReached('background');
  const accented = useHasReached('level');

  return (
    <div
      className={styles.field}
      data-lit={lit ? 'true' : 'false'}
      data-accented={accented ? 'true' : 'false'}
      aria-hidden="true"
    >
      {LEVELS.map((level, index) => (
        <div key={level.id} className={styles.plane} data-index={index}>
          <span className={styles.line} />
          <span className={styles.label}>{level.label}</span>
        </div>
      ))}
      <div className={styles.glow} />
      <div className={styles.grain} />
    </div>
  );
}
