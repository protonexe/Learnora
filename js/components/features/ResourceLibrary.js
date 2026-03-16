const ResourceLibrary = ({ onBack }) => {
  const resources = [
    { id: 1, title: 'Calculus Cheat Sheet', type: 'PDF', size: '2.3 MB', subject: 'Mathematics', icon: '📄' },
    { id: 2, title: 'Physics Formulas', type: 'PDF', size: '1.8 MB', subject: 'Physics', icon: '📄' },
    { id: 3, title: 'Chemistry Periodic Table', type: 'Image', size: '500 KB', subject: 'Chemistry', icon: '🖼️' },
    { id: 4, title: 'Biology Diagrams', type: 'PDF', size: '4.1 MB', subject: 'Biology', icon: '📄' },
    { id: 5, title: 'History Timeline', type: 'PDF', size: '1.2 MB', subject: 'History', icon: '📄' }
  ];

  const download = (title) => {
    alert(`Downloading ${title}...`);
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Resource Library</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gap: '12px' }}>
          {resources.map(r => (
            <div key={r.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '32px' }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>{r.title}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{r.subject} • {r.type} • {r.size}</div>
              </div>
              <button onClick={() => download(r.title)} style={{ padding: '8px 16px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.ResourceLibrary = ResourceLibrary;
