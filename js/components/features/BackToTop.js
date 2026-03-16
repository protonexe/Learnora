const BackToTop = ({ showAt = 300, smooth = true }) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > showAt);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAt]);

  if (!visible) return null;

  return (
    <button
      onClick={() => smooth ? window.scrollTo({ top: 0, behavior: 'smooth' }) : window.scrollTo(0, 0)}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'var(--primary-500)',
        border: 'none',
        color: '#fff',
        fontSize: '20px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px var(--primary-500)40',
        zIndex: 100
      }}
    >
      ↑
    </button>
  );
};

window.BackToTop = BackToTop;
