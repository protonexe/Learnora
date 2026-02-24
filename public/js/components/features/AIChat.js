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

// Markdown to HTML parser with proper LaTeX support
const parseMarkdown = (text) => {
  if (!text) return '';
  
  // Store LaTeX math blocks to protect them from markdown processing
  const displayMath = [];
  const inlineMath = [];
  const codePlaceholders = [];
  
  // Step 1: Protect LaTeX display math $$...$$ and \[...\]
  let protectedText = text.replace(/\$\$[\s\S]*?\$\$/g, (match) => {
    displayMath.push(match);
    return `__DISPLAY_MATH_${displayMath.length - 1}__`;
  }).replace(/\\\[[\s\S]*?\\\]/g, (match) => {
    displayMath.push(match);
    return `__DISPLAY_MATH_${displayMath.length - 1}__`;
  });
  
  // Step 2: Protect code blocks before other processing
  protectedText = protectedText.replace(/```[\s\S]*?```/g, (match) => {
    codePlaceholders.push(match);
    return `__CODE_BLOCK_${codePlaceholders.length - 1}__`;
  });
  
  // Step 3: Protect inline code `...`
  protectedText = protectedText.replace(/`[^`]+`/g, (match) => {
    codePlaceholders.push(match);
    return `__INLINE_CODE_${codePlaceholders.length - 1}__`;
  });
  
  // Step 4: Protect inline math $...$ and \(...\) - must be AFTER code protection
  protectedText = protectedText.replace(/\$[^\$\n]+?\$/g, (match) => {
    inlineMath.push(match);
    return `__INLINE_MATH_${inlineMath.length - 1}__`;
  }).replace(/\\\([^\)]+?\\\)/g, (match) => {
    inlineMath.push(match);
    return `__INLINE_MATH_${inlineMath.length - 1}__`;
  });
  
  // Step 5: Split into lines and process
  let lines = protectedText.split('\n');
  let html = '';
  let inList = false;
  let listItems = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // Skip empty lines at the start
    if (!line && html === '') continue;
    
    // Headers
    if (line.match(/^#{1,6} /)) {
      const level = line.match(/^#+/)[0].length;
      const content = line.replace(/^#+\s/, '');
      const processed = processInlineMarkdown(content);
      html += `<h${level} style="font-size: ${24 - level * 2}px; font-weight: 600; margin: 12px 0 6px; color: var(--text-primary);">${processed}</h${level}>`;
    }
    // Blockquotes
    else if (line.match(/^> /)) {
      const content = line.replace(/^> /, '');
      const processed = processInlineMarkdown(content);
      html += `<blockquote style="border-left: 3px solid var(--primary-500); padding-left: 12px; margin: 8px 0; color: var(--text-secondary); font-style: italic;">${processed}</blockquote>`;
    }
    // List items
    else if (line.match(/^[-*•]\s/) || line.match(/^\d+\.\s/)) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      const content = line.replace(/^[-*•]\s/, '').replace(/^\d+\.\s/, '');
      const processed = processInlineMarkdown(content);
      listItems.push(`<li>${processed}</li>`);
    }
    // End list if we hit non-list content
    else if (inList && line) {
      html += `<ul style="margin: 8px 0; padding-left: 20px;">${listItems.join('')}</ul>`;
      inList = false;
      listItems = [];
      if (line) {
        const processed = processInlineMarkdown(line);
        html += `<p style="margin: 8px 0; line-height: 1.6;">${processed}</p>`;
      }
    }
    // Regular paragraphs
    else if (line) {
      const processed = processInlineMarkdown(line);
      html += `<p style="margin: 8px 0; line-height: 1.6;">${processed}</p>`;
    }
  }
  
  // Close any open list
  if (inList && listItems.length) {
    html += `<ul style="margin: 8px 0; padding-left: 20px;">${listItems.join('')}</ul>`;
  }
  
  // Step 6: Restore code blocks with proper escaping
  codePlaceholders.forEach((code, idx) => {
    let escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;');
    if (code.startsWith('```')) {
      const match = code.match(/```(\w+)?\n([\s\S]*?)```/);
      if (match) {
        escapedCode = `<pre style="background: var(--bg-tertiary); padding: 12px; border-radius: 8px; overflow-x: auto; margin: 8px 0; font-family: monospace; font-size: 13px;"><code>${match[2].replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;')}</code></pre>`;
      }
    } else {
      escapedCode = `<code style="background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 12px;">${code.slice(1, -1).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;')}</code>`;
    }
    html = html.replace(`__CODE_BLOCK_${idx}__`, escapedCode).replace(`__INLINE_CODE_${idx}__`, escapedCode);
  });
  
  // Step 7: Restore inline math
  inlineMath.forEach((math, idx) => {
    html = html.replace(`__INLINE_MATH_${idx}__`, math);
  });
  
  // Step 8: Restore display math
  displayMath.forEach((math, idx) => {
    html = html.replace(`__DISPLAY_MATH_${idx}__`, math);
  });
  
  return html;
};

// Helper function to process inline markdown (bold, italic, etc)
const processInlineMarkdown = (text) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>');
};

const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = React.useState(() => {
    const saved = localStorage.getItem('learnora-ai-chat-history');
    return saved ? JSON.parse(saved) : [];
  });
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
    const saved = localStorage.getItem('learnora-ai-model');
    const providerModels = CONFIG[actualP]?.models || [];
    return (saved && providerModels.find(m => m.id === saved)) ? saved : (providerModels[0]?.id || '');
  });

  const messagesEndRef = React.useRef(null);
  const messagesRef = React.useRef([]);
  const chatContainerRef = React.useRef(null);
  const isMobile = window.innerWidth <= 768;

  React.useEffect(() => {
    messagesRef.current = messages;
    localStorage.setItem('learnora-ai-chat-history', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Render LaTeX after messages update
  React.useEffect(() => {
    if (window.renderMathInElement && chatContainerRef.current) {
      try {
        window.renderMathInElement(chatContainerRef.current, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false
        });
      } catch (e) {
        console.log('LaTeX rendering skipped:', e);
      }
    }
  }, [messages]);

  React.useEffect(() => {
    localStorage.setItem('learnora-ai-provider', aiProvider);
    localStorage.setItem('learnora-ai-model', selectedModel);
  }, [aiProvider, selectedModel]);

  const getProxyUrl = (url) => {
    return url;
  };

  const callGemini = async (history, msg) => {
    const url = `${CONFIG.gemini.endpoint}${selectedModel}:generateContent?key=${CONFIG.gemini.key}`;
    const contents = history.slice(-5).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: msg }] });

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, generationConfig: { temperature: 0.7, maxOutputTokens: 2000 } })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || `Gemini Error ${res.status}`);
    return data.candidates[0].content.parts[0].text;
  };

  const callOpenAI = async (provider, history, msg) => {
    const config = CONFIG[provider];
    const url = getProxyUrl(config.endpoint);
    const apiMessages = [
      { role: "system", content: "You are Learnora AI Tutor. Expert educator. Use LaTeX with $...$ for inline math and $$...$$ for display math. Use markdown with proper headers (# for h1, ## for h2, ### for h3), **bold**, *italic*, `code`, and - for lists." },
      ...history.slice(-5).map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
      { role: "user", content: msg }
    ];

    const headers = { 
      "Authorization": `Bearer ${config.key}`, 
      "Content-Type": "application/json"
    };

    // Add OpenRouter-specific headers if using OpenRouter
    if (provider === 'openrouter') {
      headers["HTTP-Referer"] = window.location.href;
      headers["X-Title"] = "Learnora AI Tutor";
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ model: selectedModel, messages: apiMessages, temperature: 0.7, max_tokens: 2000 })
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || `${provider} Error ${res.status}`);
    return data.choices[0].message.content;
  };

  const handleSend = async () => {
    if (!currentMessage.trim()) return;
    const msg = currentMessage;
    const userMsg = { role: 'user', content: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      let response;
      if (aiProvider === 'gemini') response = await callGemini(messagesRef.current, msg);
      else response = await callOpenAI(aiProvider, messagesRef.current, msg);
      setMessages(prev => [...prev, { role: 'assistant', content: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${e.message}`, isError: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: isMobile ? '0' : '20px' }}>
      <div style={{ background: 'var(--bg-primary)', borderRadius: isMobile ? '0' : '16px', width: '100%', maxWidth: '900px', height: isMobile ? '100%' : '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Icon name="bot" size={20} color="var(--primary-500)" /><h4 style={{ margin: 0 }}>AI Tutor</h4></div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderRadius: '8px', padding: '2px' }}>
              {Object.keys(CONFIG).map(p => (
                <button key={p} onClick={() => { setAiProvider(p); setSelectedModel(CONFIG[p].models[0].id); }} style={{ padding: '6px 10px', border: 'none', borderRadius: '6px', fontSize: '10px', fontWeight: '700', cursor: 'pointer', background: aiProvider === p ? 'var(--bg-primary)' : 'transparent', color: aiProvider === p ? 'var(--primary-500)' : 'var(--text-secondary)' }}>{p.toUpperCase()}</button>
              ))}
            </div>
            <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)} style={{ padding: '6px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '11px' }}>
              {(CONFIG[aiProvider]?.models || []).map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
            <button onClick={() => { setMessages([]); localStorage.removeItem('learnora-ai-chat-history'); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}><Icon name="trash-2" size={18} /></button>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><Icon name="x" size={20} /></button>
          </div>
        </div>
        <div ref={chatContainerRef} style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--bg-secondary)' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: isMobile ? '95%' : '85%' }}>
              <div style={{ padding: '12px 16px', borderRadius: '12px', background: m.role === 'user' ? 'var(--primary-500)' : 'var(--bg-primary)', color: m.role === 'user' ? '#fff' : 'var(--text-primary)', border: m.isError ? '1px solid var(--danger)' : '1px solid var(--border-color)', fontSize: '14px', wordWrap: 'break-word', overflowWrap: 'break-word' }} dangerouslySetInnerHTML={m.role === 'assistant' ? { __html: parseMarkdown(m.content) } : undefined}>
                {m.role === 'user' ? m.content : null}
              </div>
            </div>
          ))}
          {isTyping && <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>AI is thinking...</div>}
          <div ref={messagesEndRef} />
        </div>
        <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()} placeholder="Ask anything... (Shift+Enter for new line)" style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
            <button onClick={handleSend} style={{ padding: '0 20px', borderRadius: '10px', border: 'none', background: 'var(--primary-500)', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
window.AIChat = AIChat;
