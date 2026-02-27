const DEFAULT_CONFIG = {
  gemini: {
    key: "AIzaSyCjswVNRFk5OwuEiipOYEdxdXqqYxe3SEE",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/",
    models: [
      { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
      { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' }
    ]
  },
  openrouter: {
    key: "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",
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

const CONFIG = DEFAULT_CONFIG;

const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = React.useState(() => {
    const saved = localStorage.getItem('learnora-ai-chat-history');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [aiProvider, setAiProvider] = React.useState(() => {
    return localStorage.getItem('learnora-ai-provider') || 'gemini';
  });
  const messagesEndRef = React.useRef(null);
  const messagesRef = React.useRef([]);
  const chatContainerRef = React.useRef(null);

  React.useEffect(() => {
    localStorage.setItem('learnora-ai-chat-history', JSON.stringify(messages));
  }, [messages]);

  const clearChatHistory = () => {
    setMessages([]);
    localStorage.removeItem('learnora-ai-chat-history');
  };

  React.useEffect(() => {
    localStorage.setItem('learnora-ai-provider', aiProvider);
  }, [aiProvider]);

  React.useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      const markdownElements = chatContainerRef.current.querySelectorAll('.markdown-content');
      markdownElements.forEach(el => {
        if (!el.dataset.rendered) {
          const markdownText = el.dataset.markdown || el.textContent;
          el.innerHTML = parseMarkdown(markdownText);
          el.dataset.rendered = 'true';
        }
      });
      
      if (window.renderMathInElement) {
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
    }
  }, [messages]);

  const parseMarkdown = (text) => {
    if (!text) return '';
    
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^### (.*$)/gim, '<h3 style="font-size: 18px; font-weight: 600; margin: 16px 0 8px; color: var(--text-primary);">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 style="font-size: 20px; font-weight: 600; margin: 20px 0 12px; color: var(--text-primary);">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 style="font-size: 24px; font-weight: 700; margin: 24px 0 16px; color: var(--text-primary);">$1</h1>')
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600;">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>')
      .replace(/__(.*?)__/g, '<strong style="font-weight: 600;">$1</strong>')
      .replace(/_(.*?)_/g, '<em style="font-style: italic;">$1</em>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre style="background: var(--bg-tertiary); padding: 16px; border-radius: var(--radius-md); overflow-x: auto; margin: 12px 0; font-family: var(--font-mono); font-size: 13px; line-height: 1.5;"><code style="background: transparent;">$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code style="background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 14px; color: var(--accent-red);">$1</code>')
      .replace(/^---+$/gim, '<hr style="border: none; border-top: 1px solid var(--border-color); margin: 20px 0;">')
      .replace(/\|(.+)\|\n\|[-:\| ]+\|\n((?:\|.+)\n?)+/g, (match) => {
        const lines = match.trim().split('\n');
        const headerCells = lines[0].split('|').filter(c => c.trim()).map(c => `<th style="padding: 10px 12px; text-align: left; font-weight: 600; color: var(--text-primary); border-bottom: 2px solid var(--border-color);">${c.trim()}</th>`).join('');
        const bodyRows = lines.slice(2).map(line => {
          const cells = line.split('|').filter(c => c.trim()).map(c => `<td style="padding: 8px 12px; color: var(--text-secondary); border-bottom: 1px solid var(--border-color);">${c.trim()}</td>`).join('');
          return `<tr>${cells}</tr>`;
        }).join('');
        return `<table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
      })
      .replace(/^\* (.*$)/gim, '<li style="margin: 4px 0; padding-left: 8px;">$1</li>')
      .replace(/^- (.*$)/gim, '<li style="margin: 4px 0; padding-left: 8px;">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li style="margin: 4px 0; padding-left: 8px;">$1</li>')
      .replace(/^> (.*$)/gim, '<blockquote style="border-left: 3px solid var(--accent-blue); padding-left: 16px; margin: 12px 0; color: var(--text-secondary); font-style: italic;">$1</blockquote>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: var(--accent-blue); text-decoration: none;">$1</a>')
      .replace(/\n\n/g, '</p><p style="margin: 12px 0; line-height: 1.7;">')
      .replace(/\n/g, '<br>');
    
    if (!html.startsWith('<')) {
      html = '<p style="margin: 12px 0; line-height: 1.7;">' + html + '</p>';
    }
    
    html = html.replace(/(<li[^>]*>.*<\/li>)(?!<li)/g, '<ul style="margin: 8px 0; padding-left: 24px; list-style-type: disc;">$1</ul>');
    
    return html;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const renderLatexInText = (text) => {
    if (!text) return text;
    return text
      .replace(/```latex\n/g, '$$')
      .replace(/\n```/g, '$$')
      .replace(/`\$(.+?)\$`/g, '$$$1$$')
      .replace(/\\begin\{equation\}/g, '$$')
      .replace(/\\end\{equation\}/g, '$$')
      .replace(/\\begin\{align\}/g, '$$')
      .replace(/\\end\{align\}/g, '$$');
  };

  const callGeminiAPI = async (messageHistory, userMessage) => {
    const model = 'gemini-2.0-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${CONFIG.gemini.key}`;
    
    const contents = [
      { role: "user", parts: [{ text: "You are an expert educational AI tutor. Use plain text: *bold*, /italic/, # Title. Math: x = (-b ± sqrt(b²-4ac)) / 2a. No code blocks." }] },
      { role: "model", parts: [{ text: "I understand." }] }
    ];
    
    messageHistory.forEach(msg => {
      contents.push({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.content }] });
    });
    
    contents.push({ role: 'user', parts: [{ text: userMessage }] });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents, generationConfig: { temperature: 0.7, maxOutputTokens: 2048 } })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    } catch (err) {
      console.error('Gemini API error:', err);
      throw err;
    }
  };

  const callDeepSeekAPI = async (messageHistory, userMessage, onChunk) => {
    const model = CONFIG.openrouter.models[0].id;
    const apiMessages = [
      { role: "system", content: "You are an expert educational AI tutor for Learnora. Use plain text: *bold*, /italic/, # Title. Math: x = (-b ± sqrt(b²-4ac)) / 2a. No code blocks." },
      ...messageHistory.map(msg => ({ role: msg.role, content: msg.content })),
      { role: "user", content: userMessage }
    ];

    const response = await fetch(CONFIG.openrouter.endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CONFIG.openrouter.key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.href,
        "X-Title": "Learnora AI Tutor"
      },
      body: JSON.stringify({ model: model, messages: apiMessages, temperature: 0.7, max_tokens: 512, stream: true })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const reader = response.body.getReader();
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
  };

  const callLMStudioAPI = async (messageHistory, userMessage, onChunk) => {
    const model = CONFIG.lmstudio.models[0].id;
    const systemPrompt = "You are a helpful educational tutor. Use plain text: *bold*, /italic/, # Title. Math: x = (-b ± sqrt(b²-4ac)) / 2a. No code blocks.";
    let apiMessages = messageHistory.map(msg => ({ role: msg.role, content: msg.content }));
    const firstUserMsg = apiMessages.length > 0 && apiMessages[0].role === 'user' ? apiMessages[0].content : userMessage;
    const combinedMsg = apiMessages.length > 0 && apiMessages[0].role === 'user' 
      ? systemPrompt + "\n\nUser: " + firstUserMsg
      : userMessage;
    if (apiMessages.length > 0 && apiMessages[0].role === 'user') {
      apiMessages[0].content = combinedMsg;
    } else {
      apiMessages.push({ role: "user", content: combinedMsg });
    }

    const response = await fetch(CONFIG.lmstudio.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ model: model, messages: apiMessages, temperature: 0.7, max_tokens: 256, stream: true })
    });

    if (!response.ok) {
      throw new Error(`LM Studio error: ${response.status}`);
    }

    const reader = response.body.getReader();
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
  };

  const handleSend = React.useCallback(async (message) => {
    if (!message.trim()) return;
    
    const userMessage = { role: 'user', content: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    const updatedMessages = [...messagesRef.current, userMessage];
    setMessages(updatedMessages);
    messagesRef.current = updatedMessages;
    
    setCurrentMessage('');
    setIsTyping(true);

    const tempAssistantId = 'temp_' + Date.now();
    setMessages(prev => [...prev, { role: 'assistant', content: '', id: tempAssistantId, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]);

    try {
      let aiResponse = '';
      
      if (aiProvider === 'gemini') {
        aiResponse = await callGeminiAPI(messagesRef.current.slice(0, -1), message);
      } else if (aiProvider === 'lmstudio') {
        aiResponse = await callLMStudioAPI(messagesRef.current.slice(0, -1), message, (chunk) => {
          setMessages(prev => prev.map(m => m.id === tempAssistantId ? { ...m, content: renderLatexInText(chunk) } : m));
        });
      } else {
        aiResponse = await callDeepSeekAPI(messagesRef.current.slice(0, -1), message, (chunk) => {
          setMessages(prev => prev.map(m => m.id === tempAssistantId ? { ...m, content: renderLatexInText(chunk) } : m));
        });
      }
      
      aiResponse = renderLatexInText(aiResponse);

      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== tempAssistantId);
        return [...filtered, { role: 'assistant', content: aiResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
      });
    } catch (error) {
      console.error("AI Tutor Error:", error);
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== tempAssistantId);
        return [...filtered, { role: 'assistant', content: `Error: ${error.message}. Please try again or switch to a different AI provider.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isError: true }];
      });
    } finally {
      setIsTyping(false);
    }
  }, [aiProvider]);

  const suggestions = [
    'Explain quadratic equations',
    'Help me understand photosynthesis',
    'Quiz me on World War II',
    'How do I solve integrals?'
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="ai-chat-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ 
        position: 'fixed', 
        inset: 0, 
        background: 'rgba(0, 0, 0, 0.5)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: 1000, 
        padding: 'env(safe-area-inset-top, 16px) env(safe-area-inset-right, 16px) env(safe-area-inset-bottom, 16px) env(safe-area-inset-left, 16px)' 
      }}
    >
      <div 
        className="ai-chat-container"
        style={{ 
          background: 'var(--bg-primary)', 
          borderRadius: 'var(--radius-lg)', 
          width: '100%', 
          maxWidth: '800px', 
          height: 'var(--chat-height, 90vh)', 
          maxHeight: 'var(--chat-max-height, 90vh)', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden', 
          boxShadow: 'var(--shadow-lg)' 
        }}
      >
        <div className="ai-chat-header" style={{ 
          padding: '12px 16px', 
          borderBottom: '1px solid var(--border-color)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', background: 'var(--accent-blue)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="bot" size={16} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>AI Tutor</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', margin: 0 }}>
                {aiProvider.charAt(0).toUpperCase() + aiProvider.slice(1)}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'nowrap' }}>
            <div className="provider-picker" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '2px', 
              padding: '2px', 
              background: 'var(--bg-tertiary)', 
              borderRadius: 'var(--radius-md)',
              overflowX: 'auto',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}>
              <button onClick={() => setAiProvider('gemini')} style={{ padding: '4px 8px', background: aiProvider === 'gemini' ? 'var(--bg-primary)' : 'transparent', border: aiProvider === 'gemini' ? '1px solid var(--border-color)' : '1px solid transparent', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontWeight: 600, color: aiProvider === 'gemini' ? 'var(--text-primary)' : 'var(--text-tertiary)', cursor: 'pointer', whiteSpace: 'nowrap' }}>Gemini</button>
              <button onClick={() => setAiProvider('openrouter')} style={{ padding: '4px 8px', background: aiProvider === 'openrouter' ? 'var(--bg-primary)' : 'transparent', border: aiProvider === 'openrouter' ? '1px solid var(--border-color)' : '1px solid transparent', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontWeight: 600, color: aiProvider === 'openrouter' ? 'var(--text-primary)' : 'var(--text-tertiary)', cursor: 'pointer', whiteSpace: 'nowrap' }}>OpenRouter</button>
              <button onClick={() => setAiProvider('lmstudio')} style={{ padding: '4px 8px', background: aiProvider === 'lmstudio' ? 'var(--bg-primary)' : 'transparent', border: aiProvider === 'lmstudio' ? '1px solid var(--border-color)' : '1px solid transparent', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontWeight: 600, color: aiProvider === 'lmstudio' ? 'var(--text-primary)' : 'var(--text-tertiary)', cursor: 'pointer', whiteSpace: 'nowrap' }}>Local</button>
            </div>
            
            {messages.length > 0 && (
              <button onClick={clearChatHistory} title="Clear history" style={{ background: 'var(--bg-tertiary)', border: 'none', width: '28px', height: '28px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="trash-2" size={14} color="var(--text-secondary)" />
              </button>
            )}

            <button onClick={onClose} style={{ 
              background: 'var(--bg-tertiary)', 
              border: 'none', 
              width: '28px', 
              height: '28px', 
              borderRadius: 'var(--radius-sm)', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <Icon name="x" size={16} color="var(--text-secondary)" />
            </button>
          </div>
        </div>

        <div ref={chatContainerRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', background: 'var(--bg-secondary)' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ width: '64px', height: '64px', margin: '0 auto 20px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="sparkles" size={28} color="var(--accent-blue)" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>How can I help you today?</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Ask me anything about your studies.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
                {suggestions.map((suggestion, idx) => (
                  <button key={idx} onClick={() => handleSend(suggestion)} style={{ padding: '12px 16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon name="message-square" size={16} color="var(--text-tertiary)" />{suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
                  {msg.role === 'assistant' && (
                    <div style={{ width: '28px', height: '28px', background: 'var(--accent-blue)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="bot" size={16} color="#fff" />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className={msg.role === 'assistant' ? 'markdown-content' : ''} data-markdown={msg.role === 'assistant' ? msg.content : ''} style={{ background: msg.role === 'user' ? 'var(--bg-tertiary)' : 'var(--bg-primary)', color: msg.isError ? 'var(--danger)' : 'var(--text-primary)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)', fontSize: '15px', lineHeight: '1.7', overflowWrap: 'break-word' }} dangerouslySetInnerHTML={msg.role === 'assistant' ? { __html: parseMarkdown(msg.content) } : undefined}>
                      {msg.role === 'user' ? msg.content : null}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>{msg.time}</div>
                  </div>
                  {msg.role === 'user' && (
                    <div style={{ width: '28px', height: '28px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>You</div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
          
          {isTyping && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', background: 'var(--accent-blue)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="bot" size={16} color="#fff" />
              </div>
              <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Thinking</span>
                <span style={{ width: '4px', height: '4px', background: 'var(--text-tertiary)', borderRadius: '50%', animation: 'pulse 1s infinite 0s' }}></span>
                <span style={{ width: '4px', height: '4px', background: 'var(--text-tertiary)', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }}></span>
                <span style={{ width: '4px', height: '4px', background: 'var(--text-tertiary)', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }}></span>
              </div>
            </div>
          )}
        </div>
        
        <div style={{ borderTop: '1px solid var(--border-color)', padding: '16px 20px', background: 'var(--bg-primary)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
            <textarea value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && currentMessage.trim()) { e.preventDefault(); handleSend(currentMessage); } }} placeholder="Ask anything... (Use $...$ for math)" disabled={isTyping} rows={1} style={{ flex: 1, padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '15px', outline: 'none', resize: 'none', minHeight: '44px', maxHeight: '120px', fontFamily: 'inherit' }} />
            <button onClick={() => handleSend(currentMessage)} disabled={!currentMessage.trim() || isTyping} style={{ padding: '12px', background: currentMessage.trim() && !isTyping ? 'var(--accent-blue)' : 'var(--bg-tertiary)', color: currentMessage.trim() && !isTyping ? '#fff' : 'var(--text-tertiary)', border: '2px solid var(--border-strong)', borderRadius: 'var(--radius-md)', cursor: currentMessage.trim() && !isTyping ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '44px', width: '44px' }}>
              <Icon name="send" size={18} />
            </button>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '8px', textAlign: 'center' }}>Markdown & LaTeX supported</p>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .katex { font-size: 1.1em; }
        .katex-display { margin: 0.5em 0; }
        .provider-picker::-webkit-scrollbar { display: none; }
        
        .ai-chat-container {
          contain: layout style;
        }
        
        @media (max-width: 600px) {
          .ai-chat-overlay {
            padding: 8px !important;
            align-items: flex-end !important;
          }
          .ai-chat-container { 
            height: calc(100vh - 40px) !important;
            max-height: calc(100vh - 40px) !important; 
            margin: 0 !important; 
            border-radius: 16px 16px 0 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .ai-chat-header { padding: 10px 12px !important; }
          .ai-chat-messages {
            flex: 1 !important;
            min-height: 0 !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch;
          }
          .provider-picker button { padding: 4px 6px !important; font-size: 10px !important; }
        }
        
        @media (max-width: 400px) {
          .ai-chat-container {
            border-radius: 12px 12px 0 0 !important;
          }
        }
        
        @media (min-height: 700px) and (min-width: 601px) {
          .ai-chat-container {
            height: 80vh !important;
            max-height: 85vh !important;
          }
        }
        
        @media (orientation: landscape) and (max-height: 500px) {
          .ai-chat-container {
            height: 95vh !important;
            max-height: 95vh !important;
          }
        }
      `}</style>
    </div>
  );
};

window.AIChat = AIChat;
