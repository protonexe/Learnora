import React from 'react';
import { X, ChevronRight, Search, Filter, Star, Clock, Users, BookOpen, Award, Check } from './Icon';

const LeaderboardWidget = ({ onClose }) => {
  const [period, setPeriod] = React.useState('weekly');
  const [category, setCategory] = React.useState('all');
  
  const leaders = [
    { rank: 1, name: 'Alex Chen', avatar: 'A', xp: 2450, streak: 45, badges: 24, change: 'up' },
    { rank: 2, name: 'Sarah Kim', avatar: 'S', xp: 2180, streak: 32, badges: 20, change: 'up' },
    { rank: 3, name: 'Mike Johnson', avatar: 'M', xp: 1920, streak: 28, badges: 18, change: 'down' },
    { rank: 4, name: 'Emma Wilson', avatar: 'E', xp: 1750, streak: 21, badges: 16, change: 'same' },
    { rank: 5, name: 'You', avatar: 'Y', xp: 1580, streak: 15, badges: 12, change: 'up', isUser: true },
  ];
  
  return (
    <div style={{ background: 'var(--card-bg)', borderRadius: 16, width: 380, overflow: 'hidden' }}>
      <div style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', padding: 24, color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>🏆 Leaderboard</h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['weekly', 'monthly', 'allTime'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: 'none', background: period === p ? 'white' : 'rgba(255,255,255,0.2)', color: period === p ? '#f59e0b' : 'white', cursor: 'pointer', textTransform: 'capitalize', fontSize: 12 }}>
              {p === 'allTime' ? 'All Time' : p}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ padding: 16 }}>
        {leaders.map(leader => (
          <div key={leader.rank} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: leader.isUser ? 'var(--primary)' + '15' : 'var(--bg)', borderRadius: 10, marginBottom: 8, border: leader.isUser ? '1px solid var(--primary)' : '1px solid transparent' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: leader.rank <= 3 ? ['#fbbf24', '#94a3b8', '#d97706'][leader.rank - 1] : 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: leader.rank <= 3 ? 'white' : 'var(--text-secondary)' }}>
              {leader.rank <= 3 ? ['🥇', '🥈', '🥉'][leader.rank - 1] : leader.rank}
            </div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: leader.isUser ? 'var(--primary)' : '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>
              {leader.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{leader.name} {leader.isUser && '(You)'}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>🔥 {leader.streak} day streak</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{leader.xp.toLocaleString()} XP</div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{leader.badges} badges</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardWidget;
