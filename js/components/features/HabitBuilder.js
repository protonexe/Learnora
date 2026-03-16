const HabitBuilder = ({ onBack, showToast }) => {
  const [habits, setHabits] = React.useState(() => JSON.parse(localStorage.getItem('habit-builder')) || [
    { id: 1, name: 'Study 1 hour', streak: 5, completed: false },
    { id: 2, name: 'Review flashcards', streak: 3, completed: false },
    { id: 3, name: 'Read 30 minutes', streak: 7, completed: true }
  ]);

  const toggleDay = (id) => {
    const updated = habits.map(h => h.id === id ? { ...h, completed: !h.completed, streak: !h.completed ? h.streak + 1 : Math.max(0, h.streak - 1) } : h);
    setHabits(updated);
    localStorage.setItem('habit-builder', JSON.stringify(updated));
  };

  const addHabit = () => {
    const name = prompt('Habit name:');
    if (name) {
      const newH = { id: Date.now(), name, streak: 0, completed: false };
      setHabits([...habits, newH]);
      localStorage.setItem('habit-builder', JSON.stringify([...habits, newH]));
      showToast?.('Habit added!', 'success');
    }
  };

  const deleteHabit = (id) => {
    const updated = habits.filter(h => h.id !== id);
    setHabits(updated);
    localStorage.setItem('habit-builder', JSON.stringify(updated));
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalStreak = habits.reduce((a, h) => a + h.streak, 0);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Habit Builder</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
          <div style={{ background: '#ecfdf5', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>{completedToday}/{habits.length}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Done Today</div>
          </div>
          <div style={{ background: '#fef3c7', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>🔥 {totalStreak}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Total Streak</div>
          </div>
        </div>

        <button onClick={addHabit} style={{ width: '100%', padding: '15px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', marginBottom: '20px', fontWeight: '600' }}>
          + Add Habit
        </button>

        <div style={{ display: 'grid', gap: '12px' }}>
          {habits.map(habit => (
            <div key={habit.id} onClick={() => toggleDay(habit.id)} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: habit.completed ? '4px solid #10b981' : '4px solid transparent' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: habit.completed ? 'none' : '2px solid #d1d5db', background: habit.completed ? '#10b981' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '16px' }}>
                {habit.completed && '✓'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#1f2937', textDecoration: habit.completed ? 'line-through' : 'none', opacity: habit.completed ? 0.6 : 1 }}>{habit.name}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f59e0b', fontWeight: '600' }}>
                <span>🔥</span> {habit.streak}
              </div>
              <button onClick={(e) => { e.stopPropagation(); deleteHabit(habit.id); }} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '18px' }}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.HabitBuilder = HabitBuilder;
