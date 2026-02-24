const TeacherPortal = ({ userId, onLogout, showToast }) => {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const { theme } = useTheme();
  const [selectedClass, setSelectedClass] = React.useState(null);
  const isMobile = window.innerWidth <= 768;

  const [classes, setClasses] = React.useState([]);
  const [recentStudents, setRecentStudents] = React.useState([]);
  const [pendingAssignments, setPendingAssignments] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (window.LearnoraDB && userId) {
        const cls = await window.LearnoraDB.getClassesForTeacher(userId);
        const students = await window.LearnoraDB.getRecentStudentsForTeacher(userId);
        const assignments = await window.LearnoraDB.getPendingAssignments(userId);
        setClasses(cls);
        setRecentStudents(students);
        setPendingAssignments(assignments);
      }
    };
    fetchData();
  }, [userId]);

  const teacherStats = [
    { label: 'Total Students', value: recentStudents.length || '0', icon: 'users', color: '#f43f5e', change: '+12' },
    { label: 'Classes', value: classes.length || '0', icon: 'book-open', color: '#14b8a6', change: 'Active' },
    { label: 'Assignments', value: pendingAssignments.length || '0', icon: 'file-text', color: '#0ea5e9', change: `${pendingAssignments.length} pending` },
    { label: 'Avg. Score', value: `${classes.length ? Math.round(classes.reduce((a,c)=>a+c.avgScore,0)/classes.length) : 0}%`, icon: 'award', color: '#10b981', change: '+3%' },
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
              👨‍🏫 Teacher Dashboard
            </h1>
            <p style={{ fontSize: isMobile ? '12px' : '14px', color: 'var(--text-secondary)' }}>
              Manage your classes and students
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

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: isMobile ? '8px' : '12px',
          marginBottom: isMobile ? '16px' : '24px'
        }}>
          {teacherStats.map((stat, idx) => (
            <AnimatedCard key={idx} delay={idx * 50} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '12px' : '16px',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: '500' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: isMobile ? '22px' : '24px', fontWeight: '700' }}>{stat.value}</p>
                </div>
                <div style={{
                  width: isMobile ? '32px' : '40px',
                  height: isMobile ? '32px' : '40px',
                  borderRadius: 'var(--radius-md)',
                  background: stat.color + '20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon name={stat.icon} size={isMobile ? 16 : 18} color={stat.color} />
                </div>
              </div>
              <p style={{ fontSize: isMobile ? '10px' : '11px', color: stat.color, marginTop: isMobile ? '8px' : '10px', fontWeight: '600' }}>
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
          {['dashboard', 'classes', 'students', 'assignments'].map(tab => (
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
            {/* Classes Overview */}
            <AnimatedCard delay={100} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '16px' : '24px',
              backdropFilter: 'blur(12px)',
              gridColumn: 'span 1'
            }}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '12px' : '16px' }}>Your Classes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px' }}>
                {classes.slice(0, isMobile ? 3 : 4).map(cls => (
                  <div
                    key={cls.id}
                    onClick={() => setSelectedClass(cls)}
                    style={{
                      padding: isMobile ? '10px' : '12px',
                      background: selectedClass?.id === cls.id ? 'var(--primary-100)' : 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: isMobile ? '10px' : '12px',
                      transition: 'all var(--transition-fast)',
                      border: selectedClass?.id === cls.id ? `2px solid var(--primary-500)` : '1px solid var(--border-color)'
                    }}
                  >
                    <span style={{ fontSize: isMobile ? '20px' : '24px' }}>{cls.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '600' }}>{cls.name}</p>
                      <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)' }}>{cls.students} students</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '700', color: cls.color }}>{cls.avgScore}%</p>
                      <p style={{ fontSize: isMobile ? '10px' : '11px', color: 'var(--text-tertiary)' }}>Avg</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Recent Students */}
            <AnimatedCard delay={150} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '16px' : '24px',
              backdropFilter: 'blur(12px)',
            }}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '12px' : '16px' }}>Recent Activity</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px' }}>
                {recentStudents.slice(0, isMobile ? 4 : 5).map(student => (
                  <div key={student.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: isMobile ? '10px' : '12px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px' }}>
                      <Avatar name={student.name} size={isMobile ? 'xs' : 'sm'} />
                      <div>
                        <p style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '600' }}>{student.name}</p>
                        <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)' }}>{student.class}</p>
                      </div>
                    </div>
                    <Badge 
                      label={`${student.score}%`} 
                      color={student.status === 'excellent' ? '#10b981' : student.status === 'good' ? '#f59e0b' : '#ef4444'}
                      size={isMobile ? 'sm' : 'md'}
                    />
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Pending Assignments */}
            <AnimatedCard delay={200} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '16px' : '24px',
              backdropFilter: 'blur(12px)',
              gridColumn: 'span 1'
            }}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', marginBottom: isMobile ? '12px' : '16px' }}>Pending Reviews</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px' }}>
                {pendingAssignments.slice(0, isMobile ? 2 : 3).map(assign => (
                  <div key={assign.id} style={{
                    padding: isMobile ? '10px' : '12px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: '3px solid var(--primary-500)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isMobile ? '6px' : '8px' }}>
                      <p style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '600' }}>{assign.title}</p>
                      <Badge label={assign.due} color="#f59e0b" size={isMobile ? 'sm' : 'md'} />
                    </div>
                    <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)', marginBottom: isMobile ? '6px' : '8px' }}>{assign.class}</p>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      background: 'var(--bg-primary)',
                      padding: isMobile ? '4px 6px' : '6px 8px',
                      borderRadius: 'var(--radius-sm)',
                      width: 'fit-content'
                    }}>
                      <Icon name="check-circle" size={isMobile ? 12 : 14} color="var(--primary-500)" />
                      <span style={{ fontSize: isMobile ? '11px' : '12px', fontWeight: '600' }}>{assign.submissions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        )}

        {/* Classes Tab */}
        {activeTab === 'classes' && (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: isMobile ? '12px' : '20px'
          }}>
            {classes.map((cls, idx) => (
              <AnimatedCard key={cls.id} delay={idx * 50} style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: isMobile ? '16px' : '24px',
                backdropFilter: 'blur(12px)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}>
                <div style={{ marginBottom: isMobile ? '12px' : '16px' }}>
                  <div style={{ fontSize: isMobile ? '32px' : '40px', marginBottom: isMobile ? '8px' : '12px' }}>{cls.icon}</div>
                  <h4 style={{ fontSize: isMobile ? '15px' : '16px', fontWeight: '700', marginBottom: '4px' }}>{cls.name}</h4>
                  <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>{cls.students} enrolled students</p>
                </div>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginTop: isMobile ? '12px' : '16px',
                  paddingTop: isMobile ? '12px' : '16px',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <div>
                    <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Avg. Score</p>
                    <p style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '700', color: cls.color }}>{cls.avgScore}%</p>
                  </div>
                  <div>
                    <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Active Tasks</p>
                    <p style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '700' }}>{cls.assignments}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(12px)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: isMobile ? '16px' : '24px', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700' }}>All Students</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '500px' : 'auto' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: isMobile ? '12px' : '16px', textAlign: 'left', fontWeight: '600', fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>Name</th>
                    <th style={{ padding: isMobile ? '12px' : '16px', textAlign: 'left', fontWeight: '600', fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>Class</th>
                    <th style={{ padding: isMobile ? '12px' : '16px', textAlign: 'left', fontWeight: '600', fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>Score</th>
                    <th style={{ padding: isMobile ? '12px' : '16px', textAlign: 'left', fontWeight: '600', fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map(student => (
                    <tr key={student.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: isMobile ? '12px' : '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px' }}>
                          <Avatar name={student.name} size={isMobile ? 'xs' : 'sm'} />
                          <span style={{ fontWeight: '600', fontSize: isMobile ? '13px' : '14px' }}>{student.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: isMobile ? '12px' : '16px', fontSize: isMobile ? '13px' : '14px', color: 'var(--text-secondary)' }}>{student.class}</td>
                      <td style={{ padding: isMobile ? '12px' : '16px', fontSize: isMobile ? '13px' : '14px', fontWeight: '600' }}>{student.score}%</td>
                      <td style={{ padding: isMobile ? '12px' : '16px' }}>
                        <Badge 
                          label={student.status.replace('-', ' ')} 
                          color={student.status === 'excellent' ? '#10b981' : student.status === 'good' ? '#f59e0b' : '#ef4444'}
                          size={isMobile ? 'sm' : 'md'}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: isMobile ? '12px' : '20px'
          }}>
            {pendingAssignments.map((assign, idx) => (
              <AnimatedCard key={assign.id} delay={idx * 50} style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: isMobile ? '16px' : '24px',
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{ marginBottom: isMobile ? '12px' : '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isMobile ? '10px' : '12px' }}>
                    <h4 style={{ fontSize: isMobile ? '15px' : '16px', fontWeight: '700' }}>{assign.title}</h4>
                    <Badge label={assign.due} color="#f59e0b" size={isMobile ? 'sm' : 'md'} />
                  </div>
                  <p style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>{assign.class}</p>
                </div>
                <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: isMobile ? '10px' : '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: isMobile ? '12px' : '13px', fontWeight: '600' }}>Submissions</span>
                    <span style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)' }}>{assign.submissions}</span>
                  </div>
                  <ProgressBar value={parseInt(assign.submissions.split('/')[0]) / parseInt(assign.submissions.split('/')[1]) * 100} size={isMobile ? 'sm' : 'md'} />
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

window.TeacherPortal = TeacherPortal;
