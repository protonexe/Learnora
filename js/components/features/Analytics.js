const Analytics = ({ onClose }) => {
  const stats = [
    { label: 'Study Time', value: '48h', change: '+12%', color: '#f43f5e' },
    { label: 'Quizzes', value: '23', change: '+5', color: '#14b8a6' },
    { label: 'Accuracy', value: '87%', change: '+3%', color: '#0ea5e9' },
    { label: 'Streak', value: '7', change: 'days', color: '#f59e0b' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>📈 Analytics</h2>
      </div>
      <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{s.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
