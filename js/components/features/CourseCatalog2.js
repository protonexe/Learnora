const CourseCatalog2 = ({ onBack }) => {
  const courses = [
    { name: 'Mathematics', lessons: 24, icon: '📐' },
    { name: 'Physics', lessons: 20, icon: '⚛️' },
    { name: 'Chemistry', lessons: 18, icon: '🧪' },
    { name: 'Biology', lessons: 22, icon: '🧬' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Course Catalog</h1>
      </header>
      <div style={{ padding: '20px' }}>
        {courses.map((c, i) => (
          <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '36px' }}>{c.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600' }}>{c.name}</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>{c.lessons} lessons</div>
            </div>
            <button style={{ padding: '10px 20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Start</button>
          </div>
        ))}
      </div>
    </div>
  );
};

window.CourseCatalog2 = CourseCatalog2;
