const ClickOutside = ({ children, onClickOutside }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside?.();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClickOutside]);

  return <div ref={ref}>{children}</div>;
};

window.ClickOutside = ClickOutside;
