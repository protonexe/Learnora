const ResponsiveBuilder = ({ children, breakpoints = {} }) => {
  const [device, setDevice] = React.useState('desktop');

  React.useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) setDevice('mobile');
    else if (width < 1024) setDevice('tablet');
    else setDevice('desktop');

    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) setDevice('mobile');
      else if (w < 1024) setDevice('tablet');
      else setDevice('desktop');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const props = { device, ...breakpoints[device] };
  return typeof children === 'function' ? children(props) : children;
};

window.ResponsiveBuilder = ResponsiveBuilder;
