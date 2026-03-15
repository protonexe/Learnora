const StudyAssistant = ({ isOpen, onClose, onNavigate, showToast }) => {
  const [messages, setMessages] = React.useState([
    { id: 1, role: 'assistant', content: 'Hi! I\'m your AI Study Assistant. Ask me anything about your courses, or I can help you with:\n\n📚 Course concepts\n📝 Quiz preparation\n💡 Study tips\n📖 Summary of topics\n❓ Answer questions', time: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  const quickActions = [
    { label: 'Explain this topic', icon: '📚', prompt: 'Can you explain the main concepts of' },
    { label: 'Quiz me', icon: '📝', prompt: 'Give me a quick quiz on' },
    { label: 'Summarize', icon: '📖', prompt: 'Give me a summary of' },
    { label: 'Study tips', icon: '💡', prompt: 'Give me study tips for' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text = input) => {
    if (!text.trim() || isLoading) return;
    
    const userMessage = { id: Date.now(), role: 'user', content: text, time: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    setTimeout(() => {
      const responses = [
        `Great question! Based on the topic "${text}", here's what you need to know:\n\n1. Key Concept: This is fundamental to understanding the subject.\n2. Remember: Practice is essential for mastery.\n3. Tip: Try relating this to real-world examples.\n\nWould you like me to elaborate on any of these points?`,
        `I'd be happy to help with "${text}"! Here's a quick overview:\n\n• The main idea involves understanding how different elements connect.\n• Key terms to remember: definition, application, and analysis.\n• A good study strategy is to create practice questions.\n\nWould you like a more detailed explanation?`,
        `That's an excellent question about "${text}". Let me break it down:\n\n**Core Concepts:**\n1. Start with the fundamentals\n2. Build understanding step by step\n3. Apply what you learn through practice\n\n**Study Recommendation:**\nTry the Feynman technique - explain the concept simply as if teaching someone else.\n\nNeed more specific help?`
      ];
      
      const assistantMessage = { 
        id: Date.now() + 1, 
        role: 'assistant', 
        content: responses[Math.floor(Math.random() * responses.length)], 
        time: new Date().toLocaleTimeString() 
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '400px',
      height: '500px',
      maxHeight: 'calc(100vh - 100px)',
      maxWidth: 'calc(100vw - 40px)',
      background: 'var(--bg-secondary)',
      borderRadius: '16px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 1000,
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ padding: '16px', background: 'var(--primary-500)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '14px' }}>AI Study Assistant</div>
            <div style={{ fontSize: '11px', opacity: 0.8 }}>Always here to help</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '20px' }}>✕</button>
      </div>

      {messages.length <= 1 && (
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Quick Actions:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quickActions.map((action, idx) => (
              <button key={idx} onClick={() => sendMessage(action.prompt)} style={{ padding: '8px 12px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{action.icon}</span>
                <span style={{ color: 'var(--text-primary)' }}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
            <div style={{ maxWidth: '80%', padding: '12px 16px', borderRadius: '16px', background: msg.role === 'user' ? 'var(--primary-500)' : 'var(--bg-tertiary)', color: msg.role === 'user' ? '#fff' : 'var(--text-primary)' }}>
              <p style={{ fontSize: '13px', margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{msg.content}</p>
              <p style={{ fontSize: '10px', opacity: 0.6, margin: '8px 0 0 0', textAlign: 'right' }}>{msg.time}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
            <div style={{ padding: '12px 16px', borderRadius: '16px', background: 'var(--bg-tertiary)' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--text-secondary)', borderRadius: '50%', animation: 'bounce 1s infinite' }}></span>
                <span style={{ width: '8px', height: '8px', background: 'var(--text-secondary)', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }}></span>
                <span style={{ width: '8px', height: '8px', background: 'var(--text-secondary)', borderRadius: '50%', animation: 'bounce 1s infinite 0.4s' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask anything..."
          style={{ flex: 1, padding: '10px 14px', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', fontSize: '13px' }}
        />
        <button onClick={() => sendMessage()} disabled={!input.trim() || isLoading} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-500)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ➤
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};

window.StudyAssistant = StudyAssistant;
