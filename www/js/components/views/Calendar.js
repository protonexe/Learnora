const CalendarView = ({ onBack, showToast, isTeacher }) => {
  const isMobile = window.innerWidth <= 768;
  const [events, setEvents] = React.useState([]);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [showAddEvent, setShowAddEvent] = React.useState(false);
  const [newEvent, setNewEvent] = React.useState({ title: '', description: '', date: '', type: 'assignment' });

  React.useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    if (window.Database) {
      const db = window.Database;
      setEvents(db.getAllCalendarEvents() || []);
    }
  };

  const handleCreate = () => {
    if (window.Database && newEvent.title && newEvent.date) {
      window.Database.addCalendarEvent(newEvent);
      showToast('Event added!', 'success');
      setShowAddEvent(false);
      setNewEvent({ title: '', description: '', date: '', type: 'assignment' });
      loadEvents();
    }
  };

  const handleDelete = (id) => {
    if (window.Database) {
      window.Database.deleteCalendarEvent(id);
      showToast('Event deleted', 'info');
      loadEvents();
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = getDaysInMonth(currentDate);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Calendar</h1>
        <button onClick={() => setShowAddEvent(true)} style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          + Event
        </button>
      </div>

      <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} style={{ padding: '8px 16px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>◀</button>
          <h2 style={{ fontSize: '20px', fontWeight: '700' }}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} style={{ padding: '8px 16px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>▶</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ padding: '8px', fontWeight: '600', fontSize: '12px', color: 'var(--text-tertiary)' }}>{day}</div>
          ))}
          {days.map((date, idx) => {
            const dayEvents = getEventsForDate(date);
            const isToday = date && date.toDateString() === new Date().toDateString();
            return (
              <div key={idx} style={{ minHeight: '60px', padding: '4px', background: isToday ? 'var(--primary-500)' : 'var(--bg-tertiary)', borderRadius: '8px', opacity: date ? 1 : 0.3 }}>
                {date && (
                  <>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: isToday ? '#fff' : 'var(--text-primary)' }}>{date.getDate()}</div>
                    {dayEvents.slice(0, 2).map((e, i) => (
                      <div key={i} style={{ fontSize: '9px', padding: '2px 4px', background: isToday ? 'rgba(255,255,255,0.2)' : 'var(--primary-500)', color: '#fff', borderRadius: '4px', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {e.title}
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Upcoming Events</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {events.sort((a, b) => new Date(a.date) - new Date(b.date)).map((event, idx) => (
          <div key={event.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '16px' }}>
                  {event.type === 'assignment' ? '📋' : event.type === 'exam' ? '📝' : event.type === 'quiz' ? '✅' : '📅'}
                </span>
                <h4 style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>{event.title}</h4>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>{new Date(event.date).toLocaleDateString()} • {event.type}</p>
            </div>
            <button onClick={() => handleDelete(event.id)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
          </div>
        ))}
      </div>

      {showAddEvent && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', maxWidth: '400px', width: '100%' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Add Event</h2>
            <input type="text" placeholder="Event Title" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }} />
            <input type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }} />
            <select value={newEvent.type} onChange={e => setNewEvent({...newEvent, type: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
              <option value="assignment">Assignment Due</option>
              <option value="exam">Exam</option>
              <option value="quiz">Quiz</option>
              <option value="event">Event</option>
            </select>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowAddEvent(false)} style={{ flex: 1, padding: '12px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
              <button onClick={handleCreate} style={{ flex: 1, padding: '12px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.CalendarView = CalendarView;
