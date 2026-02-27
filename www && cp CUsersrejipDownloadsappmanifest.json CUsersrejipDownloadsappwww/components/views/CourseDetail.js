const CourseDetailView = ({ 
  course, 
  onBack, 
  onOpenQuiz, 
  onOpenFlashcards, 
  saveLastPosition, 
  registerStudyActivity, 
  showToast 
}) => {
  if (!course) return null;

  const getChapterStatus = (index) => {
    const progressIndex = Math.floor((course.progress / 100) * course.chapters);
    if (index < progressIndex) return 'completed';
    if (index === progressIndex) return 'current';
    return 'locked';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 20px' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '12px' }}>
        <button 
          onClick={onBack}
          style={{
            background: 'none',
            border: '2px solid var(--border-strong)',
            color: 'var(--text-secondary)',
            fontSize: '12px',
            cursor: 'pointer',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span style={{ fontSize: '14px' }}>←</span> Back to Courses
        </button>
      </div>

      {/* Course Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '12px',
          marginBottom: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'var(--bg-tertiary)',
            borderRadius: '6px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Icon name="book-open" size={18} color="var(--text-secondary)" />
          </div>
          
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '-0.3px',
              color: 'var(--text-primary)',
              marginBottom: '2px'
            }}>
              {course.name}
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: 'var(--text-secondary)'
            }}>
              <span>{course.chapters} chapters</span>
              <span style={{ color: 'var(--border-color)' }}>•</span>
              <span>{course.students.toLocaleString()} students</span>
              <span style={{ color: 'var(--border-color)' }}>•</span>
              <span>{course.rating} rating</span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div style={{
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          padding: '12px',
          background: 'var(--bg-secondary)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px'
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--text-secondary)'
            }}>
              Your Progress
            </span>
            <span style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}>
              {course.progress}%
            </span>
          </div>
          <div style={{
            height: '3px',
            background: 'var(--bg-tertiary)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${course.progress}%`,
              background: 'var(--text-primary)',
              borderRadius: '2px'
            }} />
          </div>
          <p style={{
            fontSize: '11px',
            color: 'var(--text-tertiary)',
            marginTop: '6px'
          }}>
            {course.progress === 0 
              ? 'Start your learning journey today' 
              : course.progress === 100 
                ? 'Course completed' 
                : 'Continue learning'}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '6px',
          marginTop: '12px'
        }}>
          <Button
            onClick={() => {
              const currentChapter = Math.floor((course.progress / 100) * course.chapters);
              saveLastPosition(course.id, currentChapter);
              registerStudyActivity();
              showToast('Continuing your learning...', 'success');
            }}
            style={{ minWidth: '120px', fontSize: '13px', padding: '8px 12px' }}
          >
            {course.progress === 0 ? 'Start Learning' : 'Continue'}
          </Button>
          
          <Button
            variant="secondary"
            onClick={onOpenQuiz}
            style={{ fontSize: '13px', padding: '8px 12px' }}
          >
            Quiz
          </Button>
          
          <Button
            variant="secondary"
            onClick={onOpenFlashcards}
            style={{ fontSize: '13px', padding: '8px 12px' }}
          >
            Cards
          </Button>
        </div>
      </div>

      {/* Chapters Section */}
      <div>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 600,
          letterSpacing: '-0.2px',
          color: 'var(--text-primary)',
          marginBottom: '8px'
        }}>
          Course Content
        </h2>
        <p style={{
          fontSize: '11px',
          color: 'var(--text-tertiary)',
          marginBottom: '10px'
        }}>
          {Math.floor((course.progress / 100) * course.chapters)} of {course.chapters} chapters completed
        </p>

        {/* Chapter List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {Array.from({ length: course.chapters }, (_, i) => {
            const status = getChapterStatus(i);
            const isCompleted = status === 'completed';
            const isCurrent = status === 'current';
            
            return (
              <div
                key={i}
                onClick={() => {
                  if (!isCompleted && !isCurrent) {
                    showToast('Complete previous chapters first', 'warning');
                    return;
                  }
                  saveLastPosition(course.id, i);
                  registerStudyActivity();
                  showToast(`Started Chapter ${i + 1}`, 'success');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px',
                  background: isCurrent ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                  borderRadius: '6px',
                  border: isCurrent ? '1px solid var(--border-color)' : '1px solid var(--border-color)',
                  cursor: isCompleted || isCurrent ? 'pointer' : 'not-allowed',
                  opacity: status === 'locked' ? 0.5 : 1,
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (isCompleted || isCurrent) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isCurrent) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  }
                }}
              >
                {/* Chapter Number */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '4px',
                  background: isCompleted
                    ? 'var(--text-primary)'
                    : 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {isCompleted ? (
                    <span style={{ color: 'var(--bg-primary)', fontSize: '12px', fontWeight: 600 }}>✓</span>
                  ) : (
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: isCurrent ? 'var(--text-primary)' : 'var(--text-tertiary)'
                    }}>{i + 1}</span>
                  )}
                </div>

                {/* Chapter Info */}
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: '1px'
                  }}>
                    Chapter {i + 1}
                  </h4>
                  <p style={{
                    fontSize: '11px',
                    color: 'var(--text-tertiary)'
                  }}>
                    {isCompleted 
                      ? 'Completed' 
                      : isCurrent 
                        ? 'Continue learning' 
                        : 'Locked'}
                  </p>
                </div>

                {/* Status */}
                {isCurrent && (
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Current
                  </span>
                )}
                
                {status === 'locked' && (
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>⊘</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

window.CourseDetailView = CourseDetailView;
