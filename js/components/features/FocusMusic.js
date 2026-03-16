const FocusMusic = ({ onBack, showToast }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const [volume, setVolume] = React.useState(70);

  const tracks = [
    { id: 1, name: 'Rain Sounds', icon: '🌧️', duration: '∞', color: '#3b82f6' },
    { id: 2, name: 'Forest Ambient', icon: '🌲', duration: '∞', color: '#10b981' },
    { id: 3, name: 'Coffee Shop', icon: '☕', duration: '∞', color: '#f59e0b' },
    { id: 4, name: 'Ocean Waves', icon: '🌊', duration: '∞', color: '#0ea5e9' },
    { id: 5, name: 'White Noise', icon: '📻', duration: '∞', color: '#8b5cf6' },
    { id: 6, name: 'Lo-Fi Beats', icon: '🎵', duration: '∞', color: '#ec4899' },
    { id: 7, name: 'Fireplace', icon: '🔥', duration: '∞', color: '#ef4444' },
    { id: 8, name: 'Thunderstorm', icon: '⛈️', duration: '∞', color: '#6366f1' }
  ];

  const togglePlay = (track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
      showToast?.(isPlaying ? 'Paused' : 'Playing', 'info');
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      showToast?.(`Now playing: ${track.name}`, 'success');
    }
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Focus Music</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="now-playing" style={{ background: currentTrack ? `linear-gradient(135deg, ${currentTrack.color}, #1f2937)` : '#1f2937', padding: '30px', borderRadius: '20px', marginBottom: '30px', color: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '15px' }}>{currentTrack?.icon || '🎧'}</div>
          <h2 style={{ marginBottom: '5px' }}>{currentTrack?.name || 'Select a track'}</h2>
          <p style={{ opacity: 0.8 }}>{isPlaying ? 'Now Playing' : 'Paused'}</p>
          {currentTrack && (
            <div style={{ marginTop: '20px' }}>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                style={{ width: '100%', accentColor: 'white' }}
              />
              <div style={{ fontSize: '12px', marginTop: '5px' }}>Volume: {volume}%</div>
            </div>
          )}
        </div>

        <h3 style={{ marginBottom: '15px', color: '#374151' }}>Ambient Sounds</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {tracks.map(track => (
            <div
              key={track.id}
              onClick={() => togglePlay(track)}
              style={{
                background: currentTrack?.id === track.id ? track.color : 'white',
                color: currentTrack?.id === track.id ? 'white' : '#1f2937',
                padding: '20px',
                borderRadius: '15px',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                border: currentTrack?.id === track.id ? 'none' : '2px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{track.icon}</div>
              <div style={{ fontWeight: '600' }}>{track.name}</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>{track.duration}</div>
            </div>
          ))}
        </div>

        <div className="mixer-section" style={{ marginTop: '30px', background: 'white', padding: '20px', borderRadius: '15px' }}>
          <h3 style={{ marginBottom: '15px' }}>Sound Mixer</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {['Rain', 'Wind', 'Birds'].map(sound => (
              <div key={sound} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '60px' }}>{sound}</span>
                <input type="range" min="0" max="100" defaultValue="30" style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

window.FocusMusic = FocusMusic;
