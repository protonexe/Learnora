import React from 'react';
import { Trophy, Star, Flame, BookOpen, Award, Zap, Target, Clock, CheckCircle, Medal, Crown, Gem } from './Icon';

const BADGES = [
  { id: 'first_lesson', name: 'First Step', desc: 'Complete your first lesson', icon: '🌟', condition: (stats) => stats.lessonsCompleted >= 1, color: '#fbbf24' },
  { id: 'ten_lessons', name: 'Quick Learner', desc: 'Complete 10 lessons', icon: '📚', condition: (stats) => stats.lessonsCompleted >= 10, color: '#3b82f6' },
  { id: 'fifty_lessons', name: 'Knowledge Seeker', desc: 'Complete 50 lessons', icon: '🧠', condition: (stats) => stats.lessonsCompleted >= 50, color: '#8b5cf6' },
  { id: 'first_quiz', name: 'Quiz Taker', desc: 'Complete your first quiz', icon: '✍️', condition: (stats) => stats.quizzesTaken >= 1, color: '#10b981' },
  { id: 'perfect_quiz', name: 'Perfect Score', desc: 'Get 100% on a quiz', icon: '💯', condition: (stats) => stats.perfectQuizzes >= 1, color: '#f59e0b' },
  { id: 'streak_7', name: 'Week Warrior', desc: '7 day study streak', icon: '🔥', condition: (stats) => stats.streak >= 7, color: '#ef4444' },
  { id: 'streak_30', name: 'Monthly Master', desc: '30 day study streak', icon: '👑', condition: (stats) => stats.streak >= 30, color: '#ec4899' },
  { id: 'first_book', name: 'Bookworm', desc: 'Read your first eBook', icon: '📖', condition: (stats) => stats.booksRead >= 1, color: '#14b8a6' },
  { id: 'ten_books', name: 'Bibliophile', desc: 'Read 10 eBooks', icon: '📚', condition: (stats) => stats.booksRead >= 10, color: '#6366f1' },
  { id: 'first_flashcard', name: 'Flashcard Fan', desc: 'Create your first flashcard deck', icon: '🗂️', condition: (stats) => stats.decksCreated >= 1, color: '#f97316' },
  { id: 'study_10h', name: 'Dedicated Student', desc: 'Study for 10 hours', icon: '⏰', condition: (stats) => stats.totalHours >= 10, color: '#06b6d4' },
  { id: 'study_50h', name: 'Scholar', desc: 'Study for 50 hours', icon: '🎓', condition: (stats) => stats.totalHours >= 50, color: '#84cc16' },
  { id: 'early_bird', name: 'Early Bird', desc: 'Study before 7 AM', icon: '🌅', condition: (stats) => stats.earlyBird, color: '#fb923c' },
  { id: 'night_owl', name: 'Night Owl', desc: 'Study after 10 PM', icon: '🦉', condition: (stats) => stats.nightOwl, color: '#7c3aed' },
  { id: 'notes_creator', name: 'Note Taker', desc: 'Create 10 notes', icon: '📝', condition: (stats) => stats.notesCreated >= 10, color: '#0ea5e9' },
  { id: 'goal_setter', name: 'Goal Getter', desc: 'Set your first learning goal', icon: '🎯', condition: (stats) => stats.goalsSet >= 1, color: '#ec4899' },
  { id: 'goal_achiever', name: 'Achiever', desc: 'Complete a learning goal', icon: '🏆', condition: (stats) => stats.goalsCompleted >= 1, color: '#fbbf24' },
  { id: 'perfectionist', name: 'Perfectionist', desc: 'Complete all daily goals', icon: '✨', condition: (stats) => stats.dailyGoalsCompleted >= 1, color: '#a855f7' },
];

const AchievementBadges = ({ stats, onBadgeClick }) => {
  const earnedBadges = BADGES.filter(badge => badge.condition(stats));
  const unearnedBadges = BADGES.filter(badge => !badge.condition(stats));
  
  return (
    <div style={{ padding: 20 }}>
      <div style={{
        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        color: 'white',
        textAlign: 'center'
      }}>
        <Trophy size={48} style={{ marginBottom: 12 }} />
        <div style={{ fontSize: 36, fontWeight: 700 }}>{earnedBadges.length}</div>
        <div style={{ opacity: 0.9 }}>Badges Earned</div>
        <div style={{ 
          marginTop: 16, 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 4,
          flexWrap: 'wrap' 
        }}>
          {earnedBadges.slice(0, 8).map(badge => (
            <span key={badge.id} style={{ fontSize: 24 }}>{badge.icon}</span>
          ))}
        </div>
      </div>
      
      <h3 style={{ color: 'var(--text-primary)', marginBottom: 16 }}>Earned Badges ({earnedBadges.length})</h3>
      {earnedBadges.length === 0 ? (
        <div style={{
          background: 'var(--bg)',
          borderRadius: 12,
          padding: 40,
          textAlign: 'center',
          color: 'var(--text-secondary)',
          border: '1px dashed var(--border-color)'
        }}>
          Start learning to earn badges!
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 12,
          marginBottom: 24
        }}>
          {earnedBadges.map(badge => (
            <div
              key={badge.id}
              onClick={() => onBadgeClick?.(badge)}
              style={{
                background: 'var(--card-bg)',
                borderRadius: 12,
                padding: 16,
                textAlign: 'center',
                border: `2px solid ${badge.color}`,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: `0 4px 12px ${badge.color}30`
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 8 }}>{badge.icon}</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{badge.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{badge.desc}</div>
            </div>
          ))}
        </div>
      )}
      
      <h3 style={{ color: 'var(--text-primary)', marginBottom: 16 }}>Locked Badges ({unearnedBadges.length})</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 12
      }}>
        {unearnedBadges.map(badge => (
          <div
            key={badge.id}
            style={{
              background: 'var(--bg)',
              borderRadius: 12,
              padding: 16,
              textAlign: 'center',
              border: '1px solid var(--border-color)',
              opacity: 0.5
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 8, filter: 'grayscale(1)' }}>🔒</div>
            <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: 13 }}>{badge.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{badge.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BadgeNotification = ({ badge, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 20,
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      border: `2px solid ${badge.color}`,
      zIndex: 1000,
      animation: 'slideIn 0.3s ease-out',
      minWidth: 280
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }}>
        <div style={{
          fontSize: 48,
          animation: 'bounce 0.5s ease-out'
        }}>
          {badge.icon}
        </div>
        <div>
          <div style={{ 
            color: badge.color, 
            fontWeight: 700, 
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 1
          }}>
            Badge Unlocked!
          </div>
          <div style={{ 
            color: 'var(--text-primary)', 
            fontWeight: 600,
            fontSize: 16
          }}>
            {badge.name}
          </div>
          <div style={{ 
            color: 'var(--text-secondary)', 
            fontSize: 12 
          }}>
            {badge.desc}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export { AchievementBadges, BadgeNotification, BADGES };
