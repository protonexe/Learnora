const ReminderWidget = ({ onClose }) => {
  const [reminders, setReminders] = React.useState(() => {
    const saved = localStorage.getItem('learnora-reminders');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Math Quiz', time: '14:00', repeat: 'daily', enabled: true },
      { id: 2, title: 'Study Session', time: '18:00', repeat: 'weekdays', enabled: true },
    ];
  });
  const [showAdd, setShowAdd] = React.useState(false);
  const [newReminder, setNewReminder] = React.useState({ title: '', time: '09:00', repeat: 'once' });

  const repeats = [
    { value: 'once', label: 'Once' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekdays', label: 'Weekdays' },
    { value: 'weekly', label: 'Weekly' },
  ];

  const saveReminders = (newReminders) => {
    setReminders(newReminders);
    localStorage.setItem('learnora-reminders', JSON.stringify(newReminders));
  };

  const addReminder = () => {
    if (!newReminder.title) return;
    saveReminders([...reminders, { id: Date.now(), ...newReminder, enabled: true }]);
    setNewReminder({ title: '', time: '09:00', repeat: 'once' });
    setShowAdd(false);
  };

  const toggleReminder = (id) => {
    saveReminders(reminders.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const deleteReminder = (id) => {
    saveReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
          <h2 style={{ margin: 0, fontSize: 20 }}>⏰ Reminders</h2>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>+ Add</button>
      </div>

      <div style={{ padding: 20, maxWidth: 500, margin: '0 auto' }}>
        {showAdd && (
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, marginBottom: 20, border: '1px solid var(--border-color)' }}>
            <input type="text" value={newReminder.title} onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })} placeholder="Reminder title..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14, marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input type="time" value={newReminder.time} onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })} style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14 }} />
              <select value={newReminder.repeat} onChange={(e) => setNewReminder({ ...newReminder, repeat: e.target.value })} style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', fontSize: 14 }}>
                {repeats.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={addReminder} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Add Reminder</button>
              <button onClick={() => setShowAdd(false)} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {reminders.map(reminder => (
            <div key={reminder.id} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => toggleReminder(reminder.id)} style={{ width: 24, height: 24, borderRadius: reminder.enabled ? '50%' : '6px', border: reminder.enabled ? 'none' : '2px solid var(--border-color)', background: reminder.enabled ? '#10b981' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12 }}>
                {reminder.enabled && '✓'}
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: reminder.enabled ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{reminder.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{reminder.time} • {reminder.repeat}</div>
              </div>
              <button onClick={() => deleteReminder(reminder.id)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 16 }}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
