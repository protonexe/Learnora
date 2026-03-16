const OfflineMode = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const [available, setAvailable] = React.useState(true);
  const [downloads, setDownloads] = React.useState(() => JSON.parse(localStorage.getItem('offline-content') || '[]'));

  const download = (item) => {
    setDownloads([...downloads, { id: Date.now(), name: item, downloadedAt: new Date().toISOString() }]);
  };

  const items = ['Mathematics Basics', 'Physics Fundamentals', 'Chemistry 101', 'Biology Essentials'];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>📴 Offline Mode</h1>
      </div>

      <div style={styles.banner}>
        <span style={styles.bannerIcon}>✅</span>
        <span>You're online and ready to sync!</span>
      </div>

      <h3 style={styles.title}>Available for Download</h3>
      {items.map((item, idx) => (
        <div key={idx} style={styles.item}>
          <span>{item}</span>
          <button onClick={() => download(item)} style={styles.dlBtn}>Download</button>
        </div>
      ))}

      <h3 style={styles.title}>Downloaded ({downloads.length})</h3>
      {downloads.map(d => (
        <div key={d.id} style={styles.downloadedItem}>
          <span>📁 {d.name}</span>
        </div>
      ))}
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, banner: { background: '#10b98120', color: '#10b981', padding: '16px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }, bannerIcon: { fontSize: '20px' }, title: { fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#666' }, item: { display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '8px' }, dlBtn: { padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }, downloadedItem: { padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '8px' }};

window.OfflineMode = OfflineMode;
