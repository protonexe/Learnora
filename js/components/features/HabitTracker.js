const HabitTracker = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [habits, setHabits] = React.useState(() => JSON.parse(localStorage.getItem('habit-tracker') || '[]'));
  const [showAdd, setShowAdd] = React.useState(false);
  const [newHabit, setNewHabit] = React.useState({ name: '', frequency: 'daily', goal: 1 });

  React.useEffect(() => { localStorage.setItem('habit-tracker', JSON.stringify(habits)); }, [habits]);

  const addHabit = () => {
    if (!newHabit.name) return;
    setHabits([{ id: Date.now(), ...newHabit, completions: [], createdAt: new Date().toISOString() }, ...habits]);
    setNewHabit({ name: '', frequency: 'daily', goal: 1 });
    setShowAdd(false);
    showToast?.('Habit added!', 'success');
  };

  const deleteHabit = (id) => setHabits(habits.filter(h => h.id !== id));

  const toggleCompletion = (habitId, date) => {
    setHabits(habits.map(h => {
      if (h.id !== habitId) return h;
      const completed = h.completions.includes(date);
      return { ...h, completions: completed ? h.completions.filter(d => d !== date) : [...h.completions, date] };
    }));
  };

  const today = new Date().toISOString().slice(0, 10);
  const weekDays = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    weekDays.push(d.toISOString().slice(0, 10));
  }

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>✓ Habit Tracker</h1>
        </div>
        <button onClick={() => setShowAdd(true)} style={styles.addButton}><Icon name="plus" size={18} /> Add</button>
      </div>

      {showAdd && (
        <div style={styles.card}>
          <input type="text" value={newHabit.name} onChange={(e) => setNewHabit({...newHabit, name: e.target.value})} placeholder="Habit name" style={styles.input} />
          <select value={newHabit.frequency} onChange={(e) => setNewHabit({...newHabit, frequency: e.target.value})} style={styles.select}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addHabit} style={styles.primaryButton}>Add</button>
            <button onClick={() => setShowAdd(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      <div style={styles.weekHeader}>
        {weekDays.map(day => (
          <div key={day} style={{ ...styles.dayCell, background: day === today ? 'var(--primary-500)' : 'var(--bg-secondary)' }}>
            <span style={{ color: day === today ? '#fff' : 'var(--text-tertiary)', fontSize: '11px' }}>
              {new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
          </div>
        ))}
      </div>

      {habits.length === 0 ? (
        <div style={styles.emptyState}><p>No habits tracked yet.</p><p>Add habits to build consistent routines!</p></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {habits.map(habit => (
            <div key={habit.id} style={styles.habitRow}>
              <span style={styles.habitName}>{habit.name}</span>
              <div style={styles.checkboxRow}>
                {weekDays.map(day => (
                  <button key={day} onClick={() => toggleCompletion(habit.id, day)} style={{ ...styles.checkbox, background: habit.completions.includes(day) ? 'var(--primary-500)' : 'var(--bg-primary)', borderColor: habit.completions.includes(day) ? 'var(--primary-500)' : 'var(--border-color)' }}>
                    {habit.completions.includes(day) && '✓'}
                  </button>
                ))}
              </div>
              <button onClick={() => deleteHabit(habit.id)} style={styles.deleteButton}>×</button>
            </div>
          ))}
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
  weekHeader: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '12px' },
  dayCell: { padding: '8px', borderRadius: 'var(--radius-md)', textAlign: 'center' },
  habitRow: { display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px' },
  habitName: { flex: 1, fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' },
  checkboxRow: { display: 'flex', gap: '4px' },
  checkbox: { width: '28px', height: '28px', borderRadius: '50%', border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: '12px' },
  deleteButton: { background: 'transparent', border: 'none', fontSize: '20px', color: 'var(--text-tertiary)', cursor: 'pointer' }
};

window.HabitTracker = HabitTracker;
