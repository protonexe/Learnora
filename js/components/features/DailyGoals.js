const DailyGoals = ({ onBack, showToast }) => {
  const [goals, setGoals] = React.useState(() => JSON.parse(localStorage.getItem('daily-goals')) || [
    { id: 1, text: 'Complete Math chapter', completed: true },
    { id: 2, text: 'Review 20 flashcards', completed: false },
    { id: 3, text: 'Take practice quiz', completed: false },
    { id: 4, text: 'Study for 2 hours', completed: false }
  ]);

  const toggleGoal = (id) => {
    const updated = goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
    setGoals(updated);
    localStorage.setItem('daily-goals', JSON.stringify(updated));
  };

  const addGoal = () => {
    const text = prompt('Goal:');
    if (text) {
      const newG = { id: Date.now(), text, completed: false };
      setGoals([...goals, newG]);
      localStorage.setItem('daily-goals', JSON.stringify([...goals, newG]));
    }
  };

  const completed = goals.filter(g => g.completed).length;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Daily Goals</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="header" style={{ background: 'linear-gradient(135deg, #f43f5e, #ef4444)', padding: '25px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎯</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{completed}/{goals.length}</div>
          <div style={{ opacity: 0.9 }}>Goals Completed</div>
        </div>

        <button onClick={addGoal} style={{ width: '100%', padding: '15px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', marginBottom: '20px', fontWeight: '600' }}>
          + Add Goal
        </button>

        <div style={{ display: 'grid', gap: '12px' }}>
          {goals.map(goal => (
            <div key={goal.id} onClick={() => toggleGoal(goal.id)} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: goal.completed ? '4px solid #10b981' : '4px solid transparent' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: goal.completed ? 'none' : '2px solid #d1d5db', background: goal.completed ? '#10b981' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
                {goal.completed && '✓'}
              </div>
              <span style={{ color: '#1f2937', textDecoration: goal.completed ? 'line-through' : 'none', opacity: goal.completed ? 0.6 : 1 }}>{goal.text}</span>
            </div>
          ))}
        </div>

        {completed === goals.length && goals.length > 0 && (
          <div style={{ marginTop: '25px', background: '#ecfdf5', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎉</div>
            <div style={{ color: '#10b981', fontWeight: '600', fontSize: '18px' }}>All goals completed!</div>
          </div>
        )}
      </div>
    </div>
  );
};

window.DailyGoals = DailyGoals;
