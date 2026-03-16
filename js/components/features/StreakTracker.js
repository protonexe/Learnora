import React from 'react';
import { X, Plus, Minus, RotateCcw, Share2, Trash2, GripVertical, Check, Edit2, Copy, Download, MoreHorizontal, Clock, Target, Flame, Zap, Trophy, Star } from './Icon';

const StreakTracker = ({ onClose }) => {
  const [streak, setStreak] = React.useState({
    current: 15,
    longest: 28,
    totalDays: 156,
    todayProgress: 75,
    weeklyProgress: [true, true, true, true, true, false, false]
  });
  
  const milestones = [
    { days: 7, achieved: true, reward: '🔥 Week Warrior Badge' },
    { days: 14, achieved: true, reward: '⭐ 2 Week Streak' },
    { days: 30, achieved: false, reward: '👑 Monthly Master Badge' },
    { days: 100, achieved: false, reward: '🏆 Legend Status' },
  ];
  
  const getStreakMessage = (streak) => {
    if (streak >= 30) return "You're on fire! 🔥";
    if (streak >= 14) return 'Incredible dedication! 💪';
    if (streak >= 7) return 'Great momentum! 🚀';
    if (streak >= 1) return 'Keep it going! 💫';
    return 'Start your streak today! 🌟';
  };
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 24,
      width: 380
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          🔥 Streak Tracker
        </h3>
        <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>
      
      <div style={{ background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)', borderRadius: 16, padding: 24, color: 'white', textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 48, fontWeight: 700, marginBottom: 4 }}>{streak.current}</div>
        <div style={{ fontSize: 16, marginBottom: 8 }}>Day Streak 🔥</div>
        <div style={{ opacity: 0.9, fontSize: 14 }}>{getStreakMessage(streak.current)}</div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{streak.longest}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Longest Streak</div>
        </div>
        <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{streak.totalDays}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Total Days</div>
        </div>
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>This Week</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: streak.weeklyProgress[i] ? 'var(--primary)' : 'var(--bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 4,
                fontSize: 16
              }}>
                {streak.weeklyProgress[i] ? '✓' : ''}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{day.slice(0, 1)}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Milestones</h4>
        {milestones.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: m.achieved ? 'var(--primary)' + '15' : 'var(--bg)', borderRadius: 10, marginBottom: 8, border: m.achieved ? '1px solid var(--primary)' : '1px solid var(--border-color)' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: m.achieved ? '#10b981' : 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14 }}>
              {m.achieved ? '✓' : '🔒'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 13 }}>{m.days} Day Streak</div>
              <div style={{ fontSize: 11, color: m.achieved ? 'var(--primary)' : 'var(--text-secondary)' }}>{m.reward}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakTracker;
