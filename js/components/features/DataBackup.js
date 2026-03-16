const DataBackup = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [lastBackup, setLastBackup] = React.useState(localStorage.getItem('last-backup'));

  const exportData = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learnora-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    localStorage.setItem('last-backup', new Date().toISOString());
    setLastBackup(new Date().toISOString());
    showToast?.('Backup exported!', 'success');
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        Object.entries(data).forEach(([key, value]) => localStorage.setItem(key, value));
        showToast?.('Data imported! Reloading...', 'success');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        showToast?.('Invalid backup file', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>💾 Data Backup</h1>
      </div>

      <div style={styles.card}>
        <h3 style={styles.title}>📤 Export Data</h3>
        <p style={styles.desc}>Download all your data including notes, progress, settings, and more.</p>
        <button onClick={exportData} style={styles.button}>Download Backup</button>
        {lastBackup && <p style={styles.lastBackup}>Last backup: {new Date(lastBackup).toLocaleString()}</p>}
      </div>

      <div style={styles.card}>
        <h3 style={styles.title}>📥 Import Data</h3>
        <p style={styles.desc}>Restore from a previous backup file. This will replace all current data.</p>
        <label style={styles.uploadLabel}>
          <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
          <span style={styles.uploadButton}>Choose File</span>
        </label>
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '20px' },
  title: { fontSize: '18px', fontWeight: '600', margin: '0 0 12px 0', color: 'var(--text-primary)' },
  desc: { fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: '1.5' },
  button: { width: '100%', padding: '14px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  lastBackup: { fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '12px', textAlign: 'center' },
  uploadLabel: { cursor: 'pointer', display: 'block' },
  uploadButton: { display: 'block', width: '100%', padding: '14px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', textAlign: 'center', color: 'var(--text-primary)' }
};

window.DataBackup = DataBackup;
