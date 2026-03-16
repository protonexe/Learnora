const MiniGames = ({ onBack }) => {
  const games = [
    { name: 'Memory Match', icon: '🧠', desc: 'Match pairs of cards' },
    { name: 'Math Sprint', icon: '🔢', desc: 'Solve math problems fast' },
    { name: 'Word Scramble', icon: '🔤', desc: 'Unscramble the letters' },
    { name: 'Trivia Quiz', icon: '❓', desc: 'Test your knowledge' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Mini Games</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)', padding: '30px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎮</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>Learn Through Play</div>
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {games.map((g, i) => (
            <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '36px' }}>{g.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>{g.name}</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>{g.desc}</div>
              </div>
              <button style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Play</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.MiniGames = MiniGames;
