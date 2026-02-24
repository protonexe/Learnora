const Avatar = ({ name, size = 44, src }) => {
  const initials = Helpers.getInitials(name);
  const colors = ['#6366f1', '#8b5cf6', '#14b8a6', '#f59e0b', '#f43f5e', '#10b981'];
  const colorIndex = name ? name.charCodeAt(0) % colors.length : 0;

  return (
    <div style={{
      width: size, 
      height: size, 
      borderRadius: 'var(--radius-md)',
      background: src 
        ? `url(${src}) center/cover` 
        : `linear-gradient(135deg, ${colors[colorIndex]}, ${colors[(colorIndex + 1) % colors.length]})`,
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'var(--bg-primary)', 
      fontSize: size * 0.38, 
      fontWeight: '700', 
      flexShrink: 0,
      boxShadow: 'var(--shadow-md)'
    }}>
      {!src && initials}
    </div>
  );
};

window.Avatar = Avatar;