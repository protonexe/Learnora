const GradeBookView = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [students, setStudents] = React.useState([]);
  const [assignments, setAssignments] = React.useState([]);
  const [grades, setGrades] = React.useState({});
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [showAddGrade, setShowAddGrade] = React.useState(false);
  const [newGrade, setNewGrade] = React.useState({ assignmentId: '', score: '', maxScore: 100 });

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    if (window.Database) {
      const db = window.Database;
      setStudents(db.getStudents() || []);
      setAssignments(db.getAllAssignments() || []);
      
      const allGrades = {};
      (db.getStudents() || []).forEach(student => {
        allGrades[student.id] = db.getGradesForStudent(student.id) || [];
      });
      setGrades(allGrades);
    }
  };

  const handleAddGrade = () => {
    if (window.Database && selectedStudent) {
      const db = window.Database;
      db.updateStudentGrade(selectedStudent.id, newGrade.assignmentId, {
        score: parseFloat(newGrade.score),
        maxScore: parseFloat(newGrade.maxScore),
        percentage: (parseFloat(newGrade.score) / parseFloat(newGrade.maxScore)) * 100
      });
      showToast('Grade added successfully!', 'success');
      loadData();
      setShowAddGrade(false);
    }
  };

  const getAverageGrade = (studentId) => {
    const studentGrades = grades[studentId] || [];
    if (studentGrades.length === 0) return 'N/A';
    const avg = studentGrades.reduce((sum, g) => sum + (g.grade?.percentage || 0), 0) / studentGrades.length;
    return avg.toFixed(1) + '%';
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Grade Book</h1>
        <button onClick={() => setShowAddGrade(true)} style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          + Add Grade
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {students.map((student, idx) => (
          <div key={student.id} onClick={() => setSelectedStudent(student)} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--primary-500)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#fff', fontWeight: '700' }}>
                {student.name?.charAt(0) || 'S'}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>{student.name}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>{student.email || 'No email'}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Average Grade</span>
              <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-500)' }}>{getAverageGrade(student.id)}</span>
            </div>
          </div>
        ))}
      </div>

      {students.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
          <p>No students found. Add students to your roster.</p>
        </div>
      )}

      {showAddGrade && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', maxWidth: '400px', width: '100%' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Add Grade</h2>
            <select value={selectedStudent?.id || ''} onChange={e => setSelectedStudent(students.find(s => s.id === e.target.value))} style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
              <option value="">Select Student</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <select value={newGrade.assignmentId} onChange={e => setNewGrade({...newGrade, assignmentId: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
              <option value="">Select Assignment</option>
              {assignments.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
            </select>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <input type="number" placeholder="Score" value={newGrade.score} onChange={e => setNewGrade({...newGrade, score: e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }} />
              <input type="number" placeholder="Max Score" value={newGrade.maxScore} onChange={e => setNewGrade({...newGrade, maxScore: e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowAddGrade(false)} style={{ flex: 1, padding: '12px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
              <button onClick={handleAddGrade} style={{ flex: 1, padding: '12px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Add Grade</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.GradeBookView = GradeBookView;
