import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { COURSES } from '../data/catalog';
import CoursesPage from './CoursesPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <CoursesPage />
    </MemoryRouter>,
  );
}

describe('CoursesPage', () => {
  it('lists every course by default', () => {
    renderPage();

    for (const course of COURSES) {
      expect(screen.getByRole('heading', { name: course.title })).toBeInTheDocument();
    }
  });

  it('filters the catalogue by topic', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'فریلنسری' }));

    const freelance = COURSES.filter((course) => course.topic === 'فریلنسری');
    const others = COURSES.filter((course) => course.topic !== 'فریلنسری');

    for (const course of freelance) {
      expect(screen.getByRole('heading', { name: course.title })).toBeInTheDocument();
    }
    for (const course of others) {
      expect(screen.queryByRole('heading', { name: course.title })).not.toBeInTheDocument();
    }

    expect(screen.getByRole('button', { name: 'فریلنسری' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('returns to the full list', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'ساخت سایت' }));
    await user.click(screen.getByRole('button', { name: 'همه' }));

    for (const course of COURSES) {
      expect(screen.getByRole('heading', { name: course.title })).toBeInTheDocument();
    }
  });
});
