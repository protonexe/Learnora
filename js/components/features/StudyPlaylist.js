const StudyPlaylist = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [playlists, setPlaylists] = React.useState(() => {
    return JSON.parse(localStorage.getItem('study-playlists') || '[]');
  });
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newPlaylist, setNewPlaylist] = React.useState({ name: '', genre: 'lofi', link: '' });
  const [playing, setPlaying] = React.useState(null);

  React.useEffect(() => {
    localStorage.setItem('study-playlists', JSON.stringify(playlists));
  }, [playlists]);

  const addPlaylist = () => {
    if (!newPlaylist.name.trim()) return;
    const playlist = { id: Date.now(), ...newPlaylist, plays: 0, addedAt: new Date().toISOString() };
    setPlaylists([...playlists, playlist]);
    setNewPlaylist({ name: '', genre: 'lofi', link: '' });
    setShowAddForm(false);
    showToast?.('Playlist added!', 'success');
  };

  const deletePlaylist = (id) => {
    setPlaylists(playlists.filter(p => p.id !== id));
  };

  const playPlaylist = (id) => {
    setPlaying(id);
    setPlaylists(playlists.map(p => p.id === id ? { ...p, plays: p.plays + 1 } : p));
    showToast?.('Playing music...', 'info');
  };

  const genres = [
    { id: 'lofi', icon: '🎧', label: 'Lo-Fi' },
    { id: 'classical', icon: '🎻', label: 'Classical' },
    { id: 'jazz', icon: '🎷', label: 'Jazz' },
    { id: 'ambient', icon: '🌙', label: 'Ambient' },
    { id: 'nature', icon: '🌿', label: 'Nature Sounds' },
    { id: 'focus', icon: '🧠', label: 'Focus' },
    { id: 'white', icon: '📻', label: 'White Noise' }
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}>
            <Icon name="arrow-left" size={20} />
          </button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>
            🎵 Study Playlists
          </h1>
        </div>
        <button onClick={() => setShowAddForm(true)} style={styles.addButton}>
          <Icon name="plus" size={18} /> Add
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Add Playlist</h3>
          <input
            type="text"
            value={newPlaylist.name}
            onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
            placeholder="Playlist name"
            style={styles.input}
          />
          <select
            value={newPlaylist.genre}
            onChange={(e) => setNewPlaylist({ ...newPlaylist, genre: e.target.value })}
            style={styles.select}
          >
            {genres.map(g => <option key={g.id} value={g.id}>{g.icon} {g.label}</option>)}
          </select>
          <input
            type="text"
            value={newPlaylist.link}
            onChange={(e) => setNewPlaylist({ ...newPlaylist, link: e.target.value })}
            placeholder="Spotify/YouTube link (optional)"
            style={styles.input}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addPlaylist} style={styles.primaryButton}>Add</button>
            <button onClick={() => setShowAddForm(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {/* Genre Quick Links */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={styles.sectionTitle}>Quick Start</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {genres.map(g => (
            <button key={g.id} style={styles.genreButton}>
              {g.icon} {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Playlists */}
      {playlists.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No playlists added yet.</p>
          <p>Add your favorite study music!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {playlists.map(playlist => (
            <div key={playlist.id} style={{ ...styles.playlistCard, borderLeftColor: playing === playlist.id ? 'var(--primary-500)' : 'var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                <span style={{ fontSize: '32px' }}>{genres.find(g => g.id === playlist.genre)?.icon}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.playlistName}>{playlist.name}</h3>
                  <p style={styles.playlistMeta}>{genres.find(g => g.id === playlist.genre)?.label} • {playlist.plays} plays</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => playPlaylist(playlist.id)} style={styles.playButton}>
                  <Icon name={playing === playlist.id ? 'pause' : 'play'} size={18} />
                </button>
                <button onClick={() => deletePlaylist(playlist.id)} style={styles.deleteButton}>
                  <Icon name="trash-2" size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  cardTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  select: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  sectionTitle: { fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-secondary)' },
  genreButton: { padding: '10px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '13px', cursor: 'pointer', color: 'var(--text-secondary)' },
  emptyState: { textAlign: 'center', padding: '60px 20px', color: 'var(--text-tertiary)' },
  playlistCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', display: 'flex', alignItems: 'center', borderLeft: '4px solid' },
  playlistName: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  playlistMeta: { fontSize: '12px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  playButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px', cursor: 'pointer', display: 'flex' },
  deleteButton: { background: 'transparent', color: 'var(--text-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '10px', cursor: 'pointer', display: 'flex' }
};

window.StudyPlaylist = StudyPlaylist;
