const StepIndicator = ({ steps = [], currentStep = 0, orientation = 'horizontal' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      gap: orientation === 'horizontal' ? '8px' : '0'
    }}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;
        
        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', flex: orientation === 'horizontal' ? 1 : 'none' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: isCompleted ? 'var(--success)' : isCurrent ? 'var(--primary-500)' : 'var(--bg-tertiary)',
              color: isCompleted || isCurrent ? '#fff' : 'var(--text-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '700',
              flexShrink: 0
            }}>
              {isCompleted ? '✓' : idx + 1}
            </div>
            <div style={{ marginLeft: '12px', flex: 1, display: orientation === 'vertical' ? 'none' : 'block' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{step.label}</div>
              {step.description && <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{step.description}</div>}
            </div>
            {idx < steps.length - 1 && (
              <div style={{
                flex: 1,
                height: orientation === 'vertical' ? '24px' : '2px',
                width: orientation === 'horizontal' ? 'auto' : '2px',
                background: isCompleted ? 'var(--success)' : 'var(--bg-tertiary)',
                marginLeft: orientation === 'horizontal' ? '8px' : '0',
                marginTop: orientation === 'vertical' ? '8px' : '0'
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

window.StepIndicator = StepIndicator;
