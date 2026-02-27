const AdminPortal = ({ userId, onLogout, showToast }) => {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [users, setUsers] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [assignments, setAssignments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isMobile = window.innerWidth <= 768;
  
  // Device Owner states
  const [isNativeApp, setIsNativeApp] = React.useState(false);
  const [isDeviceOwner, setIsDeviceOwner] = React.useState(false);
  const [kioskActive, setKioskActive] = React.useState(false);
  const [showDeviceOwnerDialog, setShowDeviceOwnerDialog] = React.useState(false);
  const [deviceOwnerPassword, setDeviceOwnerPassword] = React.useState('');
  const [deviceOwnerError, setDeviceOwnerError] = React.useState('');
  const [isDisablingDeviceOwner, setIsDisablingDeviceOwner] = React.useState(false);

  React.useEffect(() => {
    fetchData();
    checkDeviceStatus();
  }, []);

  const checkDeviceStatus = async () => {
    // Check if running in native app (Capacitor)
    const isNative = window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
    const hasNativePlugins = window.NativePlugins && typeof window.NativePlugins.KioskMode !== 'undefined';
    
    setIsNativeApp(!!isNative || !!hasNativePlugins);
    
    if ((isNative || hasNativePlugins) && window.NativePlugins && window.NativePlugins.KioskMode) {
      try {
        const kioskResult = await window.NativePlugins.KioskMode.isActive();
        setKioskActive(kioskResult.active);
        
        const ownerResult = await window.NativePlugins.KioskMode.isDeviceOwner();
        setIsDeviceOwner(ownerResult.isDeviceOwner);
      } catch (err) {
        console.error('Error checking device status:', err);
        setIsNativeApp(false);
        setIsDeviceOwner(false);
        setKioskActive(false);
      }
    } else {
      // Not native or plugins not available
      setIsNativeApp(false);
      setIsDeviceOwner(false);
      setKioskActive(false);
    }
  };

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

  const handleDisableDeviceOwner = async (e) => {
    e.preventDefault();
    
    if (!deviceOwnerPassword.trim()) {
      setDeviceOwnerError('Please enter password');
      return;
    }

    setIsDisablingDeviceOwner(true);
    setDeviceOwnerError('');

    try {
      // Call the native method with password as string
      const result = await window.NativePlugins.KioskMode.clearDeviceOwner(deviceOwnerPassword);

      if (result && result.success) {
        showToast('Device Owner removed!', 'success');
        setIsDeviceOwner(false);
        setShowDeviceOwnerDialog(false);
        setDeviceOwnerPassword('');
      } else {
        setDeviceOwnerError(result?.message || 'Failed to remove Device Owner');
      }
    } catch (err) {
      console.error('Error:', err);
      setDeviceOwnerError('Error: ' + (err.message || 'Unknown error'));
    } finally {
      setIsDisablingDeviceOwner(false);
    }
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
           {['dashboard', 'users', 'courses', 'security'].map(tab => (
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
               {tab === 'security' ? '🔒 ' + tab.charAt(0).toUpperCase() + tab.slice(1) : tab.charAt(0).toUpperCase() + tab.slice(1)}
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

        {activeTab === 'security' && (
          <div style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>🔐 Device Owner Management</h3>
            
            {!isNativeApp ? (
              <div style={{ padding: '16px', background: 'rgba(107, 114, 128, 0.1)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  Device Owner management is only available in the native Android app.
                </p>
              </div>
            ) : (
              <>
                <div style={{ 
                  padding: '16px', 
                  background: isDeviceOwner ? 'rgba(99, 102, 241, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  border: `1px solid ${isDeviceOwner ? 'var(--primary-500)' : 'var(--border-color)'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: 'var(--text-primary)' }}>
                        Device Owner Status
                      </p>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {isDeviceOwner 
                          ? 'Device is currently set as Device Owner. App has full device control.' 
                          : 'Device Owner mode is not active. Device has normal permissions.'}
                      </p>
                    </div>
                    <div style={{ 
                      padding: '8px 16px', 
                      borderRadius: '6px',
                      background: isDeviceOwner ? 'var(--danger)' : 'var(--bg-tertiary)',
                      color: isDeviceOwner ? '#fff' : 'var(--text-secondary)',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {isDeviceOwner ? '🔒 ACTIVE' : '🔓 INACTIVE'}
                    </div>
                  </div>

                  {isNativeApp && isDeviceOwner && (
                    <button
                      onClick={() => {
                        setShowDeviceOwnerDialog(true);
                        setDeviceOwnerPassword('');
                        setDeviceOwnerError('');
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        background: 'var(--danger)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                        marginTop: '12px'
                      }}
                    >
                      Disable Device Owner
                    </button>
                  )}
                </div>

                <div style={{
                  padding: '16px',
                  background: 'var(--bg-primary)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    <strong>How to Remove Device Owner:</strong>
                  </p>
                  <ol style={{ fontSize: '11px', color: 'var(--text-secondary)', paddingLeft: '16px', margin: 0, lineHeight: '1.6' }}>
                    <li style={{marginBottom: '8px'}}><strong>Option 1:</strong> Settings → Security → Device Admins → Learnora → Deactivate</li>
                    <li style={{marginBottom: '8px'}}><strong>Option 2 (ADB):</strong> Connect device, run:<br/>
                    <code style={{background: '#222', padding: '2px 6px', borderRadius: '4px', fontSize: '10px'}}>adb shell dpm remove-active-admin com.learnora.app/.KioskDeviceAdminReceiver</code></li>
                    <li><strong>Option 3:</strong> Factory reset device</li>
                  </ol>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>System Status</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '12px' }}>
                    <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Device Owner</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: isDeviceOwner ? 'var(--success)' : 'var(--text-secondary)' }}>
                        {isDeviceOwner ? '✓ Enabled' : '✗ Disabled'}
                      </p>
                    </div>
                    <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Kiosk Mode</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: kioskActive ? 'var(--success)' : 'var(--text-secondary)' }}>
                        {kioskActive ? '✓ Active' : '✗ Inactive'}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Device Owner Disable Dialog */}
        {showDeviceOwnerDialog && (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px'
      }}>
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              background: 'rgba(239, 68, 68, 0.1)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 12px',
              fontSize: '28px'
            }}>
              ⚠️
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
              Disable Device Owner
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              This will remove Device Owner restrictions and restore normal device permissions.
            </p>
          </div>

          <form onSubmit={handleDisableDeviceOwner}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '12px', 
                fontWeight: '600', 
                marginBottom: '6px',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Admin Password
              </label>
              <input
                type="password"
                placeholder="Enter admin password"
                value={deviceOwnerPassword}
                onChange={(e) => {
                  setDeviceOwnerPassword(e.target.value);
                  setDeviceOwnerError('');
                }}
                autoFocus
                disabled={isDisablingDeviceOwner}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: deviceOwnerError ? '1px solid var(--danger)' : '1px solid var(--border-color)',
                  borderRadius: '6px',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {deviceOwnerError && (
                <p style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '6px' }}>
                  {deviceOwnerError}
                </p>
              )}
              <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '6px' }}>
                Default: admin1234
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setShowDeviceOwnerDialog(false)}
                disabled={isDisablingDeviceOwner}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isDisablingDeviceOwner}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: isDisablingDeviceOwner ? 'var(--danger-dark)' : 'var(--danger)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: isDisablingDeviceOwner ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              >
                {isDisablingDeviceOwner ? 'Disabling...' : 'Disable'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
      </div>
    </div>
  );
};

window.AdminPortal = AdminPortal;
