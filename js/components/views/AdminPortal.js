const AdminPortal = ({ userId, onLogout, showToast }) => {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [users, setUsers] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [assignments, setAssignments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isMobile = window.innerWidth <= 768;

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    if (window.LearnoraDB) {
      // These methods will need to be added to CloudDatabase.js
      try {
        const allUsers = await window.LearnoraDB.getAllUsers() || [];
        const allCourses = await window.LearnoraDB.getAllCourses() || [];
        const allAssignments = await window.LearnoraDB.getAllAssignments() || [];
        
        setUsers(allUsers);
        setCourses(allCourses);
        setAssignments(allAssignments);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
        showToast("Failed to load admin data", "error");
      }
    }
    setIsLoading(false);
  };

  const adminStats = [
    { label: 'Total Users', value: users.length, icon: 'users', color: '#8b5cf6' },
    { label: 'Total Courses', value: courses.length, icon: 'book-open', color: '#10b981' },
    { label: 'Assignments', value: assignments.length, icon: 'file-text', color: '#f59e0b' },
    { label: 'Database Status', value: 'Online', icon: 'database', color: '#3b82f6' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-primary)', 
      backgroundImage: 'var(--gradient-mesh)',
      paddingBottom: isMobile ? '80px' : '24px'
    }}>
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
              ⚙️ Admin Portal
            </h1>
            <p style={{ fontSize: isMobile ? '12px' : '14px', color: 'var(--text-secondary)' }}>
              Manage system data and user roles
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
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '8px' : '16px',
          marginBottom: isMobile ? '16px' : '24px'
        }}>
          {adminStats.map((stat, idx) => (
            <AnimatedCard key={idx} delay={idx * 50} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '12px' : '20px',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: isMobile ? '11px' : '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: '800' }}>
                    {isLoading ? '...' : stat.value}
                  </p>
                </div>
                <div style={{
                  width: isMobile ? '32px' : '40px',
                  height: isMobile ? '32px' : '40px',
                  borderRadius: '12px',
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color
                }}>
                  <Icon name={stat.icon} size={isMobile ? 16 : 20} />
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Tabs for Admin Management */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '20px', 
          overflowX: 'auto', 
          paddingBottom: '8px',
          scrollbarWidth: 'none'
        }}>
          {['dashboard', 'users', 'courses'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                background: activeTab === tab ? 'var(--primary-500)' : 'var(--bg-secondary)',
                color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '16px' }}>System Overview</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Select a tab above to manage users or courses.</p>
            <Button onClick={fetchData} variant="secondary" style={{ marginTop: '16px' }} icon="refresh-cw">
              Refresh Data
            </Button>
          </div>
        )}

        {activeTab === 'users' && (
          <div style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Users Management</span>
            </h3>
            {isLoading ? (
              <p>Loading users...</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '12px 8px' }}>Name</th>
                      <th style={{ padding: '12px 8px' }}>Username</th>
                      <th style={{ padding: '12px 8px' }}>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id || user.username} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px 8px' }}>{user.name}</td>
                        <td style={{ padding: '12px 8px' }}>{user.username}</td>
                        <td style={{ padding: '12px 8px', textTransform: 'capitalize' }}>
                          <span style={{ 
                            padding: '4px 8px', 
                            background: 'var(--bg-tertiary)', 
                            borderRadius: '4px', 
                            fontSize: '12px' 
                          }}>{user.role}</span>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="3" style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                          No users found. Ensure users are added to the database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'courses' && (
          <div style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '16px' }}>Courses Management</h3>
            {isLoading ? (
              <p>Loading courses...</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                {courses.map(course => (
                  <div key={course.id} style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)' }}>
                    <h4 style={{ marginBottom: '8px' }}>{course.title || course.name}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{course.description}</p>
                    <p style={{ fontSize: '12px', color: 'var(--primary-500)', marginTop: '8px' }}>{course.chapters?.length || 0} Chapters</p>
                  </div>
                ))}
                {courses.length === 0 && (
                  <p style={{ color: 'var(--text-secondary)' }}>No courses found.</p>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

window.AdminPortal = AdminPortal;
