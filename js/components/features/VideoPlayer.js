const VideoPlayer = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const videos = [
    { id: 1, title: 'Introduction to Calculus', duration: '15:30', watched: true },
    { id: 2, title: 'Derivatives Basics', duration: '22:15', watched: false },
    { id: 3, title: 'Integration Techniques', duration: '18:45', watched: false },
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>🎬 Video Player</h1>
      </div>

      <div style={styles.player}>
        <div style={styles.screen}>▶</div>
        <p style={styles.hint}>Select a video to play</p>
      </div>

      <h3 style={styles.title}>Course Videos</h3>
      {videos.map(v => (
        <div key={v.id} style={styles.video}>
          <span style={styles.check}>{v.watched ? '✓' : '○'}</span>
          <div style={styles.info}>
            <span style={styles.vidTitle}>{v.title}</span>
            <span style={styles.duration}>{v.duration}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, player: { background: '#000', borderRadius: '12px', padding: '60px', textAlign: 'center', marginBottom: '20px' }, screen: { fontSize: '48px', color: '#fff' }, hint: { color: '#888', marginTop: '12px' }, title: { fontSize: '16px', fontWeight: 600, marginBottom: '12px' }, video: { display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', marginBottom: '8px' }, check: { width: '24px', color: 'var(--primary-500)', fontWeight: 'bold' }, info: { flex: 1 }, vidTitle: { display: 'block', fontSize: '14px', fontWeight: 500 }, duration: { fontSize: '12px', color: '#888' }};

window.VideoPlayer = VideoPlayer;
