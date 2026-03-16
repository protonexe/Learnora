const SubjectProgress = ({ onClose }) => {
  const subjects = [
    { name: 'Math', progress: 75, color: '#f43f5e' },
    { name: 'Physics', progress: 60, color: '#14b8a6' },
    { name: 'Chemistry', progress: 45, color: '#0ea5e9' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📊 Subject Progress</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {subjects.map((s, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 600 }}>{s.name}</span>
              <span style={{ fontSize: 14, color: s.color, fontWeight: 700 }}>{s.progress}%</span>
            </div>
            <div style={{ height: 10, background: 'var(--bg)', borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: s.progress + '%', background: s.color, borderRadius: 5 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
