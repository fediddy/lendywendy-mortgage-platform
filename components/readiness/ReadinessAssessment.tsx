'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, Share2, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
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

interface ReadinessAssessmentProps {
  onComplete?: (score: ScoreBreakdown, responses: AssessmentResponses) => void;
}

export function ReadinessAssessment({ onComplete }: ReadinessAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Partial<AssessmentResponses>>({});
  const [score, setScore] = useState<ScoreBreakdown | null>(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [locationInput, setLocationInput] = useState('');

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isLastQuestion = currentStep === questions.length - 1;
  const isLocationQuestion = currentQuestion?.id === 'location';

  const handleSelect = (value: string) => {
    const newResponses = { ...responses, [currentQuestion.id]: value };
    setResponses(newResponses);

    if (isLastQuestion) {
      // Calculate score
      const finalScore = calculateReadinessScore(newResponses as AssessmentResponses);
      setScore(finalScore);
      onComplete?.(finalScore, newResponses as AssessmentResponses);
    } else {
      // Move to next question
      setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
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

  const handleEmailSubmit = async () => {
    if (!email || !score) return;

    try {
      await fetch('/api/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          responses,
          score,
          sessionId: sessionStorage.getItem('lw-readiness-session') || `rs_${Date.now()}`,
        }),
      });
      setEmailSubmitted(true);
    } catch (error) {
      console.error('Failed to submit email:', error);
    }
  };

  const handleShare = async () => {
    if (!score) return;

    const shareText = `I scored ${score.totalScore}/100 on the Mortgage Readiness Score! ${score.categoryLabel} Check your score at LendyWendy.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Mortgage Readiness Score',
          text: shareText,
          url: 'https://lendywendy.com/readiness-score',
        });
      } catch (error) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Score copied to clipboard!');
    }
  };

  // Show results
  if (score) {
    const tips = getImprovementTips(responses as AssessmentResponses, score);

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Score Card */}
        <Card className="overflow-hidden">
          <div className={cn('p-8 text-center text-white', getScoreBgColor(score.totalScore))}>
            <p className="text-lg opacity-90 mb-2">Your Mortgage Readiness Score</p>
            <div className="text-7xl font-bold mb-2">{score.totalScore}</div>
            <p className="text-2xl font-semibold">{score.categoryLabel}</p>
          </div>
          <CardContent className="p-6">
            <p className="text-gray-600 text-center mb-6">{score.categoryDescription}</p>

            {/* Score Breakdown */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Score Breakdown</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span>Credit</span>
                  <span className="font-medium">{score.creditScore}/25</span>
                </div>
                <div className="flex justify-between">
                  <span>Employment</span>
                  <span className="font-medium">{score.employmentScore}/15</span>
                </div>
                <div className="flex justify-between">
                  <span>Income</span>
                  <span className="font-medium">{score.incomeScore}/15</span>
                </div>
                <div className="flex justify-between">
                  <span>Debt Level</span>
                  <span className="font-medium">{score.debtScore}/15</span>
                </div>
                <div className="flex justify-between">
                  <span>Down Payment</span>
                  <span className="font-medium">{score.downPaymentScore}/15</span>
                </div>
                <div className="flex justify-between">
                  <span>Pre-Approval</span>
                  <span className="font-medium">{score.preApprovalScore}/10</span>
                </div>
              </div>
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

        {/* Email Capture */}
        {!emailSubmitted ? (
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Get Your Detailed Report</h4>
              <p className="text-sm text-gray-600 mb-4">
                Enter your email to receive a personalized report with specific recommendations and get matched with a local mortgage expert.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={handleEmailSubmit} disabled={!email}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Report Sent!</h4>
              <p className="text-sm text-gray-600">Check your email for your detailed mortgage readiness report.</p>
            </CardContent>
          </Card>
        )}

        {/* Share & CTA */}
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleShare} className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Share Score
          </Button>
          <Button asChild className="flex-1">
            <a href="/get-quote">Get Matched with Expert</a>
          </Button>
        </div>
      </div>
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

      {/* Question Card */}
      <Card>
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
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
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
                    'w-full p-4 rounded-lg border-2 text-left transition-all hover:border-blue-500 hover:bg-blue-50',
                    responses[currentQuestion.id] === option.value
                      ? 'border-blue-500 bg-blue-50'
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
