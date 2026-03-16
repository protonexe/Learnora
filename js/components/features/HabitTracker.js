const HabitTracker = ({ onClose }) => {
  const habits = [
    { name: 'Morning Study', completed: true },
    { name: 'Exercise', completed: false },
    { name: 'Read 30 min', completed: true },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>✅ Habits</h2>
      </div>
      <div style={{ padding: 20 }}>
        {habits.map((h, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'var(--bg-secondary)', borderRadius: 12, marginBottom: 8, border: '1px solid var(--border-color)' }}>
            <div style={{ width: 24, height: 24, borderRadius: h.completed ? '50%' : '6px', background: h.completed ? '#10b981' : 'transparent', border: h.completed ? 'none' : '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12 }}>{h.completed && '✓'}</div>
            <span style={{ fontSize: 14, color: h.completed ? 'var(--text-tertiary)' : 'var(--text-primary)', textDecoration: h.completed ? 'line-through' : 'none' }}>{h.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
