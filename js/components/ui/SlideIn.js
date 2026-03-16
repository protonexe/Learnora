const SlideIn = ({ children, direction = 'left', delay = 0 }) => {
  const transforms = { left: '-20px', right: '20px', up: '-20px', down: '20px' };
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translate(0)' : `translate(${transforms[direction]})`,
      transition: 'all 300ms ease'
    }}>
      {children}
    </div>
  );
};

window.SlideIn = SlideIn;
