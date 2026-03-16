import React from 'react';
import { Activity, TrendingUp, TrendingDown, Minus, Calendar, Clock, Target, Flame, Award, BookOpen, Users, Zap, ChevronRight } from './Icon';

const ProgressReport = ({ onClose }) => {
  const [period, setPeriod] = React.useState('week');
  
  const stats = {
    week: { studyHours: 12.5, courses: 3, quizzes: 8, streak: 5, improvement: 12 },
    month: { studyHours: 48, courses: 8, quizzes: 32, streak: 15, improvement: 18 },
    year: { studyHours: 520, courses: 24, quizzes: 156, streak: 28, improvement: 25 }
  };
  
  const currentStats = stats[period];
  
  const weeklyData = [
    { day: 'Mon', hours: 2.5, target: 2 },
    { day: 'Tue', hours: 1.8, target: 2 },
    { day: 'Wed', hours: 3.2, target: 2 },
    { day: 'Thu', hours: 2.1, target: 2 },
    { day: 'Fri', hours: 1.5, target: 2 },
    { day: 'Sat', hours: 0.8, target: 2 },
    { day: 'Sun', hours: 0.6, target: 2 },
  ];
  
  const skills = [
    { name: 'Mathematics', progress: 78, trend: 'up', change: 5 },
    { name: 'Physics', progress: 65, trend: 'up', change: 8 },
    { name: 'Chemistry', progress: 52, trend: 'down', change: -3 },
    { name: 'Biology', progress: 71, trend: 'up', change: 12 },
  ];
  
  const achievements = [
    { id: 1, title: 'Week Warrior', desc: '7 day streak', icon: '🔥', earned: true },
    { id: 2, title: 'Quiz Master', desc: '50 quizzes', icon: '🏆', earned: true },
    { id: 3, title: 'Bookworm', desc: '10 books', icon: '📚', earned: false },
    { id: 4, title: 'Scholar', desc: '100 hours', icon: '🎓', earned: false },
  ];
  
  const maxHours = Math.max(...weeklyData.map(d => d.hours), 3);
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 24,
      width: 500,
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          📊 Progress Report
        </h3>
        <div style={{ display: 'flex', gap: 4 }}>
          {['week', 'month', 'year'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                border: 'none',
                background: period === p ? 'var(--primary)' : 'var(--bg)',
                color: period === p ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontSize: 13
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10,
        marginBottom: 24
      }}>
        <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
          <Clock size={24} style={{ color: 'var(--primary)', marginBottom: 8 }} />
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{currentStats.studyHours}h</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Study Time</div>
        </div>
        <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
          <BookOpen size={24} style={{ color: '#10b981', marginBottom: 8 }} />
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{currentStats.courses}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Courses</div>
        </div>
        <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
          <Target size={24} style={{ color: '#f59e0b', marginBottom: 8 }} />
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{currentStats.streak}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Day Streak</div>
        </div>
      </div>
      
      <div style={{ marginBottom: 24 }}>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Study Activity</h4>
        <div style={{
          height: 120,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
          padding: '0 8px'
        }}>
          {weeklyData.map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                height: `${(d.hours / maxHours) * 100}%`,
                background: d.hours >= d.target ? '#10b981' : 'var(--primary)',
                borderRadius: 4,
                minHeight: 4,
                marginBottom: 8,
                transition: 'height 0.3s'
              }} />
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{d.day}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8, fontSize: 11 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 8, height: 8, background: '#10b981', borderRadius: 2 }} /> Met target
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 8, height: 8, background: 'var(--primary)', borderRadius: 2 }} /> Below target
          </span>
        </div>
      </div>
      
      <div style={{ marginBottom: 24 }}>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Skill Progress</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {skills.map((skill, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 13 }}>{skill.name}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                  {skill.trend === 'up' ? <TrendingUp size={14} style={{ color: '#10b981' }} /> : 
                   skill.trend === 'down' ? <TrendingDown size={14} style={{ color: '#ef4444' }} /> : 
                   <Minus size={14} style={{ color: 'var(--text-secondary)' }} />}
                  <span style={{ color: skill.change > 0 ? '#10b981' : skill.change < 0 ? '#ef4444' : 'var(--text-secondary)' }}>
                    {skill.change > 0 ? '+' : ''}{skill.change}%
                  </span>
                </span>
              </div>
              <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${skill.progress}%`,
                  background: skill.progress >= 70 ? '#10b981' : skill.progress >= 50 ? 'var(--primary)' : '#f59e0b',
                  borderRadius: 3
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Recent Achievements</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {achievements.map(ach => (
            <div
              key={ach.id}
              style={{
                padding: 12,
                background: ach.earned ? 'var(--primary)' + '15' : 'var(--bg)',
                borderRadius: 10,
                border: `1px solid ${ach.earned ? 'var(--primary)' : 'var(--border-color)'}`,
                opacity: ach.earned ? 1 : 0.5
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>{ach.icon}</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{ach.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{ach.desc}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{
        marginTop: 20,
        padding: 16,
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        borderRadius: 12,
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Overall Improvement</div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>Keep up the great work!</div>
        </div>
        <div style={{ fontSize: 36, fontWeight: 700 }}>+{currentStats.improvement}%</div>
      </div>
    </div>
  );
};

export default ProgressReport;
