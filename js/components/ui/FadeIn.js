const FadeIn = ({ children, delay = 0, duration = 300 }) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(10px)',
      transition: `opacity ${duration}ms ease, transform ${duration}ms ease`
    }}>
      {children}
    </div>
  );
};

window.FadeIn = FadeIn;
