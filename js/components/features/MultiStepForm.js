const MultiStepForm = ({ steps = [], onComplete }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

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
      {/* Progress */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>{step.title}</span>
          <span style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div style={{
          height: '6px',
          background: 'var(--bg-tertiary)',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--primary-500)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Step Content */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid var(--border-color)',
        marginBottom: '20px'
      }}>
        {step.content(formData, updateData)}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          style={{
            flex: 1,
            padding: '14px',
            background: 'var(--bg-tertiary)',
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
          {currentStep === steps.length - 1 ? 'Complete' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

window.MultiStepForm = MultiStepForm;
