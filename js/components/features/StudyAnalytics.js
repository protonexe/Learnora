import React from 'react';
import { TrendingUp, Clock, Target, Flame, Calendar, BarChart3 } from './Icon';

const StudyAnalytics = ({ sessions, onPeriodChange }) => {
  const [period, setPeriod] = React.useState('week');
  
  const mockData = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [45, 60, 30, 90, 75, 120, 55],
      total: 475,
      avg: 68,
      streak: 5,
      goals: 12
    },
    month: {
      labels: Array.from({ length: 30 }, (_, i) => i + 1),
      data: [45, 60, 30, 90, 75, 120, 55, 40, 85, 70, 95, 50, 65, 80, 45, 60, 30, 90, 75, 120, 55, 40, 85, 70, 95, 50, 65, 80, 45, 60],
      total: 1850,
      avg: 62,
      streak: 12,
      goals: 38
    }
  };
  
  const data = mockData[period];
  const maxValue = Math.max(...data.data);
  
  return (
    <div style={{ padding: 20 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <BarChart3 size={20} /> Study Analytics
        </h3>
        <div style={{ display: 'flex', gap: 4 }}>
          {['week', 'month'].map(p => (
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
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        marginBottom: 24
      }}>
        <div style={{
          background: 'var(--bg)',
          borderRadius: 10,
          padding: 16,
          textAlign: 'center'
        }}>
          <Clock size={24} style={{ color: 'var(--primary)', marginBottom: 8 }} />
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{data.total}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>minutes</div>
        </div>
        <div style={{
          background: 'var(--bg)',
          borderRadius: 10,
          padding: 16,
          textAlign: 'center'
        }}>
          <TrendingUp size={24} style={{ color: '#10b981', marginBottom: 8 }} />
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{data.avg}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>avg/day</div>
        </div>
        <div style={{
          background: 'var(--bg)',
          borderRadius: 10,
          padding: 16,
          textAlign: 'center'
        }}>
          <Flame size={24} style={{ color: '#f59e0b', marginBottom: 8 }} />
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{data.streak}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>day streak</div>
        </div>
        <div style={{
          background: 'var(--bg)',
          borderRadius: 10,
          padding: 16,
          textAlign: 'center'
        }}>
          <Target size={24} style={{ color: '#8b5cf6', marginBottom: 8 }} />
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{data.goals}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>goals hit</div>
        </div>
      </div>
      
      <div style={{
        background: 'var(--bg)',
        borderRadius: 12,
        padding: 20,
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ height: 150, display: 'flex', alignItems: 'flex-end', gap: 4 }}>
          {data.data.map((value, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: value === maxValue ? 'var(--primary)' : 'var(--primary)',
                opacity: value === maxValue ? 1 : 0.4,
                borderRadius: 4,
                height: `${(value / maxValue) * 100}%`,
                minHeight: 4,
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              {period === 'week' && (
                <div style={{
                  position: 'absolute',
                  bottom: -20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: 10,
                  color: 'var(--text-secondary)'
                }}>
                  {data.labels[i]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div style={{
        marginTop: 24,
        padding: 16,
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        borderRadius: 12,
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Weekly Goal Progress</div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>Keep up the great work!</div>
        </div>
        <div style={{ fontSize: 32, fontWeight: 700 }}>75%</div>
      </div>
    </div>
  );
};

export default StudyAnalytics;
