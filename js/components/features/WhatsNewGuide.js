const WhatsNewGuide = ({ showToast }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentFeature, setCurrentFeature] = React.useState(0);
  const isMobile = window.innerWidth <= 768;

  const features = [
    {
      icon: '🎯',
      title: 'Study Timer',
      description: 'Use the Pomodoro technique to stay focused. Press Ctrl+T to open.',
      highlight: 'Ctrl+T'
    },
    {
      icon: '🔖',
      title: 'Bookmarks',
      description: 'Save your favorite courses and quizzes for quick access.',
      highlight: 'New Feature'
    },
    {
      icon: '🎓',
      title: 'Certificates',
      description: 'Complete courses to earn printable completion certificates.',
      highlight: '100% Progress'
    },
    {
      icon: '🎯',
      title: 'Learning Goals',
      description: 'Set and track your study goals to stay motivated.',
      highlight: 'Set Goals'
    },
    {
      icon: '📊',
      title: 'Study History',
      description: 'Track your learning sessions and see your progress over time.',
      highlight: 'History'
    },
  ];

  const markAsSeen = () => {
    localStorage.setItem('learnora-whats-new-seen', 'true');
    setIsOpen(false);
  };

  React.useEffect(() => {
    const seen = localStorage.getItem('learnora-whats-new-seen');
    if (!seen) {
      setTimeout(() => setIsOpen(true), 2000);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: isMobile ? '16px' : '24px',
        width: isMobile ? '90vw' : '440px',
        maxHeight: '80vh',
        overflow: 'hidden',
        boxShadow: '0 25px 80px rgba(0,0,0,0.4)'
      }}>
        {/* Header */}
        <div style={{
          background: 'var(--gradient-primary)',
          padding: isMobile ? '20px' : '24px',
          textAlign: 'center',
          color: '#fff'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎉</div>
          <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: '700', margin: '0 0 4px 0' }}>
            Welcome to Learnora!
          </h2>
          <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
            Check out our latest features
          </p>
        </div>

        {/* Feature Carousel */}
        <div style={{ padding: isMobile ? '16px' : '20px' }}>
          <div style={{
            background: 'var(--bg-tertiary)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>
              {features[currentFeature].icon}
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
              {features[currentFeature].title}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: '1.5' }}>
              {features[currentFeature].description}
            </p>
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: 'var(--primary-500)',
              color: '#fff',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {features[currentFeature].highlight}
            </span>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentFeature(idx)}
                style={{
                  width: idx === currentFeature ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  background: idx === currentFeature ? 'var(--primary-500)' : 'var(--bg-tertiary)',
                  transition: 'all 0.2s ease'
                }}
              />
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                if (currentFeature < features.length - 1) {
                  setCurrentFeature(currentFeature + 1);
                } else {
                  markAsSeen();
                }
              }}
              style={{
                flex: 1,
                padding: '14px',
                background: 'var(--primary-500)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {currentFeature < features.length - 1 ? 'Next' : 'Get Started!'}
            </button>
            <button
              onClick={markAsSeen}
              style={{
                padding: '14px',
                background: 'var(--bg-tertiary)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

window.WhatsNewGuide = WhatsNewGuide;
