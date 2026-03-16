const ExamPrep = ({ onBack, showToast, courses }) => {
  const isMobile = window.innerWidth <= 768;
  const [exams, setExams] = React.useState(() => {
    return JSON.parse(localStorage.getItem('exam-prep') || '[]');
  });
  const [showAdd, setShowAdd] = React.useState(false);
  const [newExam, setNewExam] = React.useState({ subject: '', date: '', type: 'exam' });

  React.useEffect(() => {
    localStorage.setItem('exam-prep', JSON.stringify(exams));
  }, [exams]);

  const addExam = () => {
    if (!newExam.subject || !newExam.date) return;
    const exam = { id: Date.now(), ...newExam, status: 'not-started', score: null };
    setExams([...exams, exam]);
    setNewExam({ subject: '', date: '', type: 'exam' });
    setShowAdd(false);
    showToast?.('Exam added!', 'success');
  };

  const deleteExam = (id) => {
    setExams(exams.filter(e => e.id !== id));
  };

  const getDaysUntil = (date) => {
    const diff = new Date(date) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getUrgencyColor = (days) => {
    if (days <= 3) return '#f43f5e';
    if (days <= 7) return '#f59e0b';
    return '#10b981';
  };

  const courseOptions = courses || [
    { name: 'Mathematics' }, { name: 'Physics' }, { name: 'Chemistry' },
    { name: 'Biology' }, { name: 'History' }, { name: 'English' }
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}>
            <Icon name="arrow-left" size={20} />
          </button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>
            📝 Exam Prep
          </h1>
        </div>
        <button onClick={() => setShowAdd(true)} style={styles.addButton}>
          <Icon name="plus" size={18} /> Add Exam
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Add Upcoming Exam</h3>
          <select
            value={newExam.subject}
            onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
            style={styles.select}
          >
            <option value="">Select subject</option>
            {courseOptions.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
          <input
            type="date"
            value={newExam.date}
            onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
            style={styles.input}
          />
          <select
            value={newExam.type}
            onChange={(e) => setNewExam({ ...newExam, type: e.target.value })}
            style={styles.select}
          >
            <option value="exam">Final Exam</option>
            <option value="midterm">Midterm</option>
            <option value="quiz">Quiz</option>
            <option value="test">Test</option>
          </select>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addExam} style={styles.primaryButton}>Add</button>
            <button onClick={() => setShowAdd(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {/* Exam List */}
      {exams.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No exams scheduled.</p>
          <p>Add your upcoming exams to plan your preparation!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {exams.sort((a, b) => new Date(a.date) - new Date(b.date)).map(exam => {
            const days = getDaysUntil(exam.date);
            return (
              <div key={exam.id} style={{ ...styles.examCard, borderLeftColor: getUrgencyColor(days) }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={styles.examSubject}>{exam.subject}</h3>
                    <p style={styles.examDate}>
                      {new Date(exam.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ ...styles.daysBadge, background: `${getUrgencyColor(days)}20`, color: getUrgencyColor(days) }}>
                      {days <= 0 ? 'Today!' : days === 1 ? 'Tomorrow' : `${days} days`}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <button style={styles.actionButton}>📚 Study Plan</button>
                  <button style={styles.actionButton}>📝 Practice</button>
                  <button onClick={() => deleteExam(exam.id)} style={styles.deleteButton}>🗑️</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Prep Tips */}
      <div style={styles.tipsCard}>
        <h3 style={styles.tipsTitle}>📋 Exam Preparation Tips</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          <li>Start preparing at least 2 weeks before the exam</li>
          <li>Create a study schedule and stick to it</li>
          <li>Practice with past exams if available</li>
          <li>Take breaks to avoid burnout</li>
          <li>Review the night before, but get enough sleep</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  cardTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  select: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '60px 20px', color: 'var(--text-tertiary)' },
  examCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', borderLeft: '4px solid' },
  examSubject: { fontSize: '18px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  examDate: { fontSize: '14px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  daysBadge: { padding: '6px 12px', borderRadius: 'var(--radius-md)', fontSize: '13px', fontWeight: '600' },
  actionButton: { padding: '8px 16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '13px', cursor: 'pointer', color: 'var(--text-secondary)' },
  deleteButton: { padding: '8px 12px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '13px', cursor: 'pointer' },
  tipsCard: { marginTop: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  tipsTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }
};

window.ExamPrep = ExamPrep;
