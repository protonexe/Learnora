const Onboarding = ({ onComplete }) => {
  const [step, setStep] = React.useState(0);
  
  const steps = [
    { emoji: '👋', title: 'Welcome to LEARNORA', description: 'Your smart education platform designed for focused, effective learning.', color: 'var(--gradient-primary)' },
    { emoji: '🔐', title: 'Secure Access', description: 'NFC authentication ensures only authorized users can access the platform.', color: 'var(--gradient-secondary)' },
    { emoji: '🤖', title: 'AI-Powered Tutoring', description: 'Get instant, personalized help from your AI tutor anytime you need it.', color: 'var(--gradient-cool)' },
    { emoji: '📊', title: 'Track Progress', description: 'Beautiful analytics visualize your learning journey and achievements.', color: 'var(--gradient-warm)' },
    { emoji: '🚀', title: 'Ready to Learn!', description: 'Start your personalized learning journey now.', color: 'var(--gradient-primary)' }
  ];
  
  const currentStep = steps[step];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-2xl)',
        maxWidth: '480px',
        width: '100%',
        padding: '48px 40px',
        textAlign: 'center',
        animation: 'scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        border: '1px solid var(--border-color)'
      }}>
        {/* Progress Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
          {steps.map((_, idx) => (
            <div 
              key={idx} 
              style={{ 
                width: idx === step ? '28px' : '8px', 
                height: '8px', 
                borderRadius: 'var(--radius-full)', 
                background: idx === step ? 'var(--gradient-primary)' : 'var(--bg-tertiary)', 
                transition: 'all var(--transition-normal)' 
              }} 
            />
          ))}
        </div>
        
        {/* Icon */}
        <div style={{ 
          width: '100px', 
          height: '100px', 
          margin: '0 auto 28px', 
          background: currentStep.color, 
          borderRadius: 'var(--radius-2xl)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '48px', 
          animation: 'scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          boxShadow: 'var(--shadow-xl)'
        }}>
          {currentStep.emoji}
        </div>
        
        {/* Content */}
        <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.02em' }}>
          {currentStep.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.7', fontSize: '15px' }}>
          {currentStep.description}
        </p>
        
        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep(step - 1)} style={{ flex: 1 }}>
              Back
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)} style={{ flex: 1 }} iconRight="arrow-right" size="lg">
              Continue
            </Button>
          ) : (
            <Button onClick={onComplete} style={{ flex: 1 }} icon="check" size="lg">
              Get Started
            </Button>
          )}
        </div>
        
        {/* Skip */}
        {step < steps.length - 1 && (
          <button 
            onClick={onComplete} 
            style={{ 
              background: 'transparent', 
              border: '1px solid var(--border-light)', 
              color: 'var(--text-secondary)', 
              fontSize: '14px', 
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              marginTop: '24px', 
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Skip Tour
          </button>
        )}
      </div>
    </div>
  );
};

window.Onboarding = Onboarding;