# ChatFlow

A clean, polished conversational AI application powered by **Experiential Labs** API.

![ChatFlow](https://img.shields.io/badge/ChatFlow-v1.0.0-4F46E5)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Express](https://img.shields.io/badge/Express-4-000000)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4)

## Overview

ChatFlow is a full-stack chatbot application that provides a premium conversational experience. Users can chat with GPT-6 Astra through a carefully designed interface that supports multi-turn conversations, markdown rendering, code highlighting, and a complete dark mode.

## Features

- **Multi-turn conversations** — Full conversation context sent with each request
- **Markdown rendering** — Headings, bold, italic, lists, links, code blocks
- **Syntax highlighting** — Language detection, copy button, monospace font
- **Dark mode** — Light, Dark, and System theme options
- **Responsive design** — Desktop sidebar, mobile drawer navigation
- **Chat history** — Conversations saved to localStorage with search
- **Welcome screen** — Suggestion cards for quick prompts
- **Error handling** — Graceful error messages with retry functionality
- **Clear chat** — Confirmation modal before clearing

## Screenshots

> Add screenshots of the welcome screen, chat conversation, dark mode, and mobile view here.

## Architecture

```
┌─────────────────────────────────────────────────┐
│  Frontend (React + Vite)                        │
│  Port 3000                                      │
│                                                 │
│  Chat UI → api.js → POST /api/chat             │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│  Backend (Express)                              │
│  Port 5000                                      │
│                                                 │
│  routes/chat.js → services/kie.js              │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│  KIE.ai API                                    │
│  https://api.kie.ai/codex/v1/responses         │
│  Model: gpt-6-astra                            │
└─────────────────────────────────────────────────┘
```

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 18, Vite, Tailwind CSS, Lucide    |
| Backend  | Node.js, Express, dotenv, cors          |
| AI       | GPT-6 Astra via KIE.ai                 |
| Markdown | react-markdown, remark-gfm             |
| Code     | react-syntax-highlighter (Prism)        |

## Folder Structure

```
chatbot/
├── client/                     # Frontend
│   ├── public/
│   │   └── chatflow.svg        # Favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Logo.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── WelcomeScreen.jsx
│   │   │   ├── SuggestionCard.jsx
│   │   │   ├── ChatMessages.jsx
│   │   │   ├── ChatMessage.jsx
│   │   │   ├── CodeBlock.jsx
│   │   │   ├── MarkdownRenderer.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── LoadingMessage.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── ClearChatModal.jsx
│   │   ├── context/
│   │   │   ├── ThemeContext.jsx
│   │   │   └── ChatContext.jsx
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── History.jsx
│   │   │   └── Settings.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                     # Backend
│   ├── routes/
│   │   └── chat.js
│   ├── services/
│   │   └── kie.js
│   ├── server.js
│   ├── package.json
│   ├── .env                    # ← Never commit this
│   └── .env.example
│
├── .gitignore
└── README.md
```

## KIE.ai Setup

1. Visit [KIE.ai](https://kie.ai) and create an account
2. Generate an API key from your dashboard
3. The API key grants access to the GPT-6 Astra model

## API Key Setup

1. Navigate to the `server/` directory
2. Copy the example environment file:

```bash
cp server/.env.example server/.env
```

3. Open `server/.env` and replace the placeholder:

```env
KIE_API_KEY=your_actual_api_key_here
PORT=5000
```

> ⚠️ **Security Warning**: Never commit your `.env` file. The `.gitignore` is configured to exclude it, but always verify with `git status` before committing.

## Local Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Start Development Servers

Terminal 1 — Backend:

```bash
cd server
npm run dev
```

Terminal 2 — Frontend:

```bash
cd client
npm run dev
```

The frontend runs on `http://localhost:3000` and proxies API requests to the backend on `http://localhost:5000`.

### Verify Setup

```bash
# Health check
curl http://localhost:5000/api/health
# Expected: {"status":"ok"}

# Test chat (replace with your API key in .env first)
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
# Expected: {"reply": "..."}
```

## Environment Variables

| Variable      | Description                | Required |
|---------------|----------------------------|----------|
| `KIE_API_KEY` | Your KIE.ai API key        | Yes      |
| `PORT`        | Backend server port        | No (default: 5000) |

## GitHub Setup

```bash
git init
git add .
git commit -m "Initial commit: ChatFlow GPT-6 Astra chatbot"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

**Before `git add .`**, always verify:

```bash
git status
```

Ensure no `.env` file appears in the staged files.

## Security

- API key is stored only in `server/.env`
- The key is **never** sent to the frontend
- All API calls go through the Express backend
- `.gitignore` excludes `.env` and `*.env` files
- Error responses never expose the API key or stack traces

## Future Improvements

These features are supported by KIE.ai's GPT-6 Astra but not implemented in V1:

- [ ] Streaming responses
- [ ] Web search integration
- [ ] Image input
- [ ] File upload
- [ ] Function calling
- [ ] Reasoning controls
- [ ] User authentication
- [ ] Cloud database for chat history

## License

MIT
