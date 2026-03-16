const Leaderboard = ({ onClose }) => {
  const users = [
    { rank: 1, name: 'Alex Chen', xp: 2450, avatar: 'A' },
    { rank: 2, name: 'Sarah Kim', xp: 2180, avatar: 'S' },
    { rank: 3, name: 'You', xp: 1580, avatar: 'Y', isUser: true },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>🏆 Leaderboard</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {users.map(u => (
          <div key={u.rank} style={{ display: 'flex', alignItems: 'center', gap: 12, background: u.isUser ? 'var(--primary)' + '15' : 'var(--bg-secondary)', borderRadius: 12, padding: 14, border: u.isUser ? '1px solid var(--primary)' : '1px solid var(--border-color)' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: u.rank <= 3 ? '#fbbf24' : 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: u.rank <= 3 ? 'white' : 'var(--text-secondary)' }}>{u.rank <= 3 ? ['🥇', '🥈', '🥉'][u.rank - 1] : u.rank}</div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: u.isUser ? 'var(--primary)' : '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>{u.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{u.name} {u.isUser && '(You)'}</div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)' }}>{u.xp.toLocaleString()} XP</div>
          </div>
        ))}
      </div>
    </div>
  );
};
