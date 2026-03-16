const ClassSchedule = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [schedule, setSchedule] = React.useState(() => JSON.parse(localStorage.getItem('class-schedule') || '[]'));
  const [showAdd, setShowAdd] = React.useState(false);
  const [newClass, setNewClass] = React.useState({ name: '', day: 'Monday', time: '', room: '', professor: '' });

  React.useEffect(() => { localStorage.setItem('class-schedule', JSON.stringify(schedule)); }, [schedule]);

  const addClass = () => {
    if (!newClass.name || !newClass.time) return;
    setSchedule([...schedule, { id: Date.now(), ...newClass }]);
    setNewClass({ name: '', day: 'Monday', time: '', room: '', professor: '' });
    setShowAdd(false);
    showToast?.('Class added!', 'success');
  };

  const deleteClass = (id) => setSchedule(schedule.filter(c => c.id !== id));

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const daySchedule = days.map(day => ({
    day,
    classes: schedule.filter(c => c.day === day).sort((a, b) => a.time.localeCompare(b.time))
  }));

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>📅 Class Schedule</h1>
        </div>
        <button onClick={() => setShowAdd(true)} style={styles.addButton}>+ Add Class</button>
      </div>

      {showAdd && (
        <div style={styles.card}>
          <input type="text" value={newClass.name} onChange={(e) => setNewClass({...newClass, name: e.target.value})} placeholder="Class name" style={styles.input} />
          <select value={newClass.day} onChange={(e) => setNewClass({...newClass, day: e.target.value})} style={styles.select}>
            {days.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <input type="time" value={newClass.time} onChange={(e) => setNewClass({...newClass, time: e.target.value})} style={styles.input} />
          <input type="text" value={newClass.room} onChange={(e) => setNewClass({...newClass, room: e.target.value})} placeholder="Room" style={styles.input} />
          <input type="text" value={newClass.professor} onChange={(e) => setNewClass({...newClass, professor: e.target.value})} placeholder="Professor" style={styles.input} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addClass} style={styles.primaryButton}>Add</button>
            <button onClick={() => setShowAdd(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {daySchedule.map(({ day, classes }) => (
        classes.length > 0 && (
          <div key={day} style={styles.daySection}>
            <h3 style={styles.dayTitle}>{day}</h3>
            {classes.map(cls => (
              <div key={cls.id} style={styles.classCard}>
                <span style={styles.classTime}>{cls.time}</span>
                <div style={styles.classInfo}>
                  <h4 style={styles.className}>{cls.name}</h4>
                  {cls.room && <p style={styles.classDetail}>📍 {cls.room}</p>}
                  {cls.professor && <p style={styles.classDetail}>👤 {cls.professor}</p>}
                </div>
                <button onClick={() => deleteClass(cls.id)} style={styles.deleteButton}>×</button>
              </div>
            ))}
          </div>
        )
      ))}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  select: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  daySection: { marginBottom: '20px' },
  dayTitle: { fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' },
  classCard: { display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '8px' },
  classTime: { fontSize: '14px', fontWeight: '600', color: 'var(--primary-500)', minWidth: '60px' },
  classInfo: { flex: 1 },
  className: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  classDetail: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  deleteButton: { background: 'transparent', border: 'none', fontSize: '20px', color: 'var(--text-tertiary)', cursor: 'pointer' }
};

window.ClassSchedule = ClassSchedule;
