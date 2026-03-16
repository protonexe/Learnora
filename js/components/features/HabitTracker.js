import React from 'react';
import { X, Plus, Minus, RotateCcw, Share2, Trash2, GripVertical, Check, Edit2, Copy, Download, MoreHorizontal, Target, Flame, Clock, Trophy, Star } from './Icon';

const HabitTracker = ({ onClose }) => {
  const [habits, setHabits] = React.useState([
    { id: 1, name: 'Study Math', streak: 15, completedToday: true, icon: '📐', color: '#3b82f6' },
    { id: 2, name: 'Read 30 minutes', streak: 8, completedToday: true, icon: '📚', color: '#10b981' },
    { id: 3, name: 'Exercise', streak: 5, completedToday: false, icon: '🏃', color: '#f59e0b' },
    { id: 4, name: 'Meditate', streak: 12, completedToday: false, icon: '🧘', color: '#8b5cf6' },
    { id: 5, name: 'Drink 8 glasses water', streak: 20, completedToday: true, icon: '💧', color: '#0ea5e9' },
  ]);
  
  const toggleHabit = (id) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completedToday: !h.completedToday } : h));
  };
  
  const addHabit = () => {
    const newHabit = { id: Date.now(), name: 'New Habit', streak: 0, completedToday: false, icon: '⭐', color: '#6366f1' };
    setHabits([...habits, newHabit]);
  };
  
  const completedCount = habits.filter(h => h.completedToday).length;
  
  return (
    <div style={{ background: 'var(--card-bg)', borderRadius: 16, width: 380, overflow: 'hidden' }}>
      <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: 24, color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 20 }}>🎯 Habit Tracker</h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ fontSize: 36, fontWeight: 700 }}>{completedCount}/{habits.length}</div>
        <div style={{ fontSize: 14, opacity: 0.9 }}>Habits completed today</div>
      </div>
      
      <div style={{ padding: 16, maxHeight: 300, overflow: 'auto' }}>
        {habits.map(habit => (
          <div key={habit.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg)', borderRadius: 10, marginBottom: 8, border: `1px solid ${habit.completedToday ? habit.color : 'var(--border-color)'}` }}>
            <button onClick={() => toggleHabit(habit.id)} style={{ width: 32, height: 32, borderRadius: 8, border: `2px solid ${habit.color}`, background: habit.completedToday ? habit.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {habit.completedToday && <span style={{ color: 'white' }}>✓</span>}
            </button>
            <div style={{ fontSize: 24 }}>{habit.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)', textDecoration: habit.completedToday ? 'line-through' : 'none' }}>{habit.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>🔥 {habit.streak} day streak</div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ padding: 16, borderTop: '1px solid var(--border-color)' }}>
        <button onClick={addHabit} style={{ width: '100%', padding: 14, borderRadius: 10, border: '2px dashed var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Plus size={18} /> Add New Habit
        </button>
      </div>
    </div>
  );
};

export default HabitTracker;
