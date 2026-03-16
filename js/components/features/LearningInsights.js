const LearningInsights = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [insights, setInsights] = React.useState(() => {
    return JSON.parse(localStorage.getItem('learning-insights') || '{}');
  });

  const [sessions, setSessions] = React.useState(() => {
    return JSON.parse(localStorage.getItem('study-sessions') || '[]');
  });

  const getAverageSessionLength = () => {
    if (sessions.length === 0) return 0;
    const total = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
    return Math.round(total / sessions.length);
  };

  const getMostProductiveDay = () => {
    if (sessions.length === 0) return 'N/A';
    const dayCounts = {};
    sessions.forEach(s => {
      const day = new Date(s.date).toLocaleDateString('en-US', { weekday: 'short' });
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    return Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  };

  const getSubjectDistribution = () => {
    const dist = {};
    sessions.forEach(s => {
      dist[s.subject] = (dist[s.subject] || 0) + 1;
    });
    return Object.entries(dist).map(([subject, count]) => ({
      subject,
      count,
      percentage: Math.round((count / sessions.length) * 100) || 0
    }));
  };

  const subjects = getSubjectDistribution();
  const totalHours = Math.round(sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / 60);
  const avgLength = getAverageSessionLength();

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={20} />
        </button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>
          📊 Learning Insights
        </h1>
      </div>

      {/* Overview Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>📚</span>
          <span style={styles.statValue}>{sessions.length}</span>
          <span style={styles.statLabel}>Total Sessions</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>⏱️</span>
          <span style={styles.statValue}>{totalHours}h</span>
          <span style={styles.statLabel}>Total Time</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>📅</span>
          <span style={styles.statValue}>{getMostProductiveDay()}</span>
          <span style={styles.statLabel}>Best Day</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>⚡</span>
          <span style={styles.statValue}>{avgLength}m</span>
          <span style={styles.statLabel}>Avg Session</span>
        </div>
      </div>

      {/* Subject Distribution */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Subject Distribution</h3>
        {subjects.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '20px' }}>
            No data yet. Start studying to see insights!
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {subjects.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{item.subject}</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>{item.percentage}%</span>
                </div>
                <div style={styles.progressBarBg}>
                  <div style={{ ...styles.progressBarFill, width: `${item.percentage}%`, background: colors[idx % colors.length] }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Study Tips */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>💡 Personalized Tips</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '2' }}>
          {totalHours < 10 && <li>Try to study at least 2 hours daily for better retention</li>}
          {avgLength < 30 && <li>Longer study sessions (45+ min) can improve focus</li>}
          {sessions.length > 0 && <li>You're doing great! Keep up the consistency</li>}
          {subjects.length < 3 && <li>Try exploring different subjects to broaden your knowledge</li>}
          {subjects.length >= 3 && <li>Great variety in your studies! Balance is key</li>}
        </ul>
      </div>

      {/* Activity Chart */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Weekly Activity</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '120px', gap: '8px' }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
            const daySessions = sessions.filter(s => new Date(s.date).getDay() === (idx + 1) % 7).length;
            const height = Math.max(10, daySessions * 20);
            return (
              <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '100%', background: 'var(--primary-200)', borderRadius: '4px', height: `${height}px`, transition: 'height 0.3s' }} />
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const colors = ['#f43f5e', '#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#ec4899'];

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  statCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px', textAlign: 'center' },
  statIcon: { display: 'block', fontSize: '24px', marginBottom: '8px' },
  statValue: { display: 'block', fontSize: '24px', fontWeight: '700', color: 'var(--primary-500)', marginBottom: '4px' },
  statLabel: { fontSize: '12px', color: 'var(--text-tertiary)' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  cardTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' },
  progressBarBg: { height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: '4px', transition: 'width 0.3s' }
};

window.LearningInsights = LearningInsights;
