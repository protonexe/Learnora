const FloatingInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  icon,
  error,
  required,
  autoComplete,
  ...props 
}) => {
  const [focused, setFocused] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const inputRef = React.useRef(null);

  const hasValue = value && value.length > 0;
  const isFloating = focused || hasValue;
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div style={{ position: 'relative', marginBottom: '4px' }}>
      {/* Icon */}
      {icon && (
        <div style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'color var(--transition-fast)'
        }}>
          <Icon 
            name={icon} 
            size={18} 
            color={focused ? 'var(--primary-500)' : 'var(--text-tertiary)'} 
          />
        </div>
      )}

      {/* Input */}
      <input
        ref={inputRef}
        type={inputType}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete={autoComplete}
        style={{
          width: '100%',
          padding: '20px 16px 8px',
          paddingLeft: icon ? '48px' : '16px',
          paddingRight: isPassword ? '48px' : '16px',
          fontSize: '16px',
          fontFamily: 'inherit',
          background: 'var(--bg-tertiary)',
          border: `2px solid ${error ? 'var(--danger)' : focused ? 'var(--primary-500)' : 'transparent'}`,
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-primary)',
          transition: 'all var(--transition-fast)',
          outline: 'none'
        }}
        {...props}
      />

      {/* Floating Label */}
      <label
        onClick={() => inputRef.current?.focus()}
        style={{
          position: 'absolute',
          left: icon ? '48px' : '16px',
          top: isFloating ? '8px' : '50%',
          transform: isFloating ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: isFloating ? '11px' : '15px',
          fontWeight: isFloating ? '600' : '400',
          color: error ? 'var(--danger)' : focused ? 'var(--primary-500)' : 'var(--text-tertiary)',
          pointerEvents: 'none',
          transition: 'all var(--transition-fast)',
          letterSpacing: isFloating ? '0.02em' : '0'
        }}
      >
        {label}{required && ' *'}
      </label>

      {/* Password Toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={() => {
            setShowPassword(!showPassword);
            if (navigator.vibrate) navigator.vibrate(5);
          }}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: '1px solid var(--border-light)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon 
            name={showPassword ? 'eye-off' : 'eye'} 
            size={18} 
            color="var(--text-tertiary)" 
          />
        </button>
      )}

      {/* Error Message */}
      {error && (
        <p style={{
          fontSize: '12px',
          color: 'var(--danger)',
          marginTop: '6px',
          marginLeft: '4px',
          fontWeight: '500'
        }}>
          {error}
        </p>
      )}
    </div>
  );
};

window.FloatingInput = FloatingInput;
