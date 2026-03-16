import React from 'react';
import { ChevronRight, Check, Lock, Play, Star, Clock, BookOpen, Award, Trophy } from './Icon';

const LearningPath = ({ path, progress, onModuleClick }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'video': return '🎬';
      case 'quiz': return '✍️';
      case 'reading': return '📖';
      case 'project': return '💻';
      case 'exercise': return '🏋️';
      default: return '📚';
    }
  };
  
  return (
    <div style={{ padding: 20 }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        borderRadius: 16,
        padding: 24,
        color: 'white',
        marginBottom: 24
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: 24 }}>{path.title}</h2>
            <div style={{ opacity: 0.8, fontSize: 14 }}>{path.modules.length} modules • {path.duration}</div>
          </div>
          <Trophy size={40} style={{ opacity: 0.5 }} />
        </div>
        
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{
            height: 8,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 4,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'white',
              borderRadius: 4,
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 24, marginTop: 16, fontSize: 13 }}>
          <div>✓ {path.completedCount} completed</div>
          <div>📚 {path.modules.length - path.completedCount} remaining</div>
        </div>
      </div>
      
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          left: 24,
          top: 0,
          bottom: 0,
          width: 2,
          background: 'var(--border-color)'
        }} />
        
        <div style={{
          position: 'absolute',
          left: 24,
          top: 0,
          height: `${progress}%`,
          width: 2,
          background: 'var(--primary)',
          transition: 'height 0.5s ease'
        }} />
        
        {path.modules.map((module, index) => {
          const isCompleted = module.completed;
          const isCurrent = index === path.completedCount;
          const isLocked = !isCompleted && !isCurrent;
          
          return (
            <div
              key={module.id}
              onClick={() => !isLocked && onModuleClick?.(module)}
              style={{
                display: 'flex',
                gap: 16,
                marginBottom: 16,
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.5 : 1
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: isCompleted ? '#10b981' : isCurrent ? 'var(--primary)' : 'var(--bg)',
                border: '2px solid',
                borderColor: isCompleted ? '#10b981' : isCurrent ? 'var(--primary)' : 'var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
                fontSize: 20
              }}>
                {isCompleted ? <Check size={20} style={{ color: 'white' }} /> : isLocked ? <Lock size={18} /> : getIcon(module.type)}
              </div>
              
              <div style={{
                flex: 1,
                background: isCurrent ? 'var(--card-bg)' : 'transparent',
                borderRadius: 12,
                padding: 16,
                border: `1px solid ${isCurrent ? 'var(--primary)' : 'var(--border-color)'}`,
                transition: 'all 0.2s'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 8
                }}>
                  <div style={{
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    fontSize: 15
                  }}>
                    {index + 1}. {module.title}
                  </div>
                  {isCurrent && (
                    <span style={{
                      background: 'var(--primary)',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: 12,
                      fontSize: 11,
                      fontWeight: 600
                    }}>
                      CURRENT
                    </span>
                  )}
                </div>
                
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: 13,
                  margin: '0 0 12px 0',
                  lineHeight: 1.5
                }}>
                  {module.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  gap: 16,
                  fontSize: 12,
                  color: 'var(--text-secondary)'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={14} /> {module.duration}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {getIcon(module.type)} {module.type}
                  </span>
                  {module.exercises && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      ✍️ {module.exercises} exercises
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPath;
