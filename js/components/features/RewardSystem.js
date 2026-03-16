const RewardSystem = ({ onClose }) => {
  const [points, setPoints] = React.useState(1250);
  const [level, setLevel] = React.useState(5);
  const [showRewards, setShowRewards] = React.useState(false);

  const rewards = [
    { id: 1, name: 'Extra Study Time', cost: 100, icon: '⏰', claimed: false },
    { id: 2, name: 'Custom Avatar', cost: 250, icon: '🎨', claimed: false },
    { id: 3, name: 'Theme Unlock', cost: 300, icon: '🎨', claimed: false },
    { id: 4, name: 'Badge: Super Student', cost: 500, icon: '🏆', claimed: true },
  ];

  const achievements = [
    { icon: '🔥', name: '7 Day Streak', earned: true },
    { icon: '📚', name: 'First Course', earned: true },
    { icon: '✍️', name: '10 Quizzes', earned: true },
    { icon: '🃏', name: '100 Flashcards', earned: false },
    { icon: '🏆', name: 'Top 10', earned: false },
    { icon: '⭐', name: '5 Star Rating', earned: false },
  ];

  const nextLevelXP = level * 500;
  const currentLevelXP = (level - 1) * 500;
  const progress = ((points - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>← Back</button>
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>🎁 Rewards</h2>
        </div>
        <div style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.2)', borderRadius: 20, color: 'white', fontWeight: 600 }}>⭐ {points} pts</div>
      </div>

      <div style={{ padding: 20, maxWidth: 500, margin: '0 auto' }}>
        {/* Level Card */}
        <div style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', borderRadius: 16, padding: 24, marginBottom: 24, color: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>⭐</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>Level {level}</div>
          <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 16 }}>{points - currentLevelXP} / {nextLevelXP - currentLevelXP} XP to Level {level + 1}</div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.3)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: progress + '%', background: 'white', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        {/* Achievements */}
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--text-secondary)' }}>Achievements</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {achievements.map((a, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 16, background: a.earned ? 'var(--primary)' + '15' : 'var(--bg-secondary)', borderRadius: 12, border: a.earned ? '1px solid var(--primary)' : '1px solid var(--border-color)', opacity: a.earned ? 1 : 0.5 }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{a.icon}</div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{a.name}</div>
            </div>
          ))}
        </div>

        {/* Rewards Shop */}
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--text-secondary)' }}>Rewards Shop</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rewards.map(reward => (
            <div key={reward.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary)' + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{reward.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{reward.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>⭐ {reward.cost} points</div>
              </div>
              <button disabled={points < reward.cost || reward.claimed} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: reward.claimed ? '#10b981' : (points >= reward.cost ? 'var(--primary)' : 'var(--border-color)'), color: 'white', cursor: points >= reward.cost && !reward.claimed ? 'pointer' : 'not-allowed', fontSize: 12, fontWeight: 600 }}>
                {reward.claimed ? 'Owned' : 'Claim'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
