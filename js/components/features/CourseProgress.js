const CourseProgress = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const courses = [
    { name: 'Python Basics', progress: 65, lessons: 20, completed: 13 },
    { name: 'Web Development', progress: 40, lessons: 30, completed: 12 },
    { name: 'Data Science', progress: 20, lessons: 25, completed: 5 },
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>📈 Course Progress</h1>
      </div>
      {courses.map((c, i) => (
        <div key={i} style={styles.card}>
          <div style={styles.header}>
            <h3 style={styles.name}>{c.name}</h3>
            <span style={styles.percent}>{c.progress}%</span>
          </div>
          <div style={styles.progress}><div style={{ ...styles.bar, width: c.progress + '%' }} /></div>
          <p style={styles.lessons}>{c.completed}/{c.lessons} lessons completed</p>
        </div>
      ))}
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', marginBottom: '16px' }, header: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }, name: { fontSize: '16px', fontWeight: 600, margin: 0 }, percent: { fontSize: '16px', fontWeight: 700, color: 'var(--primary-500)' }, progress: { height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }, bar: { height: '100%', background: 'var(--primary-500)', borderRadius: '4px' }, lessons: { fontSize: '13px', color: '#888', margin: 0 }};

window.CourseProgress = CourseProgress;
