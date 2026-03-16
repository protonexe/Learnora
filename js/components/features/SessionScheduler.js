import React from 'react';
import { X, Check, Clock, AlertCircle, Info, ChevronRight, Calendar, MapPin, User, Video, MessageSquare, FileText, BookOpen, Star, Heart, MoreHorizontal } from './Icon';

const SessionScheduler = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [sessions, setSessions] = React.useState([
    { id: 1, title: 'Physics: Mechanics', instructor: 'Dr. Smith', time: '10:00 AM', duration: '1h', type: 'live', participants: 12 },
    { id: 2, title: 'Math Study Group', instructor: 'Alice', time: '2:00 PM', duration: '45m', type: 'group', participants: 5 },
    { id: 3, title: 'Chemistry Lab', instructor: 'Dr. Brown', time: '4:30 PM', duration: '2h', type: 'lab', participants: 8 },
  ]);
  
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i - date.getDay());
    return date;
  });
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 450,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: 20, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            📅 Session Scheduler
          </h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
      </div>
      
      <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {weekDays.map((date, i) => (
          <button
            key={i}
            onClick={() => setSelectedDate(date)}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: 'none',
              background: selectedDate?.toDateString() === date.toDateString() ? 'var(--primary)' : 'var(--bg)',
              color: selectedDate?.toDateString() === date.toDateString() ? 'white' : 'var(--text-primary)',
              cursor: 'pointer',
              textAlign: 'center',
              minWidth: 50
            }}
          >
            <div style={{ fontSize: 11, opacity: 0.8 }}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{date.getDate()}</div>
          </button>
        ))}
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Upcoming Sessions</h4>
        {sessions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
            No sessions scheduled
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sessions.map(session => (
              <div key={session.id} style={{ background: 'var(--bg)', borderRadius: 12, padding: 14, border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{session.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{session.instructor}</div>
                  </div>
                  <span style={{
                    background: session.type === 'live' ? '#ef444420' : session.type === 'group' ? '#3b82f620' : '#10b98120',
                    color: session.type === 'live' ? '#ef4444' : session.type === 'group' ? '#3b82f6' : '#10b981',
                    padding: '4px 8px',
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    {session.type}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>🕐 {session.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>👥 {session.participants}</span>
                  </div>
                  <button style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontSize: 12 }}>
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ padding: 16, borderTop: '1px solid var(--border-color)' }}>
        <button style={{ width: '100%', padding: 14, borderRadius: 10, border: '2px dashed var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          + Schedule New Session
        </button>
      </div>
    </div>
  );
};

export default SessionScheduler;
