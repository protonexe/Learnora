const ProgressRing = ({ 
  progress = 0, 
  size = 80, 
  strokeWidth = 8,
  color = 'var(--primary-500)',
  backgroundColor = 'var(--bg-tertiary)',
  children,
  showPercent = true 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease',
            filter: `drop-shadow(0 0 6px ${color}40)`
          }}
        />
      </svg>
      
      {/* Center Content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        {children || (
          showPercent && (
            <span style={{
              fontSize: size * 0.22,
              fontWeight: '700',
              color: 'var(--text-primary)'
            }}>
              {Math.round(progress)}%
            </span>
          )
        )}
      </div>
    </div>
  );
};

const StatRing = ({ label, value, total, color = 'var(--primary-500)', icon }) => {
  const progress = total > 0 ? (value / total) * 100 : 0;
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px'
    }}>
      <ProgressRing progress={progress} size={64} strokeWidth={6} color={color}>
        <span style={{ fontSize: '20px' }}>{icon || '📊'}</span>
      </ProgressRing>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
          {value}/{total}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
          {label}
        </div>
      </div>
    </div>
  );
};

const CircularProgressButton = ({ 
  progress = 0, 
  onClick, 
  children,
  size = 56,
  color = 'var(--primary-500)'
}) => {
  const radius = (size - 6) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        background: 'transparent',
        padding: 0
      }}
    >
      <svg width={size} height={size} style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-tertiary)"
          strokeWidth="3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.3s ease'
          }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {children}
      </div>
    </button>
  );
};

window.ProgressRing = ProgressRing;
window.StatRing = StatRing;
window.CircularProgressButton = CircularProgressButton;
