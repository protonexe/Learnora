const AnimatedCard = ({ children, delay = 0, style, ...props }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  React.useEffect(() => { 
    const timer = setTimeout(() => setIsVisible(true), delay); 
    return () => clearTimeout(timer); 
  }, [delay]);

  return (
    <div 
      style={{ 
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)', 
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)', 
        ...style 
      }} 
      {...props}
    >
      {children}
    </div>
  );
};

window.AnimatedCard = AnimatedCard;