const WeeklyGoals = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [goals, setGoals] = React.useState(() => JSON.parse(localStorage.getItem('weekly-goals') || []));

  const addGoal = (goal) => {
    if (!goal) return;
    setGoals([...goals, { id: Date.now(), text: goal, completed: false }]);
    localStorage.setItem('weekly-goals', JSON.stringify([...goals, { id: Date.now(), text: goal, completed: false }]));
    showToast?.('Goal added!', 'success');
  };

  const toggle = (id) => {
    const updated = goals.map(g => g.id === id ? {...g, completed: !g.completed} : g);
    setGoals(updated);
    localStorage.setItem('weekly-goals', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>🎯 Weekly Goals</h1>
      </div>
      <input type="text" placeholder="Add a goal..." onKeyPress={(e) => e.key === 'Enter' && addGoal(e.target.value)} style={styles.input} />
      <div style={styles.list}>
        {goals.length === 0 && <p style={styles.empty}>No goals set</p>}
        {goals.map(g => (
          <div key={g.id} onClick={() => toggle(g.id)} style={{ ...styles.goal, opacity: g.completed ? 0.5 : 1 }}>
            <span>{g.completed ? '✓' : '○'}</span>
            <span style={{ textDecoration: g.completed ? 'line-through' : 'none' }}>{g.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, input: { width: '100%', padding: '14px', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '16px', background: 'var(--bg-secondary)', fontSize: '14px' }, list: { display: 'flex', flexDirection: 'column', gap: '8px' }, empty: { textAlign: 'center', color: '#888', padding: '40px' }, goal: { display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }};

window.WeeklyGoals = WeeklyGoals;
