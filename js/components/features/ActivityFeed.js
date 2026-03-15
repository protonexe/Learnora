const ActivityFeed = ({ limit = 5 }) => {
  const [activities, setActivities] = React.useState([]);
  const isMobile = window.innerWidth <= 768;

  React.useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = () => {
    if (window.Database) {
      const allActivities = window.Database.getActivityLog?.() || [];
      setActivities(allActivities.slice(0, limit));
    }
    
    if (activities.length === 0) {
      setActivities([
        { id: 1, type: 'course', title: 'Completed Math Chapter 5', icon: '📚', time: '2 hours ago', color: '#6366f1' },
        { id: 2, type: 'quiz', title: 'Scored 92% on Physics Quiz', icon: '📝', time: '4 hours ago', color: '#10b981' },
        { id: 3, type: 'achievement', title: 'Earned "Quick Learner" badge', icon: '🏆', time: '1 day ago', color: '#f59e0b' },
        { id: 4, type: 'streak', title: '7-day study streak!', icon: '🔥', time: '1 day ago', color: '#ef4444' },
        { id: 5, type: 'flashcard', title: 'Mastered 50 Chemistry cards', icon: '🗂️', time: '2 days ago', color: '#8b5cf6' },
      ]);
    }
  };

  const getActivityIcon = (type) => {
    const icons = {
      course: '📚',
      quiz: '📝',
      achievement: '🏆',
      streak: '🔥',
      flashcard: '🗂️',
      assignment: '📋',
      message: '💬',
      video: '🎬',
      ebook: '📖'
    };
    return icons[type] || '📌';
  };

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      padding: isMobile ? '14px' : '18px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: isMobile ? '12px' : '16px'
      }}>
        <h3 style={{
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '700',
          margin: 0,
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '18px' }}>⚡</span>
          Recent Activity
        </h3>
        <button style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--accent-blue)',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          View All
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {activities.slice(0, limit).map((activity, idx) => (
          <div key={activity.id || idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            transition: 'all 0.2s ease'
          }}>
            <div style={{
              width: isMobile ? '32px' : '36px',
              height: isMobile ? '32px' : '36px',
              background: `${activity.color || '#6366f1'}15`,
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '16px' : '18px',
              flexShrink: 0
            }}>
              {activity.icon || getActivityIcon(activity.type)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: isMobile ? '12px' : '13px',
                fontWeight: '600',
                margin: 0,
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {activity.title}
              </p>
              <p style={{
                fontSize: isMobile ? '10px' : '11px',
                color: 'var(--text-tertiary)',
                margin: '2px 0 0 0'
              }}>
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.ActivityFeed = ActivityFeed;
