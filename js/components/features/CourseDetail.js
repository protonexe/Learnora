const CourseDetail = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const course = { name: 'Introduction to Python', progress: 35, chapters: 12, completed: 4, instructor: 'Dr. Smith' };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>📚 Course Detail</h1>
      </div>

      <div style={styles.card}>
        <h2 style={styles.name}>{course.name}</h2>
        <p style={styles.instructor}>Instructor: {course.instructor}</p>
        
        <div style={styles.progress}>
          <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: `${course.progress}%` }} /></div>
          <span>{course.progress}% Complete</span>
        </div>

        <p style={styles.stats}>{course.completed}/{course.chapters} chapters completed</p>

        <button style={styles.continueBtn}>Continue Learning</button>
      </div>

      <h3 style={styles.title}>Chapters</h3>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={styles.chapter}>
          <span>Chapter {i}</span>
          {i <= course.completed ? <span>✓</span> : <span>🔒</span>}
        </div>
      ))}
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px', marginBottom: '20px' }, name: { fontSize: '22px', fontWeight: 700, margin: '0 0 8px' }, instructor: { color: '#888', marginBottom: '16px' }, progress: { marginBottom: '12px' }, progressBar: { height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }, progressFill: { height: '100%', background: 'var(--primary-500)', borderRadius: '4px' }, stats: { fontSize: '14px', color: '#888', marginBottom: '16px' }, continueBtn: { width: '100%', padding: '14px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '16px' }, title: { fontSize: '16px', fontWeight: 600, marginBottom: '12px' }, chapter: { display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '8px' }};

window.CourseDetail = CourseDetail;
