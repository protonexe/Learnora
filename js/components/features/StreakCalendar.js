import React from 'react';
import { Flame, Trophy, Target, Calendar, ChevronLeft, ChevronRight, Zap } from './Icon';

const StreakCalendar = ({ streakData, onDayClick }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
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
  
  const days = getDaysInMonth(currentMonth);
  const today = new Date();
  
  const isStudyDay = (date) => {
    if (!date || !streakData) return false;
    return streakData.some(d => new Date(d.date).toDateString() === date.toDateString());
  };
  
  const getIntensity = (date) => {
    if (!date || !streakData) return 0;
    const studyDay = streakData.find(d => new Date(d.date).toDateString() === date.toDateString());
    return studyDay?.minutes ? Math.min(4, Math.floor(studyDay.minutes / 30)) : 0;
  };
  
  const intensityColors = ['#1f2937', '#065f46', '#059669', '#10b981', '#34d399'];
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  const currentStreak = streakData?.filter((d, i, arr) => {
    const date = new Date(d.date);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (i === arr.length - 1 && date.toDateString() !== today.toDateString() && 
        date.toDateString() !== yesterday.toDateString()) return false;
    return true;
  }).length || 0;
  
  const totalStudyDays = streakData?.length || 0;
  const totalMinutes = streakData?.reduce((a, d) => a + (d.minutes || 0), 0) || 0;
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 24,
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Flame size={20} style={{ color: '#f59e0b' }} /> Study Streak
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={prevMonth}
            style={{
              padding: 8,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextMonth}
            style={{
              padding: 8,
              borderRadius: 8,
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
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-around',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: 32, fontWeight: 700, color: 'white' }}>{currentStreak}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Current Streak</div>
        </div>
        <div>
          <div style={{ fontSize: 32, fontWeight: 700, color: 'white' }}>{totalStudyDays}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Total Days</div>
        </div>
        <div>
          <div style={{ fontSize: 32, fontWeight: 700, color: 'white' }}>{Math.floor(totalMinutes / 60)}h</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Total Time</div>
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 4,
        marginBottom: 16
      }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-secondary)', padding: 8 }}>
            {d}
          </div>
        ))}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 4
      }}>
        {days.map((day, i) => {
          const isToday = day && day.toDateString() === today.toDateString();
          const studied = isStudyDay(day);
          const intensity = getIntensity(day);
          
          return (
            <div
              key={i}
              onClick={() => day && onDayClick?.(day)}
              style={{
                aspectRatio: '1',
                borderRadius: 6,
                background: day ? intensityColors[intensity] : 'transparent',
                border: isToday ? '2px solid var(--primary)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                color: day ? (intensity > 0 ? 'white' : 'var(--text-secondary)') : 'transparent',
                cursor: day ? 'pointer' : 'default',
                transition: 'transform 0.1s'
              }}
            >
              {day?.getDate()}
            </div>
          );
        })}
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 16,
        marginTop: 16,
        fontSize: 11,
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: intensityColors[0] }} />
          <span>None</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: intensityColors[1] }} />
          <span>&lt;30m</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: intensityColors[2] }} />
          <span>1h</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: intensityColors[3] }} />
          <span>2h</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: intensityColors[4] }} />
          <span>3h+</span>
        </div>
      </div>
    </div>
  );
};

export default StreakCalendar;
