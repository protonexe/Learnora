const CourseCard = ({ onClose }) => {
  const courses = [
    { name: 'Mathematics', progress: 75, chapters: 12, color: '#f43f5e' },
    { name: 'Physics', progress: 60, chapters: 10, color: '#14b8a6' },
    { name: 'Chemistry', progress: 45, chapters: 8, color: '#0ea5e9' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📚 My Courses</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {courses.map((c, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: c.color }}>{c.progress}%</span>
            </div>
            <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3, marginBottom: 8 }}>
              <div style={{ height: '100%', width: c.progress + '%', background: c.color }} />
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.chapters} chapters</span>
          </div>
        ))}
      </div>
    </div>
  );
};
