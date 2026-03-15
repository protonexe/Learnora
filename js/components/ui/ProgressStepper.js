const ProgressStepper = ({ steps, currentStep, onStepClick }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {steps.map((step, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', flex: idx < steps.length - 1 ? 1 : 'none' }}>
          <button
            onClick={() => onStepClick?.(idx)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: idx <= currentStep ? 'var(--primary-500)' : 'var(--bg-tertiary)',
              border: 'none',
              cursor: 'pointer',
              color: '#fff',
              fontWeight: '700',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {idx < currentStep ? '✓' : idx + 1}
          </button>
          {idx < steps.length - 1 && (
            <div style={{
              flex: 1,
              height: '3px',
              background: idx < currentStep ? 'var(--primary-500)' : 'var(--bg-tertiary)',
              marginLeft: '8px'
            }} />
          )}
        </div>
      ))}
    </div>
  );
};

window.ProgressStepper = ProgressStepper;
