const SessionHistory = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [sessions, setSessions] = React.useState(() => {
    return JSON.parse(localStorage.getItem('study-sessions') || '[]');
  });

  const [filter, setFilter] = React.useState('all');

  const filteredSessions = filter === 'all' 
    ? sessions 
    : sessions.filter(s => s.subject === filter);

  const subjects = [...new Set(sessions.map(s => s.subject).filter(Boolean))];

  const deleteSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const formatDuration = (minutes) => {
    if (!minutes) return '0 min';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m} min`;
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={20} />
        </button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>
          🕐 Session History
        </h1>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilter('all')}
          style={{ ...styles.filterButton, background: filter === 'all' ? 'var(--primary-500)' : 'var(--bg-secondary)', color: filter === 'all' ? '#fff' : 'var(--text-secondary)' }}
        >
          All
        </button>
        {subjects.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{ ...styles.filterButton, background: filter === s ? 'var(--primary-500)' : 'var(--bg-secondary)', color: filter === s ? '#fff' : 'var(--text-secondary)' }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Sessions List */}
      {filteredSessions.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No study sessions recorded yet.</p>
          <p>Start a timer to track your study time!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredSessions.sort((a, b) => new Date(b.date) - new Date(a.date)).map(session => (
            <div key={session.id} style={styles.sessionCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={styles.sessionIcon}>
                  {session.subject?.charAt(0) || '📚'}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.sessionSubject}>{session.subject || 'Study Session'}</h3>
                  <p style={styles.sessionDate}>
                    {new Date(session.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={styles.sessionDuration}>{formatDuration(session.duration)}</span>
                </div>
                <button onClick={() => deleteSession(session.id)} style={styles.deleteButton}>×</button>
              </div>
              {session.notes && (
                <p style={styles.sessionNotes}>{session.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {sessions.length > 0 && (
        <div style={styles.summaryCard}>
          <h3 style={styles.summaryTitle}>Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
              <span style={styles.summaryValue}>{sessions.length}</span>
              <span style={styles.summaryLabel}>Total Sessions</span>
            </div>
            <div>
              <span style={styles.summaryValue}>{Math.round(sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / 60)}h</span>
              <span style={styles.summaryLabel}>Total Time</span>
            </div>
            <div>
              <span style={styles.summaryValue}>{subjects.length}</span>
              <span style={styles.summaryLabel}>Subjects</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  filterButton: { padding: '8px 16px', borderRadius: 'var(--radius-md)', border: 'none', fontSize: '13px', fontWeight: '500', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '60px 20px', color: 'var(--text-tertiary)' },
  sessionCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px' },
  sessionIcon: { width: '48px', height: '48px', background: 'var(--primary-100)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: 'var(--primary-600)', fontWeight: '600' },
  sessionSubject: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  sessionDate: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  sessionDuration: { fontSize: '16px', fontWeight: '700', color: 'var(--primary-500)' },
  sessionNotes: { fontSize: '14px', color: 'var(--text-secondary)', margin: '12px 0 0 0', paddingTop: '12px', borderTop: '1px solid var(--border-color)' },
  deleteButton: { background: 'transparent', border: 'none', fontSize: '20px', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '0 8px' },
  summaryCard: { marginTop: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  summaryTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' },
  summaryValue: { display: 'block', fontSize: '24px', fontWeight: '700', color: 'var(--primary-500)' },
  summaryLabel: { fontSize: '12px', color: 'var(--text-tertiary)' }
};

window.SessionHistory = SessionHistory;
