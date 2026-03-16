const ShareModal = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  
  const share = (platform) => {
    showToast?.(`Opening ${platform}...`, 'info');
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>📤 Share</h1>
      </div>

      <div style={styles.card}>
        <p style={styles.text}>Share your progress with friends!</p>
        <div style={styles.grid}>
          {['Twitter', 'Facebook', 'LinkedIn', 'Email', 'WhatsApp', 'Copy Link'].map(p => (
            <button key={p} onClick={() => share(p)} style={styles.btn}>{p}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px' }, text: { textAlign: 'center', marginBottom: '20px', color: '#666' }, grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }, btn: { padding: '16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }};

window.ShareModal = ShareModal;
