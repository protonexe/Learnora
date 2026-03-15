const CalendarView = ({ events = [], onDateSelect, onEventClick }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(null);
  const isMobile = window.innerWidth <= 768;

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add padding for first week
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add days of month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(e => new Date(e.date).toDateString() === date.toDateString());
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <button
          onClick={prevMonth}
          style={{
            background: 'var(--bg-tertiary)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          <Icon name="chevron-left" size={18} />
        </button>
        <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={nextMonth}
          style={{
            background: 'var(--bg-tertiary)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          <Icon name="chevron-right" size={18} />
        </button>
      </div>

      {/* Day Names */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        padding: '8px 16px',
        borderBottom: '1px solid var(--border-color)'
      }}>
        {dayNames.map(day => (
          <div key={day} style={{
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: '600',
            color: 'var(--text-tertiary)',
            padding: '8px 0'
          }}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        padding: '8px 16px 16px'
      }}>
        {days.map((date, idx) => {
          const dayEvents = getEventsForDate(date);
          const isSelected = selectedDate?.toDateString() === date?.toDateString();
          
          return (
            <div
              key={idx}
              onClick={() => {
                if (date) {
                  setSelectedDate(date);
                  onDateSelect?.(date);
                }
              }}
              style={{
                aspectRatio: '1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: date ? 'pointer' : 'default',
                borderRadius: '8px',
                background: isSelected ? 'var(--primary-500)' : isToday(date) ? 'var(--primary-500)15' : 'transparent',
                position: 'relative'
              }}
            >
              <span style={{
                fontSize: '14px',
                fontWeight: isToday(date) ? '700' : '500',
                color: !date ? 'transparent' : isSelected ? '#fff' : isToday(date) ? 'var(--primary-500)' : 'var(--text-primary)'
              }}>
                {date?.getDate() || ''}
              </span>
              {dayEvents.length > 0 && (
                <div style={{
                  position: 'absolute',
                  bottom: '4px',
                  display: 'flex',
                  gap: '2px'
                }}>
                  {dayEvents.slice(0, 3).map((e, i) => (
                    <div
                      key={i}
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: isSelected ? '#fff' : 'var(--primary-500)'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Events List */}
      {selectedDate && (
        <div style={{
          padding: '16px',
          borderTop: '1px solid var(--border-color)',
          background: 'var(--bg-tertiary)'
        }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 12px 0' }}>
            Events for {selectedDate.toLocaleDateString()}
          </h4>
          {getEventsForDate(selectedDate).length === 0 ? (
            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', margin: 0 }}>
              No events scheduled
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {getEventsForDate(selectedDate).map((event, idx) => (
                <div
                  key={idx}
                  onClick={() => onEventClick?.(event)}
                  style={{
                    padding: '10px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: event.color || 'var(--primary-500)'
                  }} />
                  <span style={{ fontSize: '13px', fontWeight: '500' }}>{event.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

window.CalendarView = CalendarView;
