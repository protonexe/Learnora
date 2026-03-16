import React from 'react';
import { X, Check, Clock, Calendar, Target, Award, Flame, Zap, Star, ChevronRight, RefreshCw } from './Icon';

const DailyChallenge = ({ onClose }) => {
  const [completed, setCompleted] = React.useState(false);
  const [progress, setProgress] = React.useState(65);
  
  const challenges = [
    { id: 1, title: 'Complete 2 lessons', xp: 50, completed: true },
    { id: 2, title: 'Study for 30 minutes', xp: 30, completed: true },
    { id: 3, title: 'Take a quiz', xp: 40, completed: false },
    { id: 4, title: 'Review flashcards', xp: 20, completed: false },
    { id: 5, title: 'Earn 100 XP', xp: 50, completed: false },
  ];
  
  const completedCount = challenges.filter(c => c.completed).length;
  const totalXP = challenges.reduce((sum, c) => c.completed ? sum + c.xp : sum, 0);
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 380,
      overflow: 'hidden'
    }}>
      <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', padding: 24, color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🎯</div>
        <h3 style={{ margin: 0, fontSize: 20, marginBottom: 4 }}>Daily Challenge</h3>
        <div style={{ opacity: 0.9, fontSize: 14 }}>Complete all challenges to earn bonus XP!</div>
        
        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{completedCount}/{challenges.length}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Completed</div>
          </div>
          <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.3)' }} />
          <div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>+{totalXP}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>XP Earned</div>
          </div>
        </div>
      </div>
      
      <div style={{ padding: 20 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Daily Progress</span>
            <span style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 600 }}>{progress}%</span>
          </div>
          <div style={{ height: 8, background: 'var(--bg)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: progress === 100 ? '#10b981' : 'var(--primary)', borderRadius: 4, transition: 'width 0.3s' }} />
          </div>
        </div>
        
        {progress === 100 && (
          <div style={{ background: '#10b98120', borderRadius: 10, padding: 16, textAlign: 'center', marginBottom: 16, border: '1px solid #10b981' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
            <div style={{ fontWeight: 600, color: '#10b981', marginBottom: 4 }}>All Challenges Completed!</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Come back tomorrow for more!</div>
          </div>
        )}
        
        {challenges.map(challenge => (
          <div key={challenge.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg)', borderRadius: 10, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: challenge.completed ? '#10b981' : 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14 }}>
              {challenge.completed ? '✓' : challenge.id}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)', textDecoration: challenge.completed ? 'line-through' : 'none' }}>{challenge.title}</div>
            </div>
            <div style={{ background: challenge.completed ? '#10b98120' : 'var(--primary)', color: challenge.completed ? '#10b981' : 'var(--primary)', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
              +{challenge.xp} XP
            </div>
          </div>
        ))}
        
        <button style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <RefreshCw size={16} /> Refresh Challenges
        </button>
      </div>
    </div>
  );
};

export default DailyChallenge;
