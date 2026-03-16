const TaskMaster = ({ onBack, showToast }) => {
  const [tasks, setTasks] = React.useState(() => JSON.parse(localStorage.getItem('task-master')) || []);
  const [newTask, setNewTask] = React.useState({ title: '', subject: '', due: '', priority: 'medium' });
  const [view, setView] = React.useState('all');

  const subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'History', 'English', 'Other'];
  const priorityColors = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' };

  const addTask = () => {
    if (!newTask.title) {
      showToast?.('Enter a task title', 'error');
      return;
    }
    const task = { ...newTask, id: Date.now(), completed: false, createdAt: new Date().toISOString() };
    const updated = [task, ...tasks];
    setTasks(updated);
    localStorage.setItem('task-master', JSON.stringify(updated));
    setNewTask({ title: '', subject: '', due: '', priority: 'medium' });
    showToast?.('Task added!', 'success');
  };

  const toggleTask = (id) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updated);
    localStorage.setItem('task-master', JSON.stringify(updated));
  };

  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    localStorage.setItem('task-master', JSON.stringify(updated));
  };

  const filteredTasks = view === 'completed' ? tasks.filter(t => t.completed) : view === 'pending' ? tasks.filter(t => !t.completed) : tasks;
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (a.priority !== b.priority) return priorityColors[b.priority] === priorityColors.high ? 1 : -1;
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority === 'high' && !t.completed).length
  };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Task Master</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="stats-bar" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
          {[
            { label: 'Total', value: stats.total, color: '#6366f1' },
            { label: 'Pending', value: stats.pending, color: '#f59e0b' },
            { label: 'Done', value: stats.completed, color: '#10b981' },
            { label: 'Urgent', value: stats.high, color: '#ef4444' }
          ].map(stat => (
            <div key={stat.label} style={{ background: 'white', padding: '12px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="add-task" style={{ background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb', marginBottom: '10px', fontSize: '16px' }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <select value={newTask.subject} onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e5e7eb' }}>
              <option value="">Subject</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input type="date" value={newTask.due} onChange={(e) => setNewTask({ ...newTask, due: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e5e7eb' }} />
            <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e5e7eb' }}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button onClick={addTask} style={{ width: '100%', marginTop: '12px', padding: '12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>Add Task</button>
        </div>

        <div className="filters" style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
          {['all', 'pending', 'completed'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{ padding: '8px 16px', border: 'none', borderRadius: '20px', background: view === v ? '#1f2937' : '#e5e7eb', color: view === v ? 'white' : '#6b7280', cursor: 'pointer', textTransform: 'capitalize' }}>
              {v}
            </button>
          ))}
        </div>

        <div className="tasks-list">
          {sortedTasks.map(task => (
            <div key={task.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', opacity: task.completed ? 0.6 : 1 }}>
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} style={{ width: '22px', height: '22px', accentColor: '#10b981' }} />
              <div style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none' }}>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>{task.title}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', display: 'flex', gap: '10px', marginTop: '4px' }}>
                  {task.subject && <span>📚 {task.subject}</span>}
                  {task.due && <span>📅 {task.due}</span>}
                </div>
              </div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: priorityColors[task.priority] }} />
              <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '18px' }}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.TaskMaster = TaskMaster;
