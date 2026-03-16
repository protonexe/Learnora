const CourseCatalog = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [search, setSearch] = React.useState('');
  
  const courses = [
    { id: 1, name: 'Introduction to Python', subject: 'Computer Science', level: 'Beginner', duration: '8 weeks', rating: 4.8, students: 1250, free: true },
    { id: 2, name: 'Advanced Mathematics', subject: 'Mathematics', level: 'Advanced', duration: '12 weeks', rating: 4.9, students: 890, free: false },
    { id: 3, name: 'Physics Fundamentals', subject: 'Physics', level: 'Intermediate', duration: '10 weeks', rating: 4.7, students: 720, free: true },
    { id: 4, name: 'Organic Chemistry', subject: 'Chemistry', level: 'Advanced', duration: '14 weeks', rating: 4.6, students: 540, free: false },
    { id: 5, name: 'World History', subject: 'History', level: 'Beginner', duration: '6 weeks', rating: 4.5, students: 680, free: true },
    { id: 6, name: 'English Literature', subject: 'English', level: 'Intermediate', duration: '8 weeks', rating: 4.8, students: 920, free: true },
  ];

  const filtered = courses.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase()));

  const enroll = (name) => {
    showToast?.(`Enrolled in ${name}!`, 'success');
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>📚 Course Catalog</h1>
      </div>

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..." style={styles.searchInput} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.map(course => (
          <div key={course.id} style={styles.courseCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={styles.courseName}>{course.name}</h3>
                <p style={styles.courseSubject}>{course.subject} • {course.level}</p>
              </div>
              <span style={styles.priceBadge}>{course.free ? '🆓 Free' : '💰 Premium'}</span>
            </div>
            <div style={styles.courseStats}>
              <span>⏱️ {course.duration}</span>
              <span>⭐ {course.rating}</span>
              <span>👥 {course.students} students</span>
            </div>
            <button onClick={() => enroll(course.name)} style={styles.enrollButton}>Enroll Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  searchInput: { width: '100%', padding: '14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', fontSize: '14px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', marginBottom: '20px' },
  courseCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  courseName: { fontSize: '18px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  courseSubject: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 12px 0' },
  priceBadge: { fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '4px', background: 'var(--primary-100)', color: 'var(--primary-600)' },
  courseStats: { display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' },
  enrollButton: { width: '100%', padding: '12px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }
};

window.CourseCatalog = CourseCatalog;
