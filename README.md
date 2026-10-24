# MAB TECHNOLOGIES SL — AI Agent Demo

A standalone demo website where potential customers can experience a real AI assistant through a conversational chat interface.

## Features

- Clean, minimalist chat interface with smooth animations
- Real AI responses via OpenAI-compatible API (server-side proxy)
- Conversation context preserved during the session
- Suggested prompts to get started
- Typing indicator, auto-scroll, clear chat, and error handling
- Fully responsive (mobile, tablet, desktop)
- No database, no authentication, no data persistence between sessions

## Industry website demonstrations

The original MAB Technologies showroom remains the home page. Choose **Try Demo** on any industry card to open a responsive fictional business website at `/demo/<industry>`; use the banner to return to the showroom. The seven demos are hotel, restaurant, e-commerce, car rental, clinic, salon, and construction services.

Each demo's page and floating assistant share the structured sample data in `src/industries/*.ts`. `src/industries/index.ts` is the single registry used by the website and the existing chat. The chat sends the active industry's data to the server, which retrieves relevant facts for the system prompt. It does not use another industry's content. A conversation starts fresh when an industry changes.

The server uses the existing `AI_API_KEY`, `AI_API_URL`, and `AI_MODEL` settings. The API key stays server-side. Responses use the configured model when available; if the key is missing or the provider is unavailable, the server returns a clearly labeled, knowledge-grounded demo response. Availability, stock, orders, reservations, appointments, and quotations are not connected to live business systems, and the assistant must not report them as confirmed. All businesses, prices, and policies shown are sample demonstration content.

## AI API Configuration

The app uses a server-side proxy (`server/index.js`) to keep API keys secure — keys are never exposed in frontend code.

### Environment Variables

| Variable       | Required | Default                                              | Description                          |
| -------------- | -------- | ---------------------------------------------------- | ------------------------------------ |
| `AI_API_KEY`   | No       | —                                                    | Your OpenAI (or compatible) API key. Without it, industry chats use grounded demo responses. |
| `AI_API_URL`   | No       | `https://api.openai.com/v1/chat/completions`         | The chat completions endpoint        |
| `AI_MODEL`     | No       | `gpt-4o-mini`                                        | The model name to use                |
| `PORT`         | No       | `3001`                                               | Server port (set automatically on Render) |

### Local Development

1. Create a `.env` file in the project root:

```bash
AI_API_KEY=your-api-key-here
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-4o-mini
```

2. Install dependencies:

```bash
npm install
```

3. Run the dev server (starts both Vite and the Express API proxy):

```bash
npm run dev
```

The frontend runs on Vite's port (default 5173) and proxies `/api/*` requests to the Express server on port 3001.

### Using Other AI Providers

Any OpenAI-compatible chat completions API works. Set `AI_API_URL` and `AI_MODEL` to match your provider. Examples:

- **OpenAI**: `AI_API_URL=https://api.openai.com/v1/chat/completions`, `AI_MODEL=gpt-4o-mini`
- **Groq**: `AI_API_URL=https://api.groq.com/openai/v1/chat/completions`, `AI_MODEL=llama-3.3-70b-versatile`
- **Together AI**: `AI_API_URL=https://api.together.xyz/v1/chat/completions`, `AI_MODEL=meta-llama/Llama-3-8b-chat-hf`

## Deploy on Render

1. Push this project to a GitHub repository.
2. Go to [render.com](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repo (or use the `render.yaml` blueprint for auto-configuration).
4. Set the environment variable `AI_API_KEY` in the Render dashboard.
5. Build command: `npm install && npm run build`
6. Start command: `npm run start`

The `render.yaml` file is included for blueprint-based deployment.

## Project Structure

```
├── server/
│   └── index.js          # Express server: API proxy + static file serving
├── src/
│   ├── components/
│   │   ├── ChatInput.tsx       # Text input with send button
│   │   ├── ChatInterface.tsx   # Main chat orchestration
│   │   ├── Footer.tsx          # Footer + clear chat button
│   │   ├── Header.tsx          # Branding header
│   │   ├── MessageBubble.tsx   Individual chat message
│   │   ├── TypingIndicator.tsx # Animated typing dots
│   │   └── WelcomeScreen.tsx   # Initial welcome + suggested prompts
│   ├── lib/
│   │   └── api.ts              # API client for /api/chat
│   ├── types/
│   │   └── chat.ts             # TypeScript types
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── render.yaml           # Render deployment blueprint
├── vite.config.ts        # Vite + dev proxy config
└── package.json
```

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Express (server-side AI proxy)
- lucide-react (icons)

---

**MAB TECHNOLOGIES SL** — YOU IMAGINE IT. WE BUILD IT.
