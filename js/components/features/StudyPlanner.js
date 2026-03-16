import React from 'react';
import { Calendar, Clock, Check, Plus, Trash2, Edit2 } from './Icon';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });
  const set = React.useCallback((v) => {
    setValue(v);
    window.localStorage.setItem(key, JSON.stringify(v));
  }, [key]);
  return [value, set];
};

const StudyPlanner = ({ onClose }) => {
  const [plans, setPlans] = useLocalStorage('learnora-study-plans', []);
  const [view, setView] = React.useState('week');
  const [newPlan, setNewPlan] = React.useState({ title: '', subject: '', duration: 30, date: '', time: '' });
  const [editingId, setEditingId] = React.useState(null);
  
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
  const colors = ['#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#6366f1'];
  
  const getSubjectColor = (subject) => colors[subjects.indexOf(subject) % colors.length];
  
  const generateWeekDays = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };
  
  const weekDays = generateWeekDays();
  
  const filteredPlans = React.useMemo(() => {
    if (view === 'week') {
      return plans.filter(p => {
        const planDate = new Date(p.date);
        return weekDays.some(d => d.toDateString() === planDate.toDateString());
      });
    }
    return plans;
  }, [plans, view, weekDays]);
  
  const addPlan = () => {
    if (!newPlan.title || !newPlan.date) return;
    const plan = { ...newPlan, id: Date.now(), completed: false };
    setPlans([...plans, plan]);
    setNewPlan({ title: '', subject: '', duration: 30, date: '', time: '' });
  };
  
  const toggleComplete = (id) => {
    setPlans(plans.map(p => p.id === id ? { ...p, completed: !p.completed } : p));
  };
  
  const deletePlan = (id) => {
    setPlans(plans.filter(p => p.id !== id));
  };
  
  const getPlansForDay = (date) => {
    return filteredPlans.filter(p => new Date(p.date).toDateString() === date.toDateString())
      .sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  };
  
  const getTotalDuration = (date) => {
    return getPlansForDay(date).reduce((a, p) => a + (p.duration || 0), 0);
  };
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 24,
      maxWidth: 900,
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>📅 Study Planner</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          {['week', 'all'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: view === v ? 'var(--primary)' : 'var(--bg)',
                color: view === v ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{
        background: 'var(--bg)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 16 }}>
          <input
            type="text"
            placeholder="What will you study?"
            value={newPlan.title}
            onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
            style={{
              gridColumn: '1 / -1',
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
              color: 'var(--text-primary)',
              fontSize: 14
            }}
          />
          <select
            value={newPlan.subject}
            onChange={(e) => setNewPlan({ ...newPlan, subject: e.target.value })}
            style={{
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
              color: 'var(--text-primary)',
              fontSize: 14
            }}
          >
            <option value="">Select Subject</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input
            type="number"
            placeholder="Duration (min)"
            value={newPlan.duration}
            onChange={(e) => setNewPlan({ ...newPlan, duration: parseInt(e.target.value) || 0 })}
            style={{
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
              color: 'var(--text-primary)',
              fontSize: 14
            }}
          />
          <input
            type="date"
            value={newPlan.date}
            onChange={(e) => setNewPlan({ ...newPlan, date: e.target.value })}
            style={{
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
              color: 'var(--text-primary)',
              fontSize: 14
            }}
          />
          <input
            type="time"
            value={newPlan.time}
            onChange={(e) => setNewPlan({ ...newPlan, time: e.target.value })}
            style={{
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
              color: 'var(--text-primary)',
              fontSize: 14
            }}
          />
        </div>
        <button
          onClick={addPlan}
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 8,
            border: 'none',
            background: 'var(--primary)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          <Plus size={18} /> Add Study Plan
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
        {weekDays.map((day, i) => {
          const dayPlans = getPlansForDay(day);
          const isToday = day.toDateString() === new Date().toDateString();
          const totalMin = getTotalDuration(day);
          
          return (
            <div
              key={i}
              style={{
                background: isToday ? 'var(--primary)' : 'var(--bg)',
                borderRadius: 12,
                padding: 12,
                minHeight: 150,
                border: isToday ? 'none' : '1px solid var(--border-color)'
              }}
            >
              <div style={{
                color: isToday ? 'white' : 'var(--text-secondary)',
                fontSize: 12,
                marginBottom: 4
              }}>
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div style={{
                color: isToday ? 'white' : 'var(--text-primary)',
                fontWeight: 600,
                fontSize: 18,
                marginBottom: 8
              }}>
                {day.getDate()}
              </div>
              {totalMin > 0 && (
                <div style={{
                  fontSize: 11,
                  color: isToday ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)',
                  marginBottom: 8
                }}>
                  ⏱ {totalMin} min
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {dayPlans.slice(0, 3).map(plan => (
                  <div
                    key={plan.id}
                    onClick={() => toggleComplete(plan.id)}
                    style={{
                      background: plan.completed ? 'rgba(16, 185, 129, 0.2)' : getSubjectColor(plan.subject) + '20',
                      borderLeft: `3px solid ${getSubjectColor(plan.subject)}`,
                      borderRadius: 4,
                      padding: '6px 8px',
                      cursor: 'pointer',
                      fontSize: 11
                    }}
                  >
                    <div style={{
                      color: plan.completed ? '#10b981' : 'var(--text-primary)',
                      textDecoration: plan.completed ? 'line-through' : 'none',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {plan.title}
                    </div>
                    {plan.time && (
                      <div style={{ color: 'var(--text-secondary)', fontSize: 10 }}>
                        {plan.time}
                      </div>
                    )}
                  </div>
                ))}
                {dayPlans.length > 3 && (
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)', textAlign: 'center' }}>
                    +{dayPlans.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {plans.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 12 }}>All Plans</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {plans.slice(0, 5).map(plan => (
              <div
                key={plan.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 12,
                  background: 'var(--bg)',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)'
                }}
              >
                <button
                  onClick={() => toggleComplete(plan.id)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: plan.completed ? 'none' : '2px solid var(--border-color)',
                    background: plan.completed ? '#10b981' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                  }}
                >
                  {plan.completed && <Check size={14} />}
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{
                    color: 'var(--text-primary)',
                    textDecoration: plan.completed ? 'line-through' : 'none'
                  }}>
                    {plan.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {plan.subject} • {plan.duration} min • {plan.date} {plan.time && `at ${plan.time}`}
                  </div>
                </div>
                <button
                  onClick={() => deletePlan(plan.id)}
                  style={{
                    padding: 8,
                    borderRadius: 6,
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanner;
