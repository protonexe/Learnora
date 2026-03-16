const FileUploader = ({ onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, padding: '10px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>×</button>
      <div style={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>📤</div>
        <h2 style={{ marginBottom: 16 }}>Upload Files</h2>
        <div style={{ border: '2px dashed var(--border-color)', borderRadius: 16, padding: 40, marginBottom: 20, background: 'var(--bg-secondary)' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Drag & drop files here</p>
          <button style={{ padding: '12px 24px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Browse Files</button>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>PDF, DOC, PPT up to 50MB</p>
      </div>
    </div>
  );
};
