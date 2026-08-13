import { Reveal } from '../Reveal/Reveal';
import styles from './Hero.module.css';

interface HeroActionsProps {
  /** Wired to the recommendation surface today; a wizard route/modal later. */
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

export function HeroActions({ onPrimaryAction, onSecondaryAction }: HeroActionsProps) {
  return (
    <Reveal at="actions" className={styles.actionsBlock}>
      <div className={styles.actions}>
        <button className={styles.primary} type="button" onClick={onPrimaryAction}>
          برام انتخاب کن
        </button>
        <button className={styles.secondary} type="button" onClick={onSecondaryAction}>
          خودم می‌گردم
        </button>
      </div>

      <a className={styles.microLink} href="#recommendation-preview">
        یه دوره تو ذهنته؟ بررسیش کن
        <span className={styles.microArrow} aria-hidden="true">
          ←
        </span>
      </a>
    </Reveal>
  );
}
