import React from 'react';
import { Bell, X, Check, Clock, Calendar, MessageSquare, Trash2, Archive, AlertCircle, Info, CheckCircle, XCircle, ThumbsUp, Star, Filter } from './Icon';

const ActivityTimeline = ({ onClose }) => {
  const [filter, setFilter] = React.useState('all');
  
  const activities = [
    { id: 1, type: 'course', title: 'Completed "Physics: Mechanics"', time: '2 hours ago', icon: '📚', color: '#3b82f6' },
    { id: 2, type: 'achievement', title: 'Earned "Week Warrior" badge', time: '3 hours ago', icon: '🏆', color: '#f59e0b' },
    { id: 3, type: 'quiz', title: 'Scored 95% on "Algebra Quiz"', time: '5 hours ago', icon: '✍️', color: '#10b981' },
    { id: 4, type: 'streak', title: '5 day study streak!', time: 'Yesterday', icon: '🔥', color: '#ef4444' },
    { id: 5, type: 'note', title: 'Created note: "Physics Formulas"', time: 'Yesterday', icon: '📝', color: '#8b5cf6' },
    { id: 6, type: 'course', title: 'Started "Chemistry Basics"', time: '2 days ago', icon: '📚', color: '#3b82f6' },
    { id: 7, type: 'flashcard', title: 'Reviewed 50 flashcards', time: '2 days ago', icon: '🧠', color: '#ec4899' },
    { id: 8, type: 'goal', title: 'Completed daily goal', time: '3 days ago', icon: '🎯', color: '#14b8a6' },
    { id: 9, type: 'group', title: 'Joined "Physics Study Squad"', time: '4 days ago', icon: '👥', color: '#6366f1' },
    { id: 10, type: 'certificate', title: 'Earned certificate in Mathematics', time: '1 week ago', icon: '📜', color: '#fbbf24' },
  ];
  
  const filters = [
    { id: 'all', label: 'All', count: activities.length },
    { id: 'course', label: 'Courses', count: activities.filter(a => a.type === 'course').length },
    { id: 'achievement', label: 'Achievements', count: activities.filter(a => a.type === 'achievement').length },
    { id: 'quiz', label: 'Quizzes', count: activities.filter(a => a.type === 'quiz').length },
  ];
  
  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.type === filter);
  
  const getTypeLabel = (type) => {
    switch (type) {
      case 'course': return 'Course';
      case 'achievement': return 'Achievement';
      case 'quiz': return 'Quiz';
      case 'streak': return 'Streak';
      case 'note': return 'Note';
      case 'flashcard': return 'Flashcard';
      case 'goal': return 'Goal';
      case 'group': return 'Group';
      case 'certificate': return 'Certificate';
      default: return 'Activity';
    }
  };
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 400,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: 20,
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            📜 Activity Timeline
          </h3>
          <button
            onClick={onClose}
            style={{
              padding: 4,
              borderRadius: 6,
              border: 'none',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        gap: 4,
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-color)',
        overflowX: 'auto'
      }}>
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: '6px 12px',
              borderRadius: 20,
              border: 'none',
              background: filter === f.id ? 'var(--primary)' : 'var(--bg)',
              color: filter === f.id ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 12,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            {f.label}
            <span style={{
              background: filter === f.id ? 'rgba(255,255,255,0.2)' : 'var(--border-color)',
              padding: '2px 6px',
              borderRadius: 10,
              fontSize: 10
            }}>
              {f.count}
            </span>
          </button>
        ))}
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: 15,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'var(--border-color)'
          }} />
          
          {filteredActivities.map((activity, i) => (
            <div
              key={activity.id}
              style={{
                display: 'flex',
                gap: 14,
                marginBottom: 16,
                position: 'relative'
              }}
            >
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: activity.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                flexShrink: 0,
                zIndex: 1,
                boxShadow: '0 2px 8px ' + activity.color + '40'
              }}>
                {activity.icon}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{
                  background: 'var(--bg)',
                  borderRadius: 10,
                  padding: 12,
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 4
                  }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>
                      {activity.title}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      background: activity.color + '20',
                      color: activity.color,
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 10,
                      fontWeight: 600
                    }}>
                      {getTypeLabel(activity.type)}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{
        padding: 12,
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center'
      }}>
        <button style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: '1px solid var(--border-color)',
          background: 'transparent',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontSize: 13
        }}>
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default ActivityTimeline;
