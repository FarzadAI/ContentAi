import { createElement, type ReactNode } from 'react';
import { useHasReached } from '../../intro/IntroContext';
import type { IntroStage } from '../../intro/stages';
import styles from './Reveal.module.css';

type RevealElement = 'div' | 'p' | 'ul' | 'section' | 'header' | 'article' | 'span' | 'nav';

interface RevealProps {
  /** Timeline stage that brings this element in. */
  at: IntroStage;
  as?: RevealElement;
  variant?: 'rise' | 'float' | 'fade';
  className?: string;
  children: ReactNode;
}

/**
 * Reveals its children when the intro timeline reaches `at`.
 *
 * The element stays in flow at all times and only animates opacity/transform,
 * so the choreography costs no layout work and contributes nothing to CLS.
 */
export function Reveal({ at, as = 'div', variant = 'rise', className, children }: RevealProps) {
  const revealed = useHasReached(at);

  return createElement(
    as,
    {
      className: [styles.reveal, styles[variant], revealed ? styles.in : '', className]
        .filter(Boolean)
        .join(' '),
      'data-revealed': revealed ? 'true' : 'false',
    },
    children,
  );
}
