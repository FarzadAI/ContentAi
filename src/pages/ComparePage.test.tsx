import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { getCourseById } from '../data/catalog';
import ComparePage from './ComparePage';

function renderPage() {
  return render(
    <MemoryRouter>
      <ComparePage />
    </MemoryRouter>,
  );
}

describe('ComparePage', () => {
  it('compares two different courses out of the box', () => {
    renderPage();

    const table = screen.getByRole('table');
    expect(
      within(table).getByRole('columnheader', {
        name: getCourseById('llm-for-non-devs')!.title,
      }),
    ).toBeInTheDocument();
    expect(
      within(table).getByRole('columnheader', {
        name: getCourseById('ai-workflow-automation')!.title,
      }),
    ).toBeInTheDocument();
  });

  it('swaps a side and updates the table', async () => {
    const user = userEvent.setup();
    renderPage();

    const target = getCourseById('freelance-first-project')!;
    await user.selectOptions(screen.getByLabelText('گزینه دوم'), target.id);

    expect(screen.getByRole('columnheader', { name: target.title })).toBeInTheDocument();
    // ۹.۳ is that course's beginner-fit score
    expect(screen.getByText('۹.۳/۱۰')).toBeInTheDocument();
  });

  it('warns when both sides are the same course', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.selectOptions(screen.getByLabelText('گزینه دوم'), 'llm-for-non-devs');

    expect(screen.getByText('هر دو گزینه یکی است؛ یکی را عوض کن.')).toBeInTheDocument();
  });
});
