const StudyAchievements = ({ onBack }) => {
  const achievements = [
    { name: 'First Steps', icon: '🎯', unlocked: true },
    { name: 'Quiz Master', icon: '🏆', unlocked: true },
    { name: 'Week Warrior', icon: '🔥', unlocked: true },
    { name: 'Night Owl', icon: '🦉', unlocked: false }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Achievements</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {achievements.map((a, i) => (
            <div key={i} style={{ background: a.unlocked ? '#fef3c7' : '#f3f4f6', padding: '25px', borderRadius: '15px', textAlign: 'center', opacity: a.unlocked ? 1 : 0.5 }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>{a.icon}</div>
              <div style={{ fontWeight: '600' }}>{a.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.StudyAchievements = StudyAchievements;
