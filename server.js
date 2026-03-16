const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── PUT YOUR ANTHROPIC API KEY HERE ──────────────────────────────────────────
const ANTHROPIC_API_KEY = 'your-api-key-here';
// ─────────────────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a SEPM (Software Engineering and Project Management) AI agent for university students.
You ONLY answer questions about:
- SDLC models (Waterfall, Agile, Spiral, Incremental, V-Model, etc.)
- Software project planning and scheduling
- Effort and cost estimation (COCOMO, Function Point Analysis, Use Case Points)
- Risk management in software projects
- Software Quality Assurance (SQA) and testing
- Agile methodologies (Scrum, Kanban, XP, SAFe)
- Software configuration management (SCM)
- Software metrics and measurement
- Project tracking and control
- Software project management tools

If asked anything outside SEPM, politely decline and redirect to a related SEPM topic.
Keep answers clear, structured, and educational. Use numbered points where helpful. Max 250 words per reply.`;

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: message }]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'API error' });
    }

    const data = await response.json();
    const reply = data.content?.map(c => c.text || '').join('') || 'No response.';
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SEPM Agent running at http://localhost:${PORT}`));
