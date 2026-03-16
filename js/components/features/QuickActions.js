import React from 'react';
import { Play, BookOpen, FileText, Clock, Target, Users, Video, Mic, Pen, Calculator, Brain, FlaskConical } from './Icon';

const QuickActions = ({ onAction }) => {
  const actions = [
    { id: 'start-study', icon: <Play size={24} />, label: 'Start Study', color: '#10b981', shortcut: 'S' },
    { id: 'continue-course', icon: <BookOpen size={24} />, label: 'Continue Course', color: '#3b82f6', shortcut: 'C' },
    { id: 'quick-note', icon: <Pen size={24} />, label: 'Quick Note', color: '#f59e0b', shortcut: 'N' },
    { id: 'start-quiz', icon: <FileText size={24} />, label: 'Take Quiz', color: '#8b5cf6', shortcut: 'Q' },
    { id: 'flashcards', icon: <Brain size={24} />, label: 'Flashcards', color: '#ec4899', shortcut: 'F' },
    { id: 'timer', icon: <Clock size={24} />, label: 'Pomodoro', color: '#ef4444', shortcut: 'T' },
    { id: 'calc', icon: <Calculator size={24} />, label: 'Calculator', color: '#14b8a6', shortcut: 'K' },
    { id: 'ai-tutor', icon: <Video size={24} />, label: 'AI Tutor', color: '#6366f1', shortcut: 'A' },
  ];
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 20,
      border: '1px solid var(--border-color)'
    }}>
      <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
        ⚡ Quick Actions
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 10
      }}>
        {actions.map(action => (
          <button
            key={action.id}
            onClick={() => onAction?.(action.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: '16px 8px',
              borderRadius: 12,
              border: 'none',
              background: `${action.color}15`,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: action.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              {action.icon}
            </div>
            <span style={{
              fontSize: 12,
              color: 'var(--text-primary)',
              fontWeight: 500
            }}>
              {action.label}
            </span>
            <span style={{
              fontSize: 10,
              color: 'var(--text-secondary)',
              background: 'var(--bg)',
              padding: '2px 6px',
              borderRadius: 4
            }}>
              {action.shortcut}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
