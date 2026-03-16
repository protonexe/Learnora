import React from 'react';
import { Target, Plus, Check, Trash2, Edit2, Calendar, Flame, Trophy, X } from './Icon';

const GoalTracker = ({ onClose }) => {
  const [goals, setGoals] = React.useState(() => {
    return JSON.parse(localStorage.getItem('learnora-goals') || '[]');
  });
  const [showAdd, setShowAdd] = React.useState(false);
  const [newGoal, setNewGoal] = React.useState({ title: '', target: 30, unit: 'hours', deadline: '' });
  
  React.useEffect(() => {
    localStorage.setItem('learnora-goals', JSON.stringify(goals));
  }, [goals]);
  
  const addGoal = () => {
    if (!newGoal.title) return;
    const goal = {
      id: Date.now(),
      ...newGoal,
      progress: 0,
      createdAt: new Date().toISOString(),
      completed: false
    };
    setGoals([...goals, goal]);
    setNewGoal({ title: '', target: 30, unit: 'hours', deadline: '' });
    setShowAdd(false);
  };
  
  const updateProgress = (id, progress) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        const completed = progress >= g.target;
        return { ...g, progress, completed };
      }
      return g;
    }));
  };
  
  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };
  
  const toggleComplete = (id) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        return { ...g, completed: !g.completed };
      }
      return g;
    }));
  };
  
  const completedGoals = goals.filter(g => g.completed).length;
  const totalGoals = goals.length;
  const progress = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
  
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
          alignItems: 'center',
          marginBottom: 16
        }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Target size={20} /> Learning Goals
          </h3>
          <button
            onClick={() => setShowAdd(!showAdd)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--primary)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13
            }}
          >
            <Plus size={16} /> Add
          </button>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
          borderRadius: 12,
          padding: 16,
          color: 'white'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Overall Progress</span>
            <span style={{ fontWeight: 600 }}>{progress}%</span>
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
              transition: 'width 0.3s'
            }} />
          </div>
          <div style={{ fontSize: 12, marginTop: 8, opacity: 0.9 }}>
            {completedGoals} of {totalGoals} goals completed
          </div>
        </div>
      </div>
      
      {showAdd && (
        <div style={{
          padding: 16,
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <input
            type="text"
            placeholder="Goal title..."
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
              color: 'var(--text-primary)',
              marginBottom: 12,
              outline: 'none'
            }}
          />
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input
              type="number"
              placeholder="Target"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 0 })}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <select
              value={newGoal.unit}
              onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <option value="hours">Hours</option>
              <option value="days">Days</option>
              <option value="lessons">Lessons</option>
              <option value="quizzes">Quizzes</option>
            </select>
          </div>
          <input
            type="date"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
              color: 'var(--text-primary)',
              marginBottom: 12,
              outline: 'none'
            }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setShowAdd(false)}
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'transparent',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={addGoal}
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 8,
                border: 'none',
                background: 'var(--primary)',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Add Goal
            </button>
          </div>
        </div>
      )}
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {goals.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 40,
            color: 'var(--text-secondary)'
          }}>
            <Target size={48} style={{ opacity: 0.3, marginBottom: 12 }} />
            <p>No goals yet. Set your first learning goal!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {goals.map(goal => {
              const progressPercent = Math.min(100, Math.round((goal.progress / goal.target) * 100));
              
              return (
                <div
                  key={goal.id}
                  style={{
                    background: 'var(--bg)',
                    borderRadius: 12,
                    padding: 16,
                    border: `1px solid ${goal.completed ? '#10b981' : 'var(--border-color)'}`,
                    opacity: goal.completed ? 0.7 : 1
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 8
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        textDecoration: goal.completed ? 'line-through' : 'none'
                      }}>
                        {goal.title}
                      </div>
                      {goal.deadline && (
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                          <Calendar size={12} style={{ marginRight: 4 }} /> Due: {goal.deadline}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        onClick={() => toggleComplete(goal.id)}
                        style={{
                          padding: 6,
                          borderRadius: 6,
                          border: 'none',
                          background: goal.completed ? '#10b981' : 'transparent',
                          color: goal.completed ? 'white' : 'var(--text-secondary)',
                          cursor: 'pointer'
                        }}
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        style={{
                          padding: 6,
                          borderRadius: 6,
                          border: 'none',
                          background: 'transparent',
                          color: '#ef4444',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div style={{
                    height: 6,
                    background: 'var(--border-color)',
                    borderRadius: 3,
                    overflow: 'hidden',
                    marginBottom: 8
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${progressPercent}%`,
                      background: goal.completed ? '#10b981' : 'var(--primary)',
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {goal.progress} / {goal.target} {goal.unit}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={goal.target}
                      value={goal.progress}
                      onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                      style={{ width: 80 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalTracker;
