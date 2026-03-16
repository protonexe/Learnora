import React from 'react';
import { BookOpen, Clock, Award, TrendingUp, BarChart } from './Icon';

const SubjectProgress = ({ subjects, onSubjectClick }) => {
  const subjectColors = {
    'Mathematics': '#3b82f6',
    'Science': '#10b981',
    'English': '#f59e0b',
    'History': '#8b5cf6',
    'Physics': '#ec4899',
    'Chemistry': '#14b8a6',
    'Biology': '#f97316',
    'Computer Science': '#6366f1'
  };
  
  const data = subjects || [
    { name: 'Mathematics', progress: 75, hours: 12, streak: 5, color: subjectColors['Mathematics'] },
    { name: 'Science', progress: 60, hours: 8, streak: 3, color: subjectColors['Science'] },
    { name: 'English', progress: 90, hours: 15, streak: 8, color: subjectColors['English'] },
    { name: 'History', progress: 45, hours: 6, streak: 2, color: subjectColors['History'] },
    { name: 'Physics', progress: 30, hours: 4, streak: 1, color: subjectColors['Physics'] },
  ];
  
  const totalHours = data.reduce((a, s) => a + s.hours, 0);
  const avgProgress = Math.round(data.reduce((a, s) => a + s.progress, 0) / data.length);
  
  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ margin: '0 0 20px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <BarChart size={20} /> Subject Progress
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        marginBottom: 24
      }}>
        <div style={{
          background: 'var(--bg)',
          borderRadius: 10,
          padding: 16,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>{totalHours}h</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Total Time</div>
        </div>
        <div style={{
          background: 'var(--bg)',
          borderRadius: 10,
          padding: 16,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>{avgProgress}%</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Avg Progress</div>
        </div>
        <div style={{
          background: 'var(--bg)',
          borderRadius: 10,
          padding: 16,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>{data.length}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Subjects</div>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.map((subject, i) => (
          <div
            key={i}
            onClick={() => onSubjectClick?.(subject)}
            style={{
              background: 'var(--bg)',
              borderRadius: 12,
              padding: 16,
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: 4,
                  background: subject.color
                }} />
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{subject.name}</span>
              </div>
              <span style={{
                background: subject.color + '20',
                color: subject.color,
                padding: '4px 10px',
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 600
              }}>
                {subject.progress}%
              </span>
            </div>
            
            <div style={{
              height: 6,
              background: 'var(--border-color)',
              borderRadius: 3,
              overflow: 'hidden',
              marginBottom: 10
            }}>
              <div style={{
                height: '100%',
                width: `${subject.progress}%`,
                background: subject.color,
                borderRadius: 3,
                transition: 'width 0.5s ease'
              }} />
            </div>
            
            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={12} /> {subject.hours}h
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                🔥 {subject.streak} day streak
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectProgress;
