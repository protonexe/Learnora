const LearningJourney = ({ onBack }) => {
  const milestones = [
    { id: 1, title: 'First Steps', desc: 'Complete first study session', achieved: true, date: '2026-01-15' },
    { id: 2, title: 'Quiz Pro', desc: 'Complete 10 quizzes', achieved: true, date: '2026-02-01' },
    { id: 3, title: 'Week Warrior', desc: '7-day study streak', achieved: true, date: '2026-02-20' },
    { id: 4, title: 'Course Master', desc: 'Complete first course', achieved: false },
    { id: 5, title: 'Knowledge Guru', desc: 'Reach 100 hours studied', achieved: false },
    { id: 6, title: 'Perfect Score', desc: '100% on any quiz', achieved: false }
  ];

  const achieved = milestones.filter(m => m.achieved).length;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Learning Journey</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '25px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🗺️</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{achieved}/{milestones.length}</div>
          <div style={{ opacity: 0.9 }}>Milestones Achieved</div>
        </div>

        <div style={{ position: 'relative', paddingLeft: '30px' }}>
          <div style={{ position: 'absolute', left: '10px', top: '0', bottom: '0', width: '2px', background: '#e5e7eb' }} />
          
          {milestones.map((m, i) => (
            <div key={m.id} style={{ position: 'relative', marginBottom: '25px' }}>
              <div style={{ position: 'absolute', left: '-26px', width: '16px', height: '16px', borderRadius: '50%', background: m.achieved ? '#10b981' : '#e5e7eb', border: '3px solid white', boxShadow: '0 0 0 2px #e5e7eb' }} />
              <div style={{ background: m.achieved ? '#ecfdf5' : 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>{m.title}</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>{m.desc}</div>
                {m.achieved && m.date && (
                  <div style={{ fontSize: '11px', color: '#10b981', marginTop: '5px', fontWeight: '600' }}>✓ Achieved: {m.date}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.LearningJourney = LearningJourney;
