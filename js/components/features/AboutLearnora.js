import React from 'react';
import { X, Settings, Globe, Clock, Bell, Shield, Palette, Database, HelpCircle, Info, ChevronRight, ExternalLink } from './Icon';

const AboutLearnora = ({ onClose }) => {
  const appInfo = {
    name: 'Learnora',
    version: '2.5.0',
    build: '2024.01.15',
    developer: 'Learnora Education',
    website: 'learnora.app',
    support: 'support@learnora.app'
  };
  
  const features = [
    { name: 'Online Learning', description: 'Access courses anywhere' },
    { name: 'AI Tutor', description: 'Personalized learning assistance' },
    { name: 'Study Groups', description: 'Collaborate with peers' },
    { name: 'Analytics', description: 'Track your progress' },
    { name: 'Gamification', description: 'Earn rewards & achievements' },
    { name: 'Offline Mode', description: 'Learn without internet' },
  ];
  
  const links = [
    { label: 'Privacy Policy', icon: '🔒' },
    { label: 'Terms of Service', icon: '📄' },
    { label: 'Help Center', icon: '❓' },
    { label: 'Contact Us', icon: '✉️' },
    { label: 'Rate App', icon: '⭐' },
    { label: 'Share App', icon: '📤' },
  ];
  
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
      <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', padding: 32, color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📚</div>
        <h2 style={{ margin: 0, fontSize: 24, marginBottom: 4 }}>{appInfo.name}</h2>
        <div style={{ opacity: 0.9, fontSize: 14 }}>Version {appInfo.version} ({appInfo.build})</div>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>About</h4>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>
            Learnora is your all-in-one learning platform. Access thousands of courses, 
            connect with peers, track your progress, and achieve your learning goals.
          </p>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Key Features</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: 'var(--bg)', padding: 12, borderRadius: 10 }}>
                <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 12, marginBottom: 2 }}>{f.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{f.description}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {links.map((link, i) => (
              <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg)', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontSize: 18 }}>{link.icon}</span>
                <span style={{ flex: 1, color: 'var(--text-primary)', fontSize: 13 }}>{link.label}</span>
                <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ padding: 16, borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
          Made with ❤️ by {appInfo.developer}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', opacity: 0.7 }}>
          © 2024 All rights reserved
        </div>
      </div>
    </div>
  );
};

export default AboutLearnora;
