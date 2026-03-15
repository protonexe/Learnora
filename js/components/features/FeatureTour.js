const FeatureTour = ({ steps, isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const isMobile = window.innerWidth <= 768;

  React.useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.();
      onClose();
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3000,
      backdropFilter: 'blur(4px)'
    }}>
      {/* Progress Bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'var(--bg-tertiary)'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'var(--primary-500)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: isMobile ? '16px' : '20px',
        width: isMobile ? '90vw' : '420px',
        padding: isMobile ? '20px' : '28px',
        boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
        textAlign: 'center'
      }}>
        {/* Step Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginBottom: '20px'
        }}>
          {steps.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: idx === currentStep ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: idx === currentStep ? 'var(--primary-500)' : idx < currentStep ? 'var(--primary-500)' : 'var(--bg-tertiary)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Icon */}
        <div style={{
          fontSize: '56px',
          marginBottom: '16px',
          animation: 'bounce 0.5s ease'
        }}>
          {step?.icon || '🎯'}
        </div>

        {/* Content */}
        <h3 style={{
          fontSize: isMobile ? '18px' : '22px',
          fontWeight: '700',
          margin: '0 0 12px 0',
          color: 'var(--text-primary)'
        }}>
          {step?.title || 'Welcome'}
        </h3>
        
        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          margin: '0 0 24px 0',
          lineHeight: '1.6'
        }}>
          {step?.description || 'Let\'s show you around!'}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              background: 'var(--bg-tertiary)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--text-secondary)'
            }}
          >
            Skip
          </button>
          <button
            onClick={goNext}
            style={{
              flex: 2,
              padding: '12px',
              background: 'var(--primary-500)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: '#fff'
            }}
          >
            {currentStep < steps.length - 1 ? 'Next' : 'Get Started!'}
          </button>
        </div>

        {/* Step Counter */}
        <p style={{
          fontSize: '12px',
          color: 'var(--text-tertiary)',
          margin: '16px 0 0 0'
        }}>
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

const defaultTourSteps = [
  {
    icon: '🔍',
    title: 'Global Search',
    description: 'Press Ctrl+K to quickly search for courses, quizzes, notes, and more!'
  },
  {
    icon: '⏱️',
    title: 'Study Timer',
    description: 'Use the Pomodoro timer (Ctrl+T) to stay focused during study sessions.'
  },
  {
    icon: '📊',
    title: 'Track Progress',
    description: 'View your achievements, streak, and learning analytics on the dashboard.'
  },
  {
    icon: '🔖',
    title: 'Bookmarks',
    description: 'Save your favorite courses and content for quick access later.'
  },
  {
    icon: '🎓',
    title: 'Certificates',
    description: 'Complete courses to earn printable completion certificates!'
  }
];

window.FeatureTour = FeatureTour;
window.defaultTourSteps = defaultTourSteps;
