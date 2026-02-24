const CoursesView = ({ courses, courseSearch, setCourseSearch, onSelectCourse, onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: '🌐' },
    { id: 'science', label: 'Science', icon: '🔬' },
    { id: 'math', label: 'Math', icon: '📐' },
    { id: 'humanities', label: 'Arts', icon: '📚' },
  ];

  const getCategoryForCourse = (courseName) => {
    const name = courseName.toLowerCase();
    if (name.includes('physics') || name.includes('chemistry') || name.includes('biology')) return 'science';
    if (name.includes('math')) return 'math';
    return 'humanities';
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = courseSearch
      ? course.name.toLowerCase().includes(courseSearch.toLowerCase())
      : true;
    const matchesCategory = selectedCategory === 'all'
      || getCategoryForCourse(course.name) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const inProgressCourses = filteredCourses.filter(c => c.progress > 0 && c.progress < 100);
  const completedCourses = filteredCourses.filter(c => c.progress === 100);
  const notStartedCourses = filteredCourses.filter(c => c.progress === 0);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      {/* Compact Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: isMobile ? '12px' : '16px'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: isMobile ? '13px' : '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px'
          }}
        >
          <Icon name="arrow-left" size={16} />
          Back
        </button>
        <h1 style={{
          fontSize: isMobile ? '18px' : '22px',
          fontWeight: 700,
          letterSpacing: '-0.02em'
        }}>
          My Courses
        </h1>
        <div style={{ width: '50px' }} />
      </div>

      {/* Search & Filter Row */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '8px' : '12px',
        marginBottom: isMobile ? '12px' : '16px'
      }}>
        {/* Search */}
        <div style={{
          flex: 1,
          position: 'relative'
        }}>
          <Icon 
            name="search" 
            size={16} 
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: 0.5
            }}
          />
          <input
            type="text"
            placeholder="Search courses..."
            value={courseSearch}
            onChange={(e) => setCourseSearch(e.target.value)}
            style={{
              width: '100%',
              padding: isMobile ? '10px 12px 10px 36px' : '10px 14px 10px 40px',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '2px'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: isMobile ? '8px 12px' : '8px 14px',
                background: selectedCategory === cat.id ? 'var(--primary-500)' : 'var(--bg-secondary)',
                color: selectedCategory === cat.id ? '#fff' : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              <span>{cat.icon}</span>
              {!isMobile && cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Compact Stats */}
      <div style={{
        display: 'flex',
        gap: isMobile ? '8px' : '12px',
        marginBottom: isMobile ? '16px' : '20px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: isMobile ? '8px 12px' : '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0
        }}>
          <span style={{ fontSize: isMobile ? '16px' : '18px' }}>📚</span>
          <div>
            <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', margin: 0 }}>Total</p>
            <p style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 700, margin: 0 }}>{courses.length}</p>
          </div>
        </div>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: isMobile ? '8px 12px' : '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0
        }}>
          <span style={{ fontSize: isMobile ? '16px' : '18px' }}>✅</span>
          <div>
            <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', margin: 0 }}>Done</p>
            <p style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 700, margin: 0, color: 'var(--success)' }}>
              {completedCourses.length}
            </p>
          </div>
        </div>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: isMobile ? '8px 12px' : '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0
        }}>
          <span style={{ fontSize: isMobile ? '16px' : '18px' }}>📈</span>
          <div>
            <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', margin: 0 }}>Progress</p>
            <p style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 700, margin: 0 }}>
              {Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)}%
            </p>
          </div>
        </div>
      </div>

      {/* In Progress */}
      {inProgressCourses.length > 0 && (
        <div style={{ marginBottom: isMobile ? '16px' : '20px' }}>
          <h2 style={{
            fontSize: isMobile ? '14px' : '15px',
            fontWeight: 700,
            marginBottom: isMobile ? '8px' : '10px',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Icon name="play-circle" size={16} />
            Continue ({inProgressCourses.length})
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: isMobile ? '8px' : '12px'
          }}>
            {inProgressCourses.map(course => (
              <CompactCourseCard
                key={course.id}
                course={course}
                onClick={() => onSelectCourse(course)}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      )}

      {/* Not Started */}
      {notStartedCourses.length > 0 && (
        <div style={{ marginBottom: isMobile ? '16px' : '20px' }}>
          <h2 style={{
            fontSize: isMobile ? '14px' : '15px',
            fontWeight: 700,
            marginBottom: isMobile ? '8px' : '10px',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Icon name="star" size={16} />
            New ({notStartedCourses.length})
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: isMobile ? '8px' : '12px'
          }}>
            {notStartedCourses.map(course => (
              <CompactCourseCard
                key={course.id}
                course={course}
                onClick={() => onSelectCourse(course)}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {completedCourses.length > 0 && (
        <div>
          <h2 style={{
            fontSize: isMobile ? '14px' : '15px',
            fontWeight: 700,
            marginBottom: isMobile ? '8px' : '10px',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Icon name="check-circle" size={16} />
            Completed ({completedCourses.length})
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: isMobile ? '8px' : '12px'
          }}>
            {completedCourses.map(course => (
              <CompactCourseCard
                key={course.id}
                course={course}
                onClick={() => onSelectCourse(course)}
                completed
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: isMobile ? '32px 16px' : '40px 24px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--border-color)'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '4px'
          }}>
            No courses found
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Try adjusting your search
          </p>
        </div>
      )}
    </div>
  );
};

// Compact Course Card
const CompactCourseCard = ({ course, onClick, completed, isMobile }) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: isMobile ? '12px' : '14px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '10px' : '12px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = course.color + '60';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Icon */}
      <div style={{
        width: isMobile ? '40px' : '44px',
        height: isMobile ? '40px' : '44px',
        background: `${course.color}15`,
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: isMobile ? '20px' : '22px',
        flexShrink: 0,
        border: `2px solid ${course.color}30`
      }}>
        {course.icon}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px'
        }}>
          <h3 style={{
            fontSize: isMobile ? '14px' : '15px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {course.name}
          </h3>
          
          {completed && (
            <Icon name="check-circle" size={16} color="var(--success)" />
          )}
        </div>

        {/* Progress */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            flex: 1,
            height: '5px',
            background: 'var(--bg-tertiary)',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${course.progress}%`,
              background: completed ? 'var(--success)' : course.color,
              borderRadius: '3px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <span style={{
            fontSize: '12px',
            fontWeight: 700,
            color: completed ? 'var(--success)' : course.color,
            flexShrink: 0,
            minWidth: '32px',
            textAlign: 'right'
          }}>
            {course.progress}%
          </span>
        </div>
      </div>

      {/* Arrow */}
      <Icon 
        name="chevron-right" 
        size={18} 
        color="var(--text-tertiary)"
        style={{ flexShrink: 0 }}
      />
    </div>
  );
};

window.CoursesView = CoursesView;
