const DailyChallenge = ({ onBack, showToast }) => {
  const challenges = [
    { id: 1, title: 'Study for 1 hour', xp: 50, completed: true },
    { id: 2, title: 'Complete 10 flashcards', xp: 30, completed: false },
    { id: 3, title: 'Take a quiz', xp: 40, completed: false },
    { id: 4, title: 'Review notes', xp: 20, completed: false }
  ];

  const completed = challenges.filter(c => c.completed).length;
  const totalXP = challenges.reduce((a, c) => a + (c.completed ? c.xp : 0), 0);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Daily Challenge</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', padding: '25px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎯</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{completed}/4</div>
          <div style={{ opacity: 0.9 }}>Challenges Completed</div>
          <div style={{ marginTop: '15px', fontSize: '24px', fontWeight: 'bold' }}>+{totalXP} XP</div>
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {challenges.map(c => (
            <div key={c.id} style={{ background: c.completed ? '#ecfdf5' : 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: c.completed ? '#10b981' : '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                {c.completed && '✓'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', textDecoration: c.completed ? 'line-through' : 'none', opacity: c.completed ? 0.6 : 1 }}>{c.title}</div>
              </div>
              <div style={{ color: '#f59e0b', fontWeight: '600' }}>+{c.xp} XP</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.DailyChallenge = DailyChallenge;
