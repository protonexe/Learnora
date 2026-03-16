const AnnouncementBoard = ({ onClose }) => {
  const announcements = [
    { id: 1, title: 'Exam Schedule Updated', date: '2026-03-15', important: true },
    { id: 2, title: 'New courses available', date: '2026-03-14', important: false },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📢 Announcements</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {announcements.map(a => (
          <div key={a.id} style={{ background: a.important ? '#f43f5e15' : 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: a.important ? '1px solid #f43f5e' : '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{a.title}</span>
              {a.important && <span style={{ padding: '2px 8px', background: '#f43f5e', color: 'white', borderRadius: 4, fontSize: 10, fontWeight: 600 }}>IMPORTANT</span>}
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{a.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
