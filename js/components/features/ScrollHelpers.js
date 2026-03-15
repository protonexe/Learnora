const ScrollToTop = ({ smooth = true }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'var(--primary-500)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px var(--primary-500)40',
        zIndex: 100,
        transition: 'transform 0.2s, opacity 0.2s'
      }}
      title="Scroll to top"
    >
      <Icon name="arrow-up" size={20} color="#fff" />
    </button>
  );
};

const ScrollToBottom = ({ smooth = true }) => {
  const scrollToBottom = () => {
    if (smooth) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  return (
    <button
      onClick={scrollToBottom}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-color)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
      }}
      title="Scroll to bottom"
    >
      <Icon name="arrow-down" size={20} />
    </button>
  );
};

window.ScrollToTop = ScrollToTop;
window.ScrollToBottom = ScrollToBottom;
