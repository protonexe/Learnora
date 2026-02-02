const LoginView = ({ onAuthenticate, showToast }) => {
  const [nfcStatus, setNfcStatus] = React.useState('scanning'); // Start scanning immediately
  const [nfcError, setNfcError] = React.useState(null);
  const [nfcData, setNfcData] = React.useState(null);
  const [nfcRawContent, setNfcRawContent] = React.useState(null);
  const [nfcReader, setNfcReader] = React.useState(null);
  const [isNfcSupported, setIsNfcSupported] = React.useState(false);
  
  const [showPasswordFallback, setShowPasswordFallback] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState('student'); // Default role
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    const checkNfc = async () => {
      const supported = typeof window.NFCUtils !== 'undefined' && window.NFCUtils.isSupported && window.NFCUtils.isSupported();
      setIsNfcSupported(supported);
      
      // Auto-start NFC scan on mount
      if (supported) {
        startNFCScan();
      } else {
        // Use demo mode
        setNfcStatus('scanning');
      }
    };
    checkNfc();
    
    return () => {
      if (nfcReader && typeof window.NFCUtils !== 'undefined') {
        window.NFCUtils.stopScan(nfcReader);
      }
    };
  }, []);

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
    ]
  };

  const roles = [
    { id: 'student', label: 'Student', description: 'Access your courses' },
    { id: 'teacher', label: 'Teacher', description: 'Manage classes' },
    { id: 'parent', label: 'Parent', description: 'Track progress' },
  ];

  const validateCredentials = (role, user, pass) => {
    const roleCredentials = credentials[role] || [];
    return roleCredentials.some(cred => cred.username === user && cred.password === pass);
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      showToast('Please enter username and password', 'warning');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      if (validateCredentials(selectedRole, username, password)) {
        onAuthenticate(selectedRole);
        showToast(`Welcome back!`, 'success');
        setUsername('');
        setPassword('');
      } else {
        showToast('Invalid username or password', 'error');
      }
      setIsLoading(false);
    }, 800);
  };

  const startNFCScan = async () => {
    setNfcStatus('scanning');
    setNfcError(null);

    if (!NFCUtils || !NFCUtils.isSupported()) {
      // Demo mode - simulate scan
      NFCUtils.simulateScan((data) => {
        handleNFCData(data);
      });
      return;
    }

    const permCheck = await NFCUtils.checkPermission();
    if (!permCheck.granted) {
      setNfcStatus('error');
      setNfcError('NFC permission denied. Please allow NFC access.');
      showToast('NFC permission required', 'error');
      return;
    }

    const ndef = await NFCUtils.startScan(
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

  const handleNFCData = (nfcData) => {
    setNfcStatus('reading');
    
    // Extract raw content for debugging
    let rawContent = null;
    if (nfcData && nfcData.records && nfcData.records.length > 0) {
      const firstRecord = nfcData.records[0];
      if (firstRecord.type === 'text') {
        rawContent = firstRecord.content;
      } else if (firstRecord.type === 'json') {
        rawContent = JSON.stringify(firstRecord.content, null, 2);
      } else {
        rawContent = JSON.stringify(firstRecord, null, 2);
      }
    }
    
    const authData = NFCUtils.extractAuthData(nfcData);
    const validation = NFCUtils.validateAuthData(authData);
    
    if (!validation.valid) {
      setNfcStatus('error');
      setNfcError(validation.error);
      setNfcRawContent(rawContent);
      showToast(validation.error, 'error');
      return;
    }

    completeNFCAuth(authData);
  };

  const completeNFCAuth = (authData) => {
    setNfcStatus('authenticated');
    
    if (nfcReader) {
      NFCUtils.stopScan(nfcReader);
      setNfcReader(null);
    }

    setTimeout(() => {
      const role = authData.role || selectedRole;
      onAuthenticate(role);
      showToast(`Welcome${authData.name ? ' ' + authData.name : ''}!`, 'success');
    }, 1000);
  };

  const cancelNFCScan = () => {
    if (nfcReader) {
      NFCUtils.stopScan(nfcReader);
      setNfcReader(null);
    }
    setNfcStatus('inactive');
    setNfcError(null);
  };

  const retryNFC = () => {
    setNfcError(null);
    setNfcRawContent(null);
    startNFCScan();
  };

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
        {/* Logo / Header */}
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
        </div>

        {showPasswordFallback ? (
          /* Password Fallback Form */
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
              
              {/* Role Selection */}
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

            {/* Demo Credentials */}
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
            </div>
          </>
        ) : (
          /* NFC Primary Login */
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
                  {!isNfcSupported && (
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
                  
                  {/* Raw NFC Content Display */}
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

            {/* Password Fallback Link */}
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

            {/* Demo Mode Toggle */}
            {!isNfcSupported && (
              <div style={{ marginTop: '20px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '10px', textAlign: 'center' }}>
                  Demo Mode - Click to simulate NFC scan
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['student', 'teacher', 'parent'].map(role => (
                    <button 
                      key={role}
                      onClick={() => {
                        NFCUtils.simulateScan((data) => {
                          handleNFCData(data);
                        }, role);
                      }}
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
        
        {/* Footer */}
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
