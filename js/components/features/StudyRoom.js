const StudyRoom = ({ onClose }) => {
  const [rooms, setRooms] = React.useState([
    { id: 1, name: 'Math Study Group', subject: 'Mathematics', members: 5, maxMembers: 10, isLive: true, host: 'Alex', focus: 'Calculus Review' },
    { id: 2, name: 'Physics Lab Prep', subject: 'Physics', members: 3, maxMembers: 8, isLive: true, host: 'Sarah', focus: 'Lab Report' },
    { id: 3, name: 'Quiet Focus Room', subject: 'General', members: 8, maxMembers: 20, isLive: true, host: 'System', focus: 'Silent Study' },
    { id: 4, name: 'Exam Cram Session', subject: 'Chemistry', members: 6, maxMembers: 12, isLive: false, host: 'Mike', focus: 'Organic Chemistry' },
  ]);
  const [activeRoom, setActiveRoom] = React.useState(null);
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const [newRoom, setNewRoom] = React.useState({ name: '', subject: 'General', maxMembers: 10, focus: '' });
  const [chatMessage, setChatMessage] = React.useState('');
  const [messages, setMessages] = React.useState([
    { id: 1, user: 'Alex', text: 'Welcome everyone! Let\'s focus on Chapter 5 today.', time: '2:30 PM' },
    { id: 2, user: 'Sarah', text: 'Thanks for organizing this!', time: '2:31 PM' },
    { id: 3, user: 'Mike', text: 'Going through problem set #3 now.', time: '2:32 PM' },
  ]);

  const subjects = ['General', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'English', 'Computer Science'];

  const handleCreateRoom = () => {
    if (!newRoom.name) return;
    
    const room = {
      id: Date.now(),
      ...newRoom,
      members: 1,
      isLive: true,
      host: 'You',
      focus: newRoom.focus || 'Study Session'
    };
    
    setRooms([room, ...rooms]);
    setNewRoom({ name: '', subject: 'General', maxMembers: 10, focus: '' });
    setShowCreateForm(false);
    setActiveRoom(room);
  };

  const joinRoom = (room) => {
    setActiveRoom({ ...room, members: room.members + 1 });
  };

  const leaveRoom = () => {
    if (activeRoom) {
      setRooms(rooms.map(r => r.id === activeRoom.id ? { ...r, members: r.members - 1 } : r));
    }
    setActiveRoom(null);
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const msg = {
      id: Date.now(),
      user: 'You',
      text: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, msg]);
    setChatMessage('');
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (activeRoom) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'var(--bg-primary)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.2s ease'
      }}>
        {/* Header */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={leaveRoom} style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--bg)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}>
              ← Leave
            </button>
            <div>
              <h2 style={{ margin: 0, fontSize: 18 }}>{activeRoom.name}</h2>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                🔴 Live • {activeRoom.members}/{activeRoom.maxMembers} members
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              padding: '6px 12px',
              background: '#10b98115',
              color: '#10b981',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600
            }}>
              🔴 LIVE
            </span>
          </div>
        </div>

        {/* Room Info */}
        <div style={{
          background: 'var(--primary)' + '10',
          padding: '12px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          gap: 20,
          fontSize: 13
        }}>
          <span>📚 {activeRoom.subject}</span>
          <span>👤 Host: {activeRoom.host}</span>
          <span>🎯 {activeRoom.focus}</span>
        </div>

        {/* Members Grid */}
        <div style={{
          padding: 16,
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--bg-secondary)'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: 13, color: 'var(--text-secondary)' }}>
            Members ({activeRoom.members})
          </h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['Alex', 'Sarah', 'Mike', 'Emma', 'You'].slice(0, activeRoom.members).map((member, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  background: 'var(--bg)',
                  borderRadius: 20,
                  border: member === 'You' ? '2px solid var(--primary)' : '1px solid var(--border-color)'
                }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 600
                }}>
                  {member[0]}
                </div>
                <span style={{ fontSize: 13 }}>{member}</span>
                {idx === 0 && <span style={{ fontSize: 10, color: '#f59e0b' }}>👑</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
                  flexDirection: 'column',
                  alignItems: msg.user === 'You' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '70%',
                  padding: '10px 14px',
                  borderRadius: 16,
                  background: msg.user === 'You' ? 'var(--primary)' : 'var(--bg-secondary)',
                  color: msg.user === 'You' ? 'white' : 'var(--text-primary)'
                }}>
                  {msg.text}
                </div>
                <span style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 4 }}>
                  {msg.user} • {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div style={{
            padding: 16,
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            gap: 12
          }}>
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 24,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                fontSize: 14
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: 'none',
                background: 'var(--primary)',
                color: 'white',
                cursor: 'pointer',
                fontSize: 18
              }}
            >
              ➤
            </button>
          </div>
        </div>

        {/* Timer Display */}
        <div style={{
          position: 'absolute',
          top: 80,
          right: 20,
          background: 'var(--bg-secondary)',
          borderRadius: 12,
          padding: 16,
          border: '1px solid var(--border-color)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>Session Timer</div>
          <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'monospace', color: 'var(--primary)' }}>
            01:23:45
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 1000,
      overflow: 'auto',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer'
          }}>
            ← Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>👥 Study Rooms</h2>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: 'white',
            color: '#10b981',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600
          }}
        >
          + Create Room
        </button>
      </div>

      <div style={{ padding: 20, maxWidth: 700, margin: '0 auto' }}>
        {/* Create Form */}
        {showCreateForm && (
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: 16 }}>Create a Study Room</h3>
            
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)' }}>Room Name</label>
              <input
                type="text"
                value={newRoom.name}
                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                placeholder="e.g., Calculus Study Group"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  fontSize: 14
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)' }}>Subject</label>
                <select
                  value={newRoom.subject}
                  onChange={(e) => setNewRoom({ ...newRoom, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg)',
                    color: 'var(--text-primary)',
                    fontSize: 14
                  }}
                >
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)' }}>Max Members</label>
                <input
                  type="number"
                  value={newRoom.maxMembers}
                  onChange={(e) => setNewRoom({ ...newRoom, maxMembers: parseInt(e.target.value) || 10 })}
                  min={2}
                  max={50}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg)',
                    color: 'var(--text-primary)',
                    fontSize: 14
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)' }}>Focus Topic</label>
              <input
                type="text"
                value={newRoom.focus}
                onChange={(e) => setNewRoom({ ...newRoom, focus: e.target.value })}
                placeholder="e.g., Chapter 5 Review"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  fontSize: 14
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleCreateRoom}
                disabled={!newRoom.name}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 8,
                  border: 'none',
                  background: newRoom.name ? '#10b981' : 'var(--border-color)',
                  color: 'white',
                  cursor: newRoom.name ? 'pointer' : 'not-allowed',
                  fontWeight: 600
                }}
              >
                Create & Join
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Live Rooms */}
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--text-secondary)' }}>
          🔴 Live Now ({rooms.filter(r => r.isLive).length})
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
          {rooms.filter(r => r.isLive).map(room => (
            <div
              key={room.id}
              onClick={() => joinRoom(room)}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 12,
                padding: 16,
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    padding: '4px 8px',
                    background: '#10b98115',
                    color: '#10b981',
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 600
                  }}>
                    🔴 LIVE
                  </span>
                  <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text-primary)' }}>{room.name}</h3>
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  👤 {room.host}
                </span>
              </div>
              
              <div style={{
                display: 'flex',
                gap: 12,
                fontSize: 12,
                color: 'var(--text-secondary)',
                marginBottom: 12
              }}>
                <span>📚 {room.subject}</span>
                <span>🎯 {room.focus}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>
                  👥 {room.members}/{room.maxMembers} members
                </span>
                <span style={{
                  padding: '6px 12px',
                  background: 'var(--primary)',
                  color: 'white',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600
                }}>
                  Join Room
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Rooms */}
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--text-secondary)' }}>
          📅 Upcoming Sessions ({rooms.filter(r => !r.isLive).length})
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rooms.filter(r => !r.isLive).map(room => (
            <div
              key={room.id}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 8,
                padding: 12,
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: 0.7
              }}
            >
              <span style={{ fontSize: 20 }}>⏰</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: 'var(--text-primary)' }}>{room.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{room.subject} • {room.host}</div>
              </div>
              <button style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 11
              }}>
                Set Reminder
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
