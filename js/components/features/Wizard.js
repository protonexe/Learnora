const Stepper = ({ steps, currentStep, onStepClick }) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Steps */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        marginBottom: '8px'
      }}>
        {/* Progress Line */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '40px',
          right: '40px',
          height: '2px',
          background: 'var(--bg-tertiary)',
          zIndex: 0
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
            background: 'var(--primary-500)',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 1,
                cursor: onStepClick ? 'pointer' : 'default'
              }}
              onClick={() => onStepClick?.(idx)}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: isCompleted || isCurrent ? 'var(--primary-500)' : 'var(--bg-tertiary)',
                color: isCompleted || isCurrent ? '#fff' : 'var(--text-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '700',
                marginBottom: '8px',
                boxShadow: isCurrent ? '0 4px 12px var(--primary-500)40' : 'none',
                transition: 'all 0.3s ease'
              }}>
                {isCompleted ? '✓' : idx + 1}
              </div>
              {!isMobile && (
                <div style={{
                  fontSize: '12px',
                  fontWeight: isCurrent ? '600' : '500',
                  color: isCurrent ? 'var(--primary-500)' : 'var(--text-secondary)',
                  textAlign: 'center'
                }}>
                  {step.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Wizard = ({ steps, initialStep = 0, onComplete }) => {
  const [currentStep, setCurrentStep] = React.useState(initialStep);
  const [formData, setFormData] = React.useState({});

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (data) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <div>
      <Stepper
        steps={steps.map(s => ({ label: s.title }))}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />

      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        border: '1px solid var(--border-color)',
        marginBottom: '20px'
      }}>
        {steps[currentStep].content(formData, updateData)}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          style={{
            flex: 1,
            padding: '14px',
            background: currentStep === 0 ? 'var(--bg-tertiary)' : 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            color: currentStep === 0 ? 'var(--text-tertiary)' : 'var(--text-primary)',
            opacity: currentStep === 0 ? 0.5 : 1
          }}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          style={{
            flex: 2,
            padding: '14px',
            background: 'var(--primary-500)',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            color: '#fff'
          }}
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
};

window.Stepper = Stepper;
window.Wizard = Wizard;
