const FocusMusic = ({ onClose }) => {
  const [playing, setPlaying] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState(0);
  const [volume, setVolume] = React.useState(0.7);

  const tracks = [
    { name: 'Ocean Waves', duration: '5:30', icon: '🌊' },
    { name: 'Rain Sounds', duration: '4:45', icon: '🌧️' },
    { name: 'Forest Ambience', duration: '6:15', icon: '🌲' },
    { name: 'White Noise', duration: '3:00', icon: '📻' },
    { name: 'Thunderstorm', duration: '10:00', icon: '⛈️' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', zIndex: 1000, display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>🎧 Focus Music</h2>
        <div style={{ width: 60 }} />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 80, marginBottom: 16 }}>{tracks[currentTrack].icon}</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: 'white', marginBottom: 8 }}>{tracks[currentTrack].name}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{tracks[currentTrack].duration}</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
            <button onClick={() => setCurrentTrack((currentTrack - 1 + tracks.length) % tracks.length)} style={{ width: 48, height: 48, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', fontSize: 18 }}>⏮</button>
            <button onClick={() => setPlaying(!playing)} style={{ width: 64, height: 64, borderRadius: '50%', border: 'none', background: 'white', color: '#1e293b', cursor: 'pointer', fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{playing ? '⏸' : '▶'}</button>
            <button onClick={() => setCurrentTrack((currentTrack + 1) % tracks.length)} style={{ width: 48, height: 48, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', fontSize: 18 }}>⏭</button>
          </div>

          <div style={{ marginBottom: 24 }}>
            <input type="range" min={0} max={1} step={0.1} value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'white' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
              <span>🔈</span>
              <span>🔊</span>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 8 }}>
            {tracks.map((track, idx) => (
              <div key={idx} onClick={() => { setCurrentTrack(idx); setPlaying(true); }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, background: idx === currentTrack ? 'rgba(255,255,255,0.15)' : 'transparent', cursor: 'pointer' }}>
                <span style={{ fontSize: 18 }}>{track.icon}</span>
                <span style={{ flex: 1, color: idx === currentTrack ? 'white' : 'rgba(255,255,255,0.7)', fontSize: 14 }}>{track.name}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
