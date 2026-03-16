const TutoringScheduler = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [sessions] = React.useState([
    { id: 1, tutor: 'Dr. Smith', subject: 'Mathematics', date: 'Mar 20', time: '3:00 PM', status: 'upcoming' },
    { id: 2, tutor: 'Prof. Johnson', subject: 'Physics', date: 'Mar 22', time: '2:00 PM', status: 'upcoming' },
  ]);

  const bookSession = () => {
    showToast?.('Session requested!', 'success');
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>👨‍🏫 Tutoring</h1>
      </div>

      <h3 style={styles.sectionTitle}>Upcoming Sessions</h3>
      {sessions.map(session => (
        <div key={session.id} style={styles.sessionCard}>
          <span style={styles.tutorAvatar}>👨‍🏫</span>
          <div style={styles.sessionInfo}>
            <h3 style={styles.sessionTutor}>{session.tutor}</h3>
            <p style={styles.sessionSubject}>{session.subject}</p>
          </div>
          <div style={styles.sessionTime}>
            <span>{session.date}</span>
            <span>{session.time}</span>
          </div>
        </div>
      ))}

      <h3 style={{ ...styles.sectionTitle, marginTop: '24px' }}>Available Tutors</h3>
      <div style={styles.tutorList}>
        {['Dr. Smith - Math', 'Prof. Johnson - Physics', 'Ms. Williams - Chemistry'].map((t, i) => (
          <button key={i} onClick={bookSession} style={styles.tutorBtn}>{t}</button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  sectionTitle: { fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-secondary)' },
  sessionCard: { display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '12px' },
  tutorAvatar: { fontSize: '40px' },
  sessionInfo: { flex: 1 },
  sessionTutor: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  sessionSubject: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  sessionTime: { textAlign: 'right', fontSize: '13px', color: 'var(--text-secondary)' },
  tutorList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  tutorBtn: { padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', textAlign: 'left', cursor: 'pointer', fontSize: '14px' }
};

window.TutoringScheduler = TutoringScheduler;
