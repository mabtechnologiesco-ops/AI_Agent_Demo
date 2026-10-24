import type {
  ChatMessage,
  ChatResponse,
  ChatErrorResponse,
  IndustryScenario,
} from '@/types/chat';

export async function sendChatMessage(
  messages: ChatMessage[],
  scenario: IndustryScenario | null,
  knowledgeBase?: object
): Promise<{ message: string; demoMode: boolean; scenario: IndustryScenario | null }> {
  const payload = {
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
    scenario,
    knowledgeBase,
  };

  let response: Response;
  try {
    response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      'Could not reach the server. Please check your connection and try again.'
    );
  }

  const data: ChatResponse | ChatErrorResponse = await response.json();

  if (!response.ok) {
    const errorMsg = (data as ChatErrorResponse).error || 'Something went wrong. Please try again.';
    const error = new Error(errorMsg) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  const chatData = data as ChatResponse;
  return {
    message: chatData.message,
    demoMode: chatData.demoMode ?? false,
    scenario: chatData.scenario ?? null,
  };
}
