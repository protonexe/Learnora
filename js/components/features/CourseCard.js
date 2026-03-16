const CourseCard = ({ onBack }) => {
  const courses = [
    { id: 1, name: 'Mathematics', icon: '📐', progress: 75, color: '#f43f5e', chapters: 12 },
    { id: 2, name: 'Physics', icon: '⚛️', progress: 60, color: '#14b8a6', chapters: 10 },
    { id: 3, name: 'Chemistry', icon: '🧪', progress: 45, color: '#0ea5e9', chapters: 8 },
    { id: 4, name: 'Biology', icon: '🧬', progress: 80, color: '#10b981', chapters: 15 }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>My Courses</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gap: '15px' }}>
          {courses.map(course => (
            <div key={course.id} style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ background: course.color, padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '36px' }}>{course.icon}</span>
                <div style={{ color: 'white', flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '18px' }}>{course.name}</div>
                  <div style={{ opacity: 0.9, fontSize: '13px' }}>{course.chapters} chapters</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold' }}>{course.progress}%</div>
              </div>
              <div style={{ padding: '15px' }}>
                <div style={{ background: '#f3f4f6', borderRadius: '8px', height: '8px' }}>
                  <div style={{ width: `${course.progress}%`, height: '100%', background: course.color, borderRadius: '8px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.CourseCard = CourseCard;
