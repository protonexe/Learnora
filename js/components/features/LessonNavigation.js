const LessonNavigation = ({ 
  chapters = [], 
  currentChapter = 0,
  onSelectChapter,
  onPrevious,
  onNext,
  isCompleted 
}) => {
  const isMobile = window.innerWidth <= 768;
  const [isExpanded, setIsExpanded] = React.useState(!isMobile);

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Icon name={isExpanded ? 'chevron-down' : 'chevron-right'} size={18} color="var(--text-secondary)" />
          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Course Content
          </span>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
          {chapters.length} chapters
        </span>
      </div>

      {/* Chapter List */}
      {isExpanded && (
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {chapters.map((chapter, idx) => {
            const isCurrent = idx === currentChapter;
            const isPast = idx < currentChapter;
            
            return (
              <div
                key={idx}
                onClick={() => onSelectChapter?.(idx)}
                style={{
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  background: isCurrent ? 'var(--primary-500)10' : 'transparent',
                  borderBottom: '1px solid var(--border-color)',
                  transition: 'background 0.2s ease'
                }}
              >
                {/* Status Icon */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isPast ? 'var(--success)' : isCurrent ? 'var(--primary-500)' : 'var(--bg-tertiary)',
                  color: isPast || isCurrent ? '#fff' : 'var(--text-tertiary)',
                  fontSize: '12px',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  {isPast ? '✓' : idx + 1}
                </div>

                {/* Chapter Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: '13px',
                    fontWeight: isCurrent ? '600' : '500',
                    color: isCurrent ? 'var(--primary-500)' : 'var(--text-primary)',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {chapter.title || `Chapter ${idx + 1}`}
                  </p>
                  <p style={{
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    margin: '2px 0 0 0'
                  }}>
                    {chapter.duration || '10 min'}
                  </p>
                </div>

                {/* Play Icon */}
                {isCurrent && (
                  <Icon name="play-circle" size={20} color="var(--primary-500)" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{
        padding: '12px 16px',
        display: 'flex',
        gap: '8px',
        borderTop: '1px solid var(--border-color)'
      }}>
        <button
          onClick={onPrevious}
          disabled={currentChapter === 0}
          style={{
            flex: 1,
            padding: '10px',
            background: currentChapter === 0 ? 'var(--bg-tertiary)' : 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            cursor: currentChapter === 0 ? 'not-allowed' : 'pointer',
            color: currentChapter === 0 ? 'var(--text-tertiary)' : 'var(--text-primary)',
            fontSize: '13px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            opacity: currentChapter === 0 ? 0.5 : 1
          }}
        >
          <Icon name="chevron-left" size={16} />
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={currentChapter === chapters.length - 1}
          style={{
            flex: 1,
            padding: '10px',
            background: currentChapter === chapters.length - 1 ? 'var(--bg-tertiary)' : 'var(--primary-500)',
            border: 'none',
            borderRadius: '8px',
            cursor: currentChapter === chapters.length - 1 ? 'not-allowed' : 'pointer',
            color: currentChapter === chapters.length - 1 ? 'var(--text-tertiary)' : '#fff',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            opacity: currentChapter === chapters.length - 1 ? 0.5 : 1
          }}
        >
          {isCompleted ? 'Complete' : 'Next'}
          <Icon name="chevron-right" size={16} />
        </button>
      </div>
    </div>
  );
};

window.LessonNavigation = LessonNavigation;
