import { NextRequest, NextResponse } from 'next/server';
import { sendChatMessage, ChatMessage } from '@/lib/ai/deepseek';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, sessionId, pageUrl } = body as {
      messages: ChatMessage[];
      sessionId: string;
      pageUrl?: string;
    };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Get AI response
    const response = await sendChatMessage(messages, false) as string;

    // Store conversation in database (fire and forget)
    storeConversation(sessionId, messages, response, pageUrl).catch(console.error);

    return NextResponse.json({
      message: response,
      sessionId,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}

async function storeConversation(
  sessionId: string,
  messages: ChatMessage[],
  assistantResponse: string,
  pageUrl?: string
) {
  try {
    // Find or create conversation
    let conversation = await prisma.conversation.findUnique({
      where: { sessionId },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          sessionId,
          pageUrl,
          status: 'ACTIVE',
        },
      });
    }

    // Get the last user message
    const lastUserMessage = messages[messages.length - 1];

    // Store both messages
    if (lastUserMessage && lastUserMessage.role === 'user') {
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: 'USER',
          content: lastUserMessage.content,
        },
      });
    }

    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'ASSISTANT',
        content: assistantResponse,
      },
    });
  } catch (error) {
    console.error('Failed to store conversation:', error);
  }
}

// Streaming endpoint for real-time responses
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    );
  }

  try {
    // Get conversation history
    const conversation = await prisma.conversation.findUnique({
      where: { sessionId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({
      messages: conversation.messages.map((m) => ({
        role: m.role.toLowerCase(),
        content: m.content,
        createdAt: m.createdAt,
      })),
    });
  } catch (error) {
    console.error('Failed to get conversation:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve conversation' },
      { status: 500 }
    );
  }
}
