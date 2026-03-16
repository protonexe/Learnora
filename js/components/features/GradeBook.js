const GradeBook = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [grades, setGrades] = React.useState(() => JSON.parse(localStorage.getItem('grade-book') || '[]'));
  const [showAdd, setShowAdd] = React.useState(false);
  const [newGrade, setNewGrade] = React.useState({ subject: '', assignment: '', score: '', maxScore: 100, date: '' });

  React.useEffect(() => { localStorage.setItem('grade-book', JSON.stringify(grades)); }, [grades]);

  const addGrade = () => {
    if (!newGrade.subject || !newGrade.assignment) return;
    const grade = { id: Date.now(), ...newGrade, createdAt: new Date().toISOString() };
    setGrades([grade, ...grades]);
    setNewGrade({ subject: '', assignment: '', score: '', maxScore: 100, date: '' });
    setShowAdd(false);
    showToast?.('Grade added!', 'success');
  };

  const deleteGrade = (id) => setGrades(grades.filter(g => g.id !== id));

  const getAverage = () => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, g) => sum + (parseFloat(g.score) / parseFloat(g.maxScore)) * 100, 0);
    return (total / grades.length).toFixed(1);
  };

  const subjects = [...new Set(grades.map(g => g.subject))];

  const getLetterGrade = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>📊 Grade Book</h1>
        </div>
        <button onClick={() => setShowAdd(true)} style={styles.addButton}><Icon name="plus" size={18} /> Add</button>
      </div>

      {/* Summary Card */}
      <div style={styles.summaryCard}>
        <div style={{ textAlign: 'center' }}>
          <span style={styles.summaryValue}>{getAverage()}%</span>
          <span style={styles.summaryLabel}>Overall Average</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={styles.letterGrade}>{getLetterGrade(getAverage())}</span>
          <span style={styles.summaryLabel}>Letter Grade</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={styles.summaryValue}>{grades.length}</span>
          <span style={styles.summaryLabel}>Assignments</span>
        </div>
      </div>

      {showAdd && (
        <div style={styles.card}>
          <input type="text" value={newGrade.subject} onChange={(e) => setNewGrade({...newGrade, subject: e.target.value})} placeholder="Subject" style={styles.input} />
          <input type="text" value={newGrade.assignment} onChange={(e) => setNewGrade({...newGrade, assignment: e.target.value})} placeholder="Assignment name" style={styles.input} />
          <div style={{ display: 'flex', gap: '12px' }}>
            <input type="number" value={newGrade.score} onChange={(e) => setNewGrade({...newGrade, score: e.target.value})} placeholder="Score" style={{ ...styles.input, flex: 1 }} />
            <input type="number" value={newGrade.maxScore} onChange={(e) => setNewGrade({...newGrade, maxScore: e.target.value})} placeholder="Max" style={{ ...styles.input, flex: 1 }} />
          </div>
          <input type="date" value={newGrade.date} onChange={(e) => setNewGrade({...newGrade, date: e.target.value})} style={styles.input} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addGrade} style={styles.primaryButton}>Add</button>
            <button onClick={() => setShowAdd(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {grades.length === 0 ? (
        <div style={styles.emptyState}><p>No grades recorded yet.</p></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {grades.map(grade => {
            const percentage = (parseFloat(grade.score) / parseFloat(grade.maxScore)) * 100;
            return (
              <div key={grade.id} style={styles.gradeCard}>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.gradeSubject}>{grade.subject}</h3>
                  <p style={styles.gradeName}>{grade.assignment}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={styles.gradeScore}>{grade.score}/{grade.maxScore}</span>
                  <span style={{ ...styles.gradePercent, color: percentage >= 70 ? '#10b981' : '#f43f5e' }}>{percentage.toFixed(0)}%</span>
                </div>
                <button onClick={() => deleteGrade(grade.id)} style={styles.deleteButton}>×</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  summaryCard: { display: 'flex', justifyContent: 'space-around', background: 'var(--gradient-primary)', borderRadius: 'var(--radius-xl)', padding: '24px', marginBottom: '24px' },
  summaryValue: { display: 'block', fontSize: '32px', fontWeight: '700', color: '#fff' },
  summaryLabel: { display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' },
  letterGrade: { display: 'block', fontSize: '48px', fontWeight: '700', color: '#fff' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' },
  gradeCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' },
  gradeSubject: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  gradeName: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  gradeScore: { display: 'block', fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' },
  gradePercent: { display: 'block', fontSize: '13px', fontWeight: '600', marginTop: '2px' },
  deleteButton: { background: 'transparent', border: 'none', fontSize: '20px', color: 'var(--text-tertiary)', cursor: 'pointer' }
};

window.GradeBook = GradeBook;
