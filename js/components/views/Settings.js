const SettingsView = ({ 
  educationMode, 
  streak, 
  onLogout, 
  onRestartOnboarding,
  showToast
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isNativeApp, setIsNativeApp] = React.useState(false);
  const [kioskActive, setKioskActive] = React.useState(false);
  const [isDeviceOwner, setIsDeviceOwner] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = React.useState(false);
  const [showDeviceOwnerDialog, setShowDeviceOwnerDialog] = React.useState(false);
  const [exitPassword, setExitPassword] = React.useState('');
  const [deviceOwnerPassword, setDeviceOwnerPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [deviceOwnerError, setDeviceOwnerError] = React.useState('');
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isDisablingDeviceOwner, setIsDisablingDeviceOwner] = React.useState(false);

  React.useEffect(() => {
    const checkNative = async () => {
      const native = window.NativePlugins && window.NativePlugins.isNative();
      setIsNativeApp(native);
      
      if (native) {
        const result = await window.NativePlugins.KioskMode.isActive();
        setKioskActive(result.active);
      }
    };
    checkNative();
  }, []);

  const initiateLogout = () => {
    if (isNativeApp && kioskActive) {
      setShowPasswordDialog(true);
      setExitPassword('');
      setPasswordError('');
    } else {
      processLogout();
    }
  };

  const processLogout = async (password = null) => {
    setIsLoggingOut(true);
    
    if (isNativeApp && kioskActive && window.NativePlugins) {
      if (!password) {
        setIsLoggingOut(false);
        setPasswordError('Password required to exit kiosk mode');
        return;
      }
      
      try {
        const result = await window.NativePlugins.KioskMode.disable(password);
        
        if (!result.success) {
          setIsLoggingOut(false);
          setPasswordError(result.message || 'Incorrect password');
          return;
        }
      } catch (err) {
        setIsLoggingOut(false);
        setPasswordError(err.message || 'Error disabling kiosk mode');
        return;
      }
    }
    
    setShowPasswordDialog(false);
    onLogout();
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!exitPassword) {
      setPasswordError('Please enter password');
      return;
    }
    
    setIsVerifying(true);
    setPasswordError('');
    
    await processLogout(exitPassword);
    
    setIsVerifying(false);
  };

  return (
    <>
      <AnimatedCard delay={50}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Settings
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Customize your learning experience
          </p>
          {isNativeApp && (
            <Badge variant="primary" icon="smartphone" style={{ marginTop: '8px' }}>
              Native App
            </Badge>
          )}
        </div>
      </AnimatedCard>
      
      <AnimatedCard delay={100}>
        <Card elevated style={{ padding: 0, overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <Toggle 
              checked={theme === 'dark'} 
              onChange={toggleTheme} 
              label="Dark Mode" 
              description="Easier on the eyes, especially at night" 
            />
          </div>
          
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>Education Mode</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Lock device to learning apps only</div>
              </div>
              <Badge variant={educationMode ? 'success' : 'default'} icon={educationMode ? 'lock' : 'unlock'}>
                {educationMode ? 'Active' : 'Off'}
              </Badge>
            </div>
          </div>
          
          {isNativeApp && (
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', background: kioskActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                    🔒 Kiosk Mode
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    {kioskActive ? 'Device is locked to Learnora' : 'Device is not locked'}
                  </div>
                </div>
                <Badge variant={kioskActive ? 'success' : 'default'}>
                  {kioskActive ? 'Active' : 'Off'}
                </Badge>
              </div>
            </div>
          )}
          
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>Learning Streak</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Your current progress</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent-blue)' }}>
                  {streak.current || 0} days
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  Best: {streak.longest || 0} days
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px', color: 'var(--text-primary)' }}>Onboarding Tour</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>View the welcome tour again</div>
              </div>
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={onRestartOnboarding}
              >
                Restart Tour
              </Button>
            </div>
          </div>
        </Card>
      </AnimatedCard>
      
      <AnimatedCard delay={200}>
        <Card elevated style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>Account</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Avatar name="John Doe" size={48} />
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '2px', color: 'var(--text-primary)' }}>John Doe</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>john.doe@school.edu</p>
            </div>
          </div>
          <Button 
            variant="secondary" 
            icon="edit-2"
          >
            Edit Profile
          </Button>
        </Card>
      </AnimatedCard>
      
      <AnimatedCard delay={300}>
        <Button 
          variant="danger" 
          fullWidth 
          icon="log-out" 
          size="lg" 
          onClick={initiateLogout}
          loading={isLoggingOut}
          disabled={isLoggingOut || isVerifying}
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </Button>
        {isNativeApp && kioskActive && (
          <p style={{ 
            fontSize: '11px', 
            color: 'var(--text-tertiary)', 
            textAlign: 'center', 
            marginTop: '8px' 
          }}>
            Logging out requires admin password to exit Kiosk Mode
          </p>
        )}
      </AnimatedCard>

      {/* Data Management */}
      <AnimatedCard delay={350}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>Data Management</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>Backup and restore your learning data</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <button 
            onClick={() => {
              if (window.DataManager) {
                window.DataManager.exportData();
                showToast('Data exported successfully!', 'success');
              } else if (window.Database) {
                const data = window.Database.exportDatabase();
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `learnora-backup-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                showToast('Data exported!', 'success');
              }
            }}
            style={{ flex: 1, minWidth: '120px', padding: '12px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            📤 Export All
          </button>
          <label style={{ flex: 1, minWidth: '120px', padding: '12px', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            📥 Import Data
            <input type="file" accept=".json" style={{ display: 'none' }} onChange={(e) => {
              const file = e.target.files[0];
              if (file && window.Database) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const success = window.Database.importDatabase(event.target.result);
                  if (success) {
                    showToast('Data imported! Refresh to see changes.', 'success');
                  } else {
                    showToast('Failed to import data', 'error');
                  }
                };
                reader.readAsText(file);
              }
            }} />
          </label>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => {
              if (window.Database) {
                const courses = window.Database.getAllCourses() || [];
                const csv = 'Name,Progress,Chapters,Rating,Students\n' + 
                  courses.map(c => `"${c.name}",${c.progress},${c.chapters},${c.rating},${c.students}`).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `learnora-courses-${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
                showToast('Courses exported as CSV!', 'success');
              }
            }}
            style={{ flex: 1, minWidth: '100px', padding: '10px', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            📊 CSV
          </button>
          <button 
            onClick={() => {
              if (window.Database) {
                const assignments = window.Database.getAllAssignments() || [];
                const csv = 'Title,Subject,Due Date,Status,Points\n' + 
                  assignments.map(a => `"${a.title}","${a.subject || ''}","${a.dueDate || ''}","${a.status || 'pending'}","${a.points || 100}"`).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `learnora-assignments-${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
                showToast('Assignments exported!', 'success');
              }
            }}
            style={{ flex: 1, minWidth: '100px', padding: '10px', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            📝 Assignments
          </button>
          <button 
            onClick={() => {
              if (window.ProgressReportGenerator) {
                showToast('Use the Progress Report section below for full reports', 'info');
              } else {
                showToast('Progress report PDF generation coming soon!', 'info');
              }
            }}
            style={{ flex: 1, minWidth: '100px', padding: '10px', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            📄 Report
          </button>
        </div>
      </AnimatedCard>

      {/* Progress Report Generator */}
      <ProgressReportGenerator />
        </div>
      </AnimatedCard>

      {/* Password Modal for Kiosk Exit */}
      <Modal 
        isOpen={showPasswordDialog} 
        onClose={() => !isVerifying && !isLoggingOut && setShowPasswordDialog(false)}
        title="Exit Kiosk Mode"
      >
        <div style={{ padding: '20px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ 
              width: '60px', height: '60px', 
              borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px', color: 'var(--danger)'
            }}>
              <Icon name="lock" size={32} />
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Please enter the admin password to disable kiosk mode and logout.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <Input
                type="password"
                placeholder="Admin Password"
                value={exitPassword}
                onChange={(e) => {
                  setExitPassword(e.target.value);
                  setPasswordError('');
                }}
                autoFocus
                disabled={isVerifying || isLoggingOut}
                error={passwordError}
              />
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '8px' }}>
                Default demo password is: admin1234
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button 
                type="button" 
                variant="secondary" 
                fullWidth 
                onClick={() => setShowPasswordDialog(false)}
                disabled={isVerifying || isLoggingOut}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="danger" 
                fullWidth 
                loading={isVerifying || isLoggingOut}
              >
                Unlock & Logout
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

window.SettingsView = SettingsView;