const AssignmentTracker = ({ onBack, showToast }) => {
  const [assignments, setAssignments] = React.useState(() => JSON.parse(localStorage.getItem('assignments')) || [
    { id: 1, title: 'Calculus Problem Set', subject: 'Mathematics', due: '2026-03-18', priority: 'high', completed: false },
    { id: 2, title: 'Lab Report', subject: 'Physics', due: '2026-03-20', priority: 'medium', completed: false },
    { id: 3, title: 'Essay Draft', subject: 'English', due: '2026-03-22', priority: 'low', completed: true }
  ]);

  const toggleComplete = (id) => {
    const updated = assignments.map(a => a.id === id ? { ...a, completed: !a.completed } : a);
    setAssignments(updated);
    localStorage.setItem('assignments', JSON.stringify(updated));
  };

  const deleteAssignment = (id) => {
    const updated = assignments.filter(a => a.id !== id);
    setAssignments(updated);
    localStorage.setItem('assignments', JSON.stringify(updated));
  };

  const addAssignment = () => {
    const title = prompt('Assignment title:');
    const subject = prompt('Subject:');
    const due = prompt('Due date (YYYY-MM-DD):');
    if (title && subject && due) {
      const newA = { id: Date.now(), title, subject, due, priority: 'medium', completed: false };
      setAssignments([...assignments, newA]);
      localStorage.setItem('assignments', JSON.stringify([...assignments, newA]));
      showToast?.('Assignment added!', 'success');
    }
  };

  const priorityColors = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' };
  const sorted = [...assignments].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(a.due) - new Date(b.due);
  });

  const dueSoon = assignments.filter(a => !a.completed && new Date(a.due) <= new Date(Date.now() + 3*24*60*60*1000)).length;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Assignment Tracker</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
          <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ef4444' }}>{assignments.filter(a => !a.completed).length}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Pending</div>
          </div>
          <div style={{ background: '#fef3c7', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>{dueSoon}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Due Soon</div>
          </div>
        </div>

        <button onClick={addAssignment} style={{ width: '100%', padding: '15px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', marginBottom: '20px', fontWeight: '600' }}>
          + Add Assignment
        </button>

        <div style={{ display: 'grid', gap: '12px' }}>
          {sorted.map(a => (
            <div key={a.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', opacity: a.completed ? 0.6 : 1 }}>
              <input type="checkbox" checked={a.completed} onChange={() => toggleComplete(a.id)} style={{ width: '22px', height: '22px', accentColor: '#10b981' }} />
              <div style={{ flex: 1, textDecoration: a.completed ? 'line-through' : 'none' }}>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>{a.title}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{a.subject} • Due: {a.due}</div>
              </div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: priorityColors[a.priority] }} />
              <button onClick={() => deleteAssignment(a.id)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '18px' }}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.AssignmentTracker = AssignmentTracker;
