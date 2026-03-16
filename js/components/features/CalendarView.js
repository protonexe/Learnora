const CalendarView = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [events, setEvents] = React.useState(() => JSON.parse(localStorage.getItem('calendar-events') || '[]'));
  const [showAdd, setShowAdd] = React.useState(false);
  const [newEvent, setNewEvent] = React.useState({ title: '', date: '', time: '', type: 'study' });

  React.useEffect(() => { localStorage.setItem('calendar-events', JSON.stringify(events)); }, [events]);

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    setEvents([{ id: Date.now(), ...newEvent }, ...events]);
    setNewEvent({ title: '', date: '', time: '', type: 'study' });
    setShowAdd(false);
    showToast?.('Event added!', 'success');
  };

  const deleteEvent = (id) => setEvents(events.filter(e => e.id !== id));

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDay = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const types = { study: '#6366f1', assignment: '#f59e0b', exam: '#f43f5e', personal: '#10b981' };

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDay(currentDate);
    const cells = [];
    
    for (let i = 0; i < firstDay; i++) cells.push(<div key={`empty-${i}`} style={styles.calendarCell} />);
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);
      const isToday = dateStr === new Date().toISOString().slice(0, 10);
      cells.push(
        <div key={day} style={{ ...styles.calendarCell, background: isToday ? 'var(--primary-100)' : 'var(--bg-secondary)' }}>
          <span style={{ ...styles.dayNumber, color: isToday ? 'var(--primary-600)' : 'var(--text-primary)' }}>{day}</span>
          {dayEvents.slice(0, 2).map(e => (
            <div key={e.id} style={{ ...styles.eventDot, background: types[e.type] }} title={e.title} />
          ))}
        </div>
      );
    }
    return cells;
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>📆 Calendar</h1>
        </div>
        <button onClick={() => setShowAdd(true)} style={styles.addButton}><Icon name="plus" size={18} /> Add Event</button>
      </div>

      <div style={styles.calendarCard}>
        <div style={styles.monthNav}>
          <button onClick={prevMonth} style={styles.navButton}>◀</button>
          <h2 style={styles.monthTitle}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <button onClick={nextMonth} style={styles.navButton}>▶</button>
        </div>
        <div style={styles.calendarGrid}>
          {days.map(d => <div key={d} style={styles.dayHeader}>{d}</div>)}
          {renderCalendar()}
        </div>
      </div>

      <div style={styles.legend}>
        {Object.entries(types).map(([type, color]) => (
          <div key={type} style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: color }} />
            <span style={styles.legendLabel}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </div>
        ))}
      </div>

      {showAdd && (
        <div style={styles.card}>
          <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} placeholder="Event title" style={styles.input} />
          <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} style={styles.input} />
          <input type="time" value={newEvent.time} onChange={(e) => setNewEvent({...newEvent, time: e.target.value})} style={styles.input} />
          <select value={newEvent.type} onChange={(e) => setNewEvent({...newEvent, type: e.target.value})} style={styles.select}>
            <option value="study">Study</option>
            <option value="assignment">Assignment</option>
            <option value="exam">Exam</option>
            <option value="personal">Personal</option>
          </select>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addEvent} style={styles.primaryButton}>Add</button>
            <button onClick={() => setShowAdd(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  calendarCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  monthNav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  navButton: { background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px 12px', cursor: 'pointer' },
  monthTitle: { fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' },
  calendarGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' },
  dayHeader: { textAlign: 'center', padding: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--text-tertiary)' },
  calendarCell: { minHeight: '60px', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' },
  dayNumber: { fontSize: '14px', fontWeight: '600' },
  eventDot: { width: '8px', height: '8px', borderRadius: '50%', marginTop: '4px', display: 'inline-block' },
  legend: { display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '20px' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '6px' },
  legendDot: { width: '12px', height: '12px', borderRadius: '50%' },
  legendLabel: { fontSize: '12px', color: 'var(--text-secondary)' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  select: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }
};

window.CalendarView = CalendarView;
