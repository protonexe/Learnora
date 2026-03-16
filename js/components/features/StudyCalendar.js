const StudyCalendar = ({ onBack }) => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  const events = [
    { day: 15, title: 'Math Quiz', color: '#f43f5e' },
    { day: 18, title: 'Physics Lab', color: '#14b8a6' },
    { day: 22, title: 'History Exam', color: '#8b5cf6' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Calendar</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: '#f3f4f6', padding: '15px', borderRadius: '15px', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginBottom: '20px', textAlign: 'center' }}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} style={{ padding: '10px', fontWeight: '600', color: '#6b7280' }}>{d}</div>)}
          {Array.from({ length: firstDay }, (_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const event = events.find(e => e.day === day);
            const isToday = day === today.getDate();
            return (
              <div key={day} style={{ padding: '10px', borderRadius: '10px', background: isToday ? '#6366f1' : 'white', position: 'relative', cursor: 'pointer' }}>
                <div style={{ fontWeight: '600', color: isToday ? 'white' : '#1f2937' }}>{day}</div>
                {event && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: event.color, position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)' }} />}
              </div>
            );
          })}
        </div>
        <div style={{ background: 'white', padding: '15px', borderRadius: '15px' }}>
          <h3 style={{ marginBottom: '12px' }}>Upcoming Events</h3>
          {events.map((e, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', padding: '10px', background: '#f9fafb', borderRadius: '10px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: e.color }} />
              <span style={{ fontWeight: '500' }}>{e.title}</span>
              <span style={{ color: '#9ca3af', fontSize: '13px', marginLeft: 'auto' }}>Day {e.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.StudyCalendar = StudyCalendar;
