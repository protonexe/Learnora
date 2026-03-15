const LeaderboardView = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [leaders, setLeaders] = React.useState([]);
  const [timeFilter, setTimeFilter] = React.useState('all');

  React.useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = () => {
    const mockLeaders = [
      { rank: 1, name: 'Alex Chen', xp: 2450, level: 12, streak: 45, avatar: '👨‍🎓' },
      { rank: 2, name: 'Maria Garcia', xp: 2180, level: 10, streak: 32, avatar: '👩‍🎓' },
      { rank: 3, name: 'James Wilson', xp: 1920, level: 9, streak: 28, avatar: '👨‍🎓' },
      { rank: 4, name: 'Sarah Johnson', xp: 1750, level: 8, streak: 21, avatar: '👩‍🎓' },
      { rank: 5, name: 'Michael Brown', xp: 1580, level: 7, streak: 18, avatar: '👨‍🎓' },
      { rank: 6, name: 'Emily Davis', xp: 1420, level: 6, streak: 15, avatar: '👩‍🎓' },
      { rank: 7, name: 'David Lee', xp: 1280, level: 6, streak: 12, avatar: '👨‍🎓' },
      { rank: 8, name: 'Lisa Anderson', xp: 1150, level: 5, streak: 10, avatar: '👩‍🎓' },
      { rank: 9, name: 'Chris Taylor', xp: 980, level: 4, streak: 7, avatar: '👨‍🎓' },
      { rank: 10, name: 'You', xp: 450, level: 2, streak: 3, avatar: '🧑‍🎓', isCurrentUser: true },
    ];
    setLeaders(mockLeaders);
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Leaderboard</h1>
        <div style={{ width: '60px' }} />
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {['today', 'week', 'month', 'all'].map(filter => (
          <button key={filter} onClick={() => setTimeFilter(filter)} style={{ padding: '8px 16px', background: timeFilter === filter ? 'var(--primary-500)' : 'var(--bg-secondary)', color: timeFilter === filter ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', textTransform: 'capitalize' }}>
            {filter}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {leaders.map((leader, idx) => (
          <div key={leader.rank} style={{ background: leader.isCurrentUser ? 'var(--primary-500)' : 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', transition: 'all 0.2s' }}>
            <div style={{ width: '40px', textAlign: 'center', fontSize: leader.rank <= 3 ? '24px' : '18px', fontWeight: leader.rank <= 3 ? '700' : '600', color: leader.isCurrentUser ? '#fff' : 'var(--text-secondary)' }}>
              {getRankIcon(leader.rank)}
            </div>
            <div style={{ width: '48px', height: '48px', background: leader.isCurrentUser ? 'rgba(255,255,255,0.2)' : 'var(--bg-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
              {leader.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0, color: leader.isCurrentUser ? '#fff' : 'var(--text-primary)' }}>{leader.name}</h3>
              <p style={{ fontSize: '12px', color: leader.isCurrentUser ? 'rgba(255,255,255,0.8)' : 'var(--text-tertiary)', margin: 0 }}>Level {leader.level} • 🔥 {leader.streak} days</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: leader.isCurrentUser ? '#fff' : 'var(--primary-500)' }}>{leader.xp.toLocaleString()}</div>
              <div style={{ fontSize: '11px', color: leader.isCurrentUser ? 'rgba(255,255,255,0.8)' : 'var(--text-tertiary)' }}>XP</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.LeaderboardView = LeaderboardView;
