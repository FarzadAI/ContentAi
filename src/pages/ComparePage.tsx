import { useState } from 'react';
import { COURSES, PRICE_TIER_LABEL, getCourseById } from '../data/catalog';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { formatScore } from '../lib/persian';
import page from './pages.module.css';
import styles from './ComparePage.module.css';

type Side = 'a' | 'b';

interface Row {
  label: string;
  render: (id: string) => string;
  /** Higher-is-better numeric rows get the winner marked. */
  compare?: (id: string) => number;
}

const ROWS: Row[] = [
  { label: 'موضوع', render: (id) => getCourseById(id)?.topic ?? '—' },
  { label: 'سطح', render: (id) => getCourseById(id)?.level ?? '—' },
  { label: 'مدت', render: (id) => getCourseById(id)?.duration ?? '—' },
  {
    label: 'بودجه',
    render: (id) => {
      const course = getCourseById(id);
      return course ? PRICE_TIER_LABEL[course.priceTier] : '—';
    },
  },
  {
    label: 'اجرایی بودن',
    render: (id) => `${formatScore(getCourseById(id)?.execution ?? 0)}/۱۰`,
    compare: (id) => getCourseById(id)?.execution ?? 0,
  },
  {
    label: 'مناسب مبتدی',
    render: (id) => `${formatScore(getCourseById(id)?.beginnerFit ?? 0)}/۱۰`,
    compare: (id) => getCourseById(id)?.beginnerFit ?? 0,
  },
  { label: 'حاشیه', render: (id) => getCourseById(id)?.noise ?? '—' },
  { label: 'ارزش نسبت به قیمت', render: (id) => getCourseById(id)?.valueForMoney ?? '—' },
  { label: 'مناسب نیست اگر', render: (id) => getCourseById(id)?.notFor ?? '—' },
];

export default function ComparePage() {
  const [ids, setIds] = useState<Record<Side, string>>({
    a: 'llm-for-non-devs',
    b: 'ai-workflow-automation',
  });

  const setSide = (side: Side, id: string) => setIds((current) => ({ ...current, [side]: id }));

  const courseA = getCourseById(ids.a);
  const courseB = getCourseById(ids.b);
  const same = ids.a === ids.b;

  return (
    <div className={page.page}>
      <PageHeader
        eyebrow="مقایسه"
        title="دو تا را کنار هم بگذار"
        lead="مقایسه واقعی یعنی همان چیزهایی که روی تصمیم اثر می‌گذارند، نه فهرست سرفصل‌ها."
      />

      <div className={styles.pickers}>
        {(['a', 'b'] as Side[]).map((side) => (
          <p key={side} className={styles.picker}>
            <label className={styles.pickerLabel} htmlFor={`course-${side}`}>
              {side === 'a' ? 'گزینه اول' : 'گزینه دوم'}
            </label>
            <select
              className={styles.select}
              id={`course-${side}`}
              value={ids[side]}
              onChange={(event) => setSide(side, event.target.value)}
            >
              {COURSES.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </p>
        ))}
      </div>

      {same && <p className={styles.warning}>هر دو گزینه یکی است؛ یکی را عوض کن.</p>}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <caption className="visually-hidden">مقایسه دو دوره</caption>
          <thead>
            <tr>
              <th scope="col">ویژگی</th>
              <th scope="col">{courseA?.title ?? '—'}</th>
              <th scope="col">{courseB?.title ?? '—'}</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => {
              const valueA = row.compare?.(ids.a);
              const valueB = row.compare?.(ids.b);
              const winsA = valueA !== undefined && valueB !== undefined && !same && valueA > valueB;
              const winsB = valueA !== undefined && valueB !== undefined && !same && valueB > valueA;

              return (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td data-wins={winsA ? 'true' : undefined}>{row.render(ids.a)}</td>
                  <td data-wins={winsB ? 'true' : undefined}>{row.render(ids.b)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
