const HomeworkTracker = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [homework, setHomework] = React.useState(() => JSON.parse(localStorage.getItem('homework-tracker') || '[]'));
  const [showAdd, setShowAdd] = React.useState(false);
  const [newHW, setNewHW] = React.useState({ title: '', subject: '', dueDate: '', priority: 'medium' });

  React.useEffect(() => { localStorage.setItem('homework-tracker', JSON.stringify(homework)); }, [homework]);

  const addHW = () => {
    if (!newHW.title) return;
    setHomework([{ id: Date.now(), ...newHW, completed: false, createdAt: new Date().toISOString() }, ...homework]);
    setNewHW({ title: '', subject: '', dueDate: '', priority: 'medium' });
    setShowAdd(false);
    showToast?.('Homework added!', 'success');
  };

  const toggleHW = (id) => setHomework(homework.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  const deleteHW = (id) => setHomework(homework.filter(h => h.id !== id));

  const getDaysUntil = (date) => {
    if (!date) return null;
    return Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
  };

  const priorityColors = { high: '#f43f5e', medium: '#f59e0b', low: '#10b981' };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>📋 Homework Tracker</h1>
        </div>
        <button onClick={() => setShowAdd(true)} style={styles.addButton}><Icon name="plus" size={18} /> Add</button>
      </div>

      {showAdd && (
        <div style={styles.card}>
          <input type="text" value={newHW.title} onChange={(e) => setNewHW({...newHW, title: e.target.value})} placeholder="Assignment title" style={styles.input} />
          <input type="text" value={newHW.subject} onChange={(e) => setNewHW({...newHW, subject: e.target.value})} placeholder="Subject" style={styles.input} />
          <input type="date" value={newHW.dueDate} onChange={(e) => setNewHW({...newHW, dueDate: e.target.value})} style={styles.input} />
          <select value={newHW.priority} onChange={(e) => setNewHW({...newHW, priority: e.target.value})} style={styles.select}>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addHW} style={styles.primaryButton}>Add</button>
            <button onClick={() => setShowAdd(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {homework.length === 0 ? (
        <div style={styles.emptyState}><p>No homework yet!</p></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {homework.map(h => {
            const days = getDaysUntil(h.dueDate);
            return (
              <div key={h.id} style={{ ...styles.hwCard, opacity: h.completed ? 0.6 : 1, borderLeftColor: priorityColors[h.priority] }}>
                <button onClick={() => toggleHW(h.id)} style={{ ...styles.checkbox, background: h.completed ? 'var(--primary-500)' : 'transparent', borderColor: h.completed ? 'var(--primary-500)' : 'var(--border-color)' }}>
                  {h.completed && '✓'}
                </button>
                <div style={{ flex: 1 }}>
                  <h3 style={{ ...styles.hwTitle, textDecoration: h.completed ? 'line-through' : 'none' }}>{h.title}</h3>
                  <p style={styles.hwMeta}>{h.subject} {days !== null && <span style={{ color: days < 0 ? '#f43f5e' : days <= 2 ? '#f59e0b' : '#10b981' }}>• {days < 0 ? 'Overdue' : days === 0 ? 'Due today' : `${days} days`}</span>}</p>
                </div>
                <button onClick={() => deleteHW(h.id)} style={styles.deleteButton}>×</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  select: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' },
  hwCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '4px solid' },
  checkbox: { width: '24px', height: '24px', borderRadius: '50%', border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: '12px', flexShrink: 0 },
  hwTitle: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  hwMeta: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  deleteButton: { background: 'transparent', border: 'none', fontSize: '20px', color: 'var(--text-tertiary)', cursor: 'pointer' }
};

window.HomeworkTracker = HomeworkTracker;
