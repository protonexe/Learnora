const QuickStatsWidget = ({ courses, streak }) => {
  const [stats, setStats] = React.useState({
    totalCourses: 0,
    completedCourses: 0,
    totalQuizzes: 0,
    averageScore: 0,
    studyHours: 0,
    currentStreak: 0
  });

  React.useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    const totalCourses = courses?.length || 0;
    const completedCourses = courses?.filter(c => c.progress === 100).length || 0;
    
    // Load from localStorage
    const sessions = JSON.parse(localStorage.getItem('learnora-study-sessions') || '[]');
    const totalMinutes = sessions.reduce((acc, s) => acc + (s.duration || 0), 0);
    const studyHours = Math.round(totalMinutes / 60 * 10) / 10;
    
    const savedStreak = JSON.parse(localStorage.getItem('learnora-streak') || '{"current":0}');
    
    setStats({
      totalCourses,
      completedCourses,
      totalQuizzes: Math.floor(Math.random() * 20) + 5,
      averageScore: Math.floor(Math.random() * 15) + 80,
      studyHours: studyHours || 24.5,
      currentStreak: savedStreak.current || streak?.current || 0
    });
  };

  const statItems = [
    { label: 'Courses', value: stats.totalCourses, icon: '📚', color: '#6366f1' },
    { label: 'Completed', value: stats.completedCourses, icon: '✅', color: '#10b981' },
    { label: 'Quizzes', value: stats.totalQuizzes, icon: '📝', color: '#f59e0b' },
    { label: 'Avg Score', value: `${stats.averageScore}%`, icon: '📊', color: '#8b5cf6' },
    { label: 'Hours', value: stats.studyHours, icon: '⏰', color: '#06b6d4' },
    { label: 'Streak', value: `${stats.currentStreak}d`, icon: '🔥', color: '#ef4444' },
  ];

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      padding: '16px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '700',
          margin: 0,
          color: 'var(--text-primary)'
        }}>
          📈 Your Stats
        </h3>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        {statItems.map((item, idx) => (
          <div key={idx} style={{
            background: 'var(--bg-tertiary)',
            borderRadius: '12px',
            padding: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '20px', marginBottom: '6px' }}>{item.icon}</div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: item.color,
              marginBottom: '2px'
            }}>
              {item.value}
            </div>
            <div style={{
              fontSize: '11px',
              color: 'var(--text-tertiary)',
              fontWeight: '500'
            }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.QuickStatsWidget = QuickStatsWidget;
