import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntroProvider } from '../../intro/IntroProvider';
import { getRecommendationForGoal } from '../../data/recommendations';
import { RecommendationPreview } from './RecommendationPreview';

function renderPreview() {
  return render(
    <IntroProvider>
      <RecommendationPreview />
    </IntroProvider>,
  );
}

describe('RecommendationPreview', () => {
  it('renders the goal question and every goal chip', async () => {
    renderPreview();

    expect(screen.getByRole('heading', { name: 'چی به درد من می‌خوره؟' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'هدفت رو انتخاب کن' })).toBeInTheDocument();

    for (const label of [
      'درآمد بیشتر',
      'هوش مصنوعی',
      'شروع فریلنسری',
      'ساخت سایت',
      'تولید محتوا',
    ]) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }
  });

  it('selects «هوش مصنوعی» on load and reveals the ۸۹٪ recommendation', async () => {
    renderPreview();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'هوش مصنوعی' })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
    });

    const ai = getRecommendationForGoal('ai');
    expect(await screen.findByText(ai.title)).toBeInTheDocument();
    expect(screen.getByText('۸۹٪')).toBeInTheDocument();
    expect(screen.getByText('پیشنهاد برای تو')).toBeInTheDocument();
    expect(screen.getByText('مبتدی · روزی ۱ ساعت · بودجه متوسط')).toBeInTheDocument();

    for (const reason of ai.reasons) {
      expect(screen.getByText(reason)).toBeInTheDocument();
    }
  });

  it('updates the recommendation, verdict and advice when another goal is chosen', async () => {
    const user = userEvent.setup();
    renderPreview();

    const ai = getRecommendationForGoal('ai');
    await screen.findByText(ai.title);

    await user.click(screen.getByRole('button', { name: 'شروع فریلنسری' }));

    const freelance = getRecommendationForGoal('freelance');
    expect(await screen.findByText(freelance.title)).toBeInTheDocument();
    expect(screen.queryByText(ai.title)).not.toBeInTheDocument();

    // verdict + advice follow the selection
    expect(screen.getByText('۸.۶')).toBeInTheDocument();
    expect(screen.getByText(freelance.advice.text)).toBeInTheDocument();
    expect(screen.getByText(freelance.advice.why)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'شروع فریلنسری' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'هوش مصنوعی' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('keeps the verdict card labels stable across selections', async () => {
    renderPreview();

    expect(await screen.findByRole('heading', { name: 'حکم طبقه منفی یک' })).toBeInTheDocument();
    expect(screen.getByText('اجرایی بودن')).toBeInTheDocument();
    expect(screen.getByText('مناسب مبتدی')).toBeInTheDocument();
    expect(screen.getByText('حاشیه')).toBeInTheDocument();
    expect(screen.getByText('ارزش نسبت به قیمت')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'من جات بودم...' })).toBeInTheDocument();
  });
});
