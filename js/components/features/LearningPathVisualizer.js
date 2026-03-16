import React from 'react';
import { X, BookOpen, Check, Lock, Play, ChevronRight, Clock, Star, Trophy, Zap, Target } from './Icon';

const LearningPathVisualizer = ({ onClose }) => {
  const path = {
    title: 'Full Stack Developer',
    description: 'Become a complete developer',
    progress: 42,
    modules: [
      { id: 1, title: 'HTML & CSS', status: 'completed', lessons: 12, duration: '4h', icon: '🎨' },
      { id: 2, title: 'JavaScript Basics', status: 'completed', lessons: 18, duration: '6h', icon: '⚡' },
      { id: 3, title: 'React Fundamentals', status: 'current', lessons: 15, duration: '5h', icon: '⚛️' },
      { id: 4, title: 'Node.js Backend', status: 'locked', lessons: 20, duration: '8h', icon: '🖥️' },
      { id: 5, title: 'Database Design', status: 'locked', lessons: 10, duration: '4h', icon: '🗄️' },
      { id: 6, title: 'DevOps Basics', status: 'locked', lessons: 8, duration: '3h', icon: '🚀' },
    ]
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return { icon: '✓', color: '#10b981', bg: '#10b98120' };
      case 'current': return { icon: '▶️', color: '#3b82f6', bg: '#3b82f620' };
      case 'locked': return { icon: '🔒', color: '#9ca3af', bg: 'transparent' };
      default: return { icon: '○', color: '#9ca3af', bg: 'transparent' };
    }
  };
  
  return (
    <div style={{ background: 'var(--card-bg)', borderRadius: 16, width: 450, maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', padding: 24, color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 20 }}>🛤️ Learning Path</h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>✕</button>
        </div>
        <h2 style={{ margin: '0 0 8px 0', fontSize: 24 }}>{path.title}</h2>
        <p style={{ margin: 0, opacity: 0.9, fontSize: 14 }}>{path.description}</p>
        
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
            <span>Progress</span>
            <span>{path.progress}%</span>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${path.progress}%`, background: 'white', borderRadius: 4 }} />
          </div>
        </div>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 3, background: 'var(--border-color)' }} />
          
          {path.modules.map((module, i) => {
            const status = getStatusIcon(module.status);
            return (
              <div key={module.id} style={{ display: 'flex', gap: 14, marginBottom: 16, position: 'relative' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: status.bg, border: `2px solid ${status.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, zIndex: 1 }}>
                  {status.icon}
                </div>
                <div style={{ flex: 1, background: module.status === 'current' ? 'var(--bg)' : 'transparent', borderRadius: 12, padding: 14, border: `1px solid ${module.status === 'current' ? 'var(--primary)' : 'var(--border-color)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{module.title}</div>
                    {module.status === 'completed' && <span style={{ color: '#10b981', fontSize: 12 }}>✓ Completed</span>}
                    {module.status === 'current' && <span style={{ background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: 4, fontSize: 10 }}>CURRENT</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>📚 {module.lessons} lessons</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>⏱️ {module.duration}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningPathVisualizer;
