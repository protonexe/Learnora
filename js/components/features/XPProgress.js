const XPProgress = ({ onBack }) => {
  const [xp, setXP] = React.useState(() => JSON.parse(localStorage.getItem('xp-progress')) || {
    total: 4850,
    level: 8
  });

  const nextLevel = xp.level * 500;
  const currentLevelXP = (xp.level - 1) * 500;
  const progress = ((xp.total - currentLevelXP) / 500) * 100;

  const badges = [
    { name: 'First Quiz', icon: '🎯', earned: true },
    { name: 'Night Owl', icon: '🦉', earned: true },
    { name: 'Week Warrior', icon: '🔥', earned: true },
    { name: 'Course Master', icon: '🏆', earned: false },
    { name: 'Perfect Score', icon: '💯', earned: false }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>XP Progress</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', padding: '30px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>⭐</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>Level {xp.level}</div>
          <div style={{ opacity: 0.9, marginBottom: '15px' }}>{xp.total} XP</div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: '10px', marginBottom: '10px' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'white', borderRadius: '10px' }} />
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>{500 - Math.round(xp.total % 500)} XP to Level {xp.level + 1}</div>
        </div>

        <h3 style={{ marginBottom: '15px', color: '#374151' }}>Badges</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {badges.map((b, i) => (
            <div key={i} style={{ background: b.earned ? '#fef3c7' : '#f3f4f6', padding: '15px', borderRadius: '12px', textAlign: 'center', opacity: b.earned ? 1 : 0.5 }}>
              <div style={{ fontSize: '28px', marginBottom: '5px' }}>{b.icon}</div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>{b.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.XPProgress = XPProgress;
