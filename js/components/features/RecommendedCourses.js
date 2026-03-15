const RecommendedCourses = ({ enrolledCourses = [], limit = 4 }) => {
  const [recommendations, setRecommendations] = React.useState([]);
  const isMobile = window.innerWidth <= 768;

  React.useEffect(() => {
    generateRecommendations();
  }, []);

  const generateRecommendations = () => {
    // Sample recommendations based on common learning paths
    const allRecommendations = [
      { id: 'rec1', name: 'Advanced Mathematics', icon: '➗', color: '#6366f1', category: 'Mathematics', rating: 4.9, students: 12500 },
      { id: 'rec2', name: 'Physics Fundamentals', icon: '⚛️', color: '#10b981', category: 'Science', rating: 4.8, students: 9800 },
      { id: 'rec3', name: 'World History', icon: '🏛️', color: '#f59e0b', category: 'History', rating: 4.7, students: 8200 },
      { id: 'rec4', name: 'Creative Writing', icon: '✍️', color: '#8b5cf6', category: 'English', rating: 4.9, students: 6500 },
      { id: 'rec5', name: 'Computer Science Basics', icon: '💻', color: '#06b6d4', category: 'Technology', rating: 4.8, students: 15000 },
      { id: 'rec6', name: 'Biology Essentials', icon: '🧬', color: '#ec4899', category: 'Science', rating: 4.7, students: 7100 },
    ];

    // Filter out already enrolled courses
    const enrolledIds = enrolledCourses.map(c => c.id);
    const filtered = allRecommendations.filter(r => !enrolledIds.includes(r.id));
    
    setRecommendations(filtered.slice(0, limit));
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
          <span style={{ fontSize: '18px' }}>✨</span>
          Recommended For You
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {recommendations.map((course, idx) => (
          <div key={course.id || idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: `${course.color}20`,
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              border: `2px solid ${course.color}40`
            }}>
              {course.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                margin: '0 0 2px 0',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {course.name}
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  background: 'var(--bg-secondary)',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {course.category}
                </span>
                <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '600' }}>
                  ★ {course.rating}
                </span>
              </div>
            </div>
            <button style={{
              padding: '6px 12px',
              background: 'var(--primary-500)',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

window.RecommendedCourses = RecommendedCourses;
