const LoginView = ({ onAuthenticate, showToast }) => {
  const [nfcStatus, setNfcStatus] = React.useState('scanning');
  const [nfcError, setNfcError] = React.useState(null);
  const [nfcData, setNfcData] = React.useState(null);
  const [nfcRawContent, setNfcRawContent] = React.useState(null);
  const [nfcReader, setNfcReader] = React.useState(null);
  const [isNfcSupported, setIsNfcSupported] = React.useState(false);
  const [isNativeApp, setIsNativeApp] = React.useState(false);
  const [kioskEnabled, setKioskEnabled] = React.useState(false);
  const [kioskSetupStatus, setKioskSetupStatus] = React.useState(null);
  const [showKioskSetup, setShowKioskSetup] = React.useState(false);
  
  const [showPasswordFallback, setShowPasswordFallback] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState('student');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    const checkKioskStatus = async () => {
      if (window.NativePlugins && window.NativePlugins.isNative()) {
        const status = await window.NativePlugins.KioskMode.checkKioskSetupStatus();
        setKioskSetupStatus(status);
      }
    };
    checkKioskStatus();
  }, []);

  React.useEffect(() => {

    const initNFC = async () => {
      const native = window.NativePlugins && window.NativePlugins.isNative();
      setIsNativeApp(native);
      
      if (native) {
        const result = await window.NativePlugins.NFC.isAvailable();
        setIsNfcSupported(result.available && result.enabled);
        
        if (result.available && result.enabled) {
          setupNativeNFCListeners();
          await window.NativePlugins.NFC.startScan();
        } else {
          setNfcStatus('error');
          setNfcError(result.enabled === false ? 'NFC is disabled. Please enable NFC in settings.' : 'NFC not available on this device');
        }
      } else {
        const webSupported = typeof window.NFCUtils !== 'undefined' && 
                            window.NFCUtils.isSupported && 
                            window.NFCUtils.isSupported();
        setIsNfcSupported(webSupported);
        
        if (webSupported) {
          startWebNFCScan();
        }
      }
    };
    
    initNFC();
    
    return () => {
      cleanupNFC();
    };
  }, []);

  const setupNativeNFCListeners = () => {
    if (!window.NativePlugins) return;
    
    window.NativePlugins.NFC.addListener('nfcTagRead', (data) => {
      handleNFCData(data);
    });
    
    window.NativePlugins.NFC.addListener('nfcError', (error) => {
      setNfcStatus('error');
      setNfcError(error.message || 'NFC read error');
      showToast(error.message || 'NFC read error', 'error');
    });
  };

  const startWebNFCScan = async () => {
    if (!window.NFCUtils || !window.NFCUtils.isSupported()) {
      return;
    }

    setNfcStatus('scanning');
    setNfcError(null);

    const permCheck = await window.NFCUtils.checkPermission();
    if (!permCheck.granted) {
      setNfcStatus('error');
      setNfcError('NFC permission denied. Please allow NFC access.');
      showToast('NFC permission required', 'error');
      return;
    }

    const ndef = await window.NFCUtils.startScan(
      (data) => {
        setNfcData(data);
        handleNFCData(data);
      },
      (error) => {
        setNfcStatus('error');
        setNfcError(error);
        showToast(error, 'error');
      }
    );

    if (ndef) {
      setNfcReader(ndef);
    } else {
      setNfcStatus('error');
      setNfcError('Failed to initialize NFC');
    }
  };

  const cleanupNFC = async () => {
    if (isNativeApp && window.NativePlugins) {
      await window.NativePlugins.NFC.stopScan();
      await window.NativePlugins.NFC.removeAllListeners();
    } else if (nfcReader && window.NFCUtils) {
      window.NFCUtils.stopScan(nfcReader);
    }
  };

  const credentials = {
    student: [
      { username: 'emma.wilson', password: 'pass123', name: 'Emma Wilson' },
      { username: 'alex.johnson', password: 'pass123', name: 'Alex Johnson' },
    ],
    teacher: [
      { username: 'mr.johnson', password: 'teacher123', name: 'Mr. Johnson' },
      { username: 'ms.smith', password: 'teacher123', name: 'Ms. Smith' },
    ],
    parent: [
      { username: 'parent.wilson', password: 'parent123', name: 'John Wilson' },
    ],
    admin: [
      { username: 'admin', password: 'admin123', name: 'System Admin' },
    ]
  };

  const roles = [
    { id: 'student', label: 'Student', description: 'Access your courses' },
    { id: 'teacher', label: 'Teacher', description: 'Manage classes' },
    { id: 'parent', label: 'Parent', description: 'Track progress' },
    { id: 'admin', label: 'Admin', description: 'System Management' },
  ];

  const validateCredentials = (role, user, pass) => {
    if (!user || !pass) {
      return { valid: false, error: 'Username and password are required' };
    }
    
    const roleCredentials = credentials[role] || [];
    
    if (roleCredentials.length === 0) {
      return { valid: false, error: 'No credentials configured for this role' };
    }
    
    const matched = roleCredentials.find(cred => cred.username === user);
    
    if (!matched) {
      return { valid: false, error: `User "${user}" not found for ${role} role` };
    }
    
    if (matched.password !== pass) {
      return { valid: false, error: 'Incorrect password' };
    }
    
    return { valid: true, name: matched.name };
  };

  const enableKioskMode = async (role) => {
    if (!isNativeApp || !window.NativePlugins) return;
    
    if (role === 'student') {
      const status = await window.NativePlugins.KioskMode.checkKioskSetupStatus();
      
      if (!status.isDeviceOwner) {
        setShowKioskSetup(true);
        showToast('Device Owner setup required for Kiosk Mode', 'error');
        return false;
      }
      
      const result = await window.NativePlugins.KioskMode.enable();
      if (result.success) {
        setKioskEnabled(true);
        showToast('Device locked to Learnora (True Kiosk)', 'success');
        return true;
      } else {
        showToast('Failed to enable Kiosk Mode: ' + result.message, 'error');
        return false;
      }
    }
    return true;
  };


  const handlePasswordLogin = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      showToast('Please enter username and password', 'warning');
      return;
    }

    setIsLoading(true);
    
    setTimeout(async () => {
      const validation = validateCredentials(selectedRole, username, password);
      
      if (validation.valid) {
        if (selectedRole === 'student') {
          await enableKioskMode(selectedRole);
        }
        onAuthenticate(selectedRole);
        showToast(`Welcome back${validation.name ? ', ' + validation.name : ''}!`, 'success');
        setUsername('');
        setPassword('');
      } else {
        showToast(validation.error || 'Invalid username or password', 'error');
      }
      setIsLoading(false);
    }, 800);
  };



  const handleNFCData = async (nfcData) => {
    setNfcStatus('reading');
    
    let rawContent = null;
    if (nfcData && nfcData.records && nfcData.records.length > 0) {
      const firstRecord = nfcData.records[0];
      if (firstRecord.type === 'text') {
        rawContent = firstRecord.content;
      } else if (firstRecord.type === 'json') {
        rawContent = typeof firstRecord.content === 'string' 
          ? firstRecord.content 
          : JSON.stringify(firstRecord.content || firstRecord.parsedContent, null, 2);
      } else {
        rawContent = JSON.stringify(firstRecord, null, 2);
      }
    }
    
    const authData = isNativeApp && window.NativePlugins
      ? window.NativePlugins.extractAuthData(nfcData)
      : window.NFCUtils.extractAuthData(nfcData);
    
    const validation = isNativeApp && window.NativePlugins
      ? window.NativePlugins.validateAuthData(authData)
      : window.NFCUtils.validateAuthData(authData);
    
    if (!validation.valid) {
      setNfcStatus('error');
      setNfcError(validation.error);
      setNfcRawContent(rawContent);
      showToast(validation.error, 'error');
      return;
    }

    completeNFCAuth(authData);
  };

  const completeNFCAuth = async (authData) => {
    setNfcStatus('authenticated');
    
    const role = authData.role || selectedRole;
    if (role === 'student') {
      await enableKioskMode(role);
    }
    
    await cleanupNFC();

    setTimeout(async () => {
      onAuthenticate(role);
      showToast(`Welcome${authData.name ? ' ' + authData.name : ''}!`, 'success');
    }, 800);
  };


  const retryNFC = async () => {
    setNfcError(null);
    setNfcRawContent(null);
    
    if (isNativeApp && window.NativePlugins) {
      await window.NativePlugins.NFC.startScan();
    } else if (window.NFCUtils && window.NFCUtils.isSupported()) {
      startWebNFCScan();
    } else {
      simulateNFCDemo();
    }
  };

  const simulateNFCDemo = (role = 'student') => {
    if (window.NFCUtils && window.NFCUtils.simulateScan) {
      window.NFCUtils.simulateScan((data) => {
        handleNFCData(data);
      }, role);
    }
  };

  const handleOpenADBSetup = async () => {
    if (window.NativePlugins && window.NativePlugins.KioskMode) {
      const result = await window.NativePlugins.KioskMode.requestDeviceOwnerSetup();
      if (result.started) {
        showToast('Follow the on-screen instructions', 'info');
      }
    }
  };

  if (showKioskSetup) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--bg-primary)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '16px'
      }}>
        <div style={{ 
          maxWidth: '500px', 
          width: '100%',
          padding: '32px',
          textAlign: 'center'
        }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            margin: '0 auto 24px',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon name="lock" size={40} color="var(--danger)" />
          </div>
          
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 700, 
            marginBottom: '12px',
            color: 'var(--text-primary)'
          }}>
            Kiosk Mode Required
          </h1>
          
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
            To use this app in <strong>Student mode</strong>, this device must be configured as a <strong>Kiosk</strong>. 
            This prevents students from exiting the app or accessing other apps.
          </p>

          <div style={{ 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)',
            borderRadius: '12px', 
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary)' }}>
              Option 1: ADB Command (Recommended)
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
              Connect device to computer via USB and run:
            </p>
            <code style={{ 
              display: 'block',
              background: 'var(--bg-tertiary)', 
              padding: '12px', 
              borderRadius: '8px',
              fontSize: '11px',
              color: 'var(--accent-blue)',
              wordBreak: 'break-all'
            }}>
              adb shell dpm set-device-owner com.learnora.app/.plugins.KioskDeviceAdminReceiver
            </code>
          </div>

          <div style={{ 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)',
            borderRadius: '12px', 
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary)' }}>
              Option 2: Factory Reset + QR Code
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
              Factory reset device, then scan QR code during setup to automatically configure as kiosk.
            </p>
            <Button onClick={handleOpenADBSetup} variant="secondary" fullWidth>
              Try In-App Setup
            </Button>
          </div>

          <Button 
            onClick={() => { setShowKioskSetup(false); onAuthenticate('student'); }} 
            variant="secondary" 
            fullWidth
          >
            Continue Without Kiosk (Limited Mode)
          </Button>
          
          <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '16px' }}>
            Warning: Without Kiosk mode, students can exit the app.
          </p>
        </div>
      </div>
    );
  }

  return (

    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-primary)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '16px'
    }}>
      <div style={{ 
        maxWidth: '400px', 
        width: '100%',
        padding: '32px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            margin: '0 auto 20px',
            background: 'var(--gradient-primary)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)'
          }}>
            <span style={{ fontSize: '32px' }}>📚</span>
          </div>
          
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 800, 
            marginBottom: '8px',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)'
          }}>
            Learnora
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Smart Education Platform
          </p>
          {isNativeApp && (
            <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '8px' }}>
              Native App • NFC Enabled
            </p>
          )}
        </div>

        {showPasswordFallback ? (
          <>
            <div style={{ marginBottom: '24px' }}>
              <p style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--text-secondary)', 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Password Login
              </p>
              
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                marginBottom: '16px'
              }}>
                {roles.map(role => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: selectedRole === role.id ? 'var(--primary-500)' : 'var(--bg-secondary)',
                      color: selectedRole === role.id ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handlePasswordLogin}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '12px', 
                  fontWeight: 500, 
                  marginBottom: '4px',
                  color: 'var(--text-secondary)'
                }}>
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '12px', 
                  fontWeight: 500, 
                  marginBottom: '4px',
                  color: 'var(--text-secondary)'
                }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <Button 
                type="submit"
                fullWidth
                loading={isLoading}
                disabled={isLoading}
                style={{ marginBottom: '12px' }}
              >
                Sign In
              </Button>

              <button 
                type="button"
                onClick={() => setShowPasswordFallback(false)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-secondary)',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                ← Back to NFC Login
              </button>
            </form>

            <div style={{
              marginTop: '20px',
              padding: '12px',
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
              fontSize: '11px',
              color: 'var(--text-tertiary)'
            }}>
              <p style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--text-secondary)' }}>
                Demo Credentials
              </p>
              <p>Student: emma.wilson / pass123</p>
              <p>Teacher: mr.johnson / teacher123</p>
              <p>Parent: parent.wilson / parent123</p>
              <p>Admin: admin / admin123</p>
            </div>
          </>
        ) : (
          <>
            <div style={{ 
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px', 
              padding: '40px 32px',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              {nfcStatus === 'scanning' && (
                <>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 24px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      border: '3px solid var(--border-color)',
                      borderRadius: '50%'
                    }} />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      border: '3px solid var(--primary-500)',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    <div style={{
                      position: 'absolute',
                      inset: '12px',
                      border: '2px solid var(--primary-400)',
                      borderRadius: '50%',
                      opacity: 0.5,
                      animation: 'pulse 2s ease-in-out infinite'
                    }} />
                    <span style={{ 
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '28px'
                    }}>
                      📱
                    </span>
                  </div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: 600, 
                    marginBottom: '8px',
                    color: 'var(--text-primary)'
                  }}>
                    Tap your NFC badge
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Hold your card near the device
                  </p>
                  {!isNfcSupported && !isNativeApp && (
                    <p style={{ 
                      fontSize: '12px', 
                      color: 'var(--text-tertiary)', 
                      marginTop: '16px' 
                    }}>
                      Demo mode active (NFC not detected)
                    </p>
                  )}
                </>
              )}

              {nfcStatus === 'reading' && (
                <>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 24px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      border: '3px solid var(--primary-500)',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Reading card...
                  </h3>
                </>
              )}

              {nfcStatus === 'authenticated' && (
                <>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 24px',
                    background: 'var(--success)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'scaleIn 0.3s ease'
                  }}>
                    <Icon name="check" size={40} color="#fff" />
                  </div>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: 700, 
                    color: 'var(--success)',
                    marginBottom: '8px'
                  }}>
                    Welcome!
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Logging you in...
                  </p>
                  {kioskEnabled && (
                    <p style={{ fontSize: '12px', color: 'var(--primary-400)', marginTop: '8px' }}>
                      🔒 Device locked to Learnora
                    </p>
                  )}
                </>
              )}

              {nfcStatus === 'error' && (
                <>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 24px',
                    background: 'var(--danger)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon name="x" size={40} color="#fff" />
                  </div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: 600, 
                    color: 'var(--danger)',
                    marginBottom: '8px'
                  }}>
                    Login Failed
                  </h3>
                  <p style={{ 
                    fontSize: '13px', 
                    color: 'var(--text-secondary)', 
                    marginBottom: '16px' 
                  }}>
                    {nfcError || 'Unable to read NFC card'}
                  </p>
                  
                  {nfcRawContent && (
                    <div style={{
                      marginBottom: '16px',
                      padding: '12px',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      textAlign: 'left',
                      maxHeight: '150px',
                      overflow: 'auto'
                    }}>
                      <p style={{ 
                        fontSize: '11px', 
                        color: 'var(--text-tertiary)', 
                        marginBottom: '6px',
                        fontWeight: 600
                      }}>
                        Card Content Detected:
                      </p>
                      <code style={{
                        fontSize: '12px',
                        color: 'var(--text-primary)',
                        fontFamily: 'monospace',
                        wordBreak: 'break-all',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {nfcRawContent}
                      </code>
                    </div>
                  )}
                  
                  <Button 
                    onClick={retryNFC}
                    variant="secondary"
                    fullWidth
                  >
                    Try Again
                  </Button>
                </>
              )}
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                fontSize: '13px', 
                color: 'var(--text-tertiary)', 
                marginBottom: '12px' 
              }}>
                Don't have your NFC card?
              </p>
              <button 
                onClick={() => setShowPasswordFallback(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary-500)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px'
                }}
              >
                Use password instead
              </button>
            </div>

            {!isNfcSupported && !isNativeApp && (
              <div style={{ marginTop: '20px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '10px', textAlign: 'center' }}>
                  Demo Mode - Click to simulate NFC scan
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['student', 'teacher', 'parent', 'admin'].map(role => (
                    <button 
                      key={role}
                      onClick={() => simulateNFCDemo(role)}
                      style={{ 
                        flex: 1,
                        padding: '10px',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--text-secondary)',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        
        <div style={{ 
          marginTop: '40px', 
          paddingTop: '20px', 
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Dark Mode
          </span>
          <Toggle 
            checked={theme === 'dark'} 
            onChange={toggleTheme}
          />
        </div>
      </div>
    </div>
  );
};

window.LoginView = LoginView;
