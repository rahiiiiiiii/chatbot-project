# SEPM AI Agent — Web App

A Node.js web application that runs a SEPM-focused AI agent powered by Claude.

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Add your Anthropic API key
Open `server.js` and replace `your-api-key-here` with your actual key:
```js
const ANTHROPIC_API_KEY = 'sk-ant-...';
```

### 3. Start the server
```bash
node server.js
```

### 4. Open in browser
Visit: http://localhost:3000

## Deploy to the Web (Free Options)

### Option A — Render.com
1. Push this folder to a GitHub repo
2. Go to https://render.com → New Web Service
3. Connect your repo, set start command: `node server.js`
4. Add environment variable: `ANTHROPIC_API_KEY=sk-ant-...`
5. Deploy — you get a public URL like `https://sepm-agent.onrender.com`

### Option B — Railway.app
1. Go to https://railway.app → New Project → Deploy from GitHub
2. Add env var `ANTHROPIC_API_KEY`
3. Done — public URL auto-assigned

### Option C — Replit
1. Go to https://replit.com → Import from GitHub
2. Set the secret `ANTHROPIC_API_KEY` in Replit Secrets
3. Click Run

## File Structure
```
sepm-agent/
├── server.js          ← Node.js backend (proxies Anthropic API)
├── public/
│   └── index.html     ← Frontend UI (colorful modern chat)
├── package.json
└── README.md
```
