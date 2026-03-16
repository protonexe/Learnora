const LearningPathVisualizer = ({ onClose }) => {
  const steps = [
    { title: 'Basics', completed: true },
    { title: 'Intermediate', completed: true },
    { title: 'Advanced', completed: false },
    { title: 'Expert', completed: false },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>🗺️ Learning Path</h2>
      </div>
      <div style={{ padding: 20 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: s.completed ? '#10b981' : 'var(--bg-secondary)', border: s.completed ? 'none' : '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.completed ? 'white' : 'var(--text-tertiary)', fontWeight: 600, fontSize: 14 }}>{s.completed ? '✓' : i + 1}</div>
            <div style={{ flex: 1, padding: 16, background: 'var(--bg-secondary)', borderRadius: 12, border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: s.completed ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{s.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
