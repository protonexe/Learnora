const DebugPanel = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [stats, setStats] = React.useState({
    sessions: JSON.parse(localStorage.getItem('study-sessions') || '[]').length,
    notes: JSON.parse(localStorage.getItem('learnora-notes') || '[]').length,
    flashcards: JSON.parse(localStorage.getItem('flashcard-decks') || '[]').reduce((sum, d) => sum + d.cards.length, 0),
    streak: JSON.parse(localStorage.getItem('learnora-streak') || '{}'),
    storage: 0
  });

  const clearData = (key) => {
    if (confirm(`Clear all ${key} data?`)) {
      localStorage.removeItem(key);
      showToast?.(`Cleared ${key}`, 'success');
      window.location.reload();
    }
  };

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
    a.download = 'learnora-backup.json';
    a.click();
    showToast?.('Data exported!', 'success');
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>🔧 Debug Panel</h1>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>📊 App Statistics</h3>
        <div style={styles.statGrid}>
          <div style={styles.statBox}><span style={styles.statValue}>{stats.sessions}</span><span style={styles.statLabel}>Study Sessions</span></div>
          <div style={styles.statBox}><span style={styles.statValue}>{stats.notes}</span><span style={styles.statLabel}>Notes</span></div>
          <div style={styles.statBox}><span style={styles.statValue}>{stats.flashcards}</span><span style={styles.statLabel}>Flashcards</span></div>
          <div style={styles.statBox}><span style={styles.statValue}>{stats.streak.current || 0}</span><span style={styles.statLabel}>Current Streak</span></div>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>💾 Data Management</h3>
        <button onClick={exportData} style={styles.actionButton}>📤 Export All Data</button>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>🗑️ Clear Data</h3>
        <div style={styles.buttonGrid}>
          <button onClick={() => clearData('study-sessions')} style={styles.dangerButton}>Sessions</button>
          <button onClick={() => clearData('learnora-notes')} style={styles.dangerButton}>Notes</button>
          <button onClick={() => clearData('flashcard-decks')} style={styles.dangerButton}>Flashcards</button>
          <button onClick={() => clearData('learnora-streak')} style={styles.dangerButton}>Streak</button>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={styles.dangerButton}>Clear All</button>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>ℹ️ App Info</h3>
        <p style={styles.infoText}>Learnora v1.0.0</p>
        <p style={styles.infoText}>React + Babel SPA</p>
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  cardTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' },
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' },
  statBox: { background: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center' },
  statValue: { display: 'block', fontSize: '24px', fontWeight: '700', color: 'var(--primary-500)' },
  statLabel: { display: 'block', fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' },
  actionButton: { width: '100%', padding: '14px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  buttonGrid: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  dangerButton: { padding: '10px 16px', background: '#f43f5e', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '13px', cursor: 'pointer' },
  infoText: { fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0' }
};

window.DebugPanel = DebugPanel;
