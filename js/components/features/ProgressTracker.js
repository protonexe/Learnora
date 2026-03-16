const ProgressTracker = ({ onBack, showToast }) => {
  const [goals, setGoals] = React.useState(() => JSON.parse(localStorage.getItem('progress-goals')) || [
    { id: 1, title: 'Complete Math Chapter 5', progress: 75, color: '#f43f5e' },
    { id: 2, title: 'Finish Physics Lab Report', progress: 50, color: '#14b8a6' },
    { id: 3, title: 'Review 100 Flashcards', progress: 30, color: '#0ea5e9' },
    { id: 4, title: 'Take Practice Quiz', progress: 100, color: '#10b981', completed: true }
  ]);

  const updateProgress = (id, progress) => {
    const updated = goals.map(g => g.id === id ? { ...g, progress, completed: progress >= 100 } : g);
    setGoals(updated);
    localStorage.setItem('progress-goals', JSON.stringify(updated));
  };

  const addGoal = () => {
    const title = prompt('Enter goal title:');
    if (title) {
      const colors = ['#f43f5e', '#14b8a6', '#0ea5e9', '#10b981', '#8b5cf6', '#f59e0b'];
      const newGoal = { id: Date.now(), title, progress: 0, color: colors[Math.floor(Math.random() * colors.length)] };
      setGoals([...goals, newGoal]);
      localStorage.setItem('progress-goals', JSON.stringify([...goals, newGoal]));
      showToast?.('Goal added!', 'success');
    }
  };

  const deleteGoal = (id) => {
    const updated = goals.filter(g => g.id !== id);
    setGoals(updated);
    localStorage.setItem('progress-goals', JSON.stringify(updated));
  };

  const completedCount = goals.filter(g => g.completed).length;
  const avgProgress = Math.round(goals.reduce((a, g) => a + g.progress, 0) / goals.length);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Progress Tracker</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '20px', borderRadius: '15px', color: 'white', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{completedCount}/{goals.length}</div>
            <div style={{ opacity: 0.9 }}>Goals Completed</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)', padding: '20px', borderRadius: '15px', color: 'white', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{avgProgress}%</div>
            <div style={{ opacity: 0.9 }}>Avg Progress</div>
          </div>
        </div>

        <button
          onClick={addGoal}
          style={{ width: '100%', padding: '15px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', marginBottom: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <span>+</span> Add New Goal
        </button>

        <div className="goals-list">
          {goals.map(goal => (
            <div key={goal.id} style={{ background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontWeight: '600', color: '#1f2937', textDecoration: goal.completed ? 'line-through' : 'none', opacity: goal.completed ? 0.6 : 1 }}>{goal.title}</div>
                <button onClick={() => deleteGoal(goal.id)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>×</button>
              </div>
              <div style={{ background: '#f3f4f6', borderRadius: '10px', height: '10px', marginBottom: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${goal.progress}%`, height: '100%', background: goal.color, transition: 'width 0.3s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>{goal.progress}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                  style={{ flex: 1, marginLeft: '15px', accentColor: goal.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.ProgressTracker = ProgressTracker;
