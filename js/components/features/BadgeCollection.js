const BadgeCollection = ({ onBack }) => {
  const badges = [
    { id: 1, name: 'First Steps', icon: '🎯', desc: 'Complete first lesson', earned: true, color: '#10b981' },
    { id: 2, name: 'Quiz Master', icon: '🏆', desc: 'Score 100% on quiz', earned: true, color: '#f59e0b' },
    { id: 3, name: 'Week Warrior', icon: '🔥', desc: '7-day streak', earned: true, color: '#ef4444' },
    { id: 4, name: 'Night Owl', icon: '🦉', desc: 'Study after midnight', earned: true, color: '#8b5cf6' },
    { id: 5, name: 'Early Bird', icon: '🌅', desc: 'Study before 6 AM', earned: false, color: '#6366f1' },
    { id: 6, name: 'Course Complete', icon: '📚', desc: 'Finish a course', earned: false, color: '#0ea5e9' },
    { id: 7, name: 'Helpful', icon: '🤝', desc: 'Help a peer', earned: false, color: '#14b8a6' },
    { id: 8, name: 'Bookworm', icon: '📖', desc: 'Read 10 books', earned: false, color: '#f43f5e' }
  ];

  const earned = badges.filter(b => b.earned).length;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Badge Collection</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '25px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🏅</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{earned}/{badges.length}</div>
          <div style={{ opacity: 0.9 }}>Badges Earned</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {badges.map(badge => (
            <div key={badge.id} style={{ background: badge.earned ? badge.color : '#f3f4f6', padding: '20px', borderRadius: '15px', textAlign: 'center', opacity: badge.earned ? 1 : 0.5 }}>
              <div style={{ fontSize: '36px', marginBottom: '8px', filter: badge.earned ? 'none' : 'grayscale(100%)' }}>{badge.icon}</div>
              <div style={{ fontWeight: '600', color: badge.earned ? 'white' : '#6b7280', marginBottom: '4px' }}>{badge.name}</div>
              <div style={{ fontSize: '11px', color: badge.earned ? 'rgba(255,255,255,0.8)' : '#9ca3af' }}>{badge.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.BadgeCollection = BadgeCollection;
