const AudioPlayer = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const [playing, setPlaying] = React.useState(false);

  const tracks = [
    { id: 1, title: 'Focus Music', artist: 'Lo-Fi Beats', duration: '3:45' },
    { id: 2, title: 'Study Session', artist: 'Ambient Sounds', duration: '5:20' },
    { id: 3, title: 'Calm Mind', artist: 'Nature Sounds', duration: '4:15' },
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>🎵 Audio Player</h1>
      </div>

      <div style={styles.player}>
        <div style={styles.art}>🎵</div>
        <h3 style={styles.trackTitle}>Focus Music</h3>
        <p style={styles.artist}>Lo-Fi Beats</p>
        <div style={styles.controls}>
          <button style={styles.ctrl}>⏮</button>
          <button onClick={() => setPlaying(!playing)} style={styles.play}>{playing ? '⏸' : '▶'}</button>
          <button style={styles.ctrl}>⏭</button>
        </div>
        <div style={styles.bar}><div style={{ ...styles.progress, width: '35%' }} /></div>
      </div>

      <h3 style={styles.title}>Playlist</h3>
      {tracks.map(t => (
        <div key={t.id} style={styles.track}>
          <span>{t.title}</span>
          <span style={styles.time}>{t.duration}</span>
        </div>
      ))}
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, player: { background: 'var(--gradient-primary)', borderRadius: '16px', padding: '32px', textAlign: 'center', marginBottom: '20px' }, art: { fontSize: '64px', marginBottom: '16px' }, trackTitle: { fontSize: '20px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }, artist: { color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }, controls: { display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px' }, ctrl: { width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', color: '#fff' }, play: { width: '56px', height: '56px', background: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '24px', color: 'var(--primary-500)' }, bar: { height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }, progress: { height: '100%', background: '#fff', borderRadius: '2px' }, title: { fontSize: '14px', fontWeight: 600, marginBottom: '12px' }, track: { display: 'flex', justifyContent: 'space-between', padding: '14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '8px', fontSize: '14px' }, time: { color: '#888' }};

window.AudioPlayer = AudioPlayer;
