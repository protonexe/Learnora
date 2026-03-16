const FocusPlaylist = ({ onBack }) => {
  const playlists = [
    { id: 1, name: 'Deep Focus', icon: '🎯', tracks: 25, duration: '2h 30m' },
    { id: 2, name: 'Lo-Fi Beats', icon: '🎵', tracks: 50, duration: '3h 15m' },
    { id: 3, name: 'Nature Sounds', icon: '🌲', tracks: 30, duration: '4h' },
    { id: 4, name: 'Classical Study', icon: '🎻', tracks: 40, duration: '3h 45m' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Focus Playlists</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', padding: '30px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎧</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>Study Music</div>
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {playlists.map(p => (
            <div key={p.id} style={{ background: 'white', padding: '20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{p.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>{p.name}</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>{p.tracks} tracks • {p.duration}</div>
              </div>
              <button style={{ padding: '10px 20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>▶</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.FocusPlaylist = FocusPlaylist;
