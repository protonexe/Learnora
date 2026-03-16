const GradeTracker = ({ onBack, showToast }) => {
  const [grades, setGrades] = React.useState(() => JSON.parse(localStorage.getItem('grade-tracker')) || [
    { id: 1, subject: 'Mathematics', grade: 'A', score: 95, total: 100, date: '2026-03-10' },
    { id: 2, subject: 'Physics', grade: 'B+', score: 88, total: 100, date: '2026-03-08' },
    { id: 3, subject: 'Chemistry', grade: 'A-', score: 91, total: 100, date: '2026-03-05' },
    { id: 4, subject: 'Biology', grade: 'A', score: 97, total: 100, date: '2026-03-01' }
  ]);

  const addGrade = () => {
    const subject = prompt('Subject:');
    const score = parseFloat(prompt('Score:'));
    if (subject && !isNaN(score)) {
      let grade;
      if (score >= 90) grade = 'A';
      else if (score >= 80) grade = 'B';
      else if (score >= 70) grade = 'C';
      else if (score >= 60) grade = 'D';
      else grade = 'F';
      const newG = { id: Date.now(), subject, score, grade, total: 100, date: new Date().toISOString().split('T')[0] };
      setGrades([...grades, newG]);
      localStorage.setItem('grade-tracker', JSON.stringify([...grades, newG]));
      showToast?.('Grade added!', 'success');
    }
  };

  const deleteGrade = (id) => {
    const updated = grades.filter(g => g.id !== id);
    setGrades(updated);
    localStorage.setItem('grade-tracker', JSON.stringify(updated));
  };

  const avgScore = Math.round(grades.reduce((a, g) => a + g.score, 0) / grades.length);
  const letterCounts = grades.reduce((acc, g) => {
    acc[g.grade] = (acc[g.grade] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Grade Tracker</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="overview" style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)', padding: '25px', borderRadius: '20px', color: 'white', textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{avgScore}%</div>
          <div style={{ opacity: 0.9 }}>Average Score</div>
        </div>

        <div className="letter-grades" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '25px' }}>
          {['A', 'B', 'C', 'D', 'F'].map(l => (
            <div key={l} style={{ background: 'white', padding: '15px 20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: l === 'A' ? '#10b981' : l === 'B' ? '#14b8a6' : l === 'C' ? '#f59e0b' : '#ef4444' }}>{l}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{letterCounts[l] || 0}</div>
            </div>
          ))}
        </div>

        <button onClick={addGrade} style={{ width: '100%', padding: '15px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', marginBottom: '20px', fontWeight: '600' }}>
          + Add Grade
        </button>

        <div style={{ display: 'grid', gap: '12px' }}>
          {grades.sort((a, b) => new Date(b.date) - new Date(a.date)).map(g => (
            <div key={g.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '10px', background: g.score >= 90 ? '#ecfdf5' : g.score >= 80 ? '#fef3c7' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', color: g.score >= 90 ? '#10b981' : g.score >= 80 ? '#f59e0b' : '#ef4444' }}>
                {g.grade}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>{g.subject}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{g.score}% • {g.date}</div>
              </div>
              <button onClick={() => deleteGrade(g.id)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '18px' }}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.GradeTracker = GradeTracker;
