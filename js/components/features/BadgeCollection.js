const BadgeCollection = ({ onClose }) => {
  const badges = [
    { id: 1, name: 'First Step', icon: '🎯', earned: true, color: '#10b981' },
    { id: 2, name: 'Week Warrior', icon: '🔥', earned: true, color: '#f59e0b' },
    { id: 3, name: 'Quiz Master', icon: '✍️', earned: true, color: '#0ea5e9' },
    { id: 4, name: 'Night Owl', icon: '🦉', earned: false, color: '#8b5cf6' },
    { id: 5, name: 'Early Bird', icon: '🐦', earned: false, color: '#14b8a6' },
    { id: 6, name: 'Century', icon: '💯', earned: false, color: '#f43f5e' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>🏆 Badges</h2>
      </div>
      <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {badges.map(b => (
          <div key={b.id} style={{ textAlign: 'center', padding: 20, background: b.earned ? b.color + '15' : 'var(--bg-secondary)', borderRadius: 12, border: b.earned ? `1px solid ${b.color}` : '1px solid var(--border-color)', opacity: b.earned ? 1 : 0.5 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>{b.icon}</div>
            <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 600 }}>{b.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
