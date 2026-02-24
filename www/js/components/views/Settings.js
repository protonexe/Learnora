const SettingsView = ({ 
  educationMode, 
  streak, 
  onLogout, 
  onRestartOnboarding 
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isNativeApp, setIsNativeApp] = React.useState(false);
  const [kioskActive, setKioskActive] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

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

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    if (isNativeApp && kioskActive && window.NativePlugins) {
      const result = await window.NativePlugins.KioskMode.disable();
      if (!result.success && result.mdmControlled) {
        alert('This device is in MDM Single App Mode. Please contact your administrator to exit kiosk mode.');
        setIsLoggingOut(false);
        return;
      }
    }
    
    onLogout();
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
          onClick={handleLogout}
          loading={isLoggingOut}
          disabled={isLoggingOut}
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
            Logging out will release device from kiosk mode
          </p>
        )}
      </AnimatedCard>
    </>
  );
};

window.SettingsView = SettingsView;
