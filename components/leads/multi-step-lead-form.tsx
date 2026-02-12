"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Segment, LoanType, PropertyType, CreditRange, Timeline, EmploymentStatus } from "@prisma/client";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// Form validation schema
const leadFormSchema = z.object({
  // Step 1: Loan Type
  segment: z.nativeEnum(Segment),
  loanType: z.nativeEnum(LoanType),

  // Step 2: Property Details
  propertyType: z.nativeEnum(PropertyType).optional(),
  propertyValue: z.number().positive().optional(),
  purchasePrice: z.number().positive().optional(),
  propertyLocation: z.string().min(2).optional(),

  // Step 3: Contact Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),

  // Step 4: Qualification
  creditRange: z.nativeEnum(CreditRange).optional(),
  downPayment: z.number().positive().optional(),
  downPaymentPercent: z.number().min(0).max(100).optional(),
  timeline: z.nativeEnum(Timeline).optional(),
  currentlyOwn: z.boolean().optional(),
  employmentStatus: z.nativeEnum(EmploymentStatus).optional(),
  annualIncome: z.number().positive().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

interface MultiStepLeadFormProps {
  defaultSegment?: Segment;
  onSuccess?: () => void;
  className?: string;
}

export function MultiStepLeadForm({ defaultSegment, onSuccess, className }: MultiStepLeadFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      segment: defaultSegment || Segment.RESIDENTIAL,
    },
  });

  const segment = watch("segment");
  const loanType = watch("loanType");

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(step);
    const isValid = await trigger(fieldsToValidate);

    if (isValid && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      // Redirect to confirmation page
      window.location.href = "/lead-submitted";
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
      console.error("Lead submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Get Your Free Mortgage Quote</CardTitle>
        <CardDescription>
          Connect with top lenders in minutes. No commitment required.
        </CardDescription>
        <Progress value={progress} className="mt-4" />
        <p className="text-sm text-muted-foreground mt-2">
          Step {step} of {totalSteps}
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Loan Type */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">What type of mortgage do you need?</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${segment === Segment.RESIDENTIAL ? 'border-blue-500 bg-blue-500/10' : 'hover:border-slate-500'}`}>
                    <input
                      type="radio"
                      value={Segment.RESIDENTIAL}
                      {...register("segment")}
                      className="sr-only"
                    />
                    <span className="text-center">
                      <div className="font-semibold">Residential</div>
                      <div className="text-xs text-muted-foreground">Home Purchase or Refinance</div>
                    </span>
                  </label>

                  <label className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${segment === Segment.INVESTMENT ? 'border-blue-500 bg-blue-500/10' : 'hover:border-slate-500'}`}>
                    <input
                      type="radio"
                      value={Segment.INVESTMENT}
                      {...register("segment")}
                      className="sr-only"
                    />
                    <span className="text-center">
                      <div className="font-semibold">Investment</div>
                      <div className="text-xs text-muted-foreground">Rental or Investment Property</div>
                    </span>
                  </label>

                  <label className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${segment === Segment.COMMERCIAL ? 'border-blue-500 bg-blue-500/10' : 'hover:border-slate-500'}`}>
                    <input
                      type="radio"
                      value={Segment.COMMERCIAL}
                      {...register("segment")}
                      className="sr-only"
                    />
                    <span className="text-center">
                      <div className="font-semibold">Commercial</div>
                      <div className="text-xs text-muted-foreground">Business or Commercial Property</div>
                    </span>
                  </label>
                </div>
                {errors.segment && <p className="text-sm text-red-600 mt-1">{errors.segment.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Specific loan type</label>
                <select
                  {...register("loanType")}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select loan type...</option>
                  {getLoanTypesForSegment(segment).map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.loanType && <p className="text-sm text-red-600 mt-1">{errors.loanType.message}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Property Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Property type</label>
                <select
                  {...register("propertyType")}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select property type...</option>
                  {getPropertyTypesForSegment(segment).map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {loanType === LoanType.PURCHASE ? "Purchase price" : "Estimated property value"}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <input
                    type="number"
                    {...register("propertyValue", { valueAsNumber: true })}
                    className="w-full pl-7 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="300000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Property location</label>
                <input
                  type="text"
                  {...register("propertyLocation")}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="City, State or ZIP"
                />
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full name *</label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email address *</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone number (optional)</label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          )}

          {/* Step 4: Qualification */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Credit score range</label>
                <select
                  {...register("creditRange")}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select credit range...</option>
                  <option value={CreditRange.EXCELLENT_740_PLUS}>Excellent (740+)</option>
                  <option value={CreditRange.GOOD_670_739}>Good (670-739)</option>
                  <option value={CreditRange.FAIR_580_669}>Fair (580-669)</option>
                  <option value={CreditRange.POOR_BELOW_580}>Needs Improvement (&lt;580)</option>
                  <option value={CreditRange.NOT_SURE}>Not Sure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Down payment amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <input
                    type="number"
                    {...register("downPayment", { valueAsNumber: true })}
                    className="w-full pl-7 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="60000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">When do you need the loan?</label>
                <select
                  {...register("timeline")}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select timeline...</option>
                  <option value={Timeline.ASAP}>As soon as possible</option>
                  <option value={Timeline.WITHIN_30_DAYS}>Within 30 days</option>
                  <option value={Timeline.ONE_TO_THREE_MONTHS}>1-3 months</option>
                  <option value={Timeline.THREE_TO_SIX_MONTHS}>3-6 months</option>
                  <option value={Timeline.SIX_PLUS_MONTHS}>6+ months</option>
                  <option value={Timeline.JUST_RESEARCHING}>Just researching</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Employment status</label>
                <select
                  {...register("employmentStatus")}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select employment status...</option>
                  <option value={EmploymentStatus.EMPLOYED_W2}>Employed (W-2)</option>
                  <option value={EmploymentStatus.SELF_EMPLOYED}>Self-employed</option>
                  <option value={EmploymentStatus.RETIRED}>Retired</option>
                  <option value={EmploymentStatus.NOT_EMPLOYED}>Not currently employed</option>
                  <option value={EmploymentStatus.OTHER}>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Annual household income</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <input
                    type="number"
                    {...register("annualIncome", { valueAsNumber: true })}
                    className="w-full pl-7 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="75000"
                  />
                </div>
              </div>
            </div>
          )}

          {submitError && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400">{submitError}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}

            {step < totalSteps ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting} className="ml-auto">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Get My Quote"
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// Helper functions
function getFieldsForStep(step: number): Array<keyof LeadFormData> {
  switch (step) {
    case 1:
      return ["segment", "loanType"];
    case 2:
      return ["propertyType", "propertyValue", "propertyLocation"];
    case 3:
      return ["name", "email", "phone"];
    case 4:
      return ["creditRange", "downPayment", "timeline", "employmentStatus", "annualIncome"];
    default:
      return [];
  }
}

function getLoanTypesForSegment(segment: Segment) {
  if (segment === Segment.RESIDENTIAL) {
    return [
      { value: LoanType.PURCHASE, label: "Purchase" },
      { value: LoanType.REFINANCE, label: "Refinance" },
      { value: LoanType.CASH_OUT_REFINANCE, label: "Cash-Out Refinance" },
      { value: LoanType.HOME_EQUITY_LOAN, label: "Home Equity Loan" },
      { value: LoanType.HOME_EQUITY_LINE, label: "Home Equity Line of Credit" },
      { value: LoanType.FHA_LOAN, label: "FHA Loan" },
      { value: LoanType.VA_LOAN, label: "VA Loan" },
      { value: LoanType.USDA_LOAN, label: "USDA Loan" },
      { value: LoanType.JUMBO_LOAN, label: "Jumbo Loan" },
    ];
  } else if (segment === Segment.INVESTMENT) {
    return [
      { value: LoanType.INVESTMENT_PROPERTY, label: "Investment Property" },
      { value: LoanType.FIX_AND_FLIP, label: "Fix and Flip" },
      { value: LoanType.RENTAL_PORTFOLIO, label: "Rental Portfolio" },
      { value: LoanType.DSCR_LOAN, label: "DSCR Loan" },
    ];
  } else {
    return [
      { value: LoanType.COMMERCIAL_PURCHASE, label: "Commercial Purchase" },
      { value: LoanType.COMMERCIAL_REFINANCE, label: "Commercial Refinance" },
      { value: LoanType.SBA_LOAN, label: "SBA Loan" },
      { value: LoanType.BRIDGE_LOAN, label: "Bridge Loan" },
      { value: LoanType.CONSTRUCTION_LOAN, label: "Construction Loan" },
    ];
  }
}

function getPropertyTypesForSegment(segment: Segment) {
  if (segment === Segment.RESIDENTIAL) {
    return [
      { value: PropertyType.SINGLE_FAMILY, label: "Single Family Home" },
      { value: PropertyType.CONDO, label: "Condominium" },
      { value: PropertyType.TOWNHOUSE, label: "Townhouse" },
      { value: PropertyType.MULTI_FAMILY, label: "Multi-Family (2-4 units)" },
      { value: PropertyType.MANUFACTURED, label: "Manufactured/Mobile Home" },
      { value: PropertyType.LAND, label: "Land" },
    ];
  } else if (segment === Segment.INVESTMENT) {
    return [
      { value: PropertyType.SINGLE_FAMILY, label: "Single Family Rental" },
      { value: PropertyType.MULTI_FAMILY, label: "Multi-Family Rental" },
      { value: PropertyType.CONDO, label: "Condominium" },
      { value: PropertyType.TOWNHOUSE, label: "Townhouse" },
    ];
  } else {
    return [
      { value: PropertyType.COMMERCIAL_OFFICE, label: "Office Building" },
      { value: PropertyType.COMMERCIAL_RETAIL, label: "Retail Space" },
      { value: PropertyType.COMMERCIAL_INDUSTRIAL, label: "Industrial/Warehouse" },
      { value: PropertyType.COMMERCIAL_MIXED_USE, label: "Mixed-Use" },
      { value: PropertyType.MULTI_FAMILY, label: "Multi-Family (5+ units)" },
    ];
  }
}
