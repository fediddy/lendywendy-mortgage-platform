'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, Share2, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import {
  AssessmentResponses,
  ScoreBreakdown,
  calculateReadinessScore,
  getScoreColor,
  getScoreBgColor,
  getImprovementTips,
} from '@/lib/scoring/readiness';

interface Question {
  id: keyof AssessmentResponses;
  question: string;
  options: { value: string; label: string; description?: string }[];
}

const questions: Question[] = [
  {
    id: 'creditScore',
    question: "What's your current credit score range?",
    options: [
      { value: 'excellent', label: 'Excellent (740+)', description: 'Top-tier rates available' },
      { value: 'good', label: 'Good (670-739)', description: 'Most loan options available' },
      { value: 'fair', label: 'Fair (580-669)', description: 'FHA and some options available' },
      { value: 'poor', label: 'Below 580', description: 'Limited options, but possible' },
      { value: 'unsure', label: "I'm not sure", description: "That's okay - we can help" },
    ],
  },
  {
    id: 'employmentLength',
    question: 'How long have you been at your current job?',
    options: [
      { value: 'more_than_5', label: '5+ years', description: 'Strong employment history' },
      { value: '2_to_5', label: '2-5 years', description: 'Solid work history' },
      { value: '1_to_2', label: '1-2 years', description: 'Meeting minimum requirements' },
      { value: 'less_than_1', label: 'Less than 1 year', description: 'May need additional documentation' },
      { value: 'self_employed', label: 'Self-employed', description: '2+ years history preferred' },
    ],
  },
  {
    id: 'annualIncome',
    question: "What's your annual household income?",
    options: [
      { value: 'over_150k', label: 'Over $150,000' },
      { value: '100k_150k', label: '$100,000 - $150,000' },
      { value: '75k_100k', label: '$75,000 - $100,000' },
      { value: '50k_75k', label: '$50,000 - $75,000' },
      { value: 'under_50k', label: 'Under $50,000' },
    ],
  },
  {
    id: 'monthlyDebt',
    question: 'What are your total monthly debt payments? (car, student loans, credit cards, etc.)',
    options: [
      { value: 'under_500', label: 'Under $500', description: 'Low debt burden - great!' },
      { value: '500_1000', label: '$500 - $1,000' },
      { value: '1000_2000', label: '$1,000 - $2,000' },
      { value: '2000_3000', label: '$2,000 - $3,000' },
      { value: 'over_3000', label: 'Over $3,000', description: 'May affect qualification' },
    ],
  },
  {
    id: 'downPayment',
    question: 'How much do you have saved for a down payment?',
    options: [
      { value: '20_plus', label: '20% or more', description: 'No PMI required' },
      { value: '10_to_20', label: '10-20%', description: 'Good options available' },
      { value: '5_to_10', label: '5-10%', description: 'Conventional and FHA options' },
      { value: 'under_5', label: 'Less than 5%', description: 'FHA and special programs' },
    ],
  },
  {
    id: 'preApproved',
    question: 'Have you been pre-approved for a mortgage?',
    options: [
      { value: 'yes', label: 'Yes, I have pre-approval', description: 'You\'re ahead of the game!' },
      { value: 'started', label: 'Started the process', description: 'Good progress!' },
      { value: 'no', label: 'Not yet', description: 'Great next step' },
    ],
  },
  {
    id: 'creditEvents',
    question: 'Have you had any major credit events in the past 7 years?',
    options: [
      { value: 'none', label: 'None', description: 'Clean credit history' },
      { value: 'late_payments', label: 'Some late payments' },
      { value: 'bankruptcy', label: 'Bankruptcy', description: 'Wait periods may apply' },
      { value: 'foreclosure', label: 'Foreclosure', description: 'Wait periods may apply' },
    ],
  },
  {
    id: 'loanType',
    question: 'What type of loan are you considering?',
    options: [
      { value: 'conventional', label: 'Conventional', description: 'Standard mortgage' },
      { value: 'fha', label: 'FHA', description: 'Lower down payment option' },
      { value: 'va', label: 'VA', description: 'For veterans & service members' },
      { value: 'investment', label: 'Investment Property', description: 'For rental/investment' },
      { value: 'unsure', label: "I'm not sure", description: "We'll help you figure it out" },
    ],
  },
  {
    id: 'timeline',
    question: 'When are you looking to buy or refinance?',
    options: [
      { value: 'asap', label: 'As soon as possible', description: 'Ready to move quickly' },
      { value: '1_to_3_months', label: '1-3 months' },
      { value: '3_to_6_months', label: '3-6 months' },
      { value: 'researching', label: 'Just researching', description: 'No rush - still learning' },
    ],
  },
  {
    id: 'location',
    question: 'Where are you looking to buy? (City or ZIP code)',
    options: [], // This will be a text input
  },
];

// Animated counter hook — counts from 0 to target over duration
function useAnimatedCounter(target: number, duration = 1500): number {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (target <= 0) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    return () => { startTimeRef.current = null; };
  }, [target, duration]);

  return count;
}

// Score dimension bar
const dimensions = [
  { key: 'creditScore' as const, label: 'Credit', max: 25 },
  { key: 'employmentScore' as const, label: 'Employment', max: 15 },
  { key: 'incomeScore' as const, label: 'Income', max: 15 },
  { key: 'debtScore' as const, label: 'Debt Level', max: 15 },
  { key: 'downPaymentScore' as const, label: 'Down Payment', max: 15 },
  { key: 'preApprovalScore' as const, label: 'Pre-Approval', max: 10 },
];

const SHARE_URL = 'https://lendywendy.com/readiness-score?utm_source=share&utm_medium=social&utm_campaign=readiness';

function ScoreResults({
  score,
  responses,
}: {
  score: ScoreBreakdown;
  responses: AssessmentResponses;
}) {
  const animatedScore = useAnimatedCounter(score.totalScore);
  const tips = getImprovementTips(responses, score);
  const completedRef = useRef(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', tcpaConsent: false });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = contactForm.name.trim() && contactForm.email.trim() && contactForm.tcpaConsent && !isSubmitting;

  // Fire GA4 event once when results mount
  useEffect(() => {
    if (!completedRef.current) {
      completedRef.current = true;
      trackEvent({ event: 'assessment_completed', score: score.totalScore, category: score.category });
    }
  }, [score]);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    try {
      const sessionId = sessionStorage.getItem('lw-readiness-session') || `rs_${Date.now()}`;
      const response = await fetch('/api/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone || undefined,
          responses,
          score,
          sessionId,
          tcpaConsent: true,
          consentTimestamp: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        trackEvent({ event: 'assessment_lead_captured', score: score.totalScore });
      }
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareText = `I scored ${score.totalScore}/100 on the Mortgage Readiness Score! ${score.categoryLabel} Check yours:`;

  const handleSharePlatform = (platform: string) => {
    trackEvent({ event: 'assessment_shared', score: score.totalScore, platform });
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(SHARE_URL);

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  };

  const handleNativeShare = async () => {
    trackEvent({ event: 'assessment_shared', score: score.totalScore, platform: 'native' });
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Mortgage Readiness Score', text: shareText, url: SHARE_URL });
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${shareText} ${SHARE_URL}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Score Card */}
      <Card className="overflow-hidden animate-in fade-in duration-500">
        <div className={cn('p-8 text-center text-white', getScoreBgColor(score.totalScore))}>
          <p className="text-lg opacity-90 mb-2">Your Mortgage Readiness Score</p>
          <div className="text-7xl font-bold mb-2" aria-label={`Score: ${score.totalScore}`}>
            {animatedScore}
          </div>
          <p className="text-2xl font-semibold">{score.categoryLabel}</p>
        </div>
        <CardContent className="p-6">
          <p className="text-gray-600 text-center mb-6">{score.categoryDescription}</p>

          {/* Score Breakdown with Progress Bars */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Score Breakdown</h4>
            {dimensions.map((dim) => {
              const value = score[dim.key];
              const pct = Math.round((value / dim.max) * 100);
              return (
                <div key={dim.key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{dim.label}</span>
                    <span className="font-medium text-gray-900">{value}/{dim.max}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all duration-1000 ease-out', getScoreBgColor(score.totalScore))}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Improvement Tips */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold text-gray-900 mb-3">Tips to Improve</h4>
            <ul className="space-y-2">
              {tips.map((tip, index) => (
                <li key={index} className="flex gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Lead Capture Form */}
      {!submitted ? (
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Get Your Detailed Report</h4>
            <p className="text-sm text-gray-600 mb-4">
              Enter your info to receive a personalized report with specific recommendations and get matched with local lenders.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))}
                placeholder="Email address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <input
                type="tel"
                value={contactForm.phone}
                onChange={(e) => setContactForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="Phone number (optional — for priority matching)"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <label className="flex items-start gap-2 text-xs text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={contactForm.tcpaConsent}
                  onChange={(e) => setContactForm(f => ({ ...f, tcpaConsent: e.target.checked }))}
                  className="mt-0.5 rounded border-gray-300"
                />
                <span>
                  I consent to be contacted about mortgage options by phone, email, or text at the number/email provided. I understand this is not a condition of any purchase. Message and data rates may apply.
                </span>
              </label>
              <Button onClick={handleSubmit} disabled={!canSubmit} className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Sending...' : 'Get My Report'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-emerald-500/10 border-emerald-500/30">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900">Report Sent!</h4>
            <p className="text-sm text-gray-600">Check your email for your detailed mortgage readiness report.</p>
          </CardContent>
        </Card>
      )}

      {/* Share Buttons */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Share Your Score</h4>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => handleSharePlatform('twitter')}>
              𝕏 Twitter
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleSharePlatform('facebook')}>
              Facebook
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleSharePlatform('linkedin')}>
              LinkedIn
            </Button>
            <Button variant="outline" size="sm" onClick={handleNativeShare}>
              <Share2 className="h-4 w-4 mr-1" />
              More
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Button asChild className="w-full" size="lg">
        <a href="/get-quote">Get Matched with Lenders</a>
      </Button>
    </div>
  );
}

interface ReadinessAssessmentProps {
  onComplete?: (score: ScoreBreakdown, responses: AssessmentResponses) => void;
}

export function ReadinessAssessment({ onComplete }: ReadinessAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Partial<AssessmentResponses>>({});
  const [score, setScore] = useState<ScoreBreakdown | null>(null);
  const [locationInput, setLocationInput] = useState('');
  const assessmentStartedRef = useRef(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isLastQuestion = currentStep === questions.length - 1;
  const isLocationQuestion = currentQuestion?.id === 'location';

  const handleSelect = (value: string) => {
    const newResponses = { ...responses, [currentQuestion.id]: value };
    setResponses(newResponses);

    // Fire GA4 event on first answer only
    if (!assessmentStartedRef.current) {
      assessmentStartedRef.current = true;
      trackEvent({ event: 'assessment_started' });
    }

    if (isLastQuestion) {
      // Calculate score
      const finalScore = calculateReadinessScore(newResponses as AssessmentResponses);
      setScore(finalScore);
      onComplete?.(finalScore, newResponses as AssessmentResponses);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleLocationSubmit = () => {
    if (locationInput.trim()) {
      handleSelect(locationInput.trim());
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Show results
  if (score) {
    return (
      <ScoreResults
        score={score}
        responses={responses as AssessmentResponses}
      />
    );
  }

  // Show questions
  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card — key triggers re-mount animation on step change */}
      <Card key={currentStep} className="animate-in fade-in slide-in-from-right-2 duration-300">
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLocationQuestion ? (
            <div className="space-y-4">
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="e.g., Los Angeles, CA or 90210"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-lg"
                onKeyDown={(e) => e.key === 'Enter' && handleLocationSubmit()}
              />
              <Button
                onClick={handleLocationSubmit}
                disabled={!locationInput.trim()}
                className="w-full"
                size="lg"
              >
                See My Score
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    'w-full p-4 rounded-lg border-2 text-left transition-all hover:border-teal-600 hover:bg-teal-50',
                    responses[currentQuestion.id] === option.value
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200'
                  )}
                >
                  <div className="font-medium text-gray-900">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          {currentStep > 0 && (
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mt-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ReadinessAssessment;
