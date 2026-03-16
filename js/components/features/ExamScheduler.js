const ExamScheduler = ({ onBack }) => {
  const exams = [
    { name: 'Mathematics', date: 'March 20', time: '9:00 AM' },
    { name: 'Physics', date: 'March 22', time: '2:00 PM' },
    { name: 'Chemistry', date: 'March 25', time: '10:00 AM' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Exam Schedule</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '15px', marginBottom: '20px', textAlign: 'center' }}>
          <span style={{ color: '#ef4444', fontWeight: '600' }}>📅 {exams.length} exams upcoming</span>
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {exams.map((e, i) => (
            <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', borderLeft: '4px solid #6366f1' }}>
              <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '5px' }}>{e.name}</div>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>{e.date} at {e.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.ExamScheduler = ExamScheduler;
