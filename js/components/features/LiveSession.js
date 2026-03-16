const LiveSession = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [sessions, setSessions] = React.useState([
    { id: 1, title: 'Live: Calculus Review', subject: 'Mathematics', instructor: 'Dr. Smith', time: 'Now', viewers: 45, status: 'live' },
    { id: 2, title: 'Physics Lab Demo', subject: 'Physics', instructor: 'Prof. Johnson', time: '2:00 PM', viewers: 0, status: 'upcoming' },
    { id: 3, title: 'Chemistry Q&A', subject: 'Chemistry', instructor: 'Dr. Williams', time: '4:00 PM', viewers: 0, status: 'upcoming' },
  ]);

  const joinSession = (id) => {
    showToast?.('Joining session...', 'info');
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>🔴 Live Sessions</h1>
      </div>

      <h3 style={styles.sectionTitle}>🔴 Live Now</h3>
      {sessions.filter(s => s.status === 'live').map(session => (
        <div key={session.id} style={styles.liveCard}>
          <div style={styles.liveBadge}>🔴 LIVE</div>
          <h3 style={styles.sessionTitle}>{session.title}</h3>
          <p style={styles.sessionInfo}>{session.subject} • {session.instructor}</p>
          <div style={styles.sessionFooter}>
            <span>👁️ {session.viewers} watching</span>
            <button onClick={() => joinSession(session.id)} style={styles.joinButton}>Join Now</button>
          </div>
        </div>
      ))}

      <h3 style={{ ...styles.sectionTitle, marginTop: '24px' }}>📅 Upcoming</h3>
      {sessions.filter(s => s.status === 'upcoming').map(session => (
        <div key={session.id} style={styles.upcomingCard}>
          <h3 style={styles.sessionTitle}>{session.title}</h3>
          <p style={styles.sessionInfo}>{session.subject} • {session.instructor}</p>
          <div style={styles.sessionFooter}>
            <span>🕐 {session.time}</span>
            <button onClick={() => joinSession(session.id)} style={styles.remindButton}>Set Reminder</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  sectionTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-secondary)' },
  liveCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '12px', borderLeft: '4px solid #f43f5e' },
  liveBadge: { display: 'inline-block', background: '#f43f5e', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', marginBottom: '12px' },
  upcomingCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '12px' },
  sessionTitle: { fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', color: 'var(--text-primary)' },
  sessionInfo: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '0 0 12px 0' },
  sessionFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  joinButton: { padding: '10px 20px', background: '#f43f5e', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  remindButton: { padding: '10px 20px', background: 'var(--primary-100)', color: 'var(--primary-600)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }
};

window.LiveSession = LiveSession;
