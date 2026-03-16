import React from 'react';
import { MessageSquare, Send, Image, Smile, Paperclip, MoreVertical, User, Bot } from './Icon';

const AIChatWidget = ({ onClose }) => {
  const [messages, setMessages] = React.useState([
    { id: 1, role: 'assistant', content: 'Hello! I\'m your AI study assistant. How can I help you today?', timestamp: new Date() }
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef(null);
  
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const quickQuestions = [
    'Explain photosynthesis',
    'Solve: 2x + 5 = 15',
    'What is quantum physics?',
    'Help with essay writing',
    'Quiz me on history'
  ];
  
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me explain...",
        "Based on my knowledge, here's what I can tell you...",
        "Interesting! Let me break this down for you...",
        "Here's a helpful explanation for you...",
        "I'd be happy to help with that! Here's what you need to know..."
      ];
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const askQuestion = (question) => {
    setInput(question);
    sendMessage();
  };
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 400,
      height: 500,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: 16,
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bot size={20} /> AI Tutor
        </h3>
        <span style={{
          background: '#10b98120',
          color: '#10b981',
          padding: '4px 10px',
          borderRadius: 12,
          fontSize: 11,
          fontWeight: 600
        }}>
          Online
        </span>
      </div>
      
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              gap: 10,
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            {msg.role === 'assistant' && (
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Bot size={18} style={{ color: 'white' }} />
              </div>
            )}
            <div style={{
              maxWidth: '70%',
              padding: '12px 16px',
              borderRadius: 16,
              background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg)',
              color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
              fontSize: 14,
              lineHeight: 1.5
            }}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <User size={18} style={{ color: 'white' }} />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={18} style={{ color: 'white' }} />
            </div>
            <div style={{
              padding: '12px 16px',
              borderRadius: 16,
              background: 'var(--bg)',
              color: 'var(--text-secondary)'
            }}>
              <span style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--text-secondary)',
                margin: 2,
                animation: 'pulse 1s infinite'
              }} />
              <span style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--text-secondary)',
                margin: 2,
                animation: 'pulse 1s infinite 0.2s'
              }} />
              <span style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--text-secondary)',
                margin: 2,
                animation: 'pulse 1s infinite 0.4s'
              }} />
            </div>
          </div>
        )}
        
        {messages.length <= 1 && (
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
              Quick questions:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => askQuestion(q)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 16,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: 12
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div style={{
        padding: 12,
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }}>
        <button
          style={{
            padding: 8,
            borderRadius: 8,
            border: 'none',
            background: 'transparent',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <Image size={20} />
        </button>
        <button
          style={{
            padding: 8,
            borderRadius: 8,
            border: 'none',
            background: 'transparent',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 20,
            border: '1px solid var(--border-color)',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            outline: 'none'
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: 'none',
            background: input.trim() ? 'var(--primary)' : 'var(--border-color)',
            color: 'white',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Send size={18} />
        </button>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AIChatWidget;
