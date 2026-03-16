import React from 'react';
import { HelpCircle, BookOpen, MessageSquare, Video, Mail, Phone, ChevronRight, Search, ExternalLink, MessageCircle, Bot, FileText, Clock, ThumbsUp, Star } from './Icon';

const HelpCenter = ({ onClose }) => {
  const [activeTab, setActiveTab] = React.useState('home');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [chatOpen, setChatOpen] = React.useState(false);
  
  const faqs = [
    { id: 1, question: 'How do I track my study progress?', answer: 'You can view your progress in the Analytics section. It shows your daily activity, streaks, and completion rates.' },
    { id: 2, question: 'How do I create a study group?', answer: 'Go to the Study Groups section and click "Create New Group". You can invite friends and schedule sessions.' },
    { id: 3, question: 'Can I download courses for offline use?', answer: 'Yes! Open any course and look for the download button. Downloaded courses are available in the Offline section.' },
    { id: 4, question: 'How do I reset my password?', answer: 'Go to Settings > Security > Reset Password. You\'ll receive an email with reset instructions.' },
    { id: 5, question: 'How does the Pomodoro timer work?', answer: 'The Pomodoro technique uses 25-minute focused work sessions followed by 5-minute breaks. After 4 sessions, take a longer 15-30 minute break.' },
  ];
  
  const guides = [
    { id: 1, title: 'Getting Started', icon: '🚀', description: 'Learn the basics of Learnora', progress: 100 },
    { id: 2, title: 'Study Effectively', icon: '📚', description: 'Tips and techniques', progress: 60 },
    { id: 3, title: 'Using Flashcards', icon: '🧠', description: 'Create and study flashcards', progress: 30 },
    { id: 4, title: 'Taking Notes', icon: '📝', description: 'Note-taking best practices', progress: 0 },
  ];
  
  const topics = [
    { id: 1, name: 'Account & Settings', icon: '⚙️', articles: 12 },
    { id: 2, name: 'Courses & Learning', icon: '📖', articles: 18 },
    { id: 3, name: 'Study Tools', icon: '🔧', articles: 15 },
    { id: 4, name: 'Billing & Payments', icon: '💳', articles: 8 },
    { id: 5, name: 'Technical Issues', icon: '🔌', articles: 10 },
    { id: 6, name: 'Mobile App', icon: '📱', articles: 14 },
  ];
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 500,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: 20,
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        color: 'white'
      }}>
        <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <HelpCircle size={20} /> Help Center
        </h3>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 10
        }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              outline: 'none',
              color: 'white',
              fontSize: 14
            }}
          />
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)'
      }}>
        {['home', 'faqs', 'guides', 'contact'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '12px 8px',
              border: 'none',
              background: activeTab === tab ? 'var(--primary)' : 'transparent',
              color: activeTab === tab ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 12,
              textTransform: 'capitalize'
            }}
          >
            {tab === 'home' ? '🏠' : tab === 'faqs' ? '❓' : tab === 'guides' ? '📖' : '📞'} {tab}
          </button>
        ))}
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {activeTab === 'home' && (
          <div>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Popular Topics</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
              {topics.slice(0, 4).map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTab('faqs')}
                  style={{
                    padding: 14,
                    borderRadius: 10,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{topic.icon}</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{topic.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{topic.articles} articles</div>
                </button>
              ))}
            </div>
            
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                onClick={() => setChatOpen(true)}
                style={{
                  padding: 14,
                  borderRadius: 10,
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontWeight: 600
                }}
              >
                <MessageCircle size={20} /> Start Live Chat
              </button>
              <button style={{
                padding: 14,
                borderRadius: 10,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <Mail size={20} /> Email Support
              </button>
              <button style={{
                padding: 14,
                borderRadius: 10,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <Video size={20} /> Schedule Demo
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'faqs' && (
          <div>
            {faqs.map(faq => (
              <details
                key={faq.id}
                style={{
                  background: 'var(--bg)',
                  borderRadius: 10,
                  marginBottom: 8,
                  overflow: 'hidden'
                }}
              >
                <summary style={{
                  padding: 14,
                  cursor: 'pointer',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  {faq.question}
                  <ChevronRight size={18} style={{ color: 'var(--text-secondary)' }} />
                </summary>
                <div style={{
                  padding: '0 14px 14px',
                  color: 'var(--text-secondary)',
                  fontSize: 13,
                  lineHeight: 1.5
                }}>
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        )}
        
        {activeTab === 'guides' && (
          <div>
            {guides.map(guide => (
              <div
                key={guide.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 14,
                  background: 'var(--bg)',
                  borderRadius: 10,
                  marginBottom: 8,
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: 32 }}>{guide.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                    {guide.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    {guide.description}
                  </div>
                  <div style={{
                    height: 4,
                    background: 'var(--border-color)',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${guide.progress}%`,
                      background: guide.progress === 100 ? '#10b981' : 'var(--primary)',
                      borderRadius: 2
                    }} />
                  </div>
                </div>
                <ChevronRight size={18} style={{ color: 'var(--text-secondary)' }} />
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'contact' && (
          <div>
            <div style={{
              background: 'var(--bg)',
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)' }}>Need more help?</h4>
              <p style={{ margin: '0 0 16px 0', color: 'var(--text-secondary)', fontSize: 13 }}>
                Our support team is available 24/7
              </p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button style={{
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <MessageCircle size={18} /> Live Chat
                </button>
                <button style={{
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <Mail size={18} /> Email
                </button>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <button style={{
                padding: 16,
                borderRadius: 10,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8
              }}>
                <Phone size={24} />
                <span style={{ fontSize: 13 }}>Call Us</span>
              </button>
              <button style={{
                padding: 16,
                borderRadius: 10,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8
              }}>
                <MessageSquare size={24} />
                <span style={{ fontSize: 13 }}>Twitter</span>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {chatOpen && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 350,
          background: 'var(--card-bg)',
          borderRadius: 16,
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: 12,
            background: 'var(--primary)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bot size={20} /> Chat with Support
            </div>
            <button
              onClick={() => setChatOpen(false)}
              style={{
                padding: 4,
                border: 'none',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer',
                fontSize: 18
              }}
            >
              ×
            </button>
          </div>
          <div style={{ padding: 16, height: 200, overflow: 'auto' }}>
            <div style={{
              background: 'var(--bg)',
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
              maxWidth: '80%'
            }}>
              <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>
                Hi! How can I help you today?
              </div>
            </div>
          </div>
          <div style={{
            padding: 12,
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: 8
          }}>
            <input
              type="text"
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 20,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <button style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: 'none',
              background: 'var(--primary)',
              color: 'white',
              cursor: 'pointer'
            }}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenter;
