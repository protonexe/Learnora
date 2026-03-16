import React from 'react';
import { Search, Filter, Plus, X, ChevronDown, Calendar, Clock, MapPin, Users, Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Send, MoreVertical, Star, Trash2, Edit2, Copy, Share2, Download, ExternalLink, Hand, Smile } from './Icon';

const LiveSession = ({ onClose }) => {
  const [chatOpen, setChatOpen] = React.useState(true);
  const [participantsOpen, setParticipantsOpen] = React.useState(true);
  const [micOn, setMicOn] = React.useState(true);
  const [videoOn, setVideoOn] = React.useState(true);
  const [handRaised, setHandRaised] = React.useState(false);
  const [screenSharing, setScreenSharing] = React.useState(false);
  const [chatMessage, setChatMessage] = React.useState('');
  const [messages, setMessages] = React.useState([
    { id: 1, user: 'Instructor', text: 'Welcome to today\'s session!', time: '10:00', isInstructor: true },
    { id: 2, user: 'Alice', text: 'Hello everyone!', time: '10:01', isInstructor: false },
    { id: 3, user: 'Bob', text: 'Ready to learn!', time: '10:02', isInstructor: false },
  ]);
  
  const participants = [
    { id: 1, name: 'Dr. Smith', role: 'Instructor', avatar: 'S', isInstructor: true, handRaised: false, muted: false },
    { id: 2, name: 'Alice Johnson', role: 'Student', avatar: 'A', isInstructor: false, handRaised: false, muted: false },
    { id: 3, name: 'Bob Wilson', role: 'Student', avatar: 'B', isInstructor: false, handRaised: true, muted: false },
    { id: 4, name: 'Charlie Brown', role: 'Student', avatar: 'C', isInstructor: false, handRaised: false, muted: true },
    { id: 5, name: 'Diana Lee', role: 'Student', avatar: 'D', isInstructor: false, handRaised: false, muted: false },
  ];
  
  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      user: 'You',
      text: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isInstructor: false
    }]);
    setChatMessage('');
  };
  
  const onlineCount = participants.length;
  
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#0f0f23'
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          padding: '12px 20px',
          background: '#1a1a2e',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #2d2d4a'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#ef4444',
                animation: 'pulse 1.5s infinite'
              }} />
              <span style={{ color: 'white', fontWeight: 600 }}>Live Session: Advanced Physics</span>
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
              🔴 Live • {onlineCount} participants
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setChatOpen(!chatOpen)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: 'none',
                background: chatOpen ? '#3b82f6' : 'transparent',
                color: 'white',
                cursor: 'pointer',
                fontSize: 13
              }}
            >
              💬 Chat
            </button>
            <button
              onClick={() => setParticipantsOpen(!participantsOpen)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: 'none',
                background: participantsOpen ? '#3b82f6' : 'transparent',
                color: 'white',
                cursor: 'pointer',
                fontSize: 13
              }}
            >
              👥 {onlineCount}
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: '#ef4444',
                color: 'white',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600
              }}
            >
              Leave
            </button>
          </div>
        </div>
        
        <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1a1a2e',
            margin: 20,
            borderRadius: 16,
            position: 'relative'
          }}>
            <div style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: 80, marginBottom: 16 }}>🎥</div>
              <div style={{ fontSize: 20, marginBottom: 8 }}>Waiting for instructor...</div>
              <div style={{ fontSize: 14, color: '#9ca3af' }}>Camera is {videoOn ? 'on' : 'off'}</div>
            </div>
            
            <div style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              display: 'flex',
              gap: 8
            }}>
              {participants.slice(0, 4).map(p => (
                <div
                  key={p.id}
                  style={{
                    width: 60,
                    height: 80,
                    borderRadius: 8,
                    background: '#2d2d4a',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: p.handRaised ? '2px solid #fbbf24' : 'none'
                  }}
                >
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: p.isInstructor ? '#f59e0b' : '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 600,
                    marginBottom: 4
                  }}>
                    {p.avatar}
                  </div>
                  <div style={{ fontSize: 10, color: '#9ca3af' }}>{p.name.split(' ')[0]}</div>
                  {p.handRaised && <div style={{ fontSize: 12 }}>✋</div>}
                </div>
              ))}
            </div>
          </div>
          
          {chatOpen && (
            <div style={{
              width: 300,
              background: '#1a1a2e',
              borderLeft: '1px solid #2d2d4a',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid #2d2d4a',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: 'white', fontWeight: 600 }}>Chat</span>
                <button style={{
                  padding: 4,
                  borderRadius: 4,
                  border: 'none',
                  background: 'transparent',
                  color: '#9ca3af',
                  cursor: 'pointer'
                }}>
                  <MoreVertical size={16} />
                </button>
              </div>
              
              <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
                {messages.map(msg => (
                  <div key={msg.id} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ color: msg.isInstructor ? '#fbbf24' : 'white', fontWeight: 600, fontSize: 13 }}>
                        {msg.user}
                      </span>
                      <span style={{ color: '#6b7280', fontSize: 10 }}>{msg.time}</span>
                    </div>
                    <div style={{
                      background: msg.isInstructor ? '#fbbf2420' : '#2d2d4a',
                      padding: '8px 12px',
                      borderRadius: 8,
                      color: '#e5e5e5',
                      fontSize: 13
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{
                padding: 12,
                borderTop: '1px solid #2d2d4a',
                display: 'flex',
                gap: 8
              }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: 20,
                    border: 'none',
                    background: '#2d2d4a',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={sendMessage}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: 'none',
                    background: '#3b82f6',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div style={{
          padding: '12px 20px',
          background: '#1a1a2e',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          borderTop: '1px solid #2d2d4a'
        }}>
          <button
            onClick={() => setMicOn(!micOn)}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: 'none',
              background: micOn ? '#3b82f6' : '#ef4444',
              color: 'white',
              cursor: 'pointer',
              fontSize: 20
            }}
          >
            {micOn ? '🎤' : '🔇'}
          </button>
          <button
            onClick={() => setVideoOn(!videoOn)}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: 'none',
              background: videoOn ? '#3b82f6' : '#ef4444',
              color: 'white',
              cursor: 'pointer',
              fontSize: 20
            }}
          >
            {videoOn ? '📷' : '📷'}
          </button>
          <button
            onClick={() => setScreenSharing(!screenSharing)}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: 'none',
              background: screenSharing ? '#10b981' : '#3b82f6',
              color: 'white',
              cursor: 'pointer',
              fontSize: 20
            }}
          >
            🖥️
          </button>
          <button
            onClick={() => setHandRaised(!handRaised)}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: 'none',
              background: handRaised ? '#fbbf24' : '#3b82f6',
              color: 'white',
              cursor: 'pointer',
              fontSize: 20
            }}
          >
            ✋
          </button>
          <button
            onClick={() => setChatOpen(!chatOpen)}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: 'none',
              background: chatOpen ? '#10b981' : '#3b82f6',
              color: 'white',
              cursor: 'pointer',
              fontSize: 20
            }}
          >
            💬
          </button>
        </div>
      </div>
      
      {participantsOpen && (
        <div style={{
          width: 250,
          background: '#1a1a2e',
          borderLeft: '1px solid #2d2d4a',
          padding: 16
        }}>
          <h4 style={{ margin: '0 0 16px 0', color: 'white', fontSize: 14 }}>Participants ({onlineCount})</h4>
          {participants.map(p => (
            <div key={p.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 10px',
              borderRadius: 8,
              marginBottom: 4
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: p.isInstructor ? '#f59e0b' : '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
                fontSize: 14,
                position: 'relative'
              }}>
                {p.avatar}
                {p.isInstructor && (
                  <div style={{
                    position: 'absolute',
                    bottom: -2,
                    right: -2,
                    fontSize: 10
                  }}>👑</div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'white', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {p.name} {p.isInstructor && '⭐'}
                  {p.handRaised && '✋'}
                </div>
                <div style={{ color: '#6b7280', fontSize: 11 }}>{p.role}</div>
              </div>
              {p.muted && <span style={{ fontSize: 14 }}>🔇</span>}
            </div>
          ))}
        </div>
      )}
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default LiveSession;
