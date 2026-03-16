const HabitTracker2 = ({ onBack }) => {
  const habits = [
    { id: 1, name: 'Exercise', streak: 5, done: false },
    { id: 2, name: 'Read 30 min', streak: 12, done: true },
    { id: 3, name: 'Meditate', streak: 3, done: false },
    { id: 4, name: 'No social media', streak: 7, done: true }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Habit Tracker</h1>
      </header>
      <div style={{ padding: '20px' }}>
        {habits.map(h => (
          <div key={h.id} style={{ background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: h.done ? 'none' : '2px solid #d1d5db', background: h.done ? '#10b981' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
              {h.done && '✓'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600' }}>{h.name}</div>
            </div>
            <div style={{ color: '#f59e0b', fontWeight: '600' }}>🔥 {h.streak}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.HabitTracker2 = HabitTracker2;
