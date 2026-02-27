const ParentPortal = ({ userId, onLogout, showToast }) => {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [selectedChild, setSelectedChild] = React.useState(0);
  const { theme } = useTheme();
  const isMobile = window.innerWidth <= 768;

  const [children, setChildren] = React.useState([]);
  const [dynamicMessages, setDynamicMessages] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const [studentGrades, setStudentGrades] = React.useState([]);
  const [schedule, setSchedule] = React.useState([]);
  const [notifications, setNotifications] = React.useState([]);
  const [attendance, setAttendance] = React.useState(null);
  const [parentalControls, setParentalControls] = React.useState({
    screenTimeLimit: 120,
    bedtimeEnabled: false,
    bedtimeStart: '21:00',
    bedtimeEnd: '07:00',
    contentFilters: [],
    weeklyReport: true
  });

  const [showMessageModal, setShowMessageModal] = React.useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = React.useState(false);
  const [messageContent, setMessageContent] = React.useState('');
  const [selectedTeacher, setSelectedTeacher] = React.useState(null);

  React.useEffect(() => {
    const fetchChildrenAndMessages = async () => {
      if (!userId) {
        setChildren([{ 
          id: 1, name: 'Emma Wilson', grade: '10th Grade', avatar: 'EW',
          gpa: 3.8, attendance: 96, activeAssignments: 3, recentScore: 92
        }]);
        return;
      }
      try {
        const kids = await Promise.race([
          window.LearnoraDB.getChildrenForParent(userId),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        ]);
        const mappedKids = (kids || []).map((k, i) => ({
          id: k.id,
          name: k.name,
          grade: k.grade || '10th Grade',
          avatar: k.name.split(' ').map(n=>n[0]).join(''),
          gpa: 3.5 + (Math.random() * 0.5).toFixed(1) * 1,
          attendance: 90 + Math.floor(Math.random() * 10),
          activeAssignments: Math.floor(Math.random() * 5),
          recentScore: 80 + Math.floor(Math.random() * 20)
        }));
        setChildren(mappedKids.length > 0 ? mappedKids : [{ 
          id: 1, name: 'Emma Wilson', grade: '10th Grade', avatar: 'EW',
          gpa: 3.8, attendance: 96, activeAssignments: 3, recentScore: 92
        }]);
      } catch (e) {
        console.log('Using fallback children data');
        setChildren([{ 
          id: 1, name: 'Emma Wilson', grade: '10th Grade', avatar: 'EW',
          gpa: 3.8, attendance: 96, activeAssignments: 3, recentScore: 92
        }]);
      }

      try {
        const msgs = await window.LearnoraDB.getMessagesForUser(userId);
        setDynamicMessages(msgs || []);
      } catch (e) {}

      try {
        const tchs = await window.LearnoraDB.getTeachers();
        setTeachers(tchs || []);
      } catch (e) {}

      try {
        const notifs = await window.LearnoraDB.getNotifications(userId);
        setNotifications(notifs || []);
      } catch (e) {}
    };
    fetchChildrenAndMessages();
  }, [userId]);

  React.useEffect(() => {
    const fetchChildData = async () => {
      if (window.LearnoraDB && children.length > 0) {
        const childId = children[selectedChild].id;
        const grades = await window.LearnoraDB.getStudentGrades(childId);
        setStudentGrades(grades || []);

        const sched = await window.LearnoraDB.getSchedule(childId);
        setSchedule(sched || []);

        const att = await window.LearnoraDB.getAttendance(childId);
        setAttendance(att);

        const pc = await window.LearnoraDB.getParentalControls(userId);
        setParentalControls(pc);
      }
    };
    fetchChildData();
  }, [userId, children, selectedChild]);

  if (children.length === 0) return <div style={{padding: '40px', textAlign: 'center'}}>Loading...</div>;

  const currentChild = children[selectedChild];

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageContent.trim() || !selectedTeacher) return;
    try {
      await window.LearnoraDB.sendMessage(userId, selectedTeacher.id, messageContent);
      showToast('Message sent to ' + selectedTeacher.name, 'success');
      setMessageContent('');
      setShowMessageModal(false);
      setSelectedTeacher(null);
    } catch (error) {
      showToast('Failed to send message', 'error');
    }
  };

  const handleNotificationClick = async (notif) => {
    await window.LearnoraDB.markNotificationRead(notif.id);
    setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n));
  };

  const updateParentalControls = async (newControls) => {
    const updated = { ...parentalControls, ...newControls };
    setParentalControls(updated);
    await window.LearnoraDB.updateParentalControls(userId, updated);
    showToast('Parental controls updated', 'success');
  };

  const childStats = [
    { label: 'GPA', value: currentChild.gpa, icon: 'award', color: '#f43f5e', change: 'Current' },
    { label: 'Attendance', value: `${currentChild.attendance}%`, icon: 'calendar', color: '#14b8a6', change: 'This month' },
    { label: 'Pending Work', value: currentChild.activeAssignments, icon: 'file-text', color: '#0ea5e9', change: 'Due soon' },
    { label: 'Latest Score', value: `${currentChild.recentScore}%`, icon: 'trending-up', color: '#10b981', change: 'Last test' },
  ];

  const courseProgress = studentGrades.length > 0 ? studentGrades.map(g => ({
    name: g.course,
    progress: Math.round(g.overall),
    teacher: g.course === 'Mathematics' ? 'Mr. Johnson' : g.course === 'English' ? 'Ms. Smith' : g.course === 'Science' ? 'Dr. Lee' : 'Mr. Brown'
  })) : [
    { name: 'Mathematics', progress: 78, teacher: 'Mr. Johnson' },
    { name: 'English', progress: 85, teacher: 'Ms. Smith' },
    { name: 'Science', progress: 72, teacher: 'Dr. Lee' },
    { name: 'History', progress: 88, teacher: 'Mr. Brown' },
  ];

  const recentActivity = [
    { date: 'Today', time: '2:30 PM', activity: 'Completed Math Quiz', score: '92%', icon: 'check-circle', color: '#10b981' },
    { date: 'Today', time: '11:00 AM', activity: 'Attended Physics Class', score: 'Present', icon: 'calendar', color: '#14b8a6' },
    { date: 'Yesterday', time: '4:15 PM', activity: 'Submitted Science Project', score: 'Pending', icon: 'upload-cloud', color: '#f59e0b' },
    { date: 'Mar 28', time: '10:45 AM', activity: 'History Chapter Test', score: '88%', icon: 'file-text', color: '#0ea5e9' },
  ];

  const parentMessages = [
    { id: 1, from: 'Mr. Johnson', subject: 'Great performance in class!', preview: currentChild.name + ' has been doing excellent work...', unread: true, date: '2h ago' },
    { id: 2, from: 'Ms. Smith', subject: 'Assignment reminder', preview: 'Just a reminder about the essay due...', unread: false, date: '1 day ago' },
    { id: 3, from: 'Dr. Lee', subject: 'Science Project Updates', preview: 'Great progress on the lab experiment...', unread: false, date: '2 days ago' },
  ];

  const tabs = ['dashboard', 'grades', 'schedule', 'messages', 'controls'];

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
              Welcome back! Track {currentChild.name}'s progress
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button 
              onClick={() => setShowNotificationPanel(true)}
              style={{
                position: 'relative',
                padding: isMobile ? '6px 10px' : '8px 12px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: isMobile ? '12px' : '13px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              🔔
              {notifications.filter(n => !n.read).length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#ef4444',
                  color: 'white',
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  fontWeight: '700'
                }}>
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
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
          {tabs.map(tab => (
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
              {tab === 'controls' ? '👁️ Controls' : tab}
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

            {/* Attendance Overview */}
            {attendance && (
              <AnimatedCard delay={175} style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: isMobile ? '16px' : '24px',
                backdropFilter: 'blur(12px)',
              }}>
                <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '12px' : '16px' }}>Attendance Overview</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>{attendance.present}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Present</p>
                  </div>
                  <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444' }}>{attendance.absent}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Absent</p>
                  </div>
                  <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>{attendance.late}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Late</p>
                  </div>
                  <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#0ea5e9' }}>{attendance.excused}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Excused</p>
                  </div>
                </div>
                <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>
                  Total Attendance: <strong style={{ color: '#10b981' }}>{attendance.total}%</strong>
                </p>
              </AnimatedCard>
            )}

            {/* Teacher Messages Preview */}
            <AnimatedCard delay={200} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '16px' : '24px',
              backdropFilter: 'blur(12px)',
            }}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '12px' : '16px' }}>Teacher Messages</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px' }}>
                {dynamicMessages.length > 0 ? dynamicMessages.slice(0, 3).map(msg => (
                  <div key={msg.id} style={{
                    padding: isMobile ? '10px' : '12px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: '3px solid var(--primary-500)',
                    cursor: 'pointer'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <p style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '700' }}>Teacher Message</p>
                      <span style={{ fontSize: isMobile ? '10px' : '11px', color: 'var(--text-secondary)' }}>
                        {msg.timestamp?.seconds ? new Date(msg.timestamp.seconds * 1000).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>
                    <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>{msg.content}</p>
                  </div>
                )) : parentMessages.slice(0, 3).map(msg => (
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

        {/* Grades Tab */}
        {activeTab === 'grades' && (
          <div style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(12px)',
            padding: isMobile ? '16px' : '24px'
          }}>
            <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '16px' : '20px' }}>📊 Gradebook</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {studentGrades.length > 0 ? studentGrades.map((grade, idx) => (
                <AnimatedCard key={idx} delay={idx * 50} style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: isMobile ? '16px' : '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h4 style={{ fontSize: isMobile ? '15px' : '16px', fontWeight: '700', marginBottom: '4px' }}>{grade.course}</h4>
                      <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>
                        Teacher: {grade.course === 'Mathematics' ? 'Mr. Johnson' : grade.course === 'English' ? 'Ms. Smith' : grade.course === 'Science' ? 'Dr. Lee' : 'Mr. Brown'}
                      </p>
                    </div>
                    <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                      <p style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: '700', color: grade.overall >= 90 ? '#10b981' : grade.overall >= 80 ? '#0ea5e9' : grade.overall >= 70 ? '#f59e0b' : '#ef4444' }}>
                        {grade.overall.toFixed(1)}%
                      </p>
                      <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)' }}>Overall Grade</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                    {grade.assignments && grade.assignments.map((a, aIdx) => (
                      <div key={aIdx} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 12px',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)'
                      }}>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>{a.name}</p>
                          <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{a.date}</p>
                        </div>
                        <p style={{ 
                          fontSize: '14px', 
                          fontWeight: '700', 
                          color: (a.score / a.maxScore * 100) >= 90 ? '#10b981' : (a.score / a.maxScore * 100) >= 80 ? '#0ea5e9' : (a.score / a.maxScore * 100) >= 70 ? '#f59e0b' : '#ef4444'
                        }}>
                          {a.score}/{a.maxScore}
                        </p>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
              )) : (
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>No grades available</p>
              )}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(12px)',
            padding: isMobile ? '16px' : '24px'
          }}>
            <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '16px' : '20px' }}>📅 Class Schedule</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {schedule.map((day, idx) => (
                <AnimatedCard key={idx} delay={idx * 50} style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '12px 16px',
                    background: 'var(--primary-500)',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '14px'
                  }}>
                    {day.day}
                  </div>
                  <div style={{ padding: isMobile ? '12px' : '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {day.periods.map((period, pIdx) => (
                        <div key={pIdx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 12px',
                          background: period.subject === 'Lunch' || period.subject === 'Study Hall' || period.subject === 'Assembly' ? 'var(--bg-secondary)' : 'transparent',
                          borderRadius: 'var(--radius-md)',
                          opacity: period.subject === 'Lunch' || period.subject === 'Study Hall' || period.subject === 'Assembly' ? 0.7 : 1
                        }}>
                          <span style={{ 
                            fontSize: '12px', 
                            fontWeight: '600', 
                            color: 'var(--text-secondary)',
                            minWidth: '70px'
                          }}>
                            {period.time}
                          </span>
                          <span style={{ 
                            fontSize: isMobile ? '13px' : '14px', 
                            fontWeight: '600',
                            flex: 1
                          }}>
                            {period.subject}
                          </span>
                          <span style={{ 
                            fontSize: '11px', 
                            color: 'var(--text-secondary)',
                            display: isMobile ? 'none' : 'block'
                          }}>
                            {period.room}
                          </span>
                          {period.teacher && (
                            <span style={{ 
                              fontSize: '11px', 
                              color: 'var(--text-tertiary)',
                              display: isMobile ? 'none' : 'block'
                            }}>
                              {period.teacher}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
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
            <div style={{ padding: isMobile ? '16px' : '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700' }}>Messages from Teachers</h3>
              <Button size={isMobile ? 'xs' : 'sm'} icon="send" onClick={() => setShowMessageModal(true)}>New Message</Button>
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

        {/* Parental Controls Tab */}
        {activeTab === 'controls' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', gap: isMobile ? '12px' : '24px' }}>
            {/* Screen Time */}
            <AnimatedCard delay={50} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '16px' : '24px',
              backdropFilter: 'blur(12px)',
            }}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '12px' : '16px' }}>⏰ Screen Time</h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '600' }}>Daily Limit</label>
                  <span style={{ fontSize: isMobile ? '13px' : '14px', color: 'var(--primary-500)', fontWeight: '700' }}>
                    {Math.floor(parentalControls.screenTimeLimit / 60)}h {parentalControls.screenTimeLimit % 60}m
                  </span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="240" 
                  step="30"
                  value={parentalControls.screenTimeLimit} 
                  onChange={(e) => updateParentalControls({ screenTimeLimit: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--primary-500)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  <span>30 min</span>
                  <span>4 hours</span>
                </div>
              </div>
            </AnimatedCard>

            {/* Bedtime */}
            <AnimatedCard delay={100} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '16px' : '24px',
              backdropFilter: 'blur(12px)',
            }}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '12px' : '16px' }}>🌙 Bedtime</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <label style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '600', flex: 1 }}>Enable Bedtime</label>
                <button 
                  onClick={() => updateParentalControls({ bedtimeEnabled: !parentalControls.bedtimeEnabled })}
                  style={{
                    width: '48px',
                    height: '26px',
                    borderRadius: '13px',
                    background: parentalControls.bedtimeEnabled ? 'var(--primary-500)' : 'var(--bg-tertiary)',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: '3px',
                    left: parentalControls.bedtimeEnabled ? '25px' : '3px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'white',
                    transition: 'all var(--transition-fast)'
                  }} />
                </button>
              </div>
              {parentalControls.bedtimeEnabled && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Start Time</label>
                    <input 
                      type="time" 
                      value={parentalControls.bedtimeStart}
                      onChange={(e) => updateParentalControls({ bedtimeStart: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        fontSize: '13px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>End Time</label>
                    <input 
                      type="time" 
                      value={parentalControls.bedtimeEnd}
                      onChange={(e) => updateParentalControls({ bedtimeEnd: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        fontSize: '13px'
                      }}
                    />
                  </div>
                </div>
              )}
            </AnimatedCard>

            {/* Content Filters */}
            <AnimatedCard delay={150} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '16px' : '24px',
              backdropFilter: 'blur(12px)',
            }}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '12px' : '16px' }}>🔒 Content Filters</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['social-media', 'gaming', 'streaming', 'chat-apps'].map(filter => (
                  <div key={filter} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                      onClick={() => {
                        const filters = parentalControls.contentFilters || [];
                        const newFilters = filters.includes(filter) 
                          ? filters.filter(f => f !== filter)
                          : [...filters, filter];
                        updateParentalControls({ contentFilters: newFilters });
                      }}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        background: (parentalControls.contentFilters || []).includes(filter) ? 'var(--primary-500)' : 'transparent',
                        border: `2px solid ${(parentalControls.contentFilters || []).includes(filter) ? 'var(--primary-500)' : 'var(--border-color)'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {(parentalControls.contentFilters || []).includes(filter) && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                    </button>
                    <span style={{ fontSize: isMobile ? '13px' : '14px', textTransform: 'capitalize' }}>{filter.replace('-', ' ')}</span>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Weekly Reports */}
            <AnimatedCard delay={200} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '16px' : '24px',
              backdropFilter: 'blur(12px)',
            }}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '12px' : '16px' }}>📈 Weekly Reports</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <label style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '600', flex: 1 }}>Receive Weekly Progress Reports</label>
                <button 
                  onClick={() => updateParentalControls({ weeklyReport: !parentalControls.weeklyReport })}
                  style={{
                    width: '48px',
                    height: '26px',
                    borderRadius: '13px',
                    background: parentalControls.weeklyReport ? 'var(--primary-500)' : 'var(--bg-tertiary)',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: '3px',
                    left: parentalControls.weeklyReport ? '25px' : '3px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'white',
                    transition: 'all var(--transition-fast)'
                  }} />
                </button>
              </div>
              <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>
                Get weekly email summaries of {currentChild.name}'s grades, attendance, and activity.
              </p>
            </AnimatedCard>
          </div>
        )}
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: isMobile ? '20px' : '24px',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Send Message to Teacher</h3>
              <button 
                onClick={() => { setShowMessageModal(false); setSelectedTeacher(null); }}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSendMessage}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Select Teacher</label>
                <select 
                  value={selectedTeacher?.id || ''}
                  onChange={(e) => {
                    const teacher = teachers.find(t => String(t.id) === String(e.target.value));
                    setSelectedTeacher(teacher);
                  }}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Choose a teacher...</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} - {t.subject}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Message</label>
                <textarea 
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Type your message here..."
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <Button variant="secondary" onClick={() => { setShowMessageModal(false); setSelectedTeacher(null); }}>Cancel</Button>
                <Button type="submit">Send Message</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification Panel */}
      {showNotificationPanel && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: isMobile ? '100%' : '400px',
          background: 'var(--bg-primary)',
          borderLeft: '1px solid var(--border-color)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ padding: isMobile ? '16px' : '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700' }}>Notifications</h3>
            <button 
              onClick={() => setShowNotificationPanel(false)}
              style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-secondary)' }}
            >
              ×
            </button>
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {notifications.length > 0 ? notifications.map(notif => (
              <div 
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                style={{
                  padding: isMobile ? '12px 16px' : '14px 20px',
                  borderBottom: '1px solid var(--border-color)',
                  background: notif.read ? 'transparent' : 'var(--primary-50)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>
                    {notif.type === 'grade' ? '📊' : notif.type === 'assignment' ? '📝' : notif.type === 'attendance' ? '📅' : notif.type === 'message' ? '💬' : '📅'}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: notif.read ? '500' : '700', marginBottom: '4px' }}>{notif.title}</p>
                    <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{notif.message}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                      {notif.timestamp?.seconds ? new Date(notif.timestamp.seconds * 1000).toLocaleString() : 'Just now'}
                    </p>
                  </div>
                  {!notif.read && (
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-500)', flexShrink: 0 }} />
                  )}
                </div>
              </div>
            )) : (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <p>No notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

window.ParentPortal = ParentPortal;
