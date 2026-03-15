const PasswordStrength = ({ password = '' }) => {
  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength(password);
  const colors = ['#ef4444', '#f59e0b', '#f59e0b', '#10b981', '#10b981', '#10b981'];
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const percent = (strength / 5) * 100;

  return (
    <div>
      <div style={{
        height: '6px',
        background: 'var(--bg-tertiary)',
        borderRadius: '3px',
        overflow: 'hidden',
        marginBottom: '8px'
      }}>
        <div style={{
          height: '100%',
          width: `${percent}%`,
          background: colors[strength],
          transition: 'all 0.3s ease'
        }} />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '12px', color: colors[strength], fontWeight: '600' }}>
          {labels[strength]}
        </span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '2px',
                background: i <= strength ? colors[strength] : 'var(--bg-tertiary)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

window.PasswordStrength = PasswordStrength;
