import type { Goal, GoalId } from '../../data/recommendations';
import styles from './RecommendationPreview.module.css';

interface GoalChipsProps {
  goals: Goal[];
  selectedId: GoalId | null;
  onSelect: (goalId: GoalId) => void;
}

export function GoalChips({ goals, selectedId, onSelect }: GoalChipsProps) {
  return (
    <div className={styles.chips} id="goal-chips" role="group" aria-label="هدفت رو انتخاب کن">
      {goals.map((goal) => (
        <button
          key={goal.id}
          className={styles.chip}
          type="button"
          aria-pressed={selectedId === goal.id}
          onClick={() => onSelect(goal.id)}
        >
          {goal.label}
        </button>
      ))}
    </div>
  );
}
