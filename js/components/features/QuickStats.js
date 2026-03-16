const QuickStats = ({ onClose }) => {
  const stats = [
    { label: 'Courses', value: '6', icon: '📚', color: '#f43f5e' },
    { label: 'Study Hours', value: '48', icon: '⏰', color: '#14b8a6' },
    { label: 'Quizzes', value: '23', icon: '✍️', color: '#0ea5e9' },
    { label: 'Streak', value: '7', icon: '🔥', color: '#f59e0b' },
    { label: 'XP', value: '1,250', icon: '⭐', color: '#8b5cf6' },
    { label: 'Badges', value: '12', icon: '🏆', color: '#10b981' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📈 Quick Stats</h2>
      </div>

      <div style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: stat.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{stat.icon}</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
