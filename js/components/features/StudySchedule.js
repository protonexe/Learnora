const StudySchedule = ({ onBack }) => {
  const schedule = [
    { time: '8:00 AM', subject: 'Mathematics', room: 'Room 101' },
    { time: '10:00 AM', subject: 'Physics', room: 'Lab 3' },
    { time: '2:00 PM', subject: 'Chemistry', room: 'Room 205' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Class Schedule</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: '#f3f4f6', padding: '15px', borderRadius: '15px', marginBottom: '20px', textAlign: 'center' }}>
          <span style={{ fontWeight: '600' }}>Today, March 16</span>
        </div>
        {schedule.map((s, i) => (
          <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '60px', fontWeight: '600', color: '#6366f1' }}>{s.time}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600' }}>{s.subject}</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>{s.room}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.StudySchedule = StudySchedule;
