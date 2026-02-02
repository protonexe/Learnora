const FloatingButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="floating-button"
      style={{ 
        position: 'fixed', 
        bottom: '32px', 
        right: '32px', 
        width: '64px', 
        height: '64px', 
        borderRadius: '50%', 
        background: 'var(--gradient-primary)', 
        color: 'var(--bg-primary)', 
        border: '2px solid var(--border-strong)', 
        boxShadow: 'var(--shadow-xl)', 
        cursor: 'pointer', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: 999, 
        animation: 'glow 3s ease-in-out infinite',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform var(--transition-normal)'
      }}
    >
      <Icon name="message-circle" size={28} />
    </button>
  );
};

window.FloatingButton = FloatingButton;