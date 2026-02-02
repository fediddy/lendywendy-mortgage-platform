// DeepSeek API client for AI Mortgage Advisor

import { MORTGAGE_ADVISOR_SYSTEM_PROMPT } from './system-prompt';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface StreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason: string | null;
  }[];
}

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

export async function sendChatMessage(
  messages: ChatMessage[],
  stream: boolean = false
): Promise<string | ReadableStream<Uint8Array>> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY is not configured');
  }

  // Prepend system prompt
  const fullMessages: ChatMessage[] = [
    { role: 'system', content: MORTGAGE_ADVISOR_SYSTEM_PROMPT },
    ...messages
  ];

  const response = await fetch(`${DEEPSEEK_BASE_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: fullMessages,
      stream,
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
  }

  if (stream) {
    return response.body as ReadableStream<Uint8Array>;
  }

  const data: DeepSeekResponse = await response.json();
  return data.choices[0]?.message?.content || '';
}

export async function* streamChatMessage(
  messages: ChatMessage[]
): AsyncGenerator<string, void, unknown> {
  const stream = await sendChatMessage(messages, true) as ReadableStream<Uint8Array>;
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') return;

          try {
            const chunk: StreamChunk = JSON.parse(data);
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              yield content;
            }
          } catch {
            // Skip invalid JSON
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

// Extract qualification data from conversation using AI
export async function extractQualificationData(messages: ChatMessage[]): Promise<{
  loanType?: string;
  propertyType?: string;
  location?: string;
  timeline?: string;
  creditRange?: string;
  hasContactInfo: boolean;
}> {
  const extractionPrompt = `Based on the conversation below, extract any qualification information that was mentioned. Return a JSON object with these fields (use null for unknown):
- loanType: "PURCHASE", "REFINANCE", "INVESTMENT", "COMMERCIAL", or null
- propertyType: "SINGLE_FAMILY", "CONDO", "MULTI_FAMILY", "COMMERCIAL", or null
- location: city/state mentioned, or null
- timeline: "ASAP", "1-3_MONTHS", "3-6_MONTHS", "RESEARCHING", or null
- creditRange: "EXCELLENT", "GOOD", "FAIR", "POOR", or null
- hasContactInfo: true if they provided name/email/phone, false otherwise

Conversation:
${messages.map(m => `${m.role}: ${m.content}`).join('\n')}

Return ONLY valid JSON, no explanation.`;

  try {
    const response = await sendChatMessage([
      { role: 'user', content: extractionPrompt }
    ], false) as string;

    // Try to parse the JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('Failed to extract qualification data:', error);
  }

  return { hasContactInfo: false };
}
