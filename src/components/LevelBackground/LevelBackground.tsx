import { useEffect, useRef } from 'react';
import { useHasReached, useIntro } from '../../intro/IntroContext';
import styles from './LevelBackground.module.css';

const LEVELS = [
  { id: 'level-0', label: '۰' },
  { id: 'level-minus-1', label: '−۱' },
  { id: 'level-minus-2', label: '−۲' },
] as const;

/**
 * The «طبقه منفی یک» idea as an environment rather than an illustration.
 *
 * Built entirely from gradients and transforms — no bitmap, no 3D asset, no
 * literal basement. A receding floor plane and two side walls give the depth
 * the brand name implies; light rails run along the floor; only the −۱ level
 * carries crimson. A reader should feel the depth first and notice the level
 * markers second.
 *
 * Decorative, so it is hidden from assistive tech.
 */
export function LevelBackground() {
  const { reducedMotion } = useIntro();
  const lit = useHasReached('background');
  const accented = useHasReached('level');
  const fieldRef = useRef<HTMLDivElement>(null);

  /* Parallax: the environment answers the pointer and the scroll, the content
     does not move. Written straight to CSS custom properties inside rAF so it
     never triggers React renders or layout. */
  useEffect(() => {
    const field = fieldRef.current;
    if (!field || reducedMotion) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scroll = 0;

    const apply = () => {
      frame = 0;
      field.style.setProperty('--parallax-x', pointerX.toFixed(3));
      field.style.setProperty('--parallax-y', pointerY.toFixed(3));
      field.style.setProperty('--parallax-scroll', scroll.toFixed(3));
    };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(apply);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = (event.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };

    const onScroll = () => {
      scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.5);
      schedule();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <div
      className={styles.field}
      ref={fieldRef}
      data-lit={lit ? 'true' : 'false'}
      data-accented={accented ? 'true' : 'false'}
      aria-hidden="true"
    >
      <div className={styles.room}>
        <div className={styles.wall} data-side="start" />
        <div className={styles.wall} data-side="end" />
        <div className={styles.floor} />
        <div className={styles.ceiling} />
        <div className={styles.rail} data-rail="1" />
        <div className={styles.rail} data-rail="2" />
      </div>

      <div className={styles.planes}>
        {LEVELS.map((level, index) => (
          <div key={level.id} className={styles.plane} data-index={index}>
            <span className={styles.line} />
            <span className={styles.label}>{level.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.glow} />
      <div className={styles.vignette} />
      <div className={styles.grain} />
    </div>
  );
}
