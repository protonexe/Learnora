const AnimatedNumber = ({ value = 0, duration = 1000, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * value));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
};

const Counter = ({ end, duration = 2000, ...props }) => {
  return <AnimatedNumber value={end} duration={duration} {...props} />;
};

window.AnimatedNumber = AnimatedNumber;
window.Counter = Counter;
