import React from 'react';
import { MessageSquare, Send, Image, Smile, Paperclip, MoreVertical, User, Bot, Phone, Video, PhoneOff, Mic, MicOff, Camera, CameraOff, Image as ImageIcon } from './Icon';

const LiveClassroom = ({ onClose }) => {
  const [messages, setMessages] = React.useState([
    { id: 1, user: 'Teacher', text: 'Welcome to today\'s physics class!', time: '10:00 AM', isTeacher: true },
    { id: 2, user: 'Alice', text: 'Good morning!', time: '10:01 AM', isTeacher: false },
    { id: 3, user: 'Bob', text: 'Can we review Newton\'s laws?', time: '10:02 AM', isTeacher: false },
  ]);
  const [input, setInput] = React.useState('');
  const [participants, setParticipants] = React.useState([
    { id: 1, name: 'Dr. Smith', role: 'Teacher', avatar: 'S', online: true, handRaised: false },
    { id: 2, name: 'Alice', role: 'Student', avatar: 'A', online: true, handRaised: false },
    { id: 3, name: 'Bob', role: 'Student', avatar: 'B', online: true, handRaised: true },
    { id: 4, name: 'Charlie', role: 'Student', avatar: 'C', online: true, handRaised: false },
    { id: 5, name: 'Diana', role: 'Student', avatar: 'D', online: false, handRaised: false },
  ]);
  const [micOn, setMicOn] = React.useState(true);
  const [cameraOn, setCameraOn] = React.useState(true);
  const [screenSharing, setScreenSharing] = React.useState(false);
  const [showParticipants, setShowParticipants] = React.useState(true);
  const [chatTab, setChatTab] = React.useState('chat');
  const [whiteboard, setWhiteboard] = React.useState(false);
  
  const onlineCount = participants.filter(p => p.online).length;
  
  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      user: 'You',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTeacher: false
    }]);
    setInput('');
  };
  
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#1a1a2e'
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          padding: '12px 20px',
          background: '#16162a',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #2d2d4a'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#10b981',
              animation: 'pulse 2s infinite'
            }} />
            <span style={{ color: 'white', fontWeight: 600 }}>Physics 101 - Live Class</span>
            <span style={{ color: '#71717a', fontSize: 13 }}>🔴 Live</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setShowParticipants(!showParticipants)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: 'none',
                background: showParticipants ? '#3b82f6' : 'transparent',
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
                padding: '8px 12px',
                borderRadius: 8,
                border: 'none',
                background: '#ef4444',
                color: 'white',
                cursor: 'pointer',
                fontSize: 13
              }}
            >
              Leave
            </button>
          </div>
        </div>
        
        <div style={{ flex: 1, display: 'flex' }}>
          <div style={{ flex: 1, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {whiteboard ? (
              <div style={{
                width: '100%',
                height: '100%',
                background: 'white',
                borderRadius: 12,
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  display: 'flex',
                  gap: 8
                }}>
                  {['✏️', '📝', '🖍️', '📐', '🧹'].map((tool, i) => (
                    <button key={i} style={{
                      padding: 8,
                      borderRadius: 6,
                      border: '1px solid #e5e7eb',
                      background: i === 0 ? '#3b82f6' : 'white',
                      cursor: 'pointer',
                      fontSize: 16
                    }}>
                      {tool}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                background: '#0f0f23',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: 'white'
              }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🎥</div>
                <div style={{ fontSize: 18, marginBottom: 8 }}>Waiting for instructor to start...</div>
                <div style={{ fontSize: 14, color: '#71717a' }}>Camera is {cameraOn ? 'on' : 'off'}</div>
              </div>
            )}
          </div>
          
          {showParticipants && (
            <div style={{
              width: 250,
              background: '#16162a',
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
                  marginBottom: 4,
                  background: p.online ? 'transparent' : '#2d2d4a',
                  opacity: p.online ? 1 : 0.5
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: p.isTeacher ? '#f59e0b' : '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    {p.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'white', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                      {p.name} {p.isTeacher && '👑'}
                      {p.handRaised && '✋'}
                    </div>
                    <div style={{ color: '#71717a', fontSize: 11 }}>{p.role}</div>
                  </div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.online ? '#10b981' : '#71717a' }} />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div style={{
          padding: '12px 20px',
          background: '#16162a',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setMicOn(!micOn)}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: 'none',
                background: micOn ? '#3b82f6' : '#ef4444',
                color: 'white',
                cursor: 'pointer',
                fontSize: 18
              }}
            >
              {micOn ? '🎤' : '🔇'}
            </button>
            <button
              onClick={() => setCameraOn(!cameraOn)}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: 'none',
                background: cameraOn ? '#3b82f6' : '#ef4444',
                color: 'white',
                cursor: 'pointer',
                fontSize: 18
              }}
            >
              {cameraOn ? '📷' : '📷'}
            </button>
            <button
              onClick={() => setScreenSharing(!screenSharing)}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: 'none',
                background: screenSharing ? '#10b981' : '#3b82f6',
                color: 'white',
                cursor: 'pointer',
                fontSize: 18
              }}
            >
              🖥️
            </button>
            <button
              onClick={() => setWhiteboard(!whiteboard)}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: 'none',
                background: whiteboard ? '#10b981' : '#3b82f6',
                color: 'white',
                cursor: 'pointer',
                fontSize: 18
              }}
            >
              ✏️
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: 8, flex: 1, maxWidth: 400, marginLeft: 20 }}>
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: 'none',
                background: '#3b82f6',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default LiveClassroom;
