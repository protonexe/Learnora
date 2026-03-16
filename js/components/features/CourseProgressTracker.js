import React from 'react';
import { BookOpen, Clock, Award, ChevronRight, CheckCircle, Circle, PlayCircle } from './Icon';

const CourseProgressTracker = ({ courses, onCourseClick }) => {
  const [expandedId, setExpandedId] = React.useState(null);
  
  const getProgress = (course) => {
    const completed = course.chapters?.filter(c => c.completed).length || 0;
    const total = course.chapters?.length || 1;
    return Math.round((completed / total) * 100);
  };
  
  const getTimeRemaining = (course) => {
    const remaining = course.chapters?.filter(c => !c.completed).length || 0;
    const mins = remaining * 15;
    if (mins < 60) return `${mins} min`;
    return `${Math.round(mins / 60)}h ${mins % 60}m`;
  };
  
  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: 20 }}>📚 Your Courses</h3>
      
      {courses.map(course => {
        const progress = getProgress(course);
        const isExpanded = expandedId === course.id;
        
        return (
          <div
            key={course.id}
            style={{
              background: 'var(--card-bg)',
              borderRadius: 12,
              marginBottom: 12,
              border: '1px solid var(--border-color)',
              overflow: 'hidden'
            }}
          >
            <div
              onClick={() => setExpandedId(isExpanded ? null : course.id)}
              style={{
                padding: 16,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}
            >
              <img
                src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100'}
                alt={course.title}
                style={{
                  width: 60,
                  height: 40,
                  borderRadius: 6,
                  objectFit: 'cover'
                }}
              />
              
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: 6
                }}>
                  {course.title}
                </div>
                <div style={{
                  height: 4,
                  background: 'var(--bg)',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: progress === 100 ? '#10b981' : 'var(--primary)',
                    transition: 'width 0.3s'
                  }} />
                </div>
              </div>
              
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: 16 }}>{progress}%</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  {getTimeRemaining(course)}
                </div>
              </div>
              
              <ChevronRight
                size={20}
                style={{
                  color: 'var(--text-secondary)',
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)',
                  transition: 'transform 0.2s'
                }}
              />
            </div>
            
            {isExpanded && course.chapters && (
              <div style={{
                borderTop: '1px solid var(--border-color)',
                padding: 12,
                background: 'var(--bg)'
              }}>
                {course.chapters.map((chapter, i) => (
                  <div
                    key={i}
                    onClick={() => onCourseClick?.(course, i)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    {chapter.completed ? (
                      <CheckCircle size={18} style={{ color: '#10b981' }} />
                    ) : (
                      <Circle size={18} style={{ color: 'var(--border-color)' }} />
                    )}
                    <span style={{
                      flex: 1,
                      color: chapter.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
                      textDecoration: chapter.completed ? 'line-through' : 'none'
                    }}>
                      {i + 1}. {chapter.title}
                    </span>
                    {!chapter.completed && (
                      <PlayCircle size={16} style={{ color: 'var(--primary)' }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseProgressTracker;
