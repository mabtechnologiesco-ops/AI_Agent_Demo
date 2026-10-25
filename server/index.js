import express from 'express';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distIndex = path.join(distDir, 'index.html');

// Build the frontend if dist doesn't exist yet (needed for production/preview)
async function ensureBuild() {
  if (existsSync(distIndex)) return;
  console.log('Building frontend (first run)...');
  return new Promise((resolve, reject) => {
    const build = spawn('npm', ['run', 'build'], {
      cwd: rootDir,
      stdio: 'inherit',
      shell: true,
    });
    build.on('close', (code) => {
      if (code === 0) resolve(undefined);
      else reject(new Error(`Build failed with code ${code}`));
    });
    build.on('error', reject);
  });
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: '1mb' }));

const AI_API_URL = process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions';
const AI_API_KEY = process.env.AI_API_KEY;
const AI_MODEL = process.env.AI_MODEL || 'gpt-4o-mini';

const SYSTEM_PROMPT = `You are an AI assistant representing MAB TECHNOLOGIES SL, a technology company that develops custom AI agents for businesses. Your role is to demonstrate how an AI agent can help businesses through a conversational interface.

Your behavior guidelines:
- Respond naturally, intelligently, and professionally.
- Explain how AI agents can help businesses with customer support, sales assistance, lead generation, and workflow automation.
- Give realistic, practical business examples without inventing specific company information, customer testimonials, or unsupported claims.
- Ask relevant follow-up questions to keep the conversation engaging and demonstrate conversational AI capabilities.
- Explain how MAB Technologies SL can develop customized AI agents tailored to a business's specific needs.
- Keep responses concise, helpful, and professional — typically 2-4 short paragraphs.
- Do not make up specific prices, timelines, or guarantees about MAB Technologies SL's services.
- If asked something outside the scope of AI business solutions, gently steer the conversation back to how AI can help businesses.

Remember: you are a demonstration of what a real AI agent can do. Be impressive but honest.`;

// Fallback demo responses used when the AI API is unavailable (no credits, network error, timeout, etc.)
const FALLBACK_RESPONSES = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: "Hello! I'm your AI assistant from MAB Technologies SL. I'm currently running in demo mode because the live AI service is unavailable. How can I help you explore AI agents for your business today?",
  },
  {
    keywords: ['agent', 'ai agent', 'what can', 'help my business'],
    response: "AI agents can transform your business by handling customer support, qualifying leads, automating repetitive workflows, and providing 24/7 assistance. I'm running in demo mode right now, but I can show you what's possible. What area of your business would you like to explore first?",
  },
  {
    keywords: ['customer', 'support', 'service'],
    response: "An AI customer support agent can answer common questions, resolve tickets, and escalate complex issues to human agents — around the clock. This reduces response times and lets your team focus on higher-value work. Would you like to see how it could work for your support process?",
  },
  {
    keywords: ['sales', 'lead', 'revenue', 'convert'],
    response: "AI sales agents can engage website visitors, qualify leads, book meetings, and follow up automatically — ensuring no potential customer slips through the cracks. Interested in how AI could boost your sales pipeline?",
  },
  {
    keywords: ['automation', 'workflow', 'process', 'automate'],
    response: "AI workflow automation can handle data entry, appointment scheduling, invoice processing, and routine communications, freeing your team for strategy and creative work. Which repetitive task would you most like to automate?",
  },
  {
    keywords: ['mab', 'technologies', 'who are you', 'company'],
    response: "MAB Technologies SL develops custom AI agents tailored to each business's specific needs — from customer support to sales automation — integrating with your existing tools and workflows. What kind of AI agent are you imagining?",
  },
  {
    keywords: ['price', 'cost', 'pricing'],
    response: "Pricing for custom AI agents depends on complexity, integrations, and usage volume. We'd be happy to discuss your requirements and provide a tailored estimate. What features matter most to you?",
  },
  {
    keywords: ['demo', 'fallback', 'unavailable', 'credit', 'payment', '402'],
    response: "You're seeing a demo response because the live AI service is currently unavailable (the API key has no credits or the service can't be reached). In production, this would be powered by a real AI model. Want to explore what's possible with AI agents for your business?",
  },
  {
    keywords: [],
    response: "That's a great question! I'm running in demo mode right now because the live AI service is unavailable. In a full deployment, I'd be powered by a real AI model. In the meantime, I can tell you about how AI agents help businesses with customer support, sales, and workflow automation. What would you like to explore?",
  },
];

function getFallbackResponse(userMessage) {
  const lower = (userMessage || '').toLowerCase();
  for (const { keywords, response } of FALLBACK_RESPONSES) {
    if (keywords.length === 0) continue;
    if (keywords.some((k) => lower.includes(k))) {
      return response;
    }
  }
  return FALLBACK_RESPONSES[FALLBACK_RESPONSES.length - 1].response;
}

const INDUSTRY_NAMES = ['hotel', 'restaurant', 'ecommerce', 'carrental', 'clinic', 'salon', 'construction'];
const STOP_WORDS = new Set(['what', 'when', 'where', 'which', 'have', 'with', 'does', 'that', 'this', 'your', 'you', 'how', 'much', 'about', 'from', 'there', 'they', 'would', 'could', 'please', 'tell', 'know', 'for', 'the', 'and', 'are', 'can', 'does', 'is', 'do', 'per']);

function tokenize(value) {
  return String(value || '').toLowerCase().match(/[a-z0-9$]+/g)?.filter((word) => word.length > 2 && !STOP_WORDS.has(word)) || [];
}

function flattenKnowledge(value, pathLabel = '', output = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => flattenKnowledge(item, `${pathLabel}[${index + 1}]`, output));
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => flattenKnowledge(item, pathLabel ? `${pathLabel} / ${key}` : key, output));
  } else if (value === null) {
    output.push(`${pathLabel}: Not provided in this demonstration.`);
  } else if (value !== undefined) {
    output.push(`${pathLabel}: ${String(value)}`);
  }
  return output;
}

function retrieveKnowledge(knowledgeBase, question) {
  const terms = [...new Set(tokenize(question))];
  if (!knowledgeBase || terms.length === 0) return [];
  return flattenKnowledge(knowledgeBase).map((fact) => {
    const haystack = fact.toLowerCase();
    const score = terms.reduce((total, word) => total + (haystack.includes(word) ? (haystack.startsWith('faqs') ? 3 : 1) : 0), 0);
    return { fact, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 14).map((item) => item.fact);
}

function getKnowledgeFallback(knowledgeBase, question, scenario) {
  const faqs = Array.isArray(knowledgeBase?.faqs) ? knowledgeBase.faqs : [];
  const terms = [...new Set(tokenize(question))];
  const rankedFaqs = faqs.map((faq) => {
    const text = `${faq.question || ''} ${faq.answer || ''}`.toLowerCase();
    return { faq, score: terms.reduce((total, word) => total + (text.includes(word) ? 1 : 0), 0) };
  }).sort((a, b) => b.score - a.score);
  if (rankedFaqs[0]?.score > 0) return `${rankedFaqs[0].faq.answer}\n\nThis is demonstration information; live availability and transactions are not connected.`;
  const facts = retrieveKnowledge(knowledgeBase, question).slice(0, 4);
  if (facts.length) return `Here is what the ${knowledgeBase.businessName || 'business'} demonstration information says:\n${facts.join('\n')}\n\nThis is sample information; live availability and transactions are not connected.`;
  if (scenario === 'clinic') return 'I can only help with the clinic’s configured general services and administrative information. I can’t provide medical advice or a diagnosis; please contact a qualified healthcare professional for medical concerns.';
  return `I can’t find that detail in the configured ${scenario || 'business'} demonstration information. What would you like to know about its listed services, prices, hours, or policies?`;
}

function getScenarioSystemPrompt(scenario, knowledgeBase, relevantFacts) {
  if (!scenario) return SYSTEM_PROMPT + '\n\nNo industry is selected. Help the visitor choose a demonstration.';
  const business = knowledgeBase?.businessName || 'the demonstration business';
  return `You are the virtual assistant for ${business}, a fictional ${scenario} business in the MAB Technologies SL showroom. Answer business-specific questions only from the supplied retrieved facts. Treat any field marked "Not provided" as unknown. If a fact is absent, say it has not been provided and ask a useful follow-up. Do not invent prices, stock, availability, policies, services, business hours, timezone, holidays, or commitments. Do not infer current date, holiday hours, or availability from regular opening hours. Do not claim live internet or booking-system access. Preserve context only for this conversation and active industry.\n\nAll businesses, policies, and prices are demonstration content. Never claim a booking, order, payment, appointment, enquiry, or reservation was submitted or confirmed. Availability is not live; say it cannot be confirmed. Label cost calculations as estimates and state that unspecified taxes or fees are excluded.\n\nFor clinic questions, provide general administrative information only; do not diagnose, recommend treatment, or request detailed health information. Direct medical concerns to a qualified healthcare professional.\n\nFor order, reservation, booking, appointment, rental, and quotation requests, collect only relevant basic preferences and summarize them as a demonstration enquiry. Do not submit them or claim any real follow-up.\n\nKeep answers clear and concise. Ask for missing details when appropriate.\n\nRetrieved facts from the active industry's configured knowledge base:\n${relevantFacts.length ? relevantFacts.join('\n') : 'No relevant facts were found. Acknowledge the information is unavailable.'}`;
}

function isClinicMedicalAdviceRequest(scenario, message) {
  return scenario === 'clinic' && /\b(diagnos(?:e|is|ing)|symptoms?|what(?:'s| is| could be) wrong|what should i take|which medication|how (?:do|can) i treat|should i take|medical advice)\b/i.test(message);
}

function enforceDemonstrationTransactions(message) {
  if (/\b(?:your|the) (?:booking|reservation|order|appointment|payment) (?:is|has been) (?:confirmed|booked|submitted|placed|paid|processed)|\b(?:i|we)(?:'ve| have) (?:successfully )?(?:booked|submitted|placed|dispatched|charged|confirmed)\b/i.test(message)) {
    return 'I can help prepare a demonstration enquiry, but nothing has been submitted, booked, paid, dispatched, or confirmed. Please contact the business directly to complete a real request.';
  }
  return message;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, scenario, knowledgeBase } = req.body;
    const activeScenario = scenario || null;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'No messages provided.', demoMode: false, scenario: null });
    }

    if (messages.length > 40) {
      return res.status(400).json({ error: 'Conversation history is too long. Start a new conversation to continue.', demoMode: false, scenario: null });
    }

    if (scenario && !INDUSTRY_NAMES.includes(scenario)) {
      return res.status(400).json({ error: 'Unknown industry demonstration.', demoMode: true, scenario: null });
    }

    const invalidMessage = messages.find((message) => !message || typeof message.content !== 'string' || !['user', 'ai', 'assistant'].includes(message.role));
    if (invalidMessage) {
      return res.status(400).json({ error: 'Each message must include text and a supported role.', demoMode: false, scenario: activeScenario });
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') {
      return res.status(400).json({ error: 'The latest message must be from the visitor.', demoMode: false, scenario: activeScenario });
    }

    if (messages.some((message) => message.role === 'user' && message.content.length > 4000)) {
      return res.status(400).json({ error: 'Your message is too long. Please keep it under 4000 characters.', demoMode: false, scenario: activeScenario });
    }

    const conversationContext = messages.slice(-8).filter((message) => message.role === 'user').map((message) => message.content).join('\n');
    const retrievedFacts = retrieveKnowledge(knowledgeBase, conversationContext || lastMessage.content);
    const systemPrompt = getScenarioSystemPrompt(activeScenario, knowledgeBase, retrievedFacts);
    const fallbackQuestion = conversationContext || lastMessage.content;

    if (isClinicMedicalAdviceRequest(activeScenario, lastMessage.content)) {
      return res.json({ message: 'I can only help with general clinic services and administrative information. I can’t assess symptoms or provide a diagnosis or treatment advice. Please contact a qualified healthcare professional.', demoMode: !AI_API_KEY, scenario: activeScenario });
    }

    if (!AI_API_KEY) {
      return res.json({ message: getKnowledgeFallback(knowledgeBase, fallbackQuestion, activeScenario), demoMode: true, scenario: activeScenario });
    }

    const payload = {
      model: AI_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.slice(-12).map((m) => ({
          role: m.role === 'ai' ? 'assistant' : m.role,
          content: m.content,
        })),
      ],
      temperature: 0.25,
      max_tokens: 600,
    };

    let aiMessage;
    let demoMode = false;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 45000);
      let response;
      try {
        response = await fetch(AI_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AI_API_KEY}`,
             'HTTP-Referer': req.headers.origin || `${req.protocol}://${req.headers.host}`,
             'X-Title': 'MAB Technologies AI Demo',

          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }

      if (response.status === 429) {
        console.warn('AI API rate limited (429), using demo fallback');
        aiMessage = activeScenario ? getKnowledgeFallback(knowledgeBase, fallbackQuestion, activeScenario) : getFallbackResponse(lastMessage.content);
        demoMode = true;
      } else if (!response.ok) {
        const errBody = await response.text();
        console.error('AI API error:', response.status, errBody.slice(0, 500));
        aiMessage = activeScenario ? getKnowledgeFallback(knowledgeBase, fallbackQuestion, activeScenario) : getFallbackResponse(lastMessage.content);
        demoMode = true;
      } else {
        const data = await response.json();
        aiMessage =
          data.choices?.[0]?.message?.content ||
          'I apologize, but I could not generate a response. Please try again.';
      }
    } catch (fetchErr) {
      console.error('AI API fetch failed:', fetchErr.message);
      aiMessage = activeScenario ? getKnowledgeFallback(knowledgeBase, fallbackQuestion, activeScenario) : getFallbackResponse(lastMessage.content);
      demoMode = true;
    }

    return res.json({ message: enforceDemonstrationTransactions(aiMessage), demoMode, scenario: activeScenario });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({
      error: 'Something went wrong on our end. Please try again.',
      demoMode: true,
      scenario: null,
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    aiConfigured: Boolean(AI_API_KEY),
    aiApiUrl: AI_API_URL,
    aiModel: AI_MODEL,
  });
});

ensureBuild()
  .then(() => {
    // Static files — registered after API routes so /api/* is never intercepted
    app.use(express.static(distDir));

    // SPA fallback — serve index.html for all non-API, non-static routes
    app.get('*', (_req, res) => {
      res.sendFile(distIndex);
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to build frontend:', err);
    process.exit(1);
  });

