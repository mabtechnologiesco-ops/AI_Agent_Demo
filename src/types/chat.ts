export type MessageRole = 'user' | 'ai';

export type IndustryScenario =
  | 'hotel'
  | 'restaurant'
  | 'ecommerce'
  | 'carrental'
  | 'clinic'
  | 'salon'
  | 'construction'
  | null;

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface ChatRequest {
  messages: { role: MessageRole; content: string }[];
  scenario: IndustryScenario | null;
  knowledgeBase?: object;
}

export interface ChatResponse {
  message: string;
  demoMode: boolean;
  scenario: IndustryScenario | null;
}

export interface ChatErrorResponse {
  error: string;
}

export interface ConversationSummary {
  selectedIndustry: string | null;
  collectedInfo: Record<string, string>;
  status: 'idle' | 'collecting' | 'complete';
  demoOnly: boolean;
}
