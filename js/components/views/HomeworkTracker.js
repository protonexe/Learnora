const HomeworkTrackerView = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [homework, setHomework] = React.useState([
    { id: 1, title: 'Math Exercise 5.2', subject: 'Mathematics', dueDate: '2026-03-17', priority: 'high', completed: false },
    { id: 2, title: 'Physics Lab Report', subject: 'Physics', dueDate: '2026-03-18', priority: 'medium', completed: false },
    { id: 3, title: 'Chemistry Worksheet', subject: 'Chemistry', dueDate: '2026-03-19', priority: 'low', completed: false },
    { id: 4, title: 'History Essay', subject: 'History', dueDate: '2026-03-20', priority: 'high', completed: false },
    { id: 5, title: 'Biology Diagram', subject: 'Biology', dueDate: '2026-03-15', priority: 'medium', completed: true },
  ]);
  const [filter, setFilter] = React.useState('all');

  const toggleComplete = (id) => {
    setHomework(homework.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const filteredHomework = filter === 'all' ? homework : filter === 'pending' ? homework.filter(h => !h.completed) : homework.filter(h => h.completed);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'var(--danger)';
      case 'medium': return 'var(--warning)';
      default: return 'var(--success)';
    }
  };

  const isOverdue = (dueDate) => new Date(dueDate) < new Date() && !homework.find(h => h.dueDate === dueDate)?.completed;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Homework Tracker</h1>
        <button style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          + Add
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--primary-500)' }}>{homework.length}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--danger)' }}>{homework.filter(h => !h.completed && new Date(h.dueDate) < new Date()).length}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Overdue</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--warning)' }}>{homework.filter(h => !h.completed).length}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Pending</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--success)' }}>{homework.filter(h => h.completed).length}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Completed</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {['all', 'pending', 'completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 16px', background: filter === f ? 'var(--primary-500)' : 'var(--bg-secondary)', color: filter === f ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', textTransform: 'capitalize' }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredHomework.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map((hw, idx) => (
          <div key={hw.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', opacity: hw.completed ? 0.6 : 1 }}>
            <button onClick={() => toggleComplete(hw.id)} style={{ width: '24px', height: '24px', borderRadius: '50%', background: hw.completed ? 'var(--success)' : 'var(--bg-tertiary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {hw.completed && '✓'}
            </button>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', margin: 0, textDecoration: hw.completed ? 'line-through' : 'none' }}>{hw.title}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' }}>{hw.subject}</p>
            </div>
            <span style={{ padding: '4px 10px', background: `${getPriorityColor(hw.priority)}20`, color: getPriorityColor(hw.priority), borderRadius: '8px', fontSize: '11px', fontWeight: '600', textTransform: 'capitalize' }}>
              {hw.priority}
            </span>
            <span style={{ fontSize: '12px', color: new Date(hw.dueDate) < new Date() && !hw.completed ? 'var(--danger)' : 'var(--text-secondary)' }}>
              {new Date(hw.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

window.HomeworkTrackerView = HomeworkTrackerView;
