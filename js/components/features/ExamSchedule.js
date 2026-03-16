const ExamSchedule = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [exams, setExams] = React.useState(() => JSON.parse(localStorage.getItem('exam-schedule') || '[]'));
  const [showAdd, setShowAdd] = React.useState(false);
  const [newExam, setNewExam] = React.useState({ subject: '', date: '', time: '', location: '', notes: '' });

  React.useEffect(() => { localStorage.setItem('exam-schedule', JSON.stringify(exams)); }, [exams]);

  const addExam = () => {
    if (!newExam.subject || !newExam.date) return;
    setExams([{ id: Date.now(), ...newExam }, ...exams]);
    setNewExam({ subject: '', date: '', time: '', location: '', notes: '' });
    setShowAdd(false);
    showToast?.('Exam scheduled!', 'success');
  };

  const deleteExam = (id) => setExams(exams.filter(e => e.id !== id));

  const getDaysUntil = (date) => Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));

  const upcoming = exams.filter(e => getDaysUntil(e.date) >= 0).sort((a, b) => new Date(a.date) - new Date(b.date));
  const past = exams.filter(e => getDaysUntil(e.date) < 0).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>📅 Exam Schedule</h1>
        </div>
        <button onClick={() => setShowAdd(true)} style={styles.addButton}><Icon name="plus" size={18} /> Add</button>
      </div>

      {showAdd && (
        <div style={styles.card}>
          <input type="text" value={newExam.subject} onChange={(e) => setNewExam({...newExam, subject: e.target.value})} placeholder="Subject/Course" style={styles.input} />
          <input type="date" value={newExam.date} onChange={(e) => setNewExam({...newExam, date: e.target.value})} style={styles.input} />
          <input type="time" value={newExam.time} onChange={(e) => setNewExam({...newExam, time: e.target.value})} style={styles.input} />
          <input type="text" value={newExam.location} onChange={(e) => setNewExam({...newExam, location: e.target.value})} placeholder="Location/Room" style={styles.input} />
          <textarea value={newExam.notes} onChange={(e) => setNewExam({...newExam, notes: e.target.value})} placeholder="Notes (topics to review, etc.)" style={styles.textarea} rows={2} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addExam} style={styles.primaryButton}>Add</button>
            <button onClick={() => setShowAdd(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <h3 style={styles.sectionTitle}>Upcoming ({upcoming.length})</h3>
        {upcoming.length === 0 ? <p style={styles.emptyText}>No upcoming exams</p> : upcoming.map(exam => {
          const days = getDaysUntil(exam.date);
          return (
            <div key={exam.id} style={{ ...styles.examCard, borderLeftColor: days <= 3 ? '#f43f5e' : days <= 7 ? '#f59e0b' : '#10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={styles.examSubject}>{exam.subject}</h3>
                  <p style={styles.examDate}>📅 {new Date(exam.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} {exam.time && `at ${exam.time}`}</p>
                  {exam.location && <p style={styles.examLocation}>📍 {exam.location}</p>}
                  {exam.notes && <p style={styles.examNotes}>{exam.notes}</p>}
                </div>
                <span style={{ ...styles.daysBadge, background: days <= 3 ? '#f43f5e20' : days <= 7 ? '#f59e0b20' : '#10b98120', color: days <= 3 ? '#f43f5e' : days <= 7 ? '#f59e0b' : '#10b981' }}>
                  {days === 0 ? 'Today!' : days === 1 ? 'Tomorrow' : `${days} days`}
                </span>
              </div>
              <button onClick={() => deleteExam(exam.id)} style={styles.deleteButton}>🗑️</button>
            </div>
          );
        })}
      </div>

      {past.length > 0 && (
        <div>
          <h3 style={styles.sectionTitle}>Past Exams</h3>
          {past.map(exam => (
            <div key={exam.id} style={{ ...styles.examCard, opacity: 0.6 }}>
              <h3 style={styles.examSubject}>{exam.subject}</h3>
              <p style={styles.examDate}>{new Date(exam.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  textarea: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px', resize: 'vertical' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  sectionTitle: { fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '12px' },
  emptyText: { fontSize: '14px', color: 'var(--text-tertiary)', fontStyle: 'italic' },
  examCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '12px', borderLeft: '4px solid', position: 'relative' },
  examSubject: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  examDate: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  examLocation: { fontSize: '13px', color: 'var(--primary-500)', margin: '4px 0 0 0' },
  examNotes: { fontSize: '13px', color: 'var(--text-secondary)', margin: '8px 0 0 0', fontStyle: 'italic' },
  daysBadge: { padding: '4px 10px', borderRadius: 'var(--radius-md)', fontSize: '12px', fontWeight: '600' },
  deleteButton: { position: 'absolute', top: '12px', right: '12px', background: 'transparent', border: 'none', cursor: 'pointer' }
};

window.ExamSchedule = ExamSchedule;
