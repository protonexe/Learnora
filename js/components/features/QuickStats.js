const QuickStats = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [sessions] = React.useState(() => JSON.parse(localStorage.getItem('study-sessions') || '[]'));
  const [streak] = React.useState(() => JSON.parse(localStorage.getItem('learnora-streak') || '{"current":0,"longest":0}'));
  const [notes] = React.useState(() => JSON.parse(localStorage.getItem('learnora-notes') || '[]'));

  const totalTime = Math.round(sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / 60);
  const todaySessions = sessions.filter(s => new Date(s.date).toDateString() === new Date().toDateString());
  const todayTime = Math.round(todaySessions.reduce((sum, s) => sum + (s.duration || 0), 0));

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>⚡ Quick Stats</h1>
      </div>

      <div style={styles.todayCard}>
        <h2 style={styles.todayTitle}>Today</h2>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
          <div style={styles.todayStat}><span style={styles.todayValue}>{todaySessions.length}</span><span style={styles.todayLabel}>Sessions</span></div>
          <div style={styles.todayStat}><span style={styles.todayValue}>{todayTime}</span><span style={styles.todayLabel}>Minutes</span></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div style={styles.statCard}><span style={styles.statIcon}>📚</span><span style={styles.statValue}>{sessions.length}</span><span style={styles.statLabel}>Total Sessions</span></div>
        <div style={styles.statCard}><span style={styles.statIcon}>⏱️</span><span style={styles.statValue}>{totalTime}h</span><span style={styles.statLabel}>Study Hours</span></div>
        <div style={styles.statCard}><span style={styles.statIcon}>🔥</span><span style={styles.statValue}>{streak.current || 0}</span><span style={styles.statLabel}>Day Streak</span></div>
        <div style={styles.statCard}><span style={styles.statIcon}>📝</span><span style={styles.statValue}>{notes.length}</span><span style={styles.statLabel}>Notes</span></div>
      </div>

      <div style={styles.quoteCard}>
        <p style={styles.quoteText}>"The secret of getting ahead is getting started."</p>
        <p style={styles.quoteAuthor}>- Mark Twain</p>
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  todayCard: { background: 'var(--gradient-primary)', borderRadius: 'var(--radius-xl)', padding: '32px', marginBottom: '24px', textAlign: 'center' },
  todayTitle: { color: '#fff', fontSize: '18px', marginBottom: '20px', opacity: 0.9 },
  todayStat: { textAlign: 'center' },
  todayValue: { display: 'block', fontSize: '36px', fontWeight: '700', color: '#fff' },
  todayLabel: { display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' },
  statCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', textAlign: 'center' },
  statIcon: { display: 'block', fontSize: '24px', marginBottom: '8px' },
  statValue: { display: 'block', fontSize: '28px', fontWeight: '700', color: 'var(--primary-500)' },
  statLabel: { display: 'block', fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' },
  quoteCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', textAlign: 'center' },
  quoteText: { fontSize: '16px', fontStyle: 'italic', color: 'var(--text-primary)', margin: '0 0 8px 0' },
  quoteAuthor: { fontSize: '14px', color: 'var(--text-tertiary)', margin: 0 }
};

window.QuickStats = QuickStats;
