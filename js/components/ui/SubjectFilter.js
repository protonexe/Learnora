const SubjectFilter = ({ subjects = [], activeSubject, onSelect }) => {
  const isMobile = window.innerWidth <= 768;
  
  const defaultSubjects = [
    { id: 'all', label: 'All', icon: '📚', color: '#6366f1' },
    { id: 'math', label: 'Math', icon: '➗', color: '#6366f1' },
    { id: 'science', label: 'Science', icon: '🔬', color: '#10b981' },
    { id: 'history', label: 'History', icon: '🏛️', color: '#f59e0b' },
    { id: 'english', label: 'English', icon: '📖', color: '#8b5cf6' },
    { id: 'tech', label: 'Tech', icon: '💻', color: '#06b6d4' },
    { id: 'art', label: 'Art', icon: '🎨', color: '#ec4899' },
    { id: 'music', label: 'Music', icon: '🎵', color: '#f97316' },
  ];

  const allSubjects = subjects.length > 0 ? subjects : defaultSubjects;

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      paddingBottom: '8px',
      marginBottom: '16px',
      scrollbarWidth: 'none'
    }}>
      {allSubjects.map(subject => (
        <button
          key={subject.id}
          onClick={() => onSelect(subject.id)}
          style={{
            padding: isMobile ? '8px 12px' : '10px 16px',
            background: activeSubject === subject.id 
              ? subject.color || 'var(--primary-500)' 
              : 'var(--bg-tertiary)',
            color: activeSubject === subject.id 
              ? '#fff' 
              : 'var(--text-secondary)',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: isMobile ? '12px' : '13px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            boxShadow: activeSubject === subject.id 
              ? `0 4px 12px ${subject.color || 'var(--primary-500)'}40` 
              : 'none'
          }}
        >
          <span style={{ fontSize: isMobile ? '14px' : '16px' }}>
            {subject.icon}
          </span>
          {subject.label}
        </button>
      ))}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

const DifficultyBadge = ({ difficulty }) => {
  const difficultyConfig = {
    beginner: { label: 'Beginner', color: '#10b981', icon: '🌱' },
    intermediate: { label: 'Intermediate', color: '#f59e0b', icon: '🌿' },
    advanced: { label: 'Advanced', color: '#ef4444', icon: '🌳' },
    expert: { label: 'Expert', color: '#8b5cf6', icon: '⭐' }
  };

  const config = difficultyConfig[difficulty?.toLowerCase()] || difficultyConfig.beginner;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '3px 8px',
      background: `${config.color}15`,
      color: config.color,
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: '600'
    }}>
      {config.icon} {config.label}
    </span>
  );
};

const ProgressBadge = ({ progress }) => {
  let config;
  
  if (progress === 0) {
    config = { label: 'Not Started', color: 'var(--text-tertiary)', icon: '⭕' };
  } else if (progress < 50) {
    config = { label: 'In Progress', color: '#f59e0b', icon: '📖' };
  } else if (progress < 100) {
    config = { label: 'Almost Done', color: '#6366f1', icon: '🔥' };
  } else {
    config = { label: 'Completed', color: '#10b981', icon: '✅' };
  }

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '3px 8px',
      background: `${config.color}15`,
      color: config.color,
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: '600'
    }}>
      {config.icon} {config.label}
    </span>
  );
};

window.SubjectFilter = SubjectFilter;
window.DifficultyBadge = DifficultyBadge;
window.ProgressBadge = ProgressBadge;
