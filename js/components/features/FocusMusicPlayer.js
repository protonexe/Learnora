const FocusMusicPlayer = ({ onBack, showToast }) => {
  const [playing, setPlaying] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [volume, setVolume] = React.useState(70);

  const sounds = [
    { name: 'Rain', icon: '🌧️', color: '#3b82f6' },
    { name: 'Forest', icon: '🌲', color: '#10b981' },
    { name: 'Ocean', icon: '🌊', color: '#0ea5e9' },
    { name: 'Fire', icon: '🔥', color: '#ef4444' },
    { name: 'Wind', icon: '💨', color: '#8b5cf6' },
    { name: 'Thunder', icon: '⛈️', color: '#6366f1' }
  ];

  const togglePlay = (index) => {
    if (current === index && playing) {
      setPlaying(false);
    } else {
      setCurrent(index);
      setPlaying(true);
      showToast?.(`Playing ${sounds[index].name}`, 'success');
    }
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Ambient Sounds</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div style={{ background: playing ? sounds[current].color : '#1f2937', padding: '40px', borderRadius: '25px', color: 'white', textAlign: 'center', marginBottom: '25px', transition: 'background 0.3s' }}>
          <div style={{ fontSize: '64px', marginBottom: '15px' }}>{playing ? sounds[current].icon : '🎧'}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{playing ? sounds[current].name : 'Select a sound'}</div>
          <div style={{ marginTop: '20px' }}>
            <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(e.target.value)} style={{ width: '80%', accentColor: 'white' }} />
            <div style={{ fontSize: '12px', marginTop: '5px' }}>Volume: {volume}%</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {sounds.map((sound, i) => (
            <div key={i} onClick={() => togglePlay(i)} style={{ background: current === i && playing ? sound.color : 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', color: current === i && playing ? 'white' : '#1f2937', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{sound.icon}</div>
              <div style={{ fontWeight: '600' }}>{sound.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.FocusMusicPlayer = FocusMusicPlayer;
