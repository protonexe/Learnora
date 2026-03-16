const DataBackup = ({ onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>💾 Backup</h2>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 20, marginBottom: 16, border: '1px solid var(--border-color)' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: 16 }}>Export Data</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: 13, color: 'var(--text-secondary)' }}>Download all your data as a ZIP file</p>
          <button style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Export Now</button>
        </div>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 20, border: '1px solid var(--border-color)' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: 16 }}>Last Backup</h3>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>March 15, 2026 at 2:30 PM</p>
        </div>
      </div>
    </div>
  );
};
