const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = React.useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem('learnora-ai-chat-history');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [aiProvider, setAiProvider] = React.useState(() => {
    return localStorage.getItem('learnora-ai-provider') || 'gamma';
  });
  const messagesEndRef = React.useRef(null);
  const messagesRef = React.useRef([]);
  const chatContainerRef = React.useRef(null);

  // Save messages to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('learnora-ai-chat-history', JSON.stringify(messages));
  }, [messages]);

  // Clear chat history function
  const clearChatHistory = () => {
    setMessages([]);
    localStorage.removeItem('learnora-ai-chat-history');
  };
  
  // API Keys
  const GEMINI_API_KEY = "AIzaSyCBvj6U-sZ0CdV2YngvgajKom5fq3UqXq4";
  const GEMINI_MODEL = "gemini-2.5-flash";
  const NGROK_BASE_URL = "https://retractable-unheedingly-arnetta.ngrok-free.dev";
  const selectedModel = "google/gemma-3-4b";

  // Save AI provider preference
  React.useEffect(() => {
    localStorage.setItem('learnora-ai-provider', aiProvider);
  }, [aiProvider]);

  // Keep messagesRef in sync
  React.useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Render LaTeX and Markdown after messages update
  React.useEffect(() => {
    if (chatContainerRef.current) {
      // Render Markdown first
      const markdownElements = chatContainerRef.current.querySelectorAll('.markdown-content');
      markdownElements.forEach(el => {
        if (!el.dataset.rendered) {
          const markdownText = el.dataset.markdown || el.textContent;
          el.innerHTML = parseMarkdown(markdownText);
          el.dataset.rendered = 'true';
        }
      });
      
      // Then render KaTeX math
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

  // Simple markdown parser
  const parseMarkdown = (text) => {
    if (!text) return '';
    
    let html = text
      // Escape HTML first
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Headers
      .replace(/^### (.*$)/gim, '<h3 style="font-size: 18px; font-weight: 600; margin: 16px 0 8px; color: var(--text-primary);">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 style="font-size: 20px; font-weight: 600; margin: 20px 0 12px; color: var(--text-primary);">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 style="font-size: 24px; font-weight: 700; margin: 24px 0 16px; color: var(--text-primary);">$1</h1>')
      // Bold and Italic
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600;">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>')
      .replace(/__(.*?)__/g, '<strong style="font-weight: 600;">$1</strong>')
      .replace(/_(.*?)_/g, '<em style="font-style: italic;">$1</em>')
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre style="background: var(--bg-tertiary); padding: 16px; border-radius: var(--radius-md); overflow-x: auto; margin: 12px 0; font-family: var(--font-mono); font-size: 13px; line-height: 1.5;"><code style="background: transparent;">$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code style="background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 14px; color: var(--accent-red);">$1</code>')
      // Horizontal rule
      .replace(/^---+$/gim, '<hr style="border: none; border-top: 1px solid var(--border-color); margin: 20px 0;">')
      // Tables
      .replace(/\|(.+)\|\n\|[-:\| ]+\|\n((?:\|.+)\n?)+/g, (match) => {
        const lines = match.trim().split('\n');
        const headerCells = lines[0].split('|').filter(c => c.trim()).map(c => `<th style="padding: 10px 12px; text-align: left; font-weight: 600; color: var(--text-primary); border-bottom: 2px solid var(--border-color);">${c.trim()}</th>`).join('');
        const bodyRows = lines.slice(2).map(line => {
          const cells = line.split('|').filter(c => c.trim()).map(c => `<td style="padding: 8px 12px; color: var(--text-secondary); border-bottom: 1px solid var(--border-color);">${c.trim()}</td>`).join('');
          return `<tr>${cells}</tr>`;
        }).join('');
        return `<table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
      })
      // Bullet lists
      .replace(/^\* (.*$)/gim, '<li style="margin: 4px 0; padding-left: 8px;">$1</li>')
      .replace(/^- (.*$)/gim, '<li style="margin: 4px 0; padding-left: 8px;">$1</li>')
      // Numbered lists
      .replace(/^\d+\. (.*$)/gim, '<li style="margin: 4px 0; padding-left: 8px;">$1</li>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote style="border-left: 3px solid var(--accent-blue); padding-left: 16px; margin: 12px 0; color: var(--text-secondary); font-style: italic;">$1</blockquote>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: var(--accent-blue); text-decoration: none;">$1</a>')
      // Line breaks and paragraphs
      .replace(/\n\n/g, '</p><p style="margin: 12px 0; line-height: 1.7;">')
      .replace(/\n/g, '<br>');
    
    // Wrap in paragraph if not already wrapped
    if (!html.startsWith('<')) {
      html = '<p style="margin: 12px 0; line-height: 1.7;">' + html + '</p>';
    }
    
    // Wrap lists in ul/ol
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
    
    // Convert markdown code blocks with latex to proper LaTeX delimiters
    let processed = text
      .replace(/```latex\n/g, '$$')
      .replace(/\n```/g, '$$')
      .replace(/`\$(.+?)\$`/g, '$$$1$$')
      .replace(/\\begin\{equation\}/g, '$$')
      .replace(/\\end\{equation\}/g, '$$')
      .replace(/\\begin\{align\}/g, '$$')
      .replace(/\\end\{align\}/g, '$$');
    
    return processed;
  };

  const callGeminiAPI = async (messageHistory, userMessage) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    
    // Convert messages to Gemini format
    const contents = [
      {
        role: "user",
        parts: [{ text: "You are an expert educational AI tutor for Learnora. You help students with their studies across various subjects including mathematics, science, literature, and more. Provide clear, educational, and helpful responses. When explaining mathematical concepts, use LaTeX formatting with $...$ for inline math and $$...$$ for display math. Keep your answers concise but informative. You can explain concepts, help with homework problems, quiz students, and provide study tips." }]
      },
      {
        role: "model",
        parts: [{ text: "I understand. I'm ready to help students as an educational AI tutor. I'll use clear explanations and proper LaTeX formatting for mathematical expressions." }]
      }
    ];
    
    // Add conversation history
    messageHistory.forEach(msg => {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    });
    
    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const callDeepSeekAPI = async (messageHistory, userMessage) => {
    const apiMessages = [
      {
        role: "system",
        content: "You are an expert educational AI tutor for Learnora. You help students with their studies across various subjects including mathematics, science, literature, and more. Provide clear, educational, and helpful responses. When explaining mathematical concepts, use LaTeX formatting with $...$ for inline math and $$...$$ for display math. Keep your answers concise but informative. You can explain concepts, help with homework problems, quiz students, and provide study tips."
      },
      ...messageHistory.map(msg => ({ role: msg.role, content: msg.content })),
      { role: "user", content: userMessage }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const callNgrokAPI = async (messageHistory, userMessage) => {
    const apiMessages = [
      {
        role: "system",
        content: "You are an expert educational AI tutor for Learnora. You help students with their studies across various subjects including mathematics, science, literature, and more. Provide clear, educational, and helpful responses."
      },
      ...messageHistory.map(msg => ({ role: msg.role, content: msg.content })),
      { role: "user", content: userMessage }
    ];

    const response = await fetch(`${NGROK_BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`Ngrok API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const handleSend = React.useCallback(async (message) => {
    if (!message.trim()) return;
    
    const userMessage = { 
      role: 'user', 
      content: message, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    const updatedMessages = [...messagesRef.current, userMessage];
    setMessages(updatedMessages);
    messagesRef.current = updatedMessages;
    
    setCurrentMessage('');
    setIsTyping(true);

    try {
      let aiResponse;
      
      if (aiProvider === 'alpha') {
        aiResponse = await callGeminiAPI(messagesRef.current.slice(0, -1), message);
      } else if (aiProvider === 'gamma') {
        aiResponse = await callNgrokAPI(messagesRef.current.slice(0, -1), message);
      } else {
        aiResponse = await callNgrokAPI(messagesRef.current.slice(0, -1), message);
      }
      
      // Process LaTeX in response
      aiResponse = renderLatexInText(aiResponse);

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    } catch (error) {
      console.error("AI Tutor Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error.message}. Please try again or switch to a different AI provider.`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      }]);
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
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--bg-primary)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '800px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'var(--accent-blue)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon name="bot" size={18} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>AI Tutor</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>
                Powered by {aiProvider === 'gemini' ? 'Gemini' : 'DeepSeek'}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Clear History Button */}
            {messages.length > 0 && (
              <button
                onClick={clearChatHistory}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Icon name="trash-2" size={14} />
                Clear
              </button>
            )}
            {/* AI Provider Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <button
                onClick={() => setAiProvider('alpha')}
                style={{
                  padding: '6px 12px',
                  background: aiProvider === 'alpha' ? 'var(--bg-primary)' : 'transparent',
                  border: '2px solid var(--border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: aiProvider === 'alpha' ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                Alpha
              </button>
              <button
                onClick={() => setAiProvider('gamma')}
                style={{
                  padding: '6px 12px',
                  background: aiProvider === 'gamma' ? 'var(--bg-primary)' : 'transparent',
                  border: '2px solid var(--border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: aiProvider === 'gamma' ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                Gamma
              </button>
            </div>
            
            <button 
              onClick={onClose}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-light)',
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon name="x" size={20} color="var(--text-secondary)" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '20px',
            background: 'var(--bg-secondary)'
          }}
        >
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                margin: '0 auto 20px', 
                background: 'var(--bg-tertiary)', 
                borderRadius: 'var(--radius-lg)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <Icon name="sparkles" size={28} color="var(--accent-blue)" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                How can I help you today?
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Ask me anything about your studies. I can help with math, science, literature, and more.
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '24px' }}>
                Supports Markdown formatting • Math equations render with LaTeX
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    style={{
                      padding: '12px 16px',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all var(--transition-fast)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Icon name="message-square" size={16} color="var(--text-tertiary)" />
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
                    gap: '12px',
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}
                >
                  {msg.role === 'assistant' && (
                    <div style={{
                      width: '28px',
                      height: '28px',
                      background: 'var(--accent-blue)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon name="bot" size={16} color="#fff" />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div 
                      className={msg.role === 'assistant' ? 'markdown-content' : ''}
                      data-markdown={msg.role === 'assistant' ? msg.content : ''}
                      style={{ 
                        background: msg.role === 'user' ? 'var(--bg-tertiary)' : 'var(--bg-primary)', 
                        color: msg.isError ? 'var(--danger)' : 'var(--text-primary)', 
                        padding: '12px 16px', 
                        borderRadius: 'var(--radius-md)',
                        border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
                        fontSize: '15px', 
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
                      width: '28px',
                      height: '28px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '12px',
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
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: '28px',
                height: '28px',
                background: 'var(--accent-blue)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon name="bot" size={16} color="#fff" />
              </div>
              <div style={{ 
                background: 'var(--bg-primary)', 
                padding: '12px 16px', 
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
          padding: '16px 20px',
          background: 'var(--bg-primary)'
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => { 
                if (e.key === 'Enter' && !e.shiftKey && currentMessage.trim()) {
                  e.preventDefault();
                  handleSend(currentMessage); 
                }
              }}
              placeholder="Ask anything... (Use $...$ for math)"
              disabled={isTyping}
              rows={1}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '15px',
                outline: 'none',
                resize: 'none',
                minHeight: '44px',
                maxHeight: '120px',
                fontFamily: 'inherit'
              }}
            />
            <button
              onClick={() => handleSend(currentMessage)}
              disabled={!currentMessage.trim() || isTyping}
              style={{
                padding: '12px',
                background: currentMessage.trim() && !isTyping ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
                color: currentMessage.trim() && !isTyping ? '#fff' : 'var(--text-tertiary)',
                border: '2px solid var(--border-strong)',
                borderRadius: 'var(--radius-md)',
                cursor: currentMessage.trim() && !isTyping ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '44px',
                width: '44px'
              }}
            >
              <Icon name="send" size={18} />
            </button>
          </div>
          <p style={{ 
            fontSize: '11px', 
            color: 'var(--text-tertiary)', 
            marginTop: '8px',
            textAlign: 'center'
          }}>
            Markdown & LaTeX supported • $...$ for inline math • $$...$$ for display math • AI may make mistakes
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .katex { font-size: 1.1em; }
        .katex-display { margin: 0.5em 0; }
      `}</style>
    </div>
  );
};

window.AIChat = AIChat;
