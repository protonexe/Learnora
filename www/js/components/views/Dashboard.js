const DashboardView = ({
  courses,
  stats,
  streak,
  lastPosition,
  onSelectCourse,
  onNavigate,
  onOpenQuiz,
  onOpenFlashcards,
  onOpenAIChat
}) => {
  const isMobile = window.innerWidth <= 768;

  const [showWelcome, setShowWelcome] = React.useState(() => {
    const saved = localStorage.getItem('learnora-show-welcome');
    return saved !== 'false';
  });

  const [teacherCourses, setTeacherCourses] = React.useState([]);
  const [teacherQuizzes, setTeacherQuizzes] = React.useState([]);
  const [teacherFlashcards, setTeacherFlashcards] = React.useState([]);
  const [teacherAssignments, setTeacherAssignments] = React.useState([]);

  React.useEffect(() => {
    loadTeacherContent();
  }, []);

  const loadTeacherContent = () => {
    if (window.Database) {
      const db = window.Database;
      setTeacherCourses(db.getAllCourses() || []);
      setTeacherQuizzes(db.getAllQuizzes() || []);
      setTeacherFlashcards(db.getAllFlashcardDecks() || []);
      setTeacherAssignments(db.getAllAssignments() || []);
    }
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('learnora-show-welcome', 'false');
  };

  const allCourses = [...courses, ...teacherCourses.map(c => ({ ...c, isTeacherCourse: true }))];
  const inProgressCourses = allCourses.filter(c => c.progress > 0 && c.progress < 100);
  const notStartedCourses = allCourses.filter(c => c.progress === 0);
  const completedCourses = allCourses.filter(c => c.progress === 100);

  return (
    <>
      {/* Compact Header Row - Stats integrated into a single row */}
      <div style={{
        display: 'flex',
        gap: isMobile ? '8px' : '12px',
        marginBottom: isMobile ? '16px' : '24px',
        flexWrap: 'wrap'
      }}>
        {stats.slice(0, isMobile ? 2 : 4).map((stat, idx) => (
          <div key={idx} style={{
            flex: isMobile ? '1 1 45%' : '1',
            minWidth: isMobile ? '140px' : '160px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: isMobile ? '12px' : '16px',
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '8px' : '12px'
          }}>
            <div style={{
              width: isMobile ? '36px' : '40px',
              height: isMobile ? '36px' : '40px',
              background: `${stat.color}15`,
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '18px' : '20px'
            }}>
              <Icon name={stat.icon} size={isMobile ? 18 : 20} color={stat.color} />
            </div>
            <div>
              <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-tertiary)', margin: '0 0 2px 0' }}>
                {stat.label}
              </p>
              <p style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
        {streak.current > 0 && (
          <div style={{
            flex: isMobile ? '1 1 45%' : '0 0 auto',
            minWidth: isMobile ? '140px' : 'auto',
            background: 'var(--gradient-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: isMobile ? '12px' : '16px',
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '8px' : '12px',
            color: '#fff'
          }}>
            <div style={{
              width: isMobile ? '36px' : '40px',
              height: isMobile ? '36px' : '40px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '18px' : '20px'
            }}>
              <Icon name="zap" size={isMobile ? 18 : 20} color="#fff" />
            </div>
            <div>
              <p style={{ fontSize: isMobile ? '11px' : '12px', opacity: 0.9, margin: '0 0 2px 0' }}>
                Streak
              </p>
              <p style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '700', margin: 0 }}>
                {streak.current} days
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions - Horizontal on desktop */}
      <div style={{
        display: 'flex',
        gap: isMobile ? '8px' : '12px',
        marginBottom: isMobile ? '16px' : '24px',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        overflowX: isMobile ? 'auto' : 'visible'
      }}>
        <button
          onClick={onOpenQuiz}
          style={{
            flex: isMobile ? '1 1 45%' : '1',
            padding: isMobile ? '12px' : '14px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            transition: 'all 0.2s ease',
            minWidth: isMobile ? '140px' : 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-tertiary)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-secondary)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Icon name="help-circle" size={18} color="var(--accent-blue)" />
          <span>Take Quiz</span>
        </button>
        <button
          onClick={onOpenFlashcards}
          style={{
            flex: isMobile ? '1 1 45%' : '1',
            padding: isMobile ? '12px' : '14px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            transition: 'all 0.2s ease',
            minWidth: isMobile ? '140px' : 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-tertiary)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-secondary)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Icon name="layers" size={18} color="var(--accent-teal)" />
          <span>Flashcards</span>
        </button>
        <button
          onClick={() => onNavigate('analytics')}
          style={{
            flex: isMobile ? '1 1 45%' : '1',
            padding: isMobile ? '12px' : '14px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            transition: 'all 0.2s ease',
            minWidth: isMobile ? '140px' : 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-tertiary)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-secondary)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Icon name="bar-chart-2" size={18} color="var(--accent-violet)" />
          <span>Analytics</span>
        </button>
        <button
          onClick={onOpenAIChat}
          style={{
            flex: isMobile ? '1 1 45%' : '1',
            padding: isMobile ? '12px' : '14px',
            background: 'var(--gradient-primary)',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: '600',
            color: '#fff',
            transition: 'all 0.2s ease',
            minWidth: isMobile ? '140px' : 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Icon name="message-circle" size={18} color="#fff" />
          <span>AI Tutor</span>
        </button>
      </div>

      {/* Continue Learning - Last Position */}
      {lastPosition && (() => {
        const course = courses.find(c => c.id === lastPosition.courseId);
        if (!course) return null;
        return (
          <div style={{
            marginBottom: isMobile ? '16px' : '24px',
            padding: isMobile ? '12px' : '16px',
            background: `linear-gradient(135deg, ${course.color}08, ${course.color}15)`,
            borderRadius: 'var(--radius-xl)',
            border: `1px solid ${course.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: isMobile ? '12px' : '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px', flex: 1 }}>
              <div style={{
                width: isMobile ? '40px' : '48px',
                height: isMobile ? '40px' : '48px',
                background: course.color,
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '22px' : '26px',
                boxShadow: `0 4px 12px ${course.color}40`
              }}>
                {course.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-tertiary)', margin: '0 0 2px 0' }}>
                  Continue where you left off
                </p>
                <p style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '700', margin: 0, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {course.name} • Chapter {lastPosition.chapterIndex + 1}
                </p>
              </div>
            </div>
            <Button 
              icon="play" 
              onClick={() => onSelectCourse(course)}
              style={{ 
                padding: isMobile ? '8px 14px' : '10px 18px',
                fontSize: isMobile ? '12px' : '13px',
                flexShrink: 0
              }}
            >
              Resume
            </Button>
          </div>
        );
      })()}

      {/* Courses Section Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: isMobile ? '12px' : '16px'
      }}>
        <h2 style={{ 
          fontSize: isMobile ? '16px' : '18px', 
          fontWeight: '700',
          color: 'var(--text-primary)',
          margin: 0
        }}>
          Your Courses
        </h2>
        <button
          onClick={() => onNavigate('courses')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-blue)',
            fontSize: isMobile ? '12px' : '13px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          View All
          <Icon name="arrow-right" size={14} />
        </button>
      </div>

      {/* Course Cards - More Compact Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile 
          ? '1fr' 
          : 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: isMobile ? '12px' : '16px'
      }}>
        {allCourses.map((course, idx) => (
          <div
            key={course.id}
            onClick={() => onSelectCourse(course)}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-xl)',
              padding: isMobile ? '14px' : '18px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '10px' : '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = course.color + '60';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 24px ${course.color}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Course Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px' }}>
              <div style={{
                width: isMobile ? '40px' : '48px',
                height: isMobile ? '40px' : '48px',
                background: `${course.color}15`,
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '24px' : '28px',
                border: `2px solid ${course.color}30`
              }}>
                {course.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ 
                  fontSize: isMobile ? '15px' : '16px', 
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  margin: '0 0 2px 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {course.name}
                </h3>
                <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-tertiary)', margin: 0 }}>
                  {course.chapters} chapters
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                <Icon name="star" size={12} color="#f59e0b" />
                <span style={{ fontSize: isMobile ? '11px' : '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  {course.rating}
                </span>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px'
              }}>
                <span style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-tertiary)' }}>
                  Progress
                </span>
                <span style={{ 
                  fontSize: isMobile ? '12px' : '13px', 
                  fontWeight: '700',
                  color: course.progress === 100 ? 'var(--success)' : course.color
                }}>
                  {course.progress}%
                </span>
              </div>
              <div style={{
                height: isMobile ? '6px' : '8px',
                background: 'var(--bg-tertiary)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${course.progress}%`,
                  background: course.progress === 100 ? 'var(--success)' : course.color,
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: isMobile ? '10px' : '12px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <span style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-tertiary)' }}>
                {course.isTeacherCourse ? 'Teacher Course' : `${course.students.toLocaleString()} students`}
              </span>
              <span style={{
                fontSize: isMobile ? '11px' : '12px',
                fontWeight: '600',
                color: course.progress > 0 ? 'var(--accent-blue)' : 'var(--text-secondary)'
              }}>
                {course.progress > 0 ? (course.progress === 100 ? 'Completed' : 'Continue') : 'Start'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Teacher Content Section - Quizzes */}
      {teacherQuizzes.length > 0 && (
        <div style={{ marginTop: isMobile ? '24px' : '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: isMobile ? '12px' : '16px'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '16px' : '18px', 
              fontWeight: '700',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Available Quizzes
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '12px'
          }}>
            {teacherQuizzes.map((quiz, idx) => (
              <div key={quiz.id} onClick={() => onOpenQuiz(quiz)} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '28px' }}>📝</span>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>{quiz.title}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>
                      {quiz.questions?.length || 0} questions
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ flex: 1, padding: '8px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                    Take Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teacher Content Section - Flashcards */}
      {teacherFlashcards.length > 0 && (
        <div style={{ marginTop: isMobile ? '24px' : '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: isMobile ? '12px' : '16px'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '16px' : '18px', 
              fontWeight: '700',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Flashcard Decks
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '12px'
          }}>
            {teacherFlashcards.map((deck, idx) => (
              <div key={deck.id} onClick={() => onOpenFlashcards(deck)} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '28px' }}>🗂️</span>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>{deck.title}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>
                      {deck.cards?.length || 0} cards
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ flex: 1, padding: '8px', background: 'var(--accent-teal)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                    Study Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teacher Content Section - Assignments */}
      {teacherAssignments.length > 0 && (
        <div style={{ marginTop: isMobile ? '24px' : '32px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: isMobile ? '12px' : '16px'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '16px' : '18px', 
              fontWeight: '700',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Assignments
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '12px'
          }}>
            {teacherAssignments.map((assignment, idx) => (
              <div key={assignment.id} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '28px' }}>📋</span>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>{assignment.title}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>
                      {assignment.subject || 'General'} • Due: {assignment.dueDate || 'No due date'}
                    </p>
                  </div>
                </div>
                <div style={{ background: 'var(--bg-tertiary)', padding: '8px', borderRadius: '6px' }}>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0 }}>
                    {assignment.instructions?.substring(0, 80) || 'No instructions'}
                    {assignment.instructions?.length > 80 ? '...' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

window.DashboardView = DashboardView;
