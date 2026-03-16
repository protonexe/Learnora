const SessionHistory = ({ onClose }) => {
  const [sessions, setSessions] = React.useState(() => {
    const saved = localStorage.getItem('learnora-session-history');
    return saved ? JSON.parse(saved) : [
      { id: 1, date: '2026-03-15', duration: 45, subject: 'Mathematics', type: 'study', completed: true },
      { id: 2, date: '2026-03-15', duration: 30, subject: 'Physics', type: 'quiz', score: 85, completed: true },
      { id: 3, date: '2026-03-14', duration: 60, subject: 'Chemistry', type: 'study', completed: true },
      { id: 4, date: '2026-03-14', duration: 20, subject: 'History', type: 'flashcards', completed: true },
      { id: 5, date: '2026-03-13', duration: 90, subject: 'Mathematics', type: 'study', completed: false },
    ];
  });
  const [filter, setFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('date');

  const subjects = ['all', ...new Set(sessions.map(s => s.subject))];
  const types = [
    { value: 'all', label: 'All Types', icon: '📚' },
    { value: 'study', label: 'Study', icon: '📖' },
    { value: 'quiz', label: 'Quiz', icon: '✍️' },
    { value: 'flashcards', label: 'Flashcards', icon: '🃏' },
  ];

  const filteredSessions = sessions
    .filter(s => filter === 'all' || s.subject === filter)
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'duration') return b.duration - a.duration;
      return 0;
    });

  const totalTime = filteredSessions.reduce((acc, s) => acc + s.duration, 0);
  const completedCount = filteredSessions.filter(s => s.completed).length;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTypeIcon = (type) => {
    const t = types.find(ty => ty.value === type);
    return t?.icon || '📚';
  };

  const groupByDate = (sessions) => {
    const groups = {};
    sessions.forEach(session => {
      const date = formatDate(session.date);
      if (!groups[date]) groups[date] = [];
      groups[date].push(session);
    });
    return groups;
  };

  const groupedSessions = groupByDate(filteredSessions);

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
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
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
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>📜 Session History</h2>
        </div>
      </div>

      <div style={{ padding: 20, maxWidth: 700, margin: '0 auto' }}>
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
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)' }}>{filteredSessions.length}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Sessions</div>
          </div>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#10b981' }}>{Math.round(totalTime / 60)}h</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Total Time</div>
          </div>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#8b5cf6' }}>{completedCount}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 8 }}>
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setFilter(subject)}
              style={{
                padding: '8px 14px',
                borderRadius: 20,
                border: 'none',
                background: filter === subject ? 'var(--primary)' : 'var(--bg-secondary)',
                color: filter === subject ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: 12,
                whiteSpace: 'nowrap'
              }}
            >
              {subject === 'all' ? 'All Subjects' : subject}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', alignSelf: 'center' }}>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: 12,
              cursor: 'pointer'
            }}
          >
            <option value="date">By Date</option>
            <option value="duration">By Duration</option>
          </select>
        </div>

        {/* Sessions List */}
        {Object.entries(groupedSessions).map(([date, dateSessions]) => (
          <div key={date} style={{ marginBottom: 20 }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 13, color: 'var(--text-secondary)' }}>{date}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {dateSessions.map(session => (
                <div
                  key={session.id}
                  style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: 10,
                    padding: 14,
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'var(--primary)' + '15',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18
                  }}>
                    {getTypeIcon(session.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                      {session.subject}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {session.duration} min • {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {session.score ? (
                      <span style={{
                        padding: '4px 10px',
                        background: session.score >= 70 ? '#10b98115' : '#f43f5e15',
                        color: session.score >= 70 ? '#10b981' : '#f43f5e',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {session.score}%
                      </span>
                    ) : (
                      <span style={{
                        padding: '4px 10px',
                        background: session.completed ? '#10b98115' : '#f59e0b15',
                        color: session.completed ? '#10b981' : '#f59e0b',
                        borderRadius: 6,
                        fontSize: 11
                      }}>
                        {session.completed ? '✓ Completed' : '✗ Incomplete'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredSessions.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <p>No sessions found</p>
          </div>
        )}
      </div>
    </div>
  );
};
