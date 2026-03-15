const StreakView = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [streakData, setStreakData] = React.useState({
    current: 12,
    longest: 28,
    lastStudyDate: new Date().toISOString().split('T')[0],
    weeklyActivity: [true, true, true, true, true, false, true]
  });

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();

  const studyToday = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (streakData.lastStudyDate !== todayStr) {
      const newCurrent = streakData.lastStudyDate === new Date(Date.now() - 86400000).toISOString().split('T')[0] ? streakData.current + 1 : 1;
      const newLongest = Math.max(newCurrent, streakData.longest);
      setStreakData({
        ...streakData,
        current: newCurrent,
        longest: newLongest,
        lastStudyDate: todayStr,
        weeklyActivity: [...streakData.weeklyActivity.slice(1), true]
      });
      showToast(`Day ${newCurrent} of your streak! Keep going!`, 'success');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Study Streak</h1>
        <div style={{ width: '60px' }} />
      </div>

      <div style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '20px', padding: '32px', marginBottom: '24px', color: '#fff', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', fontWeight: '700', marginBottom: '8px' }}>🔥 {streakData.current}</div>
        <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>Day Streak</div>
        <div style={{ fontSize: '14px', opacity: 0.9 }}>{streakData.longest} days is your best streak!</div>
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>This Week</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', background: 'var(--bg-secondary)', borderRadius: '16px', padding: '20px' }}>
        {streakData.weeklyActivity.map((active, idx) => {
          const isToday = idx === 6;
          const isPast = idx < 6;
          return (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{ 
                width: isMobile ? '36px' : '48px', 
                height: isMobile ? '36px' : '48px', 
                borderRadius: '50%', 
                background: active ? 'var(--success)' : (isToday ? 'var(--primary-500)' : 'var(--bg-tertiary)'),
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '8px',
                fontSize: isMobile ? '16px' : '20px'
              }}>
                {active ? '✓' : (isToday ? '🎯' : '')}
              </div>
              <div style={{ fontSize: '12px', color: isToday ? 'var(--primary-500)' : 'var(--text-secondary)', fontWeight: isToday ? '600' : '400' }}>{dayNames[idx]}</div>
            </div>
          );
        })}
      </div>

      <button onClick={studyToday} style={{ width: '100%', padding: '16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '16px', marginBottom: '24px' }}>
        📚 Log Study Session
      </button>

      <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Streak Facts</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { icon: '🏆', title: 'Keep it up!', desc: `You're ${streakData.longest - streakData.current} days away from your record!` },
          { icon: '💪', title: 'Consistency is key', desc: 'Studying every day helps build lasting habits.' },
          { icon: '🎯', title: 'Today\'s goal', desc: streakData.weeklyActivity[6] ? 'Already completed!' : 'Log a session to keep your streak alive!' },
        ].map((fact, idx) => (
          <div key={idx} style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '28px' }}>{fact.icon}</div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{fact.title}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>{fact.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.StreakView = StreakView;
