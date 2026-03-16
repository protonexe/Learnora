const GoalsWidget = ({ onClose }) => {
  const [goals, setGoals] = React.useState(() => {
    const saved = localStorage.getItem('learnora-goals');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Complete Math Course', progress: 75, target: 100, color: '#f43f5e' },
      { id: 2, title: 'Study 20 hours this week', progress: 14, target: 20, color: '#14b8a6' },
      { id: 3, title: 'Take 5 quizzes', progress: 3, target: 5, color: '#0ea5e9' },
    ];
  });
  const [showAdd, setShowAdd] = React.useState(false);
  const [newGoal, setNewGoal] = React.useState({ title: '', target: 100, color: '#8b5cf6' });

  const colors = ['#f43f5e', '#14b8a6', '#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981'];

  const saveGoals = (newGoals) => {
    setGoals(newGoals);
    localStorage.setItem('learnora-goals', JSON.stringify(newGoals));
  };

  const addGoal = () => {
    if (!newGoal.title) return;
    saveGoals([...goals, { id: Date.now(), ...newGoal, progress: 0 }]);
    setNewGoal({ title: '', target: 100, color: '#8b5cf6' });
    setShowAdd(false);
  };

  const updateProgress = (id, delta) => {
    saveGoals(goals.map(g => g.id === id ? { ...g, progress: Math.max(0, Math.min(g.target, g.progress + delta)) } : g));
  };

  const deleteGoal = (id) => {
    saveGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>← Back</button>
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>🎯 Goals</h2>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'white', color: '#8b5cf6', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>+ Add Goal</button>
      </div>

      <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
        {showAdd && (
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, marginBottom: 20, border: '1px solid var(--border-color)' }}>
            <input type="text" value={newGoal.title} onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })} placeholder="Goal title..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input type="number" value={newGoal.target} onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 100 })} placeholder="Target" style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14 }} />
              <div style={{ display: 'flex', gap: 4 }}>
                {colors.map(c => (
                  <button key={c} onClick={() => setNewGoal({ ...newGoal, color: c })} style={{ width: 28, height: 28, borderRadius: '50%', border: newGoal.color === c ? '3px solid white' : 'none', background: c, cursor: 'pointer' }} />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={addGoal} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Add Goal</button>
              <button onClick={() => setShowAdd(false)} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {goals.map(goal => {
            const percent = Math.round((goal.progress / goal.target) * 100);
            return (
              <div key={goal.id} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{goal.title}</span>
                  <button onClick={() => deleteGoal(goal.id)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 14 }}>×</button>
                </div>
                <div style={{ height: 8, background: 'var(--bg)', borderRadius: 4, marginBottom: 8, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: percent + '%', background: goal.color, transition: 'width 0.3s ease' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{goal.progress} / {goal.target} ({percent}%)</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => updateProgress(goal.id, -1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>-</button>
                    <button onClick={() => updateProgress(goal.id, 1)} style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: goal.color, color: 'white', cursor: 'pointer', fontWeight: 600 }}>+</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
