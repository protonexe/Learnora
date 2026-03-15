const DateRangePicker = ({ startDate, endDate, onChange }) => {
  const [active, setActive] = React.useState('start');
  
  const presets = [
    { label: 'Today', days: 0 },
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'This Month', days: 'month' },
    { label: 'Last Month', days: 'lastMonth' }
  ];

  const applyPreset = (preset) => {
    const today = new Date();
    let start, end;
    
    if (preset.days === 0) {
      start = end = today;
    } else if (preset.days === 'month') {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = today;
    } else if (preset.days === 'lastMonth') {
      start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      end = new Date(today.getFullYear(), today.getMonth(), 0);
    } else {
      end = today;
      start = new Date(today.setDate(today.getDate() - preset.days));
    }
    
    onChange?.(start, end);
  };

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      border: '1px solid var(--border-color)',
      padding: '16px'
    }}>
      {/* Presets */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => applyPreset(preset)}
            style={{
              padding: '6px 12px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              color: 'var(--text-secondary)'
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Date Inputs */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '6px', display: 'block' }}>Start Date</label>
          <input
            type="date"
            value={startDate?.toISOString?.().split('T')[0] || ''}
            onChange={(e) => onChange?.(new Date(e.target.value), endDate)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-primary)',
              fontSize: '14px'
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '6px', display: 'block' }}>End Date</label>
          <input
            type="date"
            value={endDate?.toISOString?.().split('T')[0] || ''}
            onChange={(e) => onChange?.(startDate, new Date(e.target.value))}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-primary)',
              fontSize: '14px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

window.DateRangePicker = DateRangePicker;
