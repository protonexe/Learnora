const StudyRewards = ({ onBack, showToast }) => {
  const [rewards, setRewards] = React.useState(() => JSON.parse(localStorage.getItem('study-rewards')) || {
    points: 1250,
    streak: 7,
    badges: ['🌟', '📚', '🎯', '💪', '🏆'],
    history: [
      { id: 1, action: 'Completed quiz', points: 50, date: '2026-03-15' },
      { id: 2, action: 'Study streak 7 days', points: 100, date: '2026-03-15' },
      { id: 3, action: 'Flashcard review', points: 25, date: '2026-03-14' }
    ]
  });

  const actions = [
    { id: 1, action: 'Complete a quiz', points: 50, icon: '📝' },
    { id: 2, action: 'Review flashcards', points: 25, icon: '🃏' },
    { id: 3, action: 'Study for 1 hour', points: 100, icon: '⏰' },
    { id: 4, action: 'Complete assignment', points: 75, icon: '📋' },
    { id: 5, action: 'Read for 30 min', points: 30, icon: '📖' },
    { id: 6, action: 'Help peer', points: 40, icon: '🤝' }
  ];

  const earnPoints = (action) => {
    const newEntry = { id: Date.now(), action: action.action, points: action.points, date: new Date().toISOString().split('T')[0] };
    const updated = { ...rewards, points: rewards.points + action.points, history: [newEntry, ...rewards.history] };
    setRewards(updated);
    localStorage.setItem('study-rewards', JSON.stringify(updated));
    showToast?.(`+${action.points} points earned!`, 'success');
  };

  const level = Math.floor(rewards.points / 500) + 1;
  const nextLevel = level * 500;
  const progress = ((rewards.points % 500) / 500) * 100;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Rewards</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="level-card" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '30px', borderRadius: '20px', color: 'white', marginBottom: '25px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '10px' }}>🏆</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>Level {level}</div>
          <div style={{ opacity: 0.9, marginBottom: '15px' }}>{rewards.points} points</div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: '10px', marginBottom: '10px' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'white', borderRadius: '10px', transition: 'width 0.3s' }} />
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>{500 - (rewards.points % 500)} points to Level {level + 1}</div>
        </div>

        <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>🔥 {rewards.streak}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Day Streak</div>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>🏅 {rewards.badges.length}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Badges</div>
          </div>
        </div>

        <h3 style={{ marginBottom: '15px', color: '#374151' }}>Earn Points</h3>
        <div style={{ display: 'grid', gap: '10px', marginBottom: '25px' }}>
          {actions.map(a => (
            <div key={a.id} onClick={() => earnPoints(a)} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }}>
              <span style={{ fontSize: '24px' }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>{a.action}</div>
              </div>
              <div style={{ background: '#ecfdf5', color: '#10b981', padding: '5px 12px', borderRadius: '20px', fontWeight: '600', fontSize: '14px' }}>+{a.points}</div>
            </div>
          ))}
        </div>

        <h3 style={{ marginBottom: '15px', color: '#374151' }}>Recent Activity</h3>
        <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          {rewards.history.slice(0, 5).map((h, i) => (
            <div key={h.id} style={{ padding: '15px', borderBottom: i < 4 ? '1px solid #f3f4f6' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', color: '#1f2937' }}>{h.action}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{h.date}</div>
              </div>
              <div style={{ color: '#10b981', fontWeight: '600' }}>+{h.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.StudyRewards = StudyRewards;
