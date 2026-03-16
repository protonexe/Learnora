const StudyGoals = ({ onClose }) => {
  const [goals, setGoals] = React.useState([
    { id: 1, title: 'Study 5 hours today', current: 3.5, target: 5, color: '#f43f5e' },
    { id: 2, title: 'Complete 3 quizzes', current: 2, target: 3, color: '#14b8a6' },
  ]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>🎯 Daily Goals</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {goals.map(g => {
          const pct = Math.round((g.current / g.target) * 100);
          return (
            <div key={g.id} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{g.title}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: g.color }}>{pct}%</span>
              </div>
              <div style={{ height: 8, background: 'var(--bg)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: pct + '%', background: g.color }} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>{g.current} / {g.target} completed</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
