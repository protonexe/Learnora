const StudyPlanner = ({ onClose }) => {
  const [tasks, setTasks] = React.useState(() => {
    const saved = localStorage.getItem('learnora-study-plan');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Morning: Math review', time: '8:00 AM', completed: true },
      { id: 2, text: 'Afternoon: Physics lecture', time: '2:00 PM', completed: false },
      { id: 3, text: 'Evening: Chemistry study', time: '6:00 PM', completed: false },
    ];
  });

  const saveTasks = (newTasks) => { setTasks(newTasks); localStorage.setItem('learnora-study-plan', JSON.stringify(newTasks)); };
  const toggleTask = (id) => saveTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📅 Study Plan</h2>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tasks.map(task => (
            <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-secondary)', borderRadius: 10, padding: 14, border: '1px solid var(--border-color)' }}>
              <button onClick={() => toggleTask(task.id)} style={{ width: 24, height: 24, borderRadius: task.completed ? '50%' : '6px', border: task.completed ? 'none' : '2px solid var(--border-color)', background: task.completed ? '#10b981' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12 }}>{task.completed && '✓'}</button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: task.completed ? 'var(--text-tertiary)' : 'var(--text-primary)', textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{task.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
