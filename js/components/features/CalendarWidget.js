import React from 'react';
import { Calendar, Clock, Users, MapPin, Video, Plus, ChevronLeft, ChevronRight } from './Icon';

const CalendarWidget = ({ onEventClick }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  
  const events = [
    { id: 1, title: 'Physics Quiz', time: '10:00 AM', type: 'quiz', date: new Date() },
    { id: 2, title: 'Study Group', time: '2:00 PM', type: 'group', date: new Date(Date.now() + 86400000) },
    { id: 3, title: 'Math Assignment Due', time: '11:59 PM', type: 'assignment', date: new Date(Date.now() + 86400000 * 2) },
    { id: 4, title: 'Chemistry Lab', time: '9:00 AM', type: 'class', date: new Date(Date.now() + 86400000 * 3) },
    { id: 5, title: 'English Essay', time: '11:59 PM', type: 'assignment', date: new Date(Date.now() + 86400000 * 4) },
  ];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push({ date: null });
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i) });
    }
    
    return days;
  };
  
  const days = getDaysInMonth(currentDate);
  const today = new Date();
  
  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(e => e.date.toDateString() === date.toDateString());
  };
  
  const selectedEvents = getEventsForDate(selectedDate);
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };
  
  const eventColors = {
    quiz: '#8b5cf6',
    group: '#3b82f6',
    assignment: '#f59e0b',
    class: '#10b981'
  };
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 20,
      border: '1px solid var(--border-color)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calendar size={20} /> Calendar
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={prevMonth}
            style={{
              padding: 6,
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: 'var(--bg)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <span style={{
            padding: '6px 12px',
            fontWeight: 600,
            color: 'var(--text-primary)'
          }}>
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={nextMonth}
            style={{
              padding: 6,
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: 'var(--bg)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 4,
        marginBottom: 16
      }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-secondary)',
            padding: 8
          }}>
            {day}
          </div>
        ))}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 4,
        marginBottom: 20
      }}>
        {days.map((day, i) => {
          const isToday = day.date && day.date.toDateString() === today.toDateString();
          const isSelected = day.date && day.date.toDateString() === selectedDate.toDateString();
          const hasEvents = getEventsForDate(day.date).length > 0;
          
          return (
            <button
              key={i}
              onClick={() => day.date && setSelectedDate(day.date)}
              disabled={!day.date}
              style={{
                aspectRatio: '1',
                borderRadius: 8,
                border: 'none',
                background: isSelected ? 'var(--primary)' : isToday ? 'var(--primary)' + '20' : 'transparent',
                color: isSelected ? 'white' : isToday ? 'var(--primary)' : !day.date ? 'transparent' : 'var(--text-primary)',
                cursor: day.date ? 'pointer' : 'default',
                position: 'relative',
                fontWeight: isToday || isSelected ? 600 : 400,
                fontSize: 14
              }}
            >
              {day.date?.getDate()}
              {hasEvents && (
                <span style={{
                  position: 'absolute',
                  bottom: 4,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: isSelected ? 'white' : 'var(--primary)'
                }} />
              )}
            </button>
          );
        })}
      </div>
      
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 16 }}>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>
          Events for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </h4>
        {selectedEvents.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 20,
            color: 'var(--text-secondary)',
            fontSize: 13
          }}>
            No events scheduled
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selectedEvents.map(event => (
              <div
                key={event.id}
                onClick={() => onEventClick?.(event)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 10,
                  background: 'var(--bg)',
                  borderRadius: 8,
                  borderLeft: `3px solid ${eventColors[event.type]}`,
                  cursor: 'pointer'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 13 }}>
                    {event.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    <Clock size={12} style={{ marginRight: 4 }} /> {event.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;
