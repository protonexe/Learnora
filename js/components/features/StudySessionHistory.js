const StudySessionHistory = ({ limit = 10 }) => {
  const [sessions, setSessions] = React.useState([]);
  const isMobile = window.innerWidth <= 768;

  React.useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const saved = localStorage.getItem('learnora-study-sessions') || '[]';
    const allSessions = JSON.parse(saved);
    setSessions(allSessions.slice(0, limit));
  };

  const getSessionIcon = (type) => {
    const icons = {
      course: '📚',
      quiz: '📝',
      flashcards: '🗂️',
      ebook: '📖',
      video: '🎬',
      timer: '⏱️'
    };
    return icons[type] || '📌';
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      padding: isMobile ? '14px' : '18px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: isMobile ? '12px' : '16px'
      }}>
        <h3 style={{
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '700',
          margin: 0,
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '18px' }}>📊</span>
          Study History
        </h3>
        <button style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--accent-blue)',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          View All
        </button>
      </div>

      {sessions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px 20px', color: 'var(--text-secondary)' }}>
          <span style={{ fontSize: '36px', display: 'block', marginBottom: '10px' }}>📊</span>
          <p style={{ fontSize: '13px', margin: 0 }}>No study sessions yet</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {sessions.map((session, idx) => (
            <div key={session.id || idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}>
                {getSessionIcon(session.type)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  margin: 0,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {session.title || 'Study Session'}
                </p>
                <p style={{
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  margin: '2px 0 0 0'
                }}>
                  {formatDate(session.timestamp)}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--primary-500)',
                  margin: 0
                }}>
                  {formatDuration(session.duration || 0)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const recordStudySession = (type, title, durationMinutes) => {
  const sessions = JSON.parse(localStorage.getItem('learnora-study-sessions') || '[]');
  
  const newSession = {
    id: Date.now(),
    type,
    title,
    duration: durationMinutes,
    timestamp: Date.now()
  };
  
  sessions.unshift(newSession);
  
  // Keep only last 100 sessions
  const trimmed = sessions.slice(0, 100);
  localStorage.setItem('learnora-study-sessions', JSON.stringify(trimmed));
};

window.StudySessionHistory = StudySessionHistory;
window.recordStudySession = recordStudySession;
