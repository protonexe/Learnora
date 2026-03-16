const StudyPlaylist = ({ onClose }) => {
  const [currentPlaylist, setCurrentPlaylist] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.7);
  const [mood, setMood] = React.useState('focus');

  const playlists = [
    {
      id: 1,
      name: 'Deep Focus',
      description: 'Perfect for intensive study sessions',
      mood: 'focus',
      duration: '2h 30m',
      tracks: [
        { title: 'Ocean Waves', artist: 'Nature Sounds', duration: '5:30' },
        { title: 'Rain Sounds', artist: 'Nature Sounds', duration: '4:45' },
        { title: 'Forest Ambience', artist: 'Nature Sounds', duration: '6:15' },
        { title: 'White Noise', artist: 'Ambient', duration: '3:00' },
        { title: 'Pink Noise', artist: 'Ambient', duration: '3:00' },
      ]
    },
    {
      id: 2,
      name: 'Lo-Fi Beats',
      description: 'Chill beats to study to',
      mood: 'chill',
      duration: '1h 45m',
      tracks: [
        { title: 'Midnight Coffee', artist: 'Lo-Fi Girl', duration: '3:20' },
        { title: 'Rainy Day', artist: 'Lo-Fi Girl', duration: '2:45' },
        { title: 'Study Session', artist: 'ChillHop', duration: '4:10' },
        { title: 'Peaceful Mind', artist: 'ChillHop', duration: '3:35' },
      ]
    },
    {
      id: 3,
      name: 'Classical Focus',
      description: 'Classical music for concentration',
      mood: 'classical',
      duration: '3h 00m',
      tracks: [
        { title: 'Moonlight Sonata', artist: 'Beethoven', duration: '5:42' },
        { title: 'Clair de Lune', artist: 'Debussy', duration: '4:30' },
        { title: 'Gymnopédie No.1', artist: 'Satie', duration: '3:15' },
        { title: 'Air on G String', artist: 'Bach', duration: '4:45' },
      ]
    },
    {
      id: 4,
      name: 'Nature Sounds',
      description: 'Relaxing natural ambience',
      mood: 'nature',
      duration: '4h 00m',
      tracks: [
        { title: 'Thunderstorm', artist: 'Nature', duration: '10:00' },
        { title: 'Birds Chirping', artist: 'Nature', duration: '8:00' },
        { title: 'River Stream', artist: 'Nature', duration: '10:00' },
        { title: 'Campfire', artist: 'Nature', duration: '6:00' },
      ]
    },
    {
      id: 5,
      name: 'Ambient Space',
      description: 'Ethereal soundscapes',
      mood: 'ambient',
      duration: '2h 15m',
      tracks: [
        { title: 'Stellar Journey', artist: 'Space Sound', duration: '8:00' },
        { title: 'Nebula Dreams', artist: 'Ambient', duration: '7:30' },
        { title: 'Cosmic Flow', artist: 'Ambient', duration: '9:00' },
        { title: 'Galaxy Mind', artist: 'Space Sound', duration: '6:45' },
      ]
    },
  ];

  const filteredPlaylists = mood === 'all' 
    ? playlists 
    : playlists.filter(p => p.mood === mood);

  const currentTrack = currentPlaylist?.tracks?.[0] || null;

  const playPlaylist = (playlist) => {
    setCurrentPlaylist(playlist);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 1000,
      overflow: 'auto',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer'
          }}>
            ← Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>🎵 Study Playlists</h2>
        </div>
      </div>

      <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
        {/* Now Playing */}
        {currentPlaylist && (
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf620 0%, #6366f120 100%)',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            border: '1px solid var(--primary)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 16
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28
              }}>
                🎧
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, marginBottom: 4 }}>
                  NOW PLAYING
                </div>
                <h3 style={{ margin: 0, fontSize: 18, color: 'var(--text-primary)' }}>{currentPlaylist.name}</h3>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
                  {currentPlaylist.tracks.length} tracks • {currentPlaylist.duration}
                </p>
              </div>
            </div>

            {/* Track List */}
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: 8,
              padding: 8,
              marginBottom: 16
            }}>
              {currentPlaylist.tracks.slice(0, 3).map((track, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 12px',
                    borderRadius: 6,
                    background: idx === 0 ? 'var(--primary)' + '15' : 'transparent'
                  }}
                >
                  <span style={{
                    width: 24,
                    fontSize: 12,
                    color: idx === 0 ? 'var(--primary)' : 'var(--text-tertiary)'
                  }}>
                    {idx + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: idx === 0 ? 'var(--primary)' : 'var(--text-primary)', fontWeight: idx === 0 ? 600 : 400 }}>
                      {track.title}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{track.artist}</div>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{track.duration}</span>
                </div>
              ))}
              {currentPlaylist.tracks.length > 3 && (
                <div style={{ padding: '8px 12px', fontSize: 12, color: 'var(--text-tertiary)', textAlign: 'center' }}>
                  +{currentPlaylist.tracks.length - 3} more tracks
                </div>
              )}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                onClick={togglePlay}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <div style={{ flex: 1 }}>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: 'var(--primary)'
                  }}
                />
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', width: 40 }}>
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Mood Filter */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 20,
          overflowX: 'auto',
          paddingBottom: 8
        }}>
          {[
            { value: 'all', label: 'All', emoji: '🎶' },
            { value: 'focus', label: 'Focus', emoji: '🎯' },
            { value: 'chill', label: 'Lo-Fi', emoji: '😌' },
            { value: 'classical', label: 'Classical', emoji: '🎻' },
            { value: 'nature', label: 'Nature', emoji: '🌿' },
            { value: 'ambient', label: 'Ambient', emoji: '✨' },
          ].map(m => (
            <button
              key={m.value}
              onClick={() => setMood(m.value)}
              style={{
                padding: '10px 16px',
                borderRadius: 20,
                border: 'none',
                background: mood === m.value ? 'var(--primary)' : 'var(--bg-secondary)',
                color: mood === m.value ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: 13,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>

        {/* Playlists Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16
        }}>
          {filteredPlaylists.map(playlist => (
            <div
              key={playlist.id}
              onClick={() => playPlaylist(playlist)}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 12,
                padding: 16,
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '100%',
                height: 100,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #8b5cf620 0%, #6366f120 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 40,
                marginBottom: 12
              }}>
                {playlist.mood === 'focus' && '🎯'}
                {playlist.mood === 'chill' && '😌'}
                {playlist.mood === 'classical' && '🎻'}
                {playlist.mood === 'nature' && '🌿'}
                {playlist.mood === 'ambient' && '✨'}
              </div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: 15, color: 'var(--text-primary)' }}>
                {playlist.name}
              </h3>
              <p style={{ margin: '0 0 8px 0', fontSize: 12, color: 'var(--text-secondary)' }}>
                {playlist.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-tertiary)' }}>
                <span>🎵 {playlist.tracks.length} tracks</span>
                <span>⏱️ {playlist.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
