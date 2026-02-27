const Card = ({ 
  children, 
  hover = true, 
  elevated = false, 
  padding = '16px', 
  style, 
  onClick, 
  ...props 
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const baseStyle = {
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    transition: 'all var(--transition-normal)',
  };

  return (
    <div 
      onClick={onClick} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...baseStyle,
        padding,
        transform: isHovered && hover ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: elevated ? 'var(--shadow-sm)' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }} 
      {...props}
    >
      {children}
    </div>
  );
};

window.Card = Card;
