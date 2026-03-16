const ProgressTimeline = ({ onClose }) => {
  const [milestones, setMilestones] = React.useState([
    { id: 1, title: 'Started Learning', date: '2026-01-15', completed: true, icon: '🚀' },
    { id: 2, title: 'First Quiz Completed', date: '2026-01-20', completed: true, icon: '✅' },
    { id: 3, title: '7-Day Streak', date: '2026-01-28', completed: true, icon: '🔥' },
    { id: 4, title: 'First Course Completed', date: '2026-02-10', completed: true, icon: '📚' },
    { id: 5, title: '30-Day Streak', date: '2026-02-15', completed: true, icon: '⚡' },
    { id: 6, title: '10 Courses Completed', date: '2026-03-01', completed: false, icon: '🎯' },
    { id: 7, title: '100-Hour Milestone', date: '2026-03-20', completed: false, icon: '💯' },
    { id: 8, title: 'Expert Level Achieved', date: '2026-04-01', completed: false, icon: '👑' },
  ]);

  const [achievements, setAchievements] = React.useState([
    { id: 1, title: 'Quick Learner', description: 'Complete 5 courses', progress: 60, icon: '⚡' },
    { id: 2, title: 'Quiz Master', description: 'Score 100% on 10 quizzes', progress: 40, icon: '🧠' },
    { id: 3, title: 'Streak Champion', description: 'Maintain 30-day streak', progress: 100, icon: '🔥' },
    { id: 4, title: 'Night Owl', description: 'Study after midnight 5 times', progress: 80, icon: '🦉' },
  ]);

  const completedCount = milestones.filter(m => m.completed).length;
  const totalCount = milestones.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 1000,
      overflow: 'auto',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer'
          }}>
            ← Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>📈 Progress Timeline</h2>
        </div>
        <span style={{
          padding: '6px 12px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 20,
          color: 'white',
          fontSize: 14,
          fontWeight: 600
        }}>
          {completedCount}/{totalCount} Milestones
        </span>
      </div>

      <div style={{ padding: 20, maxWidth: 700, margin: '0 auto' }}>
        {/* Overall Progress */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 600 }}>Overall Progress</span>
            <span style={{ fontSize: 14, color: 'var(--primary)', fontWeight: 600 }}>{progressPercent}%</span>
          </div>
          <div style={{ height: 12, background: 'var(--bg)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: progressPercent + '%', background: 'linear-gradient(90deg, #8b5cf6, #a855f7)', transition: 'width 0.5s ease' }} />
          </div>
        </div>

        {/* Timeline */}
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--text-secondary)' }}>Milestones</h3>
        <div style={{ position: 'relative', marginBottom: 32 }}>
          {/* Line */}
          <div style={{
            position: 'absolute',
            left: 20,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'var(--border-color)'
          }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {milestones.map((milestone, idx) => (
              <div
                key={milestone.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  position: 'relative'
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: milestone.completed ? '#10b981' : 'var(--bg-secondary)',
                  border: milestone.completed ? 'none' : '2px dashed var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  zIndex: 1
                }}>
                  {milestone.completed ? '✓' : milestone.icon}
                </div>
                
                {/* Content */}
                <div style={{
                  flex: 1,
                  background: milestone.completed ? 'var(--bg-secondary)' : 'var(--bg)',
                  borderRadius: 8,
                  padding: 12,
                  border: '1px solid ' + (milestone.completed ? '#10b981' : 'var(--border-color)')
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: 14, color: milestone.completed ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {milestone.title}
                    </h4>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{milestone.date}</span>
                  </div>
                  {!milestone.completed && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ height: 4, background: 'var(--bg-secondary)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: Math.random() * 30 + '%', background: 'var(--primary)' }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Progress */}
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--text-secondary)' }}>Achievements In Progress</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 12,
                padding: 16,
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: achievement.progress === 100 ? '#fbbf24' : 'var(--primary)' + '20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20
                }}>
                  {achievement.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: 14, color: 'var(--text-primary)' }}>{achievement.title}</h4>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--text-secondary)' }}>{achievement.description}</p>
                </div>
                <span style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: achievement.progress === 100 ? '#fbbf24' : 'var(--primary)'
                }}>
                  {achievement.progress}%
                </span>
              </div>
              <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: achievement.progress + '%',
                  background: achievement.progress === 100 ? '#fbbf24' : 'var(--primary)',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
