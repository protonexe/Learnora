const StudyStats = ({ onClose }) => {
  const [timeRange, setTimeRange] = React.useState('week');
  const [stats, setStats] = React.useState(() => {
    const saved = localStorage.getItem('learnora-study-stats');
    return saved ? JSON.parse(saved) : {
      totalHours: 0,
      sessionsCompleted: 0,
      currentStreak: 0,
      longestStreak: 0,
      averageSession: 25,
      weeklyData: []
    };
  });

  const saveStats = (newStats) => {
    setStats(newStats);
    localStorage.setItem('learnora-study-stats', JSON.stringify(newStats));
  };

  const generateMockData = () => {
    const weeklyData = [
      { day: 'Mon', hours: 2.5, sessions: 3 },
      { day: 'Tue', hours: 3.2, sessions: 4 },
      { day: 'Wed', hours: 1.8, sessions: 2 },
      { day: 'Thu', hours: 4.0, sessions: 5 },
      { day: 'Fri', hours: 2.0, sessions: 2 },
      { day: 'Sat', hours: 3.5, sessions: 4 },
      { day: 'Sun', hours: 2.8, sessions: 3 },
    ];
    
    const totalHours = weeklyData.reduce((a, b) => a + b.hours, 0);
    const sessionsCompleted = weeklyData.reduce((a, b) => b.sessions + a, 0);
    
    saveStats({
      ...stats,
      totalHours,
      sessionsCompleted,
      currentStreak: 7,
      longestStreak: 21,
      averageSession: Math.round(totalHours / sessionsCompleted * 60),
      weeklyData
    });
  };

  const achievements = [
    { id: 1, name: 'First Step', description: 'Complete your first study session', icon: '🎯', unlocked: true },
    { id: 2, name: 'Week Warrior', description: '7-day study streak', icon: '🔥', unlocked: true },
    { id: 3, name: 'Century Club', description: '100 hours of study', icon: '💯', unlocked: false },
    { id: 4, name: 'Night Owl', description: 'Study after midnight', icon: '🦉', unlocked: true },
    { id: 5, name: 'Early Bird', description: 'Study before 7 AM', icon: '🐦', unlocked: false },
    { id: 6, name: 'Marathon', description: '4+ hour study session', icon: '🏃', unlocked: false },
  ];

  const subjectBreakdown = [
    { subject: 'Mathematics', hours: 12, color: '#f43f5e' },
    { subject: 'Physics', hours: 8, color: '#14b8a6' },
    { subject: 'Chemistry', hours: 6, color: '#0ea5e9' },
    { subject: 'History', hours: 4, color: '#8b5cf6' },
  ];

  const maxHours = Math.max(...(stats.weeklyData.length > 0 ? stats.weeklyData : [{ hours: 0 }]).map(d => d.hours));

  React.useEffect(() => {
    if (stats.weeklyData.length === 0) {
      generateMockData();
    }
  }, []);

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
        background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
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
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>📈 Study Statistics</h2>
        </div>
      </div>

      <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
        {/* Overview Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12,
          marginBottom: 24
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Total Hours</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--primary)' }}>{stats.totalHours.toFixed(1)}h</div>
          </div>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Sessions</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#10b981' }}>{stats.sessionsCompleted}</div>
          </div>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Current Streak</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#f59e0b' }}>{stats.currentStreak} 🔥</div>
          </div>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Longest Streak</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#8b5cf6' }}>{stats.longestStreak} 🔥</div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16 }}>This Week</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 140 }}>
            {(stats.weeklyData.length > 0 ? stats.weeklyData : Array(7).fill({ hours: 0 })).map((day, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '100%',
                  background: 'var(--primary)',
                  borderRadius: '4px 4px 0 0',
                  height: Math.max(10, (day.hours / maxHours) * 100),
                  minHeight: 10,
                  transition: 'height 0.3s ease'
                }} />
                <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 6 }}>{day.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Breakdown */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16 }}>Subject Breakdown</h3>
          {subjectBreakdown.map((subject, idx) => (
            <div key={idx} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{subject.subject}</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{subject.hours}h</span>
              </div>
              <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: (subject.hours / 12) * 100 + '%', background: subject.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 12,
          padding: 20,
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16 }}>🏆 Achievements</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                style={{
                  textAlign: 'center',
                  padding: 12,
                  background: achievement.unlocked ? achievement.color + '15' : 'var(--bg)',
                  borderRadius: 8,
                  border: achievement.unlocked ? `1px solid ${achievement.color}` : '1px solid var(--border-color)',
                  opacity: achievement.unlocked ? 1 : 0.5
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 4 }}>{achievement.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)' }}>{achievement.name}</div>
                <div style={{ fontSize: 9, color: 'var(--text-secondary)', marginTop: 2 }}>{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
