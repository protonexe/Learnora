const Timeline = ({ events = [], orientation = 'vertical' }) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div style={{
      display: 'flex',
      flexDirection: orientation,
      gap: '24px',
      padding: '20px 0'
    }}>
      {events.map((event, idx) => (
        <div key={idx} style={{ display: 'flex', gap: '16px', flex: isHorizontal ? 1 : 'none' }}>
          {/* Timeline Line & Dot */}
          <div style={{
            display: 'flex',
            flexDirection: isHorizontal ? 'column' : 'row',
            alignItems: 'center'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: event.color || 'var(--primary-500)',
              boxShadow: `0 0 0 4px ${(event.color || 'var(--primary-500)')}20`,
              flexShrink: 0
            }} />
            {idx < events.length - 1 && (
              <div style={{
                width: isHorizontal ? '100%' : '2px',
                height: isHorizontal ? '2px' : '40px',
                background: 'var(--border-color)',
                marginTop: isHorizontal ? '0' : '0',
                marginLeft: isHorizontal ? '0' : '5px'
              }} />
            )}
          </div>

          {/* Event Content */}
          <div style={{
            flex: 1,
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' }}>
                {event.title}
              </h4>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                {event.date}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
              {event.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

window.Timeline = Timeline;
