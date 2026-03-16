const StudyBuddy = ({ onClose }) => {
  const [buddies, setBuddies] = React.useState([
    { id: 1, name: 'Alex Chen', subject: 'Mathematics', level: 'Advanced', status: 'online', avatar: 'A', rating: 4.8, sessions: 23 },
    { id: 2, name: 'Sarah Kim', subject: 'Physics', level: 'Intermediate', status: 'online', avatar: 'S', rating: 4.6, sessions: 18 },
    { id: 3, name: 'Mike Johnson', subject: 'Chemistry', level: 'Beginner', status: 'away', avatar: 'M', rating: 4.5, sessions: 12 },
    { id: 4, name: 'Emma Wilson', subject: 'Biology', level: 'Advanced', status: 'offline', avatar: 'E', rating: 4.9, sessions: 31 },
  ]);
  const [requests, setRequests] = React.useState([
    { id: 1, name: 'John Doe', subject: 'History', message: 'Want to study together for the exam?', time: '5 min ago' },
  ]);
  const [showRequests, setShowRequests] = React.useState(false);
  const [filter, setFilter] = React.useState('all');

  const subjects = ['All Subjects', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'English', 'Computer Science'];

  const filteredBuddies = filter === 'all' 
    ? buddies 
    : buddies.filter(b => b.subject === filter);

  const getStatusColor = (status) => {
    if (status === 'online') return '#10b981';
    if (status === 'away') return '#f59e0b';
    return '#94a3b8';
  };

  const handleRequest = (id, accept) => {
    if (accept) {
      const request = requests.find(r => r.id === id);
      setBuddies([...buddies, {
        id: Date.now(),
        name: request.name,
        subject: request.subject,
        level: 'Beginner',
        status: 'offline',
        avatar: request.name[0],
        rating: 0,
        sessions: 0
      }]);
    }
    setRequests(requests.filter(r => r.id !== id));
  };

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
        background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
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
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>👫 Study Buddy</h2>
        </div>
        <button
          onClick={() => setShowRequests(!showRequests)}
          style={{
            position: 'relative',
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Requests {requests.length > 0 && (
            <span style={{
              position: 'absolute',
              top: -4,
              right: -4,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'white',
              color: '#ec4899',
              fontSize: 10,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {requests.length}
            </span>
          )}
        </button>
      </div>

      <div style={{ padding: 20, maxWidth: 700, margin: '0 auto' }}>
        {/* Requests Panel */}
        {showRequests && requests.length > 0 && (
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--text-secondary)' }}>
              Friend Requests ({requests.length})
            </h3>
            {requests.map(request => (
              <div key={request.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                background: 'var(--bg)',
                borderRadius: 8,
                marginBottom: 8
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 600
                }}>
                  {request.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{request.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{request.subject} • {request.time}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>"{request.message}"</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => handleRequest(request.id, true)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      border: 'none',
                      background: '#10b981',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: 12
                    }}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequest(request.id, false)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      border: '1px solid var(--border-color)',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: 12
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          marginBottom: 24
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)' }}>{buddies.length}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Total Buddies</div>
          </div>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#10b981' }}>{buddies.filter(b => b.status === 'online').length}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Online Now</div>
          </div>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#8b5cf6' }}>
              {buddies.reduce((a, b) => a + b.sessions, 0)}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Total Sessions</div>
          </div>
        </div>

        {/* Filter */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 16,
          overflowX: 'auto',
          paddingBottom: 8
        }}>
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setFilter(subject === 'All Subjects' ? 'all' : subject)}
              style={{
                padding: '8px 14px',
                borderRadius: 20,
                border: 'none',
                background: (subject === 'All Subjects' ? filter === 'all' : filter === subject) 
                  ? 'var(--primary)' 
                  : 'var(--bg-secondary)',
                color: (subject === 'All Subjects' ? filter === 'all' : filter === subject) 
                  ? 'white' 
                  : 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: 12,
                whiteSpace: 'nowrap'
              }}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Buddies List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredBuddies.map(buddy => (
            <div
              key={buddy.id}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 12,
                padding: 16,
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 18
                  }}>
                    {buddy.avatar}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: getStatusColor(buddy.status),
                    border: '2px solid var(--bg-secondary)'
                  }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h3 style={{ margin: 0, fontSize: 15, color: 'var(--text-primary)' }}>{buddy.name}</h3>
                    <span style={{
                      padding: '2px 6px',
                      background: 'var(--primary)' + '15',
                      color: 'var(--primary)',
                      borderRadius: 4,
                      fontSize: 10
                    }}>
                      {buddy.level}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                    📚 {buddy.subject} • {buddy.sessions} sessions
                  </div>
                  {buddy.rating > 0 && (
                    <div style={{ fontSize: 12, color: '#fbbf24', marginTop: 2 }}>
                      ⭐ {buddy.rating} rating
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {buddy.status === 'online' ? (
                    <button style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: 'none',
                      background: 'var(--primary)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 600
                    }}>
                      Start Session
                    </button>
                  ) : (
                    <button style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg)',
                      color: 'var(--text-secondary)',
                      cursor: 'not-allowed',
                      fontSize: 12
                    }}>
                      Message
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
