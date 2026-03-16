import React from 'react';
import { Users, MessageCircle, Video, Calendar, UserPlus, Search, Send } from './Icon';

const StudyGroup = ({ onClose }) => {
  const [activeTab, setActiveTab] = React.useState('groups');
  const [groups, setGroups] = React.useState([
    { id: 1, name: 'Physics Study Squad', members: 12, online: 4, subject: 'Physics', nextSession: 'Today, 3PM' },
    { id: 2, name: 'Math Masters', members: 8, online: 2, subject: 'Mathematics', nextSession: 'Tomorrow, 2PM' },
    { id: 3, name: 'Chemistry Club', members: 15, online: 6, subject: 'Chemistry', nextSession: 'Fri, 4PM' },
    { id: 4, name: 'English Literature', members: 10, online: 3, subject: 'English', nextSession: 'Sat, 1PM' },
  ]);
  const [messages, setMessages] = React.useState([
    { id: 1, user: 'Alice', text: 'Anyone ready for the physics exam?', time: '2:30 PM', avatar: 'A' },
    { id: 2, user: 'Bob', text: 'Yeah! Should we review chapter 5 together?', time: '2:32 PM', avatar: 'B' },
    { id: 3, user: 'Charlie', text: 'Count me in!', time: '2:35 PM', avatar: 'C' },
  ]);
  const [newMessage, setNewMessage] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      user: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'Y'
    }]);
    setNewMessage('');
  };
  
  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 400,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: 16,
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Users size={20} /> Study Groups
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setActiveTab('groups')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: 'none',
              background: activeTab === 'groups' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'groups' ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 13
            }}
          >
            Groups
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: 'none',
              background: activeTab === 'chat' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'chat' ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 13
            }}
          >
            Chat
          </button>
        </div>
      </div>
      
      {activeTab === 'groups' ? (
        <>
          <div style={{ padding: 12, borderBottom: '1px solid var(--border-color)' }}>
            <div style={{
              display: 'flex',
              gap: 8,
              background: 'var(--bg)',
              borderRadius: 8,
              padding: '8px 12px',
              border: '1px solid var(--border-color)'
            }}>
              <Search size={18} style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>
          
          <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
            {filteredGroups.map(group => (
              <div
                key={group.id}
                style={{
                  background: 'var(--bg)',
                  borderRadius: 10,
                  padding: 14,
                  marginBottom: 10,
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 8
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                      {group.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {group.subject}
                    </div>
                  </div>
                  <span style={{
                    background: '#10b98120',
                    color: '#10b981',
                    padding: '4px 8px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600
                  }}>
                    {group.online} online
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    👥 {group.members} members
                  </span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      style={{
                        padding: '6px 10px',
                        borderRadius: 6,
                        border: '1px solid var(--border-color)',
                        background: 'transparent',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        fontSize: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      <Calendar size={12} /> {group.nextSession}
                    </button>
                    <button
                      style={{
                        padding: '6px 10px',
                        borderRadius: 6,
                        border: 'none',
                        background: 'var(--primary)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      <Video size={12} /> Join
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              style={{
                width: '100%',
                padding: 14,
                borderRadius: 10,
                border: '2px dashed var(--border-color)',
                background: 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              <UserPlus size={18} /> Create New Group
            </button>
          </div>
        </>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  gap: 10,
                  marginBottom: 12,
                  justifyContent: msg.user === 'You' ? 'flex-end' : 'flex-start'
                }}
              >
                {msg.user !== 'You' && (
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#8b5cf6',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 600,
                    flexShrink: 0
                  }}>
                    {msg.avatar}
                  </div>
                )}
                <div style={{
                  background: msg.user === 'You' ? 'var(--primary)' : 'var(--bg)',
                  color: msg.user === 'You' ? 'white' : 'var(--text-primary)',
                  padding: '10px 14px',
                  borderRadius: 12,
                  maxWidth: '70%'
                }}>
                  {msg.user !== 'You' && (
                    <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4, color: 'var(--text-secondary)' }}>
                      {msg.user}
                    </div>
                  )}
                  <div style={{ fontSize: 14 }}>{msg.text}</div>
                  <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4, textAlign: 'right' }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
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
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: 'none',
                background: 'var(--primary)',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyGroup;
