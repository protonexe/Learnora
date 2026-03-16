const LearningMentor = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const mentors = [
    { id: 1, name: 'Dr. Sarah', subject: 'Mathematics', rating: 4.9, students: 500, avatar: '👩‍🏫' },
    { id: 2, name: 'Prof. Mike', subject: 'Physics', rating: 4.8, students: 420, avatar: '👨‍🏫' },
    { id: 3, name: 'Ms. Lisa', subject: 'Chemistry', rating: 4.7, students: 380, avatar: '👩‍🔬' },
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>🎓 Learning Mentor</h1>
      </div>

      <div style={styles.list}>
        {mentors.map(m => (
          <div key={m.id} style={styles.mentor}>
            <span style={styles.avatar}>{m.avatar}</span>
            <div style={styles.info}>
              <h3 style={styles.name}>{m.name}</h3>
              <p style={styles.subject}>{m.subject} • ⭐ {m.rating} • {m.students} students</p>
            </div>
            <button style={styles.btn}>Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, list: { display: 'flex', flexDirection: 'column', gap: '12px' }, mentor: { display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }, avatar: { fontSize: '40px' }, info: { flex: 1 }, name: { margin: 0, fontSize: '16px', fontWeight: 600 }, subject: { margin: '4px 0 0', fontSize: '13px', color: '#888' }, btn: { padding: '10px 20px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }};

window.LearningMentor = LearningMentor;
