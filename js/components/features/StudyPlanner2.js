const StudyPlanner2 = ({ onBack }) => {
  const [tasks, setTasks] = React.useState([
    { id: 1, task: 'Math homework', time: '2:00 PM', done: false },
    { id: 2, task: 'Physics review', time: '4:00 PM', done: true }
  ]);

  const toggle = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Planner</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gap: '12px' }}>
          {tasks.map(t => (
            <div key={t.id} onClick={() => toggle(t.id)} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: t.done ? 'none' : '2px solid #6366f1', background: t.done ? '#6366f1' : 'transparent' }}>
                {t.done && <span style={{ color: 'white', fontSize: '14px' }}>✓</span>}
              </div>
              <div style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.6 : 1 }}>
                <div style={{ fontWeight: '600' }}>{t.task}</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>{t.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.StudyPlanner2 = StudyPlanner2;
