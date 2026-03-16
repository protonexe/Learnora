const StudyGoals = ({ onBack }) => {
  const goals = [
    { title: 'Complete Math Chapter 5', progress: 75, color: '#f43f5e' },
    { title: 'Review 50 Flashcards', progress: 60, color: '#6366f1' },
    { title: 'Take Practice Quiz', progress: 100, color: '#10b981', done: true }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Goals</h1>
      </header>
      <div style={{ padding: '20px' }}>
        {goals.map((g, i) => (
          <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '15px', opacity: g.done ? 0.6 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontWeight: '600', textDecoration: g.done ? 'line-through' : 'none' }}>{g.title}</span>
              <span style={{ color: g.color, fontWeight: '600' }}>{g.progress}%</span>
            </div>
            <div style={{ background: '#f3f4f6', borderRadius: '8px', height: '8px' }}>
              <div style={{ width: `${g.progress}%`, height: '100%', background: g.color, borderRadius: '8px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.StudyGoals = StudyGoals;
