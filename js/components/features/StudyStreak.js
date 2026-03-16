const StudyStreak = ({ onClose }) => {
  const [streak, setStreak] = React.useState(7);
  const [history, setHistory] = React.useState([
    { day: 'Mon', hours: 2.5, completed: true },
    { day: 'Tue', hours: 3.2, completed: true },
    { day: 'Wed', hours: 1.8, completed: true },
    { day: 'Thu', hours: 4.0, completed: true },
    { day: 'Fri', hours: 2.0, completed: true },
    { day: 'Sat', hours: 0, completed: false },
    { day: 'Sun', hours: 0, completed: false },
  ]);

  const today = new Date().getDay();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const adjustedHistory = [...history.slice(today), ...history.slice(0, today)];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center' }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>← Back</button>
      </div>

      <div style={{ padding: 20, textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: 72, marginBottom: 8 }}>🔥</div>
        <div style={{ fontSize: 64, fontWeight: 700 }}>{streak}</div>
        <div style={{ fontSize: 18, opacity: 0.8, marginBottom: 32 }}>Day Streak!</div>

        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {adjustedHistory.map((day, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: day.completed ? '50%' : '8px', background: day.completed ? 'white' : 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 8, color: day.completed ? '#f43f5e' : 'white' }}>
                  {day.completed ? '✓' : '○'}
                </div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{day.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>45</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Total Days</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>128h</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Study Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};
