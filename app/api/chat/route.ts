import { NextRequest, NextResponse } from 'next/server';
import { streamChatMessage, ChatMessage } from '@/lib/ai/deepseek';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  let messages: ChatMessage[];
  let sessionId: string;
  let pageUrl: string | undefined;

  try {
    const body = await request.json();
    ({ messages, sessionId, pageUrl } = body as {
      messages: ChatMessage[];
      sessionId: string;
      pageUrl?: string;
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

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

  try {
    const generator = streamChatMessage(messages);
    const encoder = new TextEncoder();
    let fullResponse = '';

    const stream = new ReadableStream({
      async pull(controller) {
        try {
          const { done, value } = await generator.next();

          if (done) {
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();

            // Fire-and-forget: persist messages to DB after stream completes
            storeConversation(sessionId, messages, fullResponse, pageUrl).catch(
              (err) => console.error('Failed to store conversation:', err)
            );
            return;
          }

          fullResponse += value;
          const chunk = JSON.stringify({ content: value });
          controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
        } catch (err) {
          console.error('Stream processing error:', err);
          controller.error(err);
        }
      },
      cancel() {
        // If client disconnects, still persist what we have
        if (fullResponse) {
          storeConversation(sessionId, messages, fullResponse, pageUrl).catch(
            (err) => console.error('Failed to store conversation on cancel:', err)
          );
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process chat message',
        fallback: "I'm having a moment! You can also get help at /get-quote",
      },
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
