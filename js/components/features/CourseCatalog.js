const CourseCatalog = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('popular');

  const courses = [
    { id: 1, title: 'Advanced Mathematics', instructor: 'Dr. Smith', students: 1234, rating: 4.8, duration: '20 hours', level: 'Advanced', color: '#f43f5e', image: '📐' },
    { id: 2, title: 'Physics Fundamentals', instructor: 'Prof. Johnson', students: 892, rating: 4.7, duration: '15 hours', level: 'Intermediate', color: '#14b8a6', image: '⚛️' },
    { id: 3, title: 'Introduction to Chemistry', instructor: 'Dr. Williams', students: 654, rating: 4.6, duration: '18 hours', level: 'Beginner', color: '#0ea5e9', image: '🧪' },
    { id: 4, title: 'Biology Essentials', instructor: 'Prof. Davis', students: 756, rating: 4.9, duration: '22 hours', level: 'Intermediate', color: '#10b981', image: '🧬' },
    { id: 5, title: 'World History', instructor: 'Dr. Brown', students: 543, rating: 4.5, duration: '16 hours', level: 'Beginner', color: '#8b5cf6', image: '📚' },
    { id: 6, title: 'English Literature', instructor: 'Prof. Wilson', students: 678, rating: 4.7, duration: '14 hours', level: 'Intermediate', color: '#f59e0b', image: '📝' },
  ];

  const filtered = courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) && (filter === 'all' || c.level === filter));

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
          <h2 style={{ margin: 0, fontSize: 20 }}>📚 Course Catalog</h2>
        </div>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search courses..." style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14 }} />
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map(l => (
            <button key={l} onClick={() => setFilter(l)} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', background: filter === l ? 'var(--primary)' : 'var(--bg-secondary)', color: filter === l ? 'white' : 'var(--text-primary)', cursor: 'pointer', fontSize: 12, whiteSpace: 'nowrap' }}>{l}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filtered.map(course => (
            <div key={course.id} style={{ background: 'var(--bg-secondary)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
              <div style={{ height: 100, background: course.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>{course.image}</div>
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ padding: '4px 8px', background: course.color + '20', color: course.color, borderRadius: 4, fontSize: 10, fontWeight: 600 }}>{course.level}</span>
                  <span style={{ color: '#fbbf24', fontSize: 12, fontWeight: 600 }}>⭐ {course.rating}</span>
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: 16, color: 'var(--text-primary)' }}>{course.title}</h3>
                <p style={{ margin: '0 0 8px 0', fontSize: 12, color: 'var(--text-secondary)' }}>{course.instructor}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-tertiary)' }}>
                  <span>👥 {course.students} students</span>
                  <span>⏱️ {course.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
