const CourseCard = ({ course, onClick, onBookmark, showBookmark = true }) => {
  const isMobile = window.innerWidth <= 768;
  const [isHovered, setIsHovered] = React.useState(false);

  const isCompleted = course.progress === 100;
  const inProgress = course.progress > 0 && course.progress < 100;

  return (
    <div
      onClick={() => onClick?.(course)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--bg-secondary)',
        border: `1px solid ${isHovered ? course.color + '60' : 'var(--border-color)'}`,
        borderRadius: 'var(--radius-xl)',
        padding: isMobile ? '14px' : '18px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 12px 32px ${course.color}20` : 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Progress Indicator */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '3px',
        width: `${course.progress}%`,
        background: isCompleted ? 'var(--success)' : course.color,
        transition: 'width 0.3s ease'
      }} />

      <div style={{ display: 'flex', gap: isMobile ? '10px' : '12px', marginBottom: '12px' }}>
        <div style={{
          width: isMobile ? '48px' : '56px',
          height: isMobile ? '48px' : '56px',
          background: `${course.color}15`,
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isMobile ? '24px' : '28px',
          border: `2px solid ${course.color}30`,
          flexShrink: 0
        }}>
          {course.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontSize: isMobile ? '14px' : '15px',
            fontWeight: '700',
            margin: '0 0 4px 0',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {course.name}
          </h3>
          <p style={{
            fontSize: isMobile ? '11px' : '12px',
            color: 'var(--text-tertiary)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>{course.chapters} chapters</span>
            <span>•</span>
            <span style={{ color: '#f59e0b', fontWeight: '600' }}>★ {course.rating}</span>
          </p>
        </div>
        {showBookmark && (
          <button
            onClick={(e) => { e.stopPropagation(); onBookmark?.(course); }}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '6px',
              cursor: 'pointer',
              color: 'var(--text-tertiary)',
              borderRadius: '6px'
            }}
          >
            <Icon name="bookmark" size={16} />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '6px'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Progress</span>
          <span style={{
            fontSize: '13px',
            fontWeight: '700',
            color: isCompleted ? 'var(--success)' : course.color
          }}>
            {course.progress}%
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
            width: `${course.progress}%`,
            background: isCompleted ? 'var(--success)' : course.color,
            borderRadius: '3px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Action */}
      <button
        onClick={(e) => { e.stopPropagation(); onClick?.(course); }}
        style={{
          width: '100%',
          padding: '10px',
          background: isCompleted ? 'var(--success)' : course.color,
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          transition: 'all 0.2s ease'
        }}
      >
        {isCompleted ? '✓ Completed' : inProgress ? 'Continue Learning' : 'Start Course'}
      </button>
    </div>
  );
};

const CourseCardSkeleton = () => (
  <div style={{
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-xl)',
    padding: '18px'
  }}>
    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
      <div style={{
        width: '56px',
        height: '56px',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-lg)',
        animation: 'pulse 1.5s infinite'
      }} />
      <div style={{ flex: 1 }}>
        <div style={{
          height: '16px',
          width: '70%',
          background: 'var(--bg-tertiary)',
          borderRadius: '4px',
          marginBottom: '8px',
          animation: 'pulse 1.5s infinite'
        }} />
        <div style={{
          height: '12px',
          width: '40%',
          background: 'var(--bg-tertiary)',
          borderRadius: '4px',
          animation: 'pulse 1.5s infinite'
        }} />
      </div>
    </div>
    <div style={{
      height: '8px',
      background: 'var(--bg-tertiary)',
      borderRadius: '4px',
      animation: 'pulse 1.5s infinite'
    }} />
  </div>
);

window.CourseCard = CourseCard;
window.CourseCardSkeleton = CourseCardSkeleton;
