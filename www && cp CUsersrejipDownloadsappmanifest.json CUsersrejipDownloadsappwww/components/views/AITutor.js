const GEMINI_KEY = "AIzaSyCjswVNRFk5OwuEiipOYEdxdXqqYxe3SEE";
const OPENROUTER_KEY = "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";

const CONFIG = {
  gemini: {
    key: GEMINI_KEY,
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/",
    models: [
      { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
      { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' }
    ]
  },
  openrouter: {
    key: OPENROUTER_KEY,
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    models: [
      { id: 'openrouter/free', label: 'Free Model' }
    ]
  },
  lmstudio: {
    key: "local",
    endpoint: "https://retractable-unheedingly-arnetta.ngrok-free.dev/v1/chat/completions",
    models: [
      { id: 'mistral-7b-instruct-v0.3', label: 'Mistral 7B' }
    ]
  }
};

const parseMarkdown = (text) => {
  if (!text) return '';
  // First convert LaTeX text commands to markdown
  let processed = text
    .replace(/\\textbf\{([^}]+)\}/g, '**$1**')
    .replace(/\\textit\{([^}]+)\}/g, '*$1*')
    .replace(/\\emph\{([^}]+)\}/g, '*$1*')
    .replace(/\\underline\{([^}]+)\}/g, '<u>$1</u>');
  
  let html = processed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 18px; font-weight: 600; margin: 12px 0 6px;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size: 20px; font-weight: 600; margin: 14px 0 8px;">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size: 22px; font-weight: 700; margin: 16px 0 10px;">$1</h1>')
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px; font-family: monospace;">$1</code>')
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  if (!html.startsWith('<')) html = '<p>' + html + '</p>';
  html = html.replace(/(<li>.*?<\/li>)(?!<li)/g, '<ul style="margin: 8px 0; padding-left: 20px;">$1</ul>');
  return html;
};

const AITutorView = () => {
  const [conversations, setConversations] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('learnora-ai-conversations')) || []; } catch(e) { return []; }
  });
  const [activeId, setActiveId] = React.useState(null);
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const validProviders = Object.keys(CONFIG);
  const [aiProvider, setAiProvider] = React.useState(() => {
    const saved = localStorage.getItem('learnora-ai-provider');
    return saved && validProviders.includes(saved) ? saved : validProviders[0];
  });
  const [selectedModel, setSelectedModel] = React.useState(() => {
    const p = localStorage.getItem('learnora-ai-provider');
    const actualP = p && validProviders.includes(p) ? p : validProviders[0];
    const models = CONFIG[actualP]?.models || [];
    const saved = localStorage.getItem('learnora-ai-model');
    return (saved && models.find(m => m.id === saved)) ? saved : (models[0]?.id || '');
  });

  const endRef = React.useRef(null);
  const chatContainerRef = React.useRef(null);
  const isMobile = window.innerWidth <= 768;
  const activeConv = conversations.find(c => c.id === activeId);

  // Save to localStorage but DON'T scroll here
  React.useEffect(() => {
    localStorage.setItem('learnora-ai-conversations', JSON.stringify(conversations));
    localStorage.setItem('learnora-ai-provider', aiProvider);
    localStorage.setItem('learnora-ai-model', selectedModel);
  }, [conversations, aiProvider, selectedModel]);

  // Scroll only when typing is done (response received)
  React.useEffect(() => {
    if (!isTyping && endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isTyping]);

  React.useEffect(() => {
    if (chatContainerRef.current && window.renderMathInElement) {
      window.renderMathInElement(chatContainerRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false
      });
    }
  }, [conversations, isTyping]);

  const callAI = async (msg, onChunk) => {
    const history = (activeConv?.messages || []).slice(-5);
    if (aiProvider === 'gemini') {
      const url = `${CONFIG.gemini.endpoint}${selectedModel}:generateContent?key=${CONFIG.gemini.key}`;
      const contents = [
        { role: "user", parts: [{ text: "You are an expert educational AI tutor. Use plain text formatting: *bold*, /italic/, # Title. Math: x = (-b ± sqrt(b²-4ac)) / 2a. No code blocks." }] },
        { role: "model", parts: [{ text: "I understand." }] },
        ...history.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
        { role: 'user', parts: [{ text: msg }] }
      ];
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents, generationConfig: { temperature: 0.7, maxOutputTokens: 2000 } }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Gemini Error');
      return data.candidates[0].content.parts[0].text;
    } else {
      const config = CONFIG[aiProvider];
      const systemPrompt = aiProvider === 'lmstudio' 
        ? "You are a helpful educational tutor. Use plain text with simple formatting: *bold* for bold, /italic/ for italic, # Title for headers. For math, use plain text like: x = (-b ± sqrt(b²-4ac)) / 2a. Do NOT use code blocks. Keep it simple."
        : "You are an expert educational AI tutor. Use MARKDOWN for formatting: # headers, **bold**, *italic*. Use LaTeX ONLY for math: $...$";
      let messages;
      if (aiProvider === 'lmstudio') {
        messages = history.map(h => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content }));
        const firstUserMsg = messages.length > 0 && messages[0].role === 'user' ? messages[0].content : msg;
        const combinedMsg = messages.length > 0 && messages[0].role === 'user' 
          ? systemPrompt + "\n\nUser: " + firstUserMsg
          : msg;
        if (messages.length > 0 && messages[0].role === 'user') {
          messages[0].content = combinedMsg;
        } else {
          messages.push({ role: "user", content: combinedMsg });
        }
      } else {
        messages = [
          { role: "system", content: systemPrompt },
          ...history.map(h => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content })),
          { role: "user", content: msg }
        ];
      }
      const headers = { "Content-Type": "application/json" };
      if (config.key && config.key !== "local") {
        headers["Authorization"] = `Bearer ${config.key}`;
      }
      if (aiProvider === 'openrouter') {
        headers["HTTP-Referer"] = window.location.href;
        headers["X-Title"] = "Learnora AI Tutor";
      }
      const requestBody = { model: selectedModel, messages, stream: true };
      if (aiProvider === 'lmstudio') {
        requestBody.temperature = 0.7;
        requestBody.max_tokens = 256;
      } else {
        requestBody.temperature = 0.7;
        requestBody.max_tokens = 2000;
      }

      const res = await fetch(config.endpoint, { method: "POST", headers, body: JSON.stringify(requestBody) });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error?.message || 'API Error');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data:')) continue;
          
          try {
            const jsonStr = trimmed.slice(5).trim();
            if (jsonStr === '[DONE]') continue;
            const data = JSON.parse(jsonStr);
            const content = data.choices?.[0]?.delta?.content || data.choices?.[0]?.text?.content || '';
            if (content) {
              fullContent += content;
              if (onChunk) onChunk(fullContent);
            }
          } catch (e) {}
        }
      }
      return fullContent;
    }
  };

  const handleSend = async () => {
    if (!currentMessage.trim()) return;
    const text = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);

    let convId = activeId;
    if (!convId) {
      convId = Date.now().toString();
      setConversations([{ id: convId, name: text.slice(0, 25), messages: [] }, ...conversations]);
      setActiveId(convId);
    }

    const userMsg = { role: 'user', content: text, time: new Date().toLocaleTimeString() };
    setConversations(prev => prev.map(c => c.id === convId ? { ...c, messages: [...c.messages, userMsg] } : c));

    const assistantMsgId = Date.now().toString();
    setConversations(prev => prev.map(c => c.id === convId ? { ...c, messages: [...c.messages, { role: 'assistant', content: '', id: assistantMsgId, time: new Date().toLocaleTimeString() }] } : c));

    try {
      await callAI(text, (chunk) => {
        setConversations(prev => prev.map(c => c.id === convId ? { 
          ...c, 
          messages: c.messages.map(m => m.id === assistantMsgId ? { ...m, content: chunk } : m)
        } : c));
      });
    } catch (e) {
      setConversations(prev => prev.map(c => c.id === convId ? { 
        ...c, 
        messages: c.messages.map(m => m.id === assistantMsgId ? { ...m, content: `Error: ${e.message}`, isError: true } : m)
      } : c));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 72px)', minHeight: 0, background: 'var(--bg-primary)', overflow: 'hidden' }}>
      {!isMobile && (
        <div style={{ width: '280px', flexShrink: 0, borderRight: '1px solid var(--border-color)', background: 'var(--bg-secondary)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => { const id = Date.now().toString(); setConversations([{ id, name: 'New Chat', messages: [] }, ...conversations]); setActiveId(id); }} style={{ padding: '10px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}>+ New Chat</button>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {conversations.map(c => (
              <div key={c.id} onClick={() => setActiveId(c.id)} style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', background: activeId === c.id ? 'var(--bg-tertiary)' : 'transparent', marginBottom: '4px', fontSize: '13px' }}>{c.name}</div>
            ))}
          </div>
        </div>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '18px', margin: 0 }}>AI Tutor</h2>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderRadius: '8px', padding: '2px' }}>
              {Object.keys(CONFIG).map(p => (
                <button key={p} onClick={() => { setAiProvider(p); setSelectedModel(CONFIG[p].models[0].id); }} style={{ padding: '4px 8px', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: '700', cursor: 'pointer', background: aiProvider === p ? 'var(--bg-primary)' : 'transparent', color: aiProvider === p ? 'var(--primary-500)' : 'var(--text-secondary)' }}>{p.toUpperCase()}</button>
              ))}
            </div>
            <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)} style={{ padding: '4px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '11px' }}>
              {(CONFIG[aiProvider]?.models || []).map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </div>
        </div>

        <div ref={chatContainerRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {(activeConv?.messages || []).map((m, i) => (
            <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              <div style={{ padding: '12px 16px', borderRadius: '12px', background: m.role === 'user' ? 'var(--primary-500)' : 'var(--bg-primary)', color: m.role === 'user' ? '#fff' : 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '14px' }} dangerouslySetInnerHTML={m.role === 'assistant' ? { __html: parseMarkdown(m.content) } : undefined}>
                {m.role === 'user' ? m.content : null}
              </div>
            </div>
          ))}
          {isTyping && <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Thinking...</div>}
          <div ref={endRef} />
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Type message..." style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
            <button onClick={handleSend} style={{ padding: '0 20px', borderRadius: '10px', border: 'none', background: 'var(--primary-500)', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
window.AITutorView = AITutorView;
