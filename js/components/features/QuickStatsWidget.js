const QuickStats = ({ onBack }) => {
  const [stats] = React.useState({
    studyHours: 127,
    quizzesTaken: 47,
    flashcardsReviewed: 342,
    currentStreak: 12,
    averageScore: 87,
    coursesCompleted: 4
  });

  const achievements = [
    { icon: '📚', label: 'Books Read', value: 12 },
    { icon: '🎯', label: 'Goals Met', value: 28 },
    { icon: '🔥', label: 'Day Streak', value: stats.currentStreak },
    { icon: '⭐', label: 'Avg Score', value: stats.averageScore + '%' },
    { icon: '🏆', label: 'Badges', value: 8 },
    { icon: '📝', label: 'Notes', value: 45 }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Quick Stats</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="hero" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '30px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎯</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{stats.studyHours}h</div>
          <div style={{ opacity: 0.9 }}>Total Study Time</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {achievements.map((a, i) => (
            <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{a.icon}</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{a.value}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.QuickStats = QuickStats;
