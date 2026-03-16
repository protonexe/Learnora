const AchievementSystem = ({ onBack, showToast }) => {
  const [achievements, setAchievements] = React.useState(() => JSON.parse(localStorage.getItem('achievements')) || [
    { id: 1, name: 'First Steps', desc: 'Complete your first study session', icon: '🎯', unlocked: true, date: '2026-03-01' },
    { id: 2, name: 'Week Warrior', desc: 'Maintain a 7-day streak', icon: '🔥', unlocked: true, date: '2026-03-10' },
    { id: 3, name: 'Quiz Master', desc: 'Score 100% on 5 quizzes', icon: '🏆', unlocked: true, date: '2026-03-12' },
    { id: 4, name: 'Night Owl', desc: 'Study after midnight', icon: '🦉', unlocked: false },
    { id: 5, name: 'Early Bird', desc: 'Study before 6 AM', icon: '🌅', unlocked: false },
    { id: 6, name: 'Knowledge Seeker', desc: 'Complete 10 courses', icon: '📚', unlocked: false },
    { id: 7, name: 'Perfect Score', desc: 'Get 100% on any quiz', icon: '💯', unlocked: true, date: '2026-03-14' },
    { id: 8, name: 'Social Learner', desc: 'Join a study group', icon: '🤝', unlocked: false }
  ]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Achievements</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="header-card" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', padding: '25px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🏅</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{unlockedCount}/{achievements.length}</div>
          <div style={{ opacity: 0.9 }}>Achievements Unlocked</div>
        </div>

        <div className="achievements-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {achievements.map(achievement => (
            <div key={achievement.id} style={{ background: achievement.unlocked ? 'white' : '#f3f4f6', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: achievement.unlocked ? '0 4px 15px rgba(0,0,0,0.1)' : 'none', opacity: achievement.unlocked ? 1 : 0.6 }}>
              <div style={{ fontSize: '40px', marginBottom: '10px', filter: achievement.unlocked ? 'none' : 'grayscale(100%)' }}>{achievement.icon}</div>
              <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '5px' }}>{achievement.name}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>{achievement.desc}</div>
              {achievement.unlocked && achievement.date && (
                <div style={{ fontSize: '11px', color: '#10b981', fontWeight: '600' }}>✓ {achievement.date}</div>
              )}
              {!achievement.unlocked && (
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>Locked</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.AchievementSystem = AchievementSystem;
