const AnalyticsWidget = ({ title, data, type = 'bar' }) => {
  const isMobile = window.innerWidth <= 768;
  const maxValue = Math.max(...(data?.map(d => d.value) || [0]), 1);

  const renderBar = (item, idx) => (
    <div key={idx} style={{ marginBottom: '8px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '4px'
      }}>
        <span style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)' }}>
          {item.label}
        </span>
        <span style={{ fontSize: isMobile ? '11px' : '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
          {item.value}{item.suffix || ''}
        </span>
      </div>
      <div style={{
        height: isMobile ? '6px' : '8px',
        background: 'var(--bg-tertiary)',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${(item.value / maxValue) * 100}%`,
          background: item.color || 'var(--primary-500)',
          borderRadius: '4px',
          transition: 'width 0.5s ease'
        }} />
      </div>
    </div>
  );

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      padding: isMobile ? '14px' : '18px'
    }}>
      <h3 style={{
        fontSize: isMobile ? '14px' : '16px',
        fontWeight: '700',
        margin: `0 0 ${isMobile ? '12px' : '16px'} 0`,
        color: 'var(--text-primary)'
      }}>
        {title}
      </h3>
      {type === 'bar' && data?.map(renderBar)}
    </div>
  );
};

const WeeklyProgressWidget = () => {
  const isMobile = window.innerWidth <= 768;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  const data = [
    { value: 85, label: 'Mon' },
    { value: 70, label: 'Tue' },
    { value: 90, label: 'Wed' },
    { value: 60, label: 'Thu' },
    { value: 95, label: 'Fri' },
    { value: 45, label: 'Sat' },
    { value: 30, label: 'Sun' },
  ];

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      padding: isMobile ? '14px' : '18px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: isMobile ? '12px' : '16px'
      }}>
        <h3 style={{
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '700',
          margin: 0,
          color: 'var(--text-primary)'
        }}>
          Weekly Progress
        </h3>
        <span style={{
          fontSize: isMobile ? '11px' : '12px',
          color: 'var(--text-tertiary)'
        }}>
          This Week
        </span>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: isMobile ? '80px' : '100px'
      }}>
        {data.map((day, idx) => {
          const isToday = idx === (today === 0 ? 6 : today - 1);
          return (
            <div key={idx} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              flex: 1
            }}>
              <div style={{
                width: isMobile ? '20px' : '24px',
                height: isMobile ? `${day.value * 0.7}px` : `${day.value}px`,
                background: isToday ? 'var(--gradient-primary)' : 'var(--bg-tertiary)',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }} />
              <span style={{
                fontSize: isMobile ? '9px' : '10px',
                color: isToday ? 'var(--primary-500)' : 'var(--text-tertiary)',
                fontWeight: isToday ? '700' : '400'
              }}>
                {day.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StudyTimeWidget = () => {
  const isMobile = window.innerWidth <= 768;
  
  return (
    <div style={{
      background: 'var(--gradient-primary)',
      borderRadius: 'var(--radius-xl)',
      padding: isMobile ? '14px' : '18px',
      color: '#fff'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: isMobile ? '12px' : '16px'
      }}>
        <div>
          <p style={{
            fontSize: isMobile ? '11px' : '12px',
            opacity: 0.9,
            margin: '0 0 4px 0'
          }}>
            Total Study Time
          </p>
          <p style={{
            fontSize: isMobile ? '24px' : '28px',
            fontWeight: '800',
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            24.5 hrs
          </p>
        </div>
        <div style={{
          width: isMobile ? '36px' : '44px',
          height: isMobile ? '36px' : '44px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon name="clock" size={isMobile ? 18 : 20} color="#fff" />
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: isMobile ? '8px' : '12px'
      }}>
        {[
          { label: 'Today', value: '1.5h' },
          { label: 'Week', value: '8.2h' },
          { label: 'Month', value: '24.5h' }
        ].map((stat, idx) => (
          <div key={idx} style={{
            flex: 1,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 'var(--radius-md)',
            padding: isMobile ? '8px' : '10px',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: isMobile ? '9px' : '10px',
              opacity: 0.8,
              margin: '0 0 2px 0'
            }}>
              {stat.label}
            </p>
            <p style={{
              fontSize: isMobile ? '13px' : '14px',
              fontWeight: '700',
              margin: 0
            }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsProgressWidget = () => {
  const isMobile = window.innerWidth <= 768;
  const skills = [
    { name: 'Mathematics', level: 85, color: '#6366f1' },
    { name: 'Physics', level: 72, color: '#10b981' },
    { name: 'Chemistry', level: 60, color: '#f59e0b' },
    { name: 'Biology', level: 45, color: '#8b5cf6' },
  ];

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      padding: isMobile ? '14px' : '18px'
    }}>
      <h3 style={{
        fontSize: isMobile ? '14px' : '16px',
        fontWeight: '700',
        margin: `0 0 ${isMobile ? '12px' : '16px'} 0`,
        color: 'var(--text-primary)'
      }}>
        Skills Progress
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {skills.map((skill, idx) => (
          <div key={idx}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '6px'
            }}>
              <span style={{
                fontSize: isMobile ? '12px' : '13px',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                {skill.name}
              </span>
              <span style={{
                fontSize: isMobile ? '11px' : '12px',
                color: skill.color,
                fontWeight: '600'
              }}>
                {skill.level}%
              </span>
            </div>
            <div style={{
              height: isMobile ? '6px' : '8px',
              background: 'var(--bg-tertiary)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${skill.level}%`,
                background: skill.color,
                borderRadius: '4px',
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GoalsWidget = () => {
  const isMobile = window.innerWidth <= 768;
  const goals = [
    { title: 'Complete 5 courses', current: 3, target: 5, color: '#6366f1' },
    { title: 'Study 50 hours', current: 24.5, target: 50, color: '#10b981' },
    { title: 'Pass 10 quizzes', current: 7, target: 10, color: '#f59e0b' },
  ];

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      padding: isMobile ? '14px' : '18px'
    }}>
      <h3 style={{
        fontSize: isMobile ? '14px' : '16px',
        fontWeight: '700',
        margin: `0 0 ${isMobile ? '12px' : '16px'} 0`,
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ fontSize: '18px' }}>🎯</span>
        Goals
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {goals.map((goal, idx) => (
          <div key={idx}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px'
            }}>
              <span style={{
                fontSize: isMobile ? '12px' : '13px',
                color: 'var(--text-primary)',
                fontWeight: '500'
              }}>
                {goal.title}
              </span>
              <span style={{
                fontSize: isMobile ? '11px' : '12px',
                color: 'var(--text-tertiary)'
              }}>
                {goal.current}/{goal.target}
              </span>
            </div>
            <div style={{
              height: isMobile ? '6px' : '8px',
              background: 'var(--bg-tertiary)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${(goal.current / goal.target) * 100}%`,
                background: goal.color,
                borderRadius: '4px',
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.AnalyticsWidget = AnalyticsWidget;
window.WeeklyProgressWidget = WeeklyProgressWidget;
window.StudyTimeWidget = StudyTimeWidget;
window.SkillsProgressWidget = SkillsProgressWidget;
window.GoalsWidget = GoalsWidget;
