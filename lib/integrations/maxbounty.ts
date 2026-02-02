/**
 * MaxBounty Affiliate Integration
 *
 * Sends qualified leads to MaxBounty for affiliate commission tracking
 */

import { Lead } from '@prisma/client';
import { prisma } from '@/lib/db';

interface MaxBountyLeadData {
  // Standard MaxBounty fields
  affiliate_id: string;
  campaign_id?: string;

  // Lead information
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;

  // Property/Loan details
  loan_type: string;
  property_state: string;
  property_city?: string;
  credit_range?: string;

  // Qualification
  timeline?: string;
  down_payment_range?: string;

  // Tracking
  source_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;

  // Consent
  tcpa_consent: boolean;
  consent_timestamp: string;
  consent_ip?: string;
}

interface MaxBountyResponse {
  success: boolean;
  lead_id?: string;
  message?: string;
  error?: string;
}

const MAXBOUNTY_WEBHOOK_URL = process.env.MAXBOUNTY_WEBHOOK_URL;
const MAXBOUNTY_AFFILIATE_ID = process.env.MAXBOUNTY_AFFILIATE_ID;

/**
 * Send a lead to MaxBounty
 */
export async function sendToMaxBounty(lead: Lead): Promise<MaxBountyResponse> {
  if (!MAXBOUNTY_WEBHOOK_URL || !MAXBOUNTY_AFFILIATE_ID) {
    console.warn('MaxBounty not configured - skipping submission');
    return { success: false, error: 'MaxBounty not configured' };
  }

  try {
    // Parse name into first/last
    const nameParts = lead.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Extract state from propertyLocation
    const locationParts = lead.propertyLocation?.split(',') || [];
    const state = locationParts[locationParts.length - 1]?.trim() || 'CA';
    const city = locationParts[0]?.trim() || '';

    // Build MaxBounty payload
    const payload: MaxBountyLeadData = {
      affiliate_id: MAXBOUNTY_AFFILIATE_ID,
      first_name: firstName,
      last_name: lastName,
      email: lead.email,
      phone: lead.phone || undefined,
      loan_type: formatLoanType(lead.loanType),
      property_state: state,
      property_city: city,
      credit_range: lead.creditRange || undefined,
      timeline: lead.timeline || undefined,
      down_payment_range: formatDownPayment(lead.downPayment, lead.downPaymentPercent),
      source_url: lead.sourceUrl || undefined,
      utm_source: lead.utmSource || undefined,
      utm_medium: lead.utmMedium || undefined,
      utm_campaign: lead.utmCampaign || undefined,
      tcpa_consent: lead.tcpaConsent,
      consent_timestamp: lead.consentTimestamp?.toISOString() || new Date().toISOString(),
      consent_ip: lead.consentIp || undefined,
    };

    // Send to MaxBounty
    const response = await fetch(MAXBOUNTY_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    let result: MaxBountyResponse;

    try {
      result = JSON.parse(responseText);
    } catch {
      result = {
        success: response.ok,
        message: responseText,
      };
    }

    // Update lead with submission status
    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        maxBountySubmitted: response.ok,
        maxBountyResponse: JSON.stringify({
          status: response.status,
          response: result,
          submittedAt: new Date().toISOString(),
        }),
      },
    });

    if (!response.ok) {
      console.error('MaxBounty submission failed:', result);
      return { success: false, error: result.error || 'Submission failed' };
    }

    console.log('MaxBounty submission successful:', result);
    return { success: true, lead_id: result.lead_id, message: result.message };

  } catch (error) {
    console.error('MaxBounty submission error:', error);

    // Log the error but don't fail the lead creation
    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        maxBountySubmitted: false,
        maxBountyResponse: JSON.stringify({
          error: error instanceof Error ? error.message : 'Unknown error',
          submittedAt: new Date().toISOString(),
        }),
      },
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Retry failed MaxBounty submissions
 */
export async function retryFailedSubmissions(limit: number = 100): Promise<{
  processed: number;
  successful: number;
  failed: number;
}> {
  const failedLeads = await prisma.lead.findMany({
    where: {
      maxBountySubmitted: false,
      tcpaConsent: true,
      createdAt: {
        // Only retry leads from the last 7 days
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
    take: limit,
    orderBy: { createdAt: 'asc' },
  });

  let successful = 0;
  let failed = 0;

  for (const lead of failedLeads) {
    const result = await sendToMaxBounty(lead);
    if (result.success) {
      successful++;
    } else {
      failed++;
    }
    // Small delay between submissions
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return {
    processed: failedLeads.length,
    successful,
    failed,
  };
}

// Helper functions
function formatLoanType(loanType: string): string {
  const mapping: Record<string, string> = {
    'PURCHASE': 'Purchase',
    'REFINANCE': 'Refinance',
    'CASH_OUT_REFINANCE': 'Cash Out Refinance',
    'FHA_LOAN': 'FHA',
    'VA_LOAN': 'VA',
    'INVESTMENT_PROPERTY': 'Investment Property',
    'JUMBO_LOAN': 'Jumbo',
    'COMMERCIAL': 'Commercial',
  };
  return mapping[loanType] || loanType;
}

function formatDownPayment(amount?: number | null, percent?: number | null): string | undefined {
  if (percent) {
    if (percent >= 20) return '20% or more';
    if (percent >= 10) return '10-20%';
    if (percent >= 5) return '5-10%';
    return 'Less than 5%';
  }
  if (amount) {
    if (amount >= 100000) return '$100k+';
    if (amount >= 50000) return '$50k-$100k';
    if (amount >= 20000) return '$20k-$50k';
    return 'Under $20k';
  }
  return undefined;
}
