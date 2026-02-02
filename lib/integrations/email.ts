/**
 * Email Notification Service
 *
 * Sends email notifications for new leads to agents and admins
 */

import { Lead, Agent } from '@prisma/client';
import { prisma } from '@/lib/db';

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@lendywendy.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'leads@lendywendy.com';

/**
 * Send email using SendGrid
 */
async function sendEmail(data: EmailData): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.warn('SendGrid not configured - email not sent');
    return false;
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: data.to }] }],
        from: { email: EMAIL_FROM, name: 'LendyWendy' },
        subject: data.subject,
        content: [
          { type: 'text/plain', value: data.text || stripHtml(data.html) },
          { type: 'text/html', value: data.html },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('SendGrid error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

/**
 * Notify admin of new lead
 */
export async function notifyAdminOfNewLead(lead: Lead): Promise<boolean> {
  const scoreLabel = getScoreLabel(lead.score);
  const subject = `🔔 New ${scoreLabel} Lead: ${lead.name || lead.email}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">New Lead Received</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${lead.name || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${lead.email}">${lead.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${lead.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Score:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="background: ${getScoreColor(lead.score)}; color: white; padding: 2px 8px; border-radius: 4px;">
                ${lead.score}/100 (${scoreLabel})
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Loan Type:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${formatLoanType(lead.loanType)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Location:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${lead.propertyLocation || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Timeline:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${lead.timeline || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Source:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${lead.leadSource || 'Form'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Received:</strong></td>
            <td style="padding: 8px 0;">${new Date(lead.createdAt).toLocaleString()}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
          <p style="margin: 0 0 10px 0;"><strong>Quick Actions:</strong></p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://lendywendy.com'}/admin/leads"
             style="display: inline-block; background: #2563eb; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-right: 10px;">
            View in Dashboard
          </a>
        </div>
      </div>
    </div>
  `;

  return sendEmail({
    to: ADMIN_EMAIL,
    subject,
    html,
  });
}

/**
 * Notify agent of assigned lead
 */
export async function notifyAgentOfNewLead(lead: Lead, agent: Agent): Promise<boolean> {
  const scoreLabel = getScoreLabel(lead.score);
  const subject = `🏠 New Lead Assigned: ${lead.name || lead.email}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #059669; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">New Lead Assigned to You</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p>Hi ${agent.name},</p>
        <p>A new ${scoreLabel.toLowerCase()} lead has been assigned to you through LendyWendy. Please reach out promptly!</p>

        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 15px 0;">Lead Details</h3>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 5px 0;"><strong>Name:</strong></td>
              <td>${lead.name || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0;"><strong>Email:</strong></td>
              <td><a href="mailto:${lead.email}">${lead.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 5px 0;"><strong>Phone:</strong></td>
              <td>${lead.phone ? `<a href="tel:${lead.phone}">${lead.phone}</a>` : 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0;"><strong>Score:</strong></td>
              <td>
                <span style="background: ${getScoreColor(lead.score)}; color: white; padding: 2px 8px; border-radius: 4px;">
                  ${lead.score}/100 (${scoreLabel})
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 5px 0;"><strong>Looking for:</strong></td>
              <td>${formatLoanType(lead.loanType)}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0;"><strong>Location:</strong></td>
              <td>${lead.propertyLocation || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0;"><strong>Timeline:</strong></td>
              <td>${lead.timeline || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0;"><strong>Credit Range:</strong></td>
              <td>${lead.creditRange || 'Not specified'}</td>
            </tr>
          </table>
        </div>

        <p style="color: #666; font-size: 14px;">
          <strong>Tip:</strong> Leads that are contacted within 5 minutes have a 9x higher conversion rate!
        </p>

        <div style="margin-top: 20px; text-align: center;">
          ${lead.phone ? `
            <a href="tel:${lead.phone}"
               style="display: inline-block; background: #059669; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 5px;">
              📞 Call Now
            </a>
          ` : ''}
          <a href="mailto:${lead.email}"
             style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 5px;">
            ✉️ Send Email
          </a>
        </div>
      </div>
      <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
        <p>This lead was matched to you by LendyWendy based on your location and specialization.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: agent.email,
    subject,
    html,
  });
}

/**
 * Send confirmation email to lead
 */
export async function sendLeadConfirmation(lead: Lead): Promise<boolean> {
  const subject = "Thanks for reaching out to LendyWendy!";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">LendyWendy</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Your Local Mortgage Matchmaker</p>
      </div>
      <div style="padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <h2>Thanks for reaching out${lead.name ? `, ${lead.name.split(' ')[0]}` : ''}!</h2>

        <p>We've received your information and we're working on matching you with a local mortgage expert who specializes in exactly what you need.</p>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0;">What happens next?</h3>
          <ol style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 10px;">A local mortgage professional will reach out within 24 hours</li>
            <li style="margin-bottom: 10px;">They'll discuss your options and answer any questions</li>
            <li style="margin-bottom: 10px;">No obligation - just friendly, expert advice</li>
          </ol>
        </div>

        <p>In the meantime, feel free to explore our resources:</p>
        <ul style="padding-left: 20px;">
          <li><a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://lendywendy.com'}/calculators">Mortgage Calculators</a></li>
          <li><a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://lendywendy.com'}/readiness-score">Check Your Mortgage Readiness Score</a></li>
        </ul>

        <p>Questions? Just reply to this email.</p>

        <p>Best,<br>The LendyWendy Team</p>
      </div>
      <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
        <p>LendyWendy is not a lender. We connect borrowers with mortgage professionals.</p>
        <p>Equal Housing Opportunity.</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: lead.email,
    subject,
    html,
  });
}

/**
 * Match lead to appropriate agent and send notifications
 */
export async function matchAndNotifyAgent(lead: Lead): Promise<Agent | null> {
  // Parse location to get state/city
  const locationParts = lead.propertyLocation?.split(',') || [];
  const state = locationParts[locationParts.length - 1]?.trim().toUpperCase() || 'CA';
  const city = locationParts[0]?.trim() || '';

  // Find matching agents
  const matchingAgents = await prisma.agent.findMany({
    where: {
      status: 'ACTIVE',
      states: { has: state },
      loanTypes: { has: lead.loanType },
      // Check capacity
      currentWeekLeads: { lt: prisma.agent.fields.weeklyCapacity },
    },
    orderBy: [
      { currentWeekLeads: 'asc' }, // Prefer agents with fewer leads
      { rating: 'desc' },          // Then by rating
    ],
    take: 1,
  });

  if (matchingAgents.length === 0) {
    console.warn('No matching agent found for lead:', lead.id);
    return null;
  }

  const agent = matchingAgents[0];

  // Assign lead to agent
  await prisma.lead.update({
    where: { id: lead.id },
    data: {
      assignedAgentId: agent.id,
      assignedAt: new Date(),
    },
  });

  // Increment agent's weekly lead count
  await prisma.agent.update({
    where: { id: agent.id },
    data: {
      currentWeekLeads: { increment: 1 },
    },
  });

  // Send notification to agent
  await notifyAgentOfNewLead(lead, agent);

  return agent;
}

// Helper functions
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Hot';
  if (score >= 60) return 'Warm';
  return 'Cold';
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#ef4444'; // red
  if (score >= 60) return '#f97316'; // orange
  return '#6b7280'; // gray
}

function formatLoanType(loanType: string): string {
  const mapping: Record<string, string> = {
    'PURCHASE': 'Home Purchase',
    'REFINANCE': 'Refinance',
    'CASH_OUT_REFINANCE': 'Cash-Out Refinance',
    'FHA_LOAN': 'FHA Loan',
    'VA_LOAN': 'VA Loan',
    'INVESTMENT_PROPERTY': 'Investment Property',
    'JUMBO_LOAN': 'Jumbo Loan',
    'COMMERCIAL': 'Commercial',
  };
  return mapping[loanType] || loanType.replace(/_/g, ' ');
}
