const DEFAULT_CONFIG = {
  gemini: {
    key: "",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/",
    models: [
      { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
      { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' }
    ]
  },
  openrouter: {
    key: "",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    models: [
      { id: 'deepseek/deepseek-r1:free', label: 'DeepSeek R1' },
      { id: 'google/gemini-2.0-flash-exp', label: 'Gemini 2.0 Flash' }
    ]
  }
};

const getConfig = () => window.APP_CONFIG || DEFAULT_CONFIG;
const CONFIG = getConfig();

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
    const p = localStorage.getItem('learnora-ai-provider') || validProviders[0];
    const models = CONFIG[p]?.models || [];
    const saved = localStorage.getItem('learnora-ai-model');
    return (saved && models.find(m => m.id === saved)) ? saved : (models[0]?.id || '');
  });

  const endRef = React.useRef(null);
  const isMobile = window.innerWidth <= 768;
  const activeConv = conversations.find(c => c.id === activeId);

  React.useEffect(() => {
    localStorage.setItem('learnora-ai-conversations', JSON.stringify(conversations));
    localStorage.setItem('learnora-ai-provider', aiProvider);
    localStorage.setItem('learnora-ai-model', selectedModel);
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, aiProvider, selectedModel, isTyping]);

  const getProxyUrl = (url) => {
    return url;
  };

  const callAI = async (msg) => {
    const history = (activeConv?.messages || []).slice(-5);
    if (aiProvider === 'gemini') {
      const url = `${CONFIG.gemini.endpoint}${selectedModel}:generateContent?key=${CONFIG.gemini.key}`;
      const contents = history.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }));
      contents.push({ role: 'user', parts: [{ text: msg }] });
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents, generationConfig: { temperature: 0.7, maxOutputTokens: 1024 } }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Gemini Error');
      return data.candidates[0].content.parts[0].text;
    } else {
      const config = CONFIG[aiProvider];
      const res = await fetch(getProxyUrl(config.endpoint), {
        method: "POST",
        headers: { "Authorization": `Bearer ${config.key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: selectedModel, messages: [...history.map(h => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content })), { role: "user", content: msg }], temperature: 0.7 })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'API Error');
      return data.choices[0].message.content;
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

    try {
      const reply = await callAI(text);
      setConversations(prev => prev.map(c => c.id === convId ? { ...c, messages: [...c.messages, { role: 'assistant', content: reply, time: new Date().toLocaleTimeString() }] } : c));
    } catch (e) {
      setConversations(prev => prev.map(c => c.id === convId ? { ...c, messages: [...c.messages, { role: 'assistant', content: `Error: ${e.message}`, isError: true }] } : c));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 72px)', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      {!isMobile && (
        <div style={{ width: '280px', borderRight: '1px solid var(--border-color)', background: 'var(--bg-secondary)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => { const id = Date.now().toString(); setConversations([{ id, name: 'New Chat', messages: [] }, ...conversations]); setActiveId(id); }} style={{ padding: '10px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}>+ New Chat</button>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {conversations.map(c => (
              <div key={c.id} onClick={() => setActiveId(c.id)} style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', background: activeId === c.id ? 'var(--bg-tertiary)' : 'transparent', marginBottom: '4px', fontSize: '13px' }}>{c.name}</div>
            ))}
          </div>
        </div>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
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

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {(activeConv?.messages || []).map((m, i) => (
            <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              <div style={{ padding: '12px 16px', borderRadius: '12px', background: m.role === 'user' ? 'var(--primary-500)' : 'var(--bg-primary)', color: m.role === 'user' ? '#fff' : 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>{m.content}</div>
            </div>
          ))}
          {isTyping && <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Thinking...</div>}
          <div ref={endRef} />
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
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
