const AITutorView = () => {
  const [conversations, setConversations] = React.useState(() => {
    try {
      const saved = localStorage.getItem('learnora-ai-conversations');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  
  const [activeConversationId, setActiveConversationId] = React.useState(null);
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  
  const isMobile = window.innerWidth <= 768;
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);
  
  const [aiProvider, setAiProvider] = React.useState(() => {
    return localStorage.getItem('learnora-ai-provider') || 'gemini';
  });
  const [editingId, setEditingId] = React.useState(null);
  const [editName, setEditName] = React.useState('');
  
  const messagesEndRef = React.useRef(null);
  const chatContainerRef = React.useRef(null);
  
  const getApiConfig = () => window.APP_CONFIG || {
    gemini: { key: "", models: [{ id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' }] },
    openrouter: { key: "", models: [{ id: 'deepseek/deepseek-r1-0528:free', label: 'DeepSeek R1' }] }
  };
  const apiConfig = getApiConfig();
  const GEMINI_API_KEY = apiConfig.gemini?.key || "";
  const OPENROUTER_API_KEY = apiConfig.openrouter?.key || "";
  const GEMINI_MODEL = "gemini-2.5-flash";
  const DEEPSEEK_MODEL = "deepseek/deepseek-r1-0528:free";

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const messages = activeConversation?.messages || [];

  React.useEffect(() => {
    try {
      localStorage.setItem('learnora-ai-conversations', JSON.stringify(conversations));
    } catch (e) {
      console.error('Failed to save conversations:', e);
    }
  }, [conversations]);

  React.useEffect(() => {
    localStorage.setItem('learnora-ai-provider', aiProvider);
  }, [aiProvider]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Render KaTeX math after messages update
  React.useEffect(() => {
    if (window.renderMathInElement && chatContainerRef.current) {
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
  }, [messages]);

  const createConversation = () => {
    const newConv = {
      id: Date.now().toString(),
      name: 'New Conversation',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
  };

  const deleteConversation = (id) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  };

  const renameConversation = (id, newName) => {
    if (!newName.trim()) return;
    setConversations(prev => prev.map(c => 
      c.id === id 
        ? { ...c, name: newName.trim(), updatedAt: new Date().toISOString() }
        : c
    ));
  };

  const callGeminiAPI = async (userMessage, conversationHistory) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    
    const contents = [
      {
        role: "user",
        parts: [{ text: "You are an expert educational AI tutor. Provide clear, helpful responses. Use LaTeX formatting with $...$ for math." }]
      },
      {
        role: "model",
        parts: [{ text: "I understand. I'm ready to help as an educational AI tutor with LaTeX formatting for math." }]
      }
    ];
    
    // Add conversation history (last 10 messages)
    const recentHistory = conversationHistory.slice(-10);
    recentHistory.forEach(msg => {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    });
    
    contents.push({
      role: "user",
      parts: [{ text: userMessage }]
    });

    const response = await fetch("https://corsproxy.io/?" + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 2000 }
      })
    });

    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const callDeepSeekAPI = async (userMessage, conversationHistory) => {
    const apiMessages = [
      {
        role: "system",
        content: "You are an expert educational AI tutor. Provide clear, helpful responses. Use LaTeX formatting with $...$ for math."
      }
    ];
    
    // Add conversation history (last 10 messages)
    const recentHistory = conversationHistory.slice(-10);
    recentHistory.forEach(msg => {
      apiMessages.push({
        role: msg.role,
        content: msg.content
      });
    });

    const response = await fetch("https://corsproxy.io/?https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.href,
        "X-Title": "Learnora AI Tutor"
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) throw new Error(`DeepSeek API error: ${response.status}`);
    
    const data = await response.json();
    return data.choices[0].message.content;
  };

  const handleSend = async (message) => {
    if (!message.trim()) return;
    
    let convId = activeConversationId;
    
    if (!convId) {
      const newConv = {
        id: Date.now().toString(),
        name: message.slice(0, 30) + (message.length > 30 ? '...' : ''),
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setConversations(prev => [newConv, ...prev]);
      convId = newConv.id;
      setActiveConversationId(convId);
    }
    
    const userMessage = { 
      role: 'user', 
      content: message, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: Date.now().toString()
    };
    
    setConversations(prev => prev.map(c => 
      c.id === convId 
        ? { ...c, messages: [...c.messages, userMessage], updatedAt: new Date().toISOString() }
        : c
    ));
    
    setCurrentMessage('');
    setIsTyping(true);

    const currentConv = conversations.find(c => c.id === convId);
    const currentMessages = currentConv?.messages || [];
    
    try {
      let aiResponse;
      if (aiProvider === 'gemini') {
        aiResponse = await callGeminiAPI(message, currentMessages);
      } else {
        aiResponse = await callDeepSeekAPI(message, currentMessages);
      }
      
      setConversations(prev => prev.map(c => 
        c.id === convId 
          ? { 
              ...c, 
              messages: [...c.messages, { 
                role: 'assistant', 
                content: aiResponse, 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                id: Date.now().toString()
              }],
              updatedAt: new Date().toISOString()
            }
          : c
      ));
    } catch (error) {
      console.error("AI Error:", error);
      setConversations(prev => prev.map(c => 
        c.id === convId 
          ? { 
              ...c, 
              messages: [...c.messages, { 
                role: 'assistant', 
                content: `Error: ${error.message}. Please try again.`, 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                id: Date.now().toString(),
                isError: true
              }],
              updatedAt: new Date().toISOString()
            }
          : c
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const suggestions = [
    'Explain quadratic equations',
    'Help me understand photosynthesis',
    'Quiz me on World War II',
    'How do I solve integrals?'
  ];

  const parseMarkdown = (text) => {
    if (!text) return '';
    
    // Protect LaTeX math delimiters before applying markdown transformations
    const displayMath = [];
    const inlineMath = [];
    
    // Protect display math ($$...$$ and \[...\])
    let protectedText = text
      .replace(/\$\$[\s\S]*?\$\$/g, (match) => {
        displayMath.push(match);
        return `__DISPLAY_MATH_${displayMath.length - 1}__`;
      })
      .replace(/\\\[[\s\S]*?\\\]/g, (match) => {
        displayMath.push(match);
        return `__DISPLAY_MATH_${displayMath.length - 1}__`;
      });
    
    // Protect inline math ($...$ and \(...\))
    protectedText = protectedText
      .replace(/\$[^\$\n]+?\$/g, (match) => {
        inlineMath.push(match);
        return `__INLINE_MATH_${inlineMath.length - 1}__`;
      })
      .replace(/\\\([^\)]+?\\\)/g, (match) => {
        inlineMath.push(match);
        return `__INLINE_MATH_${inlineMath.length - 1}__`;
      });
    
    // Apply markdown transformations
    let html = protectedText
      // Headers
      .replace(/^### (.*$)/gim, '<h3 style="font-size: 16px; font-weight: 600; margin: 12px 0 8px; color: var(--text-primary);">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 style="font-size: 18px; font-weight: 600; margin: 14px 0 10px; color: var(--text-primary);">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 style="font-size: 20px; font-weight: 700; margin: 16px 0 12px; color: var(--text-primary);">$1</h1>')
      // Bold and Italic
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre style="background: var(--bg-tertiary); padding: 12px; border-radius: var(--radius-md); overflow-x: auto; margin: 8px 0; font-family: monospace; font-size: 13px;"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code style="background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 13px;">$1</code>')
      // Bullet lists
      .replace(/^\* (.*$)/gim, '<li style="margin: 4px 0; margin-left: 16px;">$1</li>')
      .replace(/^- (.*$)/gim, '<li style="margin: 4px 0; margin-left: 16px;">$1</li>')
      // Line breaks
      .replace(/\n\n/g, '</p><p style="margin: 8px 0;">')
      .replace(/\n/g, '<br>');
    
    // Restore display math
    displayMath.forEach((math, index) => {
      html = html.replace(`__DISPLAY_MATH_${index}__`, math);
    });
    
    // Restore inline math
    inlineMath.forEach((math, index) => {
      html = html.replace(`__INLINE_MATH_${index}__`, math);
    });
    
    if (!html.startsWith('<')) {
      html = '<p style="margin: 8px 0;">' + html + '</p>';
    }
    
    return html;
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: 'calc(100vh - 72px)',
      background: 'var(--bg-primary)',
      overflow: 'hidden'
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? (isMobile ? '100%' : '280px') : '0',
        position: isMobile && sidebarOpen ? 'absolute' : 'relative',
        zIndex: isMobile && sidebarOpen ? 100 : 1,
        height: isMobile && sidebarOpen ? '100%' : 'auto',
        borderRight: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'width 0.3s ease'
      }}>
        <div style={{
          padding: isMobile ? '12px' : '16px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={createConversation}
            style={{
              flex: 1,
              padding: isMobile ? '8px' : '10px',
              background: 'var(--primary-500)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: isMobile ? '13px' : '14px',
              fontWeight: '600'
            }}
          >
            + New Chat
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: 'var(--bg-tertiary)',
              border: 'none',
              width: isMobile ? '36px' : '40px',
              height: isMobile ? '36px' : '40px',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span>&#8592;</span>
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '6px' : '8px' }}>
          {conversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => {
                if (editingId !== conv.id) {
                  setActiveConversationId(conv.id);
                }
              }}
              style={{
                padding: isMobile ? '10px' : '12px',
                borderRadius: 'var(--radius-md)',
                cursor: editingId === conv.id ? 'default' : 'pointer',
                background: activeConversationId === conv.id ? 'var(--bg-tertiary)' : 'transparent',
                marginBottom: '4px'
              }}
            >
              {editingId === conv.id ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        renameConversation(conv.id, editName);
                        setEditingId(null);
                      } else if (e.key === 'Escape') {
                        setEditingId(null);
                      }
                    }}
                    onBlur={() => {
                      renameConversation(conv.id, editName);
                      setEditingId(null);
                    }}
                    autoFocus
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '14px',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ 
                      fontSize: '14px', 
                      fontWeight: 500, 
                      margin: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {conv.name}
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', margin: '4px 0 0' }}>
                      {new Date(conv.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(conv.id);
                        setEditName(conv.name);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '4px',
                        cursor: 'pointer',
                        opacity: 0.6,
                        color: 'var(--text-secondary)'
                      }}
                      title="Rename"
                    >
                      <span>&#9998;</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conv.id);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '4px',
                        cursor: 'pointer',
                        opacity: 0.6,
                        color: 'var(--danger)'
                      }}
                      title="Delete"
                    >
                      <span>&#128465;</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{
          padding: isMobile ? '10px 12px' : '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: 'none',
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span>&#8594;</span>
              </button>
            )}
            <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>
              {activeConversation?.name || 'AI Tutor'}
            </h2>
          </div>
          
          {/* AI Provider Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: isMobile ? '2px' : '4px',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)'
          }}>
            <button
              onClick={() => setAiProvider('gemini')}
              style={{
                padding: isMobile ? '4px 8px' : '6px 12px',
                background: aiProvider === 'gemini' ? 'var(--bg-primary)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontSize: isMobile ? '11px' : '13px',
                fontWeight: 500,
                color: aiProvider === 'gemini' ? 'var(--text-primary)' : 'var(--text-tertiary)',
                cursor: 'pointer'
              }}
            >
              Gemini
            </button>
            <button
              onClick={() => setAiProvider('deepseek')}
              style={{
                padding: isMobile ? '4px 8px' : '6px 12px',
                background: aiProvider === 'deepseek' ? 'var(--bg-primary)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontSize: isMobile ? '11px' : '13px',
                fontWeight: 500,
                color: aiProvider === 'deepseek' ? 'var(--text-primary)' : 'var(--text-tertiary)',
                cursor: 'pointer'
              }}
            >
              DeepSeek
            </button>
          </div>
        </div>

        {/* Messages */}
        <div 
          ref={chatContainerRef}
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: isMobile ? '12px' : '20px',
            background: 'var(--bg-secondary)',
            maxHeight: isMobile ? 'calc(100vh - 180px)' : 'calc(100vh - 220px)'
          }}>
          {!activeConversation || messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: isMobile ? '24px 16px' : '40px 20px' }}>
              <div style={{ 
                width: isMobile ? '48px' : '64px', 
                height: isMobile ? '48px' : '64px', 
                margin: isMobile ? '0 auto 16px' : '0 auto 20px', 
                background: 'var(--bg-tertiary)', 
                borderRadius: 'var(--radius-lg)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: isMobile ? '24px' : '32px'
              }}>
                &#129302;
              </div>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 600, marginBottom: '8px' }}>
                How can I help you today?
              </h3>
              <p style={{ fontSize: isMobile ? '13px' : '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Ask me anything about your studies.
              </p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                gap: isMobile ? '6px' : '8px', 
                maxWidth: '400px', 
                margin: '0 auto' 
              }}>
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    style={{
                      padding: isMobile ? '10px 12px' : '12px 16px',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: isMobile ? '13px' : '14px',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                  <div 
                  key={idx} 
                  style={{ 
                    display: 'flex',
                    gap: isMobile ? '8px' : '12px',
                    alignItems: 'flex-start',
                    marginBottom: isMobile ? '12px' : '16px'
                  }}
                >
                  {msg.role === 'assistant' && (
                    <div style={{
                      width: isMobile ? '24px' : '28px',
                      height: isMobile ? '24px' : '28px',
                      background: 'var(--accent-blue)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span style={{color: '#fff', fontSize: isMobile ? '12px' : '14px'}}>&#129302;</span>
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div 
                      style={{ 
                        background: msg.role === 'user' ? 'var(--bg-tertiary)' : 'var(--bg-primary)', 
                        color: msg.isError ? 'var(--danger)' : 'var(--text-primary)', 
                        padding: isMobile ? '10px 12px' : '12px 16px', 
                        borderRadius: 'var(--radius-md)',
                        border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
                        fontSize: isMobile ? '14px' : '15px', 
                        lineHeight: '1.7',
                        overflowWrap: 'break-word'
                      }}
                      dangerouslySetInnerHTML={msg.role === 'assistant' ? { __html: parseMarkdown(msg.content) } : undefined}
                    >
                      {msg.role === 'user' ? msg.content : null}
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      color: 'var(--text-tertiary)', 
                      marginTop: '4px',
                      textAlign: msg.role === 'user' ? 'right' : 'left'
                    }}>
                      {msg.time}
                    </div>
                  </div>
                  {msg.role === 'user' && (
                    <div style={{
                      width: isMobile ? '24px' : '28px',
                      height: isMobile ? '24px' : '28px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: isMobile ? '10px' : '12px',
                      fontWeight: 500,
                      color: 'var(--text-secondary)'
                    }}>
                      You
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
          
          {isTyping && (
            <div style={{ display: 'flex', gap: isMobile ? '8px' : '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: isMobile ? '24px' : '28px',
                height: isMobile ? '24px' : '28px',
                background: 'var(--accent-blue)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{color: '#fff', fontSize: isMobile ? '12px' : '14px'}}>&#129302;</span>
              </div>
              <div style={{ 
                background: 'var(--bg-primary)', 
                padding: isMobile ? '10px 12px' : '12px 16px', 
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                display: 'flex', 
                gap: '4px',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Thinking</span>
                <span style={{ 
                  width: '4px', 
                  height: '4px', 
                  background: 'var(--text-tertiary)', 
                  borderRadius: '50%', 
                  animation: 'pulse 1s infinite 0s'
                }} />
                <span style={{ 
                  width: '4px', 
                  height: '4px', 
                  background: 'var(--text-tertiary)', 
                  borderRadius: '50%', 
                  animation: 'pulse 1s infinite 0.2s'
                }} />
                <span style={{ 
                  width: '4px', 
                  height: '4px', 
                  background: 'var(--text-tertiary)', 
                  borderRadius: '50%', 
                  animation: 'pulse 1s infinite 0.4s'
                }} />
              </div>
            </div>
          )}
        </div>
        
        {/* Input Area */}
        <div style={{ 
          borderTop: '1px solid var(--border-color)', 
          padding: isMobile ? '10px 12px' : '16px 20px',
          background: 'var(--bg-primary)'
        }}>
          <div style={{ display: 'flex', gap: isMobile ? '8px' : '12px', alignItems: 'flex-end' }}>
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => { 
                if (e.key === 'Enter' && !e.shiftKey && currentMessage.trim()) {
                  e.preventDefault();
                  handleSend(currentMessage); 
                }
              }}
              placeholder="Ask anything..."
              disabled={isTyping}
              rows={1}
              style={{
                flex: 1,
                padding: isMobile ? '10px 12px' : '12px 16px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: isMobile ? '14px' : '15px',
                outline: 'none',
                resize: 'none',
                minHeight: isMobile ? '40px' : '44px',
                maxHeight: '120px',
                fontFamily: 'inherit'
              }}
            />
            <button
              onClick={() => handleSend(currentMessage)}
              disabled={!currentMessage.trim() || isTyping}
              style={{
                padding: isMobile ? '10px' : '12px',
                background: currentMessage.trim() && !isTyping ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
                color: currentMessage.trim() && !isTyping ? '#fff' : 'var(--text-tertiary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: currentMessage.trim() && !isTyping ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: isMobile ? '40px' : '44px',
                width: isMobile ? '40px' : '44px'
              }}
            >
              <span>&#10148;</span>
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

window.AITutorView = AITutorView;
