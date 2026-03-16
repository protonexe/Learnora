const SubjectDashboard = ({ onBack, showToast }) => {
  const [subjects, setSubjects] = React.useState(() => JSON.parse(localStorage.getItem('subject-dashboard')) || [
    { id: 1, name: 'Mathematics', icon: '📐', color: '#f43f5e', hours: 12, progress: 75, grade: 'A', upcoming: 'Quiz tomorrow' },
    { id: 2, name: 'Physics', icon: '⚛️', color: '#14b8a6', hours: 8, progress: 60, grade: 'B+', upcoming: 'Lab report due' },
    { id: 3, name: 'Chemistry', icon: '🧪', color: '#0ea5e9', hours: 6, progress: 45, grade: 'B', upcoming: 'None' },
    { id: 4, name: 'Biology', icon: '🧬', color: '#10b981', hours: 10, progress: 80, grade: 'A-', upcoming: 'None' }
  ]);

  const totalHours = subjects.reduce((a, s) => a + s.hours, 0);
  const avgProgress = Math.round(subjects.reduce((a, s) => a + s.progress, 0) / subjects.length);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Subject Dashboard</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="summary" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '20px', borderRadius: '15px', color: 'white', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{totalHours}h</div>
            <div style={{ opacity: 0.9, fontSize: '14px' }}>Total Study Time</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)', padding: '20px', borderRadius: '15px', color: 'white', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{avgProgress}%</div>
            <div style={{ opacity: 0.9, fontSize: '14px' }}>Avg Progress</div>
          </div>
        </div>

        <h3 style={{ marginBottom: '15px', color: '#374151' }}>Your Subjects</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          {subjects.map(subject => (
            <div key={subject.id} style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ background: subject.color, padding: '15px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>{subject.icon}</span>
                <div style={{ color: 'white', flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '18px' }}>{subject.name}</div>
                  <div style={{ opacity: 0.9, fontSize: '13px' }}>{subject.hours}h studied</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold' }}>{subject.grade}</div>
              </div>
              <div style={{ padding: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>Progress</span>
                  <span style={{ fontWeight: '600' }}>{subject.progress}%</span>
                </div>
                <div style={{ background: '#f3f4f6', borderRadius: '8px', height: '8px', marginBottom: '12px' }}>
                  <div style={{ width: `${subject.progress}%`, height: '100%', background: subject.color, transition: 'width 0.3s' }} />
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  <span style={{ fontWeight: '600' }}>Upcoming:</span> {subject.upcoming}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.SubjectDashboard = SubjectDashboard;
