const StudyWidget = ({ onBack }) => {
  const [tasks, setTasks] = React.useState([
    { id: 1, text: 'Math homework', done: false },
    { id: 2, text: 'Physics review', done: true },
    { id: 3, text: 'Chemistry lab', done: false }
  ]);

  const toggle = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Widget</h1>
      </header>
      <div style={{ padding: '20px' }}>
        {tasks.map(t => (
          <div key={t.id} onClick={() => toggle(t.id)} style={{ background: 'white', padding: '15px', borderRadius: '12px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: t.done ? 'none' : '2px solid #6366f1', background: t.done ? '#10b981' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              {t.done && '✓'}
            </div>
            <span style={{ textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.6 : 1 }}>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

window.StudyWidget = StudyWidget;
