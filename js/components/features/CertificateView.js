const CertificateView = ({ onClose }) => {
  const certificates = [
    { id: 1, title: 'Mathematics Fundamentals', date: '2026-02-15', icon: '🎓' },
    { id: 2, title: 'Physics Advanced', date: '2026-01-20', icon: '🎓' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>🎓 Certificates</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {certificates.map(c => (
          <div key={c.id} style={{ background: 'var(--bg-secondary)', borderRadius: 16, padding: 24, border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{c.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{c.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Completed on {c.date}</div>
            <button style={{ marginTop: 16, padding: '10px 20px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
};
