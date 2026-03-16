const Leaderboard = ({ onBack }) => {
  const users = [
    { rank: 1, name: 'Alex Johnson', xp: 12500, avatar: '👨‍🎓', badge: '🥇' },
    { rank: 2, name: 'Sarah Chen', xp: 11200, avatar: '👩‍🎓', badge: '🥈' },
    { rank: 3, name: 'Mike Brown', xp: 10800, avatar: '👨‍🎓', badge: '🥉' },
    { rank: 4, name: 'Emma Wilson', xp: 9500, avatar: '👩‍🎓', badge: '' },
    { rank: 5, name: 'You', xp: 4850, avatar: '🧑‍🎓', badge: '', isUser: true },
    { rank: 6, name: 'David Lee', xp: 4200, avatar: '👨‍🎓', badge: '' },
    { rank: 7, name: 'Lisa Park', xp: 3800, avatar: '👩‍🎓', badge: '' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Leaderboard</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', padding: '25px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🏆</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Weekly Challenge</div>
        </div>

        <div style={{ display: 'grid', gap: '10px' }}>
          {users.map(user => (
            <div key={user.rank} style={{ background: user.isUser ? '#f0f9ff' : 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: user.isUser ? '2px solid #6366f1' : 'none' }}>
              <div style={{ width: '30px', fontWeight: 'bold', color: user.rank <= 3 ? '#f59e0b' : '#6b7280' }}>#{user.rank}</div>
              <div style={{ fontSize: '28px' }}>{user.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>{user.name} {user.isUser && '(You)'}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{user.xp.toLocaleString()} XP</div>
              </div>
              <div style={{ fontSize: '24px' }}>{user.badge}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.Leaderboard = Leaderboard;
