const WeeklyPlanner = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [plans, setPlans] = React.useState(() => {
    return JSON.parse(localStorage.getItem('weekly-plans') || '[]');
  });
  const [showAdd, setShowAdd] = React.useState(false);
  const [newPlan, setNewPlan] = React.useState({ day: 'Monday', subject: '', goal: '', completed: false });

  React.useEffect(() => {
    localStorage.setItem('weekly-plans', JSON.stringify(plans));
  }, [plans]);

  const addPlan = () => {
    if (!newPlan.subject || !newPlan.goal) return;
    const plan = { id: Date.now(), ...newPlan };
    setPlans([...plans, plan]);
    setNewPlan({ day: 'Monday', subject: '', goal: '', completed: false });
    setShowAdd(false);
    showToast?.('Study plan added!', 'success');
  };

  const toggleComplete = (id) => {
    setPlans(plans.map(p => p.id === id ? { ...p, completed: !p.completed } : p));
  };

  const deletePlan = (id) => {
    setPlans(plans.filter(p => p.id !== id));
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'English', 'Computer Science', 'Other'];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}>
            <Icon name="arrow-left" size={20} />
          </button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>
            📅 Weekly Planner
          </h1>
        </div>
        <button onClick={() => setShowAdd(true)} style={styles.addButton}>
          <Icon name="plus" size={18} /> Add Task
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Add Weekly Task</h3>
          <select
            value={newPlan.day}
            onChange={(e) => setNewPlan({ ...newPlan, day: e.target.value })}
            style={styles.select}
          >
            {days.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select
            value={newPlan.subject}
            onChange={(e) => setNewPlan({ ...newPlan, subject: e.target.value })}
            style={styles.select}
          >
            <option value="">Select subject</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input
            type="text"
            value={newPlan.goal}
            onChange={(e) => setNewPlan({ ...newPlan, goal: e.target.value })}
            placeholder="What do you want to accomplish?"
            style={styles.input}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addPlan} style={styles.primaryButton}>Add</button>
            <button onClick={() => setShowAdd(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {/* Weekly Grid */}
      {days.map(day => {
        const dayPlans = plans.filter(p => p.day === day);
        const completed = dayPlans.filter(p => p.completed).length;
        return (
          <div key={day} style={styles.daySection}>
            <div style={styles.dayHeader}>
              <h3 style={styles.dayTitle}>{day}</h3>
              {dayPlans.length > 0 && (
                <span style={styles.dayProgress}>{completed}/{dayPlans.length}</span>
              )}
            </div>
            {dayPlans.length === 0 ? (
              <p style={styles.emptyDay}>No tasks planned</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {dayPlans.map(plan => (
                  <div key={plan.id} style={{ ...styles.taskCard, opacity: plan.completed ? 0.6 : 1 }}>
                    <button
                      onClick={() => toggleComplete(plan.id)}
                      style={{
                        ...styles.checkbox,
                        background: plan.completed ? 'var(--primary-500)' : 'transparent',
                        borderColor: plan.completed ? 'var(--primary-500)' : 'var(--border-color)'
                      }}
                    >
                      {plan.completed && '✓'}
                    </button>
                    <div style={{ flex: 1 }}>
                      <p style={{ ...styles.taskSubject, textDecoration: plan.completed ? 'line-through' : 'none' }}>{plan.subject}</p>
                      <p style={styles.taskGoal}>{plan.goal}</p>
                    </div>
                    <button onClick={() => deletePlan(plan.id)} style={styles.deleteButton}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  cardTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  select: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  daySection: { marginBottom: '16px' },
  dayHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  dayTitle: { fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 },
  dayProgress: { fontSize: '13px', color: 'var(--primary-500)', fontWeight: '600' },
  emptyDay: { fontSize: '13px', color: 'var(--text-tertiary)', fontStyle: 'italic' },
  taskCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'opacity 0.2s' },
  checkbox: { width: '24px', height: '24px', borderRadius: '50%', border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, color: '#fff', fontSize: '12px' },
  taskSubject: { fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 },
  taskGoal: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  deleteButton: { background: 'transparent', border: 'none', fontSize: '20px', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '0 8px' }
};

window.WeeklyPlanner = WeeklyPlanner;
