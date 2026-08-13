import { Reveal } from '../Reveal/Reveal';
import styles from './Hero.module.css';

/**
 * Headline + subheadline. The two headline lines are separate elements so the
 * Persian line breaks are authored, never left to the browser, and so line two
 * can arrive a beat after line one.
 */
export function HeroContent() {
  return (
    <>
      <h1 className={styles.title} id="hero-heading">
        <Reveal at="headline" as="span" className={styles.titleQuiet}>
          کمتر دوره بخر.
        </Reveal>
        <Reveal at="headline" as="span" className={styles.titleLoud}>
          <em className={styles.titleAccent}>بهتر</em> انتخاب کن.
        </Reveal>
      </h1>

      <Reveal at="subheadline" as="p" className={styles.subtitle}>
        طبقه منفی یک دوره‌ها، مدرس‌ها و مسیرهای آموزشی رو بررسی و فیلتر می‌کنه تا بفهمی چی واقعاً با
        هدف، وقت و بودجه‌ات جور درمیاد.
      </Reveal>
    </>
  );
}
