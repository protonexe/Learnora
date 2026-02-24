const functions = require('firebase-functions');
const fetch = require('node-fetch');

const API_KEYS = {
  gemini: 'AIzaSyAhBr18J0XhxisPEGYf1wOz0areQAq5zQc',
  kilo: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnYiOiJwcm9kdWN0aW9uIiwia2lsb1VzZXJJZCI6IjE4Y2ViNjdiLTc0YTgtNDI0Zi05YzdmLWU2YWYxMDRjNmJlZiIsImFwaVRva2VuUGVwcGVyIjpudWxsLCJ2ZXJzaW9uIjozLCJpYXQiOjE3NzE5NTEyMTIsImV4cCI6MTkyOTYzMTIxMn0.60yxYHXuUxIK5oMOqsSdIlNySsil5srO71qqd3zEKjE',
  nvidia: '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',
  openrouter: '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'
};

exports.api = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { provider, model, messages, endpoint, ...extra } = req.body;
    let url, headers, body;

    switch (provider) {
      case 'gemini':
        url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEYS.gemini}`;
        headers = { 'Content-Type': 'application/json' };
        body = { contents: messages, generationConfig: { temperature: 0.7, maxOutputTokens: 1024 } };
        break;

      case 'kilo':
        url = 'https://api.kilo.ai/v1/chat/completions';
        headers = { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${API_KEYS.kilo}` 
        };
        body = { model, messages, temperature: 0.7, ...extra };
        break;

      case 'nvidia':
        url = 'https://integrate.api.nvidia.com/v1/chat/completions';
        headers = { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${API_KEYS.nvidia}` 
        };
        body = { model, messages, temperature: 0.7, ...extra };
        break;

      case 'openrouter':
        url = 'https://openrouter.ai/api/v1/chat/completions';
        headers = { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${API_KEYS.openrouter}`,
          'HTTP-Referer': 'https://learnora-61def.web.app',
          'X-Title': 'Learnora'
        };
        body = { model, messages, temperature: 0.7, ...extra };
        break;

      default:
        res.status(400).json({ error: 'Invalid provider' });
        return;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    if (!response.ok) {
      res.status(response.status).json(data);
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
