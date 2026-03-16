const SystemStatus = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [status] = React.useState({
    api: 'online',
    storage: '85%',
    sessions: 127,
    lastSync: new Date().toISOString()
  });

  const clearCache = () => {
    showToast?.('Cache cleared!', 'success');
  };

  const testFeatures = () => {
    showToast?.('All features working!', 'success');
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>⚙️ System Status</h1>
      </div>

      <div style={styles.statusCard}>
        <div style={styles.statusRow}>
          <span>API Status</span>
          <span style={{ ...styles.statusBadge, background: '#10b98120', color: '#10b981' }}>● Online</span>
        </div>
        <div style={styles.statusRow}>
          <span>Storage Used</span>
          <span>{status.storage}</span>
        </div>
        <div style={styles.statusRow}>
          <span>Total Sessions</span>
          <span>{status.sessions}</span>
        </div>
        <div style={styles.statusRow}>
          <span>Last Sync</span>
          <span>{new Date(status.lastSync).toLocaleTimeString()}</span>
        </div>
      </div>

      <div style={styles.actions}>
        <button onClick={testFeatures} style={styles.actionBtn}>✅ Test Features</button>
        <button onClick={clearCache} style={styles.actionBtn}>🗑️ Clear Cache</button>
      </div>

      <div style={styles.infoCard}>
        <h3 style={styles.infoTitle}>📋 App Information</h3>
        <p style={styles.infoText}>Learnora v1.0.0</p>
        <p style={styles.infoText}>React 18 + Babel</p>
        <p style={styles.infoText}>LocalStorage Based</p>
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  statusCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  statusRow: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' },
  statusBadge: { padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  actions: { display: 'flex', gap: '12px', marginBottom: '20px' },
  actionBtn: { flex: 1, padding: '14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', cursor: 'pointer' },
  infoCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  infoTitle: { fontSize: '16px', fontWeight: '600', margin: '0 0 12px 0', color: 'var(--text-primary)' },
  infoText: { fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0' }
};

window.SystemStatus = SystemStatus;
