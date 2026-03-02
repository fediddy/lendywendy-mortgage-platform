import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ReadinessAssessment } from './ReadinessAssessment';

// Mock analytics
vi.mock('@/lib/analytics', () => ({
  trackEvent: vi.fn(),
}));

// Mock fetch for API calls
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock sessionStorage
const mockSessionStorage = { getItem: vi.fn(() => 'test-session-id'), setItem: vi.fn() };
Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

import { trackEvent } from '@/lib/analytics';

/** Helper: answer all 10 questions to reach score screen */
async function completeAssessment(container: HTMLElement) {
  const answers = [
    'Excellent (740+)', '5+ years', 'Over $150,000', 'Under $500',
    '20% or more', 'Yes, I have pre-approval', 'None', 'Conventional',
    'As soon as possible',
  ];
  for (const answer of answers) {
    const btns = screen.getAllByText(answer);
    await act(async () => { fireEvent.click(btns[0]); });
  }
  // Location text input (last question)
  const locationInput = container.querySelector('input[type="text"]');
  await act(async () => {
    fireEvent.change(locationInput!, { target: { value: 'Los Angeles, CA' } });
  });
  const seeScoreBtn = screen.getAllByText(/See My Score/i);
  await act(async () => { fireEvent.click(seeScoreBtn[0]); });
}

describe('ReadinessAssessment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
  });

  it('renders the first question on mount', () => {
    const { container } = render(<ReadinessAssessment />);
    expect(container.textContent).toContain('credit score range');
    expect(container.textContent).toContain('Question');
    expect(container.textContent).toContain('% Complete');
  });

  it('fires assessment_started GA4 event on first answer only', async () => {
    render(<ReadinessAssessment />);

    // Click first answer (wrapped in act for React 19 batching)
    const buttons = screen.getAllByText('Excellent (740+)');
    await act(async () => {
      fireEvent.click(buttons[0]);
    });
    expect(trackEvent).toHaveBeenCalledWith({ event: 'assessment_started' });
    expect(trackEvent).toHaveBeenCalledTimes(1);

    // Now on question 2 — click an answer
    const fiveYearButtons = screen.getAllByText('5+ years');
    await act(async () => {
      fireEvent.click(fiveYearButtons[0]);
    });

    // Should NOT fire assessment_started again
    expect(trackEvent).toHaveBeenCalledTimes(1);
  });

  it('advances to next question after selection', async () => {
    const { container } = render(<ReadinessAssessment />);
    expect(container.textContent).toContain('credit score range');

    // Click an answer
    const buttons = screen.getAllByText('Excellent (740+)');
    await act(async () => {
      fireEvent.click(buttons[0]);
    });

    // Now on question 2
    expect(container.textContent).toContain('current job');
  });

  it('navigates back when back button is clicked', async () => {
    const { container } = render(<ReadinessAssessment />);

    // Answer first question
    const buttons = screen.getAllByText('Excellent (740+)');
    await act(async () => {
      fireEvent.click(buttons[0]);
    });
    expect(container.textContent).toContain('current job');

    // Click back
    const backButtons = screen.getAllByText('Back');
    await act(async () => {
      fireEvent.click(backButtons[0]);
    });

    // Back to question 1
    expect(container.textContent).toContain('credit score range');
  });

  it('shows progress info', () => {
    const { container } = render(<ReadinessAssessment />);
    expect(container.textContent).toContain('% Complete');
    expect(container.textContent).toContain('Question');
  });

  it('fires assessment_completed GA4 event when score is shown', async () => {
    const { container } = render(<ReadinessAssessment />);
    await completeAssessment(container);

    // Should show score and fire GA4
    expect(container.textContent).toContain('Mortgage Readiness Score');
    expect(trackEvent).toHaveBeenCalledWith({ event: 'assessment_started' });
    expect(trackEvent).toHaveBeenCalledWith(
      expect.objectContaining({ event: 'assessment_completed', category: 'MORTGAGE_READY' })
    );
  });

  it('shows dimensional breakdown with all 6 dimensions', async () => {
    const { container } = render(<ReadinessAssessment />);
    await completeAssessment(container);

    // Should show all 6 dimension labels
    expect(container.textContent).toContain('Credit');
    expect(container.textContent).toContain('Employment');
    expect(container.textContent).toContain('Income');
    expect(container.textContent).toContain('Debt Level');
    expect(container.textContent).toContain('Down Payment');
    expect(container.textContent).toContain('Pre-Approval');
    expect(container.textContent).toContain('Score Breakdown');
  });

  it('requires name, email, and TCPA consent before submit is enabled', async () => {
    const { container } = render(<ReadinessAssessment />);
    await completeAssessment(container);

    // Contact form should be visible
    expect(container.textContent).toContain('Get Your Detailed Report');

    // Submit button should be disabled initially
    const submitBtn = screen.getAllByText(/Get My Report/i)[0] as HTMLButtonElement;
    expect(submitBtn.closest('button')?.disabled).toBe(true);

    // Fill name only — still disabled
    const nameInput = container.querySelector('input[type="text"]') as HTMLInputElement;
    await act(async () => { fireEvent.change(nameInput, { target: { value: 'John Doe' } }); });
    expect(submitBtn.closest('button')?.disabled).toBe(true);

    // Fill email — still disabled (no TCPA)
    const emailInput = container.querySelector('input[type="email"]') as HTMLInputElement;
    await act(async () => { fireEvent.change(emailInput, { target: { value: 'john@test.com' } }); });
    expect(submitBtn.closest('button')?.disabled).toBe(true);

    // Check TCPA — now enabled
    const tcpaCheckbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    await act(async () => { fireEvent.click(tcpaCheckbox); });
    expect(submitBtn.closest('button')?.disabled).toBe(false);
  });

  it('fires assessment_lead_captured GA4 event on successful form submission', async () => {
    const { container } = render(<ReadinessAssessment />);
    await completeAssessment(container);

    // Fill out the contact form
    const nameInput = container.querySelector('input[type="text"]') as HTMLInputElement;
    const emailInput = container.querySelector('input[type="email"]') as HTMLInputElement;
    const tcpaCheckbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;

    await act(async () => { fireEvent.change(nameInput, { target: { value: 'Jane Doe' } }); });
    await act(async () => { fireEvent.change(emailInput, { target: { value: 'jane@test.com' } }); });
    await act(async () => { fireEvent.click(tcpaCheckbox); });

    // Submit the form
    const submitBtn = screen.getAllByText(/Get My Report/i)[0];
    await act(async () => { fireEvent.click(submitBtn); });

    // Should fire assessment_lead_captured GA4 event
    expect(trackEvent).toHaveBeenCalledWith(
      expect.objectContaining({ event: 'assessment_lead_captured' })
    );

    // Should show success state
    expect(container.textContent).toContain('Report Sent');
  });

  it('shows platform-specific share buttons on results screen', async () => {
    const { container } = render(<ReadinessAssessment />);
    await completeAssessment(container);

    expect(container.textContent).toContain('Share Your Score');
    expect(container.textContent).toContain('Twitter');
    expect(container.textContent).toContain('Facebook');
    expect(container.textContent).toContain('LinkedIn');
    expect(container.textContent).toContain('More');
  });

  it('fires assessment_shared GA4 event when share button is clicked', async () => {
    // Mock window.open for platform share links
    const mockOpen = vi.fn();
    window.open = mockOpen;

    const { container } = render(<ReadinessAssessment />);
    await completeAssessment(container);

    // Click the Twitter share button
    const twitterBtn = screen.getAllByText(/Twitter/i)[0];
    await act(async () => { fireEvent.click(twitterBtn); });

    expect(trackEvent).toHaveBeenCalledWith(
      expect.objectContaining({ event: 'assessment_shared', platform: 'twitter' })
    );
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('twitter.com/intent/tweet'),
      '_blank',
      expect.any(String)
    );
  });
});
