import React from 'react';
import { Target, Trophy, Flame, Clock, Zap, Star, Crown, Medal, Gem, Award, TrendingUp, Calendar, BookOpen, Users, MessageSquare, Video, FileText } from './Icon';

const GamificationHub = ({ onClose }) => {
  const [activeTab, setActiveTab] = React.useState('overview');
  
  const userStats = {
    level: 12,
    xp: 3450,
    xpToNext: 5000,
    rank: 42,
    streak: 15,
    totalStreak: 28,
    badges: 24,
    completedCourses: 8,
    studyHours: 156,
    points: 12450
  };
  
  const leaderboard = [
    { id: 1, name: 'Alex Chen', avatar: 'A', xp: 8920, rank: 1, streak: 45 },
    { id: 2, name: 'Sarah Kim', avatar: 'S', xp: 7845, rank: 2, streak: 32 },
    { id: 3, name: 'Mike Johnson', avatar: 'M', xp: 6530, rank: 3, streak: 28 },
    { id: 4, name: 'Emma Wilson', avatar: 'E', xp: 5890, rank: 4, streak: 21 },
    { id: 5, name: 'You', avatar: 'Y', xp: 3450, rank: 42, streak: 15, isUser: true },
    { id: 6, name: 'David Lee', avatar: 'D', xp: 2890, rank: 56, streak: 12 },
  ];
  
  const achievements = [
    { id: 1, name: 'Early Bird', desc: 'Study before 7 AM', icon: '🌅', progress: 80, max: 100, color: '#f59e0b' },
    { id: 2, name: 'Night Owl', desc: 'Study after 10 PM', icon: '🦉', progress: 45, max: 100, color: '#8b5cf6' },
    { id: 3, name: 'Social Learner', desc: 'Join 5 study groups', icon: '👥', progress: 3, max: 5, color: '#3b82f6' },
    { id: 4, name: 'Quiz Master', desc: 'Complete 50 quizzes', icon: '🏆', progress: 32, max: 50, color: '#10b981' },
    { id: 5, name: 'Bookworm', desc: 'Read 10 eBooks', icon: '📚', progress: 7, max: 10, color: '#ec4899' },
  ];
  
  const missions = [
    { id: 1, title: 'Daily Study Goal', desc: 'Study for 30 minutes today', xp: 50, completed: true },
    { id: 2, title: 'Complete a Quiz', desc: 'Finish any quiz today', xp: 30, completed: false },
    { id: 3, title: 'Study Streak', desc: 'Maintain a 7-day streak', xp: 100, completed: false, progress: 15 },
    { id: 4, title: 'Social Butterfly', desc: 'Help 3 other students', xp: 75, completed: false },
  ];
  
  const xpProgress = (userStats.xp / userStats.xpToNext) * 100;
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 500,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: 20,
        background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
        color: 'white'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Trophy size={20} /> Gamification Hub
          </h3>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '6px 12px',
            borderRadius: 20,
            fontSize: 13
          }}>
            🏆 Rank #{userStats.rank}
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 16
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 700,
            color: '#8b5cf6'
          }}>
            L{userStats.level}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>Level {userStats.level}</div>
            <div style={{
              height: 8,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 4,
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${xpProgress}%`,
                background: 'white',
                borderRadius: 4
              }} />
            </div>
            <div style={{ fontSize: 11, marginTop: 4, opacity: 0.8 }}>
              {userStats.xp} / {userStats.xpToNext} XP
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{userStats.points}</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Points</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            🔥 {userStats.streak} day streak
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            📚 {userStats.completedCourses} courses
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            ⏱ {userStats.studyHours}h studied
          </div>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)'
      }}>
        {['overview', 'leaderboard', 'achievements', 'missions'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '12px 8px',
              border: 'none',
              background: activeTab === tab ? 'var(--primary)' : 'transparent',
              color: activeTab === tab ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 12,
              textTransform: 'capitalize'
            }}
          >
            {tab === 'overview' ? '📊' : tab === 'leaderboard' ? '🏆' : tab === 'achievements' ? '🎯' : '📝'} {tab}
          </button>
        ))}
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>🔥</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{userStats.streak}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Current Streak</div>
            </div>
            <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>⭐</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{userStats.badges}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Badges Earned</div>
            </div>
            <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>📚</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{userStats.completedCourses}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Courses Done</div>
            </div>
            <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>⏱</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{userStats.studyHours}h</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Study Time</div>
            </div>
          </div>
        )}
        
        {activeTab === 'leaderboard' && (
          <div>
            {leaderboard.map((user, i) => (
              <div
                key={user.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 12,
                  background: user.isUser ? 'var(--primary)' + '20' : 'var(--bg)',
                  borderRadius: 10,
                  marginBottom: 8,
                  border: user.isUser ? '1px solid var(--primary)' : '1px solid transparent'
                }}
              >
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: user.rank <= 3 ? ['#fbbf24', '#94a3b8', '#d97706'][user.rank - 1] : 'var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 14,
                  color: user.rank <= 3 ? 'white' : 'var(--text-secondary)'
                }}>
                  {user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : user.rank}
                </div>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: user.isUser ? 'var(--primary)' : '#8b5cf6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 600
                }}>
                  {user.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {user.name} {user.isUser && '(You)'}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    🔥 {user.streak} day streak
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.xp.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>XP</div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'achievements' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {achievements.map(ach => (
              <div
                key={ach.id}
                style={{
                  background: 'var(--bg)',
                  borderRadius: 12,
                  padding: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}
              >
                <div style={{ fontSize: 32 }}>{ach.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                    {ach.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    {ach.desc}
                  </div>
                  <div style={{
                    height: 4,
                    background: 'var(--border-color)',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(ach.progress / ach.max) * 100}%`,
                      background: ach.color,
                      borderRadius: 2
                    }} />
                  </div>
                </div>
                <div style={{
                  background: ach.color + '20',
                  color: ach.color,
                  padding: '6px 10px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600
                }}>
                  {ach.progress}/{ach.max}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'missions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {missions.map(mission => (
              <div
                key={mission.id}
                style={{
                  background: mission.completed ? '#10b98120' : 'var(--bg)',
                  borderRadius: 12,
                  padding: 14,
                  border: `1px solid ${mission.completed ? '#10b981' : 'var(--border-color)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}
              >
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: mission.completed ? '#10b981' : 'var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 12
                }}>
                  {mission.completed ? '✓' : mission.progress || 0}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    textDecoration: mission.completed ? 'line-through' : 'none'
                  }}>
                    {mission.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {mission.desc}
                  </div>
                </div>
                <div style={{
                  background: mission.completed ? '#10b981' : '#f59e0b',
                  color: 'white',
                  padding: '6px 10px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600
                }}>
                  +{mission.xp} XP
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamificationHub;
