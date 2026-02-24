const ParentPortal = ({ onLogout, showToast }) => {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [selectedChild, setSelectedChild] = React.useState(0);
  const { theme } = useTheme();
  const isMobile = window.innerWidth <= 768;

  const children = [
    { 
      id: 1, 
      name: 'Emma Wilson', 
      grade: '10th Grade', 
      avatar: 'EW',
      gpa: 3.8,
      attendance: 96,
      activeAssignments: 3,
      recentScore: 92
    },
    { 
      id: 2, 
      name: 'Lucas Wilson', 
      grade: '8th Grade', 
      avatar: 'LW',
      gpa: 3.5,
      attendance: 94,
      activeAssignments: 2,
      recentScore: 85
    },
  ];

  const childStats = [
    { label: 'GPA', value: children[selectedChild].gpa, icon: 'award', color: '#f43f5e', change: 'Current' },
    { label: 'Attendance', value: `${children[selectedChild].attendance}%`, icon: 'calendar', color: '#14b8a6', change: 'This month' },
    { label: 'Pending Work', value: children[selectedChild].activeAssignments, icon: 'file-text', color: '#0ea5e9', change: 'Due soon' },
    { label: 'Latest Score', value: `${children[selectedChild].recentScore}%`, icon: 'trending-up', color: '#10b981', change: 'Last test' },
  ];

  const courseProgress = [
    { name: 'Mathematics', progress: 78, teacher: 'Mr. Johnson' },
    { name: 'English', progress: 85, teacher: 'Ms. Smith' },
    { name: 'Science', progress: 72, teacher: 'Dr. Lee' },
    { name: 'History', progress: 88, teacher: 'Mr. Brown' },
  ];

  const recentActivity = [
    { date: 'Today', time: '2:30 PM', activity: 'Completed Math Quiz', score: '92%', icon: 'check-circle', color: '#10b981' },
    { date: 'Yesterday', time: '4:15 PM', activity: 'Submitted Science Project', score: 'Pending', icon: 'upload-cloud', color: '#f59e0b' },
    { date: 'Mar 28', time: '10:45 AM', activity: 'Attended Physics Class', score: 'Present', icon: 'calendar', color: '#14b8a6' },
    { date: 'Mar 27', time: '3:20 PM', activity: 'Completed English Essay', score: '88%', icon: 'file-text', color: '#0ea5e9' },
  ];

  const parentMessages = [
    { id: 1, from: 'Mr. Johnson', subject: 'Great performance in class!', preview: 'Emma has been doing excellent work...', unread: true, date: '2h ago' },
    { id: 2, from: 'Ms. Smith', subject: 'Assignment reminder', preview: 'Just a reminder about the essay due...', unread: false, date: '1 day ago' },
    { id: 3, from: 'Dr. Lee', subject: 'Science Project Updates', preview: 'Lucas submitted a great project...', unread: false, date: '2 days ago' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-primary)', 
      backgroundImage: 'var(--gradient-mesh)',
      paddingBottom: isMobile ? '80px' : '24px'
    }}>
      {/* Header Section */}
      <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: isMobile ? '16px' : '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <h1 style={{ 
              fontSize: isMobile ? '20px' : '26px', 
              fontWeight: '700', 
              marginBottom: '4px',
              letterSpacing: '-0.02em'
            }}>
              👨‍👩‍👧 Parent Portal
            </h1>
            <p style={{ fontSize: isMobile ? '12px' : '14px', color: 'var(--text-secondary)' }}>
              Track your children's progress
            </p>
          </div>
          <button 
            onClick={onLogout}
            style={{
              padding: isMobile ? '6px 12px' : '8px 16px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            Logout
          </button>
        </div>

        {/* Children Selection */}
        <div style={{ 
          display: 'flex',
          gap: isMobile ? '6px' : '10px',
          marginBottom: isMobile ? '16px' : '24px',
          overflowX: 'auto',
          paddingBottom: '6px'
        }}>
          {children.map((child, idx) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(idx)}
              style={{
                padding: isMobile ? '8px 12px' : '10px 16px',
                background: selectedChild === idx ? 'var(--primary-500)' : 'var(--glass-bg)',
                color: selectedChild === idx ? 'var(--bg-primary)' : 'var(--text-primary)',
                border: `1px solid ${selectedChild === idx ? 'var(--primary-500)' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: isMobile ? '12px' : '13px',
                fontWeight: '600',
                transition: 'all var(--transition-fast)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '4px' : '6px',
                whiteSpace: 'nowrap'
              }}
            >
              <Avatar name={child.avatar} size={isMobile ? 'xxs' : 'xs'} />
              <span style={{ display: isMobile ? 'none' : 'inline' }}>{child.name}</span>
              <span style={{ display: isMobile ? 'inline' : 'none' }}>{child.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: isMobile ? '8px' : '12px',
          marginBottom: isMobile ? '16px' : '24px'
        }}>
          {childStats.map((stat, idx) => (
            <AnimatedCard key={idx} delay={idx * 50} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '12px' : '16px',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: '500' }}>{stat.label}</p>
                  <p style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: '700' }}>{stat.value}</p>
                </div>
                <div style={{
                  width: isMobile ? '32px' : '44px',
                  height: isMobile ? '32px' : '44px',
                  borderRadius: 'var(--radius-md)',
                  background: stat.color + '20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon name={stat.icon} size={isMobile ? 16 : 20} color={stat.color} />
                </div>
              </div>
              <p style={{ fontSize: isMobile ? '10px' : '12px', color: stat.color, marginTop: isMobile ? '8px' : '12px', fontWeight: '600' }}>
                {stat.change}
              </p>
            </AnimatedCard>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: isMobile ? '4px' : '8px', 
          marginBottom: isMobile ? '16px' : '24px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0',
          overflowX: 'auto',
          paddingRight: '4px'
        }}>
          {['dashboard', 'courses', 'activity', 'messages'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: isMobile ? '8px 12px' : '12px 20px',
                background: activeTab === tab ? 'var(--primary-500)' : 'transparent',
                color: activeTab === tab ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: `2px solid ${activeTab === tab ? 'var(--primary-500)' : 'var(--border-strong)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: '600',
                transition: 'all var(--transition-fast)',
                textTransform: 'capitalize',
                whiteSpace: 'nowrap'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', gap: isMobile ? '12px' : '24px' }}>
            {/* Course Progress */}
            <AnimatedCard delay={100} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '16px' : '24px',
              backdropFilter: 'blur(12px)',
            }}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '16px' : '20px' }}>Course Progress</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '16px' }}>
                {courseProgress.map((course, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <p style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '600' }}>{course.name}</p>
                      <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>{course.progress}%</p>
                    </div>
                    <ProgressBar value={course.progress} size={isMobile ? 'sm' : 'md'} />
                    <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>Teacher: {course.teacher}</p>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Recent Activity */}
            <AnimatedCard delay={150} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '16px' : '24px',
              backdropFilter: 'blur(12px)',
            }}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '12px' : '16px' }}>Recent Activity</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px' }}>
                {recentActivity.slice(0, isMobile ? 3 : 5).map((act, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: isMobile ? '10px' : '12px',
                    padding: isMobile ? '10px' : '12px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <div style={{
                      width: isMobile ? '32px' : '36px',
                      height: isMobile ? '32px' : '36px',
                      borderRadius: '50%',
                      background: act.color + '20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon name={act.icon} size={isMobile ? 14 : 16} color={act.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '600', marginBottom: '2px' }}>{act.activity}</p>
                      <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)' }}>{act.date} at {act.time}</p>
                    </div>
                    <Badge label={act.score} color={act.color} size={isMobile ? 'sm' : 'md'} />
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Messages from Teachers */}
            <AnimatedCard delay={200} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '16px' : '24px',
              backdropFilter: 'blur(12px)',
              gridColumn: 'span 1'
            }}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '12px' : '16px' }}>Teacher Messages</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px' }}>
                {parentMessages.slice(0, isMobile ? 3 : 5).map(msg => (
                  <div key={msg.id} style={{
                    padding: isMobile ? '10px' : '12px',
                    background: msg.unread ? 'var(--primary-100)' : 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: msg.unread ? '3px solid var(--primary-500)' : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <p style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '700' }}>{msg.from}</p>
                      <span style={{ fontSize: isMobile ? '10px' : '11px', color: 'var(--text-secondary)' }}>{msg.date}</span>
                    </div>
                    <p style={{ fontSize: isMobile ? '12px' : '13px', fontWeight: msg.unread ? '600' : '500', marginBottom: '2px' }}>{msg.subject}</p>
                    <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)' }}>{msg.preview}</p>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(12px)',
            padding: isMobile ? '16px' : '24px'
          }}>
            <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '16px' : '20px' }}>All Courses</h3>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: isMobile ? '12px' : '20px'
            }}>
              {courseProgress.map((course, idx) => (
                <AnimatedCard key={idx} delay={idx * 50} style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: isMobile ? '16px' : '20px'
                }}>
                  <div style={{ marginBottom: isMobile ? '12px' : '16px' }}>
                    <h4 style={{ fontSize: isMobile ? '15px' : '16px', fontWeight: '700', marginBottom: '4px' }}>{course.name}</h4>
                    <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>Teacher: {course.teacher}</p>
                  </div>
                  <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: isMobile ? '10px' : '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: isMobile ? '12px' : '13px', fontWeight: '600' }}>Progress</span>
                      <span style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>{course.progress}%</span>
                    </div>
                    <ProgressBar value={course.progress} size={isMobile ? 'sm' : 'md'} />
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(12px)',
            padding: isMobile ? '16px' : '24px'
          }}>
            <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '16px' : '20px' }}>Full Activity Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px' }}>
              {recentActivity.map((act, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: isMobile ? '12px' : '16px',
                  padding: isMobile ? '12px' : '16px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{
                    width: isMobile ? '36px' : '40px',
                    height: isMobile ? '36px' : '40px',
                    borderRadius: '50%',
                    background: act.color + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon name={act.icon} size={isMobile ? 16 : 18} color={act.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '600', marginBottom: '4px' }}>{act.activity}</p>
                    <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)' }}>{act.date} at {act.time}</p>
                  </div>
                  <Badge label={act.score} color={act.color} size={isMobile ? 'sm' : 'md'} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(12px)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: isMobile ? '16px' : '24px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700' }}>Messages from Teachers</h3>
                <Button size={isMobile ? 'xs' : 'sm'} icon="plus">New</Button>
              </div>
            </div>
            <div>
              {parentMessages.map(msg => (
                <div 
                  key={msg.id}
                  style={{
                    padding: isMobile ? '12px 16px' : '16px 24px',
                    borderBottom: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    background: msg.unread ? 'var(--primary-50)' : 'transparent',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isMobile ? '4px' : '8px' }}>
                    <p style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '700' }}>{msg.from}</p>
                    <span style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)' }}>{msg.date}</span>
                  </div>
                  <p style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: msg.unread ? '700' : '600', marginBottom: isMobile ? '4px' : '6px', color: 'var(--text-primary)' }}>
                    {msg.subject}
                  </p>
                  <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>{msg.preview}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

window.ParentPortal = ParentPortal;
