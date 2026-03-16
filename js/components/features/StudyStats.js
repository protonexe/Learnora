const StudyStats = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [sessions, setSessions] = React.useState(() => {
    return JSON.parse(localStorage.getItem('study-sessions') || '[]');
  });
  const [streak, setStreak] = React.useState(() => {
    return JSON.parse(localStorage.getItem('learnora-streak') || '{ "current": 0, "longest": 0 }');
  });

  const totalTime = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
  const totalHours = Math.floor(totalTime / 60);
  const totalMinutes = totalTime % 60;
  const avgPerDay = sessions.length > 0 ? Math.round(totalTime / 7) : 0;
  const longestSession = sessions.length > 0 ? Math.max(...sessions.map(s => s.duration || 0)) : 0;

  const weeklyData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10);
    const daySessions = sessions.filter(s => s.date?.slice(0, 10) === dateStr);
    weeklyData.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      hours: Math.round(daySessions.reduce((sum, s) => sum + (s.duration || 0), 0) / 60 * 10) / 10
    });
  }

  const getMaxHours = () => Math.max(...weeklyData.map(d => d.hours), 1);

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={20} />
        </button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>
          📈 Study Statistics
        </h1>
      </div>

      {/* Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div style={styles.statCard}>
          <span style={styles.statValue}>{totalHours}h {totalMinutes}m</span>
          <span style={styles.statLabel}>Total Time</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>{sessions.length}</span>
          <span style={styles.statLabel}>Sessions</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>{streak.current || 0}</span>
          <span style={styles.statLabel}>Day Streak</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statValue}>{avgPerDay}m</span>
          <span style={styles.statLabel}>Avg/Day</span>
        </div>
      </div>

      {/* Weekly Chart */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>This Week</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '150px', gap: '8px', paddingTop: '20px' }}>
          {weeklyData.map((day, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{day.hours}h</span>
              <div style={{ width: '100%', background: 'var(--primary-200)', borderRadius: '6px 6px 0 0', height: `${(day.hours / getMaxHours()) * 100}px`, minHeight: day.hours > 0 ? '8px' : '4px', transition: 'height 0.3s' }} />
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>🏆 Achievements</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ ...styles.achievement, opacity: totalHours >= 1 ? 1 : 0.3 }}>
            <span style={{ fontSize: '28px' }}>🌟</span>
            <span style={styles.achievementLabel}>First Hour</span>
          </div>
          <div style={{ ...styles.achievement, opacity: streak.current >= 7 ? 1 : 0.3 }}>
            <span style={{ fontSize: '28px' }}>🔥</span>
            <span style={styles.achievementLabel}>Week Streak</span>
          </div>
          <div style={{ ...styles.achievement, opacity: sessions.length >= 10 ? 1 : 0.3 }}>
            <span style={{ fontSize: '28px' }}>📚</span>
            <span style={styles.achievementLabel}>10 Sessions</span>
          </div>
          <div style={{ ...styles.achievement, opacity: longestSession >= 60 ? 1 : 0.3 }}>
            <span style={{ fontSize: '28px' }}>⏱️</span>
            <span style={styles.achievementLabel}>1 Hour Session</span>
          </div>
          <div style={{ ...styles.achievement, opacity: totalHours >= 10 ? 1 : 0.3 }}>
            <span style={{ fontSize: '28px' }}>🎯</span>
            <span style={styles.achievementLabel}>10 Hours</span>
          </div>
          <div style={{ ...styles.achievement, opacity: streak.longest >= 30 ? 1 : 0.3 }}>
            <span style={{ fontSize: '28px' }}>👑</span>
            <span style={styles.achievementLabel}>Month Streak</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  statCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', textAlign: 'center' },
  statValue: { display: 'block', fontSize: '24px', fontWeight: '700', color: 'var(--primary-500)', marginBottom: '4px' },
  statLabel: { fontSize: '12px', color: 'var(--text-tertiary)' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  cardTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' },
  achievement: { background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center', transition: 'opacity 0.3s' },
  achievementLabel: { display: 'block', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '8px' }
};

window.StudyStats = StudyStats;
