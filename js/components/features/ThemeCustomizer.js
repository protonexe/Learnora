import React from 'react';
import { Moon, Sun, Monitor, Palette, Check, X, Settings, Eye, Zap, BookOpen, Clock, Target, Heart, Sparkles } from './Icon';

const ThemeCustomizer = ({ onClose }) => {
  const [activeTab, setActiveTab] = React.useState('themes');
  
  const themes = [
    { id: 'dark', name: 'Dark', icon: '🌙', primary: '#6366f1', bg: '#0f0f23', text: '#e5e5e5' },
    { id: 'light', name: 'Light', icon: '☀️', primary: '#3b82f6', bg: '#ffffff', text: '#1f2937' },
    { id: 'ocean', name: 'Ocean', icon: '🌊', primary: '#0ea5e9', bg: '#0c1222', text: '#e0f2fe' },
    { id: 'forest', name: 'Forest', icon: '🌲', primary: '#10b981', bg: '#052e16', text: '#d1fae5' },
    { id: 'sunset', name: 'Sunset', icon: '🌅', primary: '#f97316', bg: '#1a0a05', text: '#fed7aa' },
    { id: 'purple', name: 'Purple', icon: '✨', primary: '#a855f7', bg: '#1e1b2e', text: '#ede9fe' },
  ];
  
  const accents = [
    { id: 'indigo', color: '#6366f1', name: 'Indigo' },
    { id: 'blue', color: '#3b82f6', name: 'Blue' },
    { id: 'green', color: '#10b981', name: 'Green' },
    { id: 'orange', color: '#f97316', name: 'Orange' },
    { id: 'pink', color: '#ec4899', name: 'Pink' },
    { id: 'purple', color: '#a855f7', name: 'Purple' },
    { id: 'red', color: '#ef4444', name: 'Red' },
    { id: 'teal', color: '#14b8a6', name: 'Teal' },
  ];
  
  const fonts = [
    { id: 'inter', name: 'Inter', sample: 'The quick brown fox' },
    { id: 'poppins', name: 'Poppins', sample: 'The quick brown fox' },
    { id: 'roboto', name: 'Roboto', sample: 'The quick brown fox' },
    { id: 'open-sans', name: 'Open Sans', sample: 'The quick brown fox' },
  ];
  
  const roundedOptions = [
    { id: 'none', value: 0, label: 'None' },
    { id: 'small', value: 4, label: 'Small' },
    { id: 'medium', value: 8, label: 'Medium' },
    { id: 'large', value: 16, label: 'Large' },
    { id: 'full', value: 9999, label: 'Full' },
  ];
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 24,
      width: 450
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Palette size={20} /> Customize Theme
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
      
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 20
      }}>
        {['themes', 'accents', 'fonts', 'settings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '10px 8px',
              borderRadius: 8,
              border: 'none',
              background: activeTab === tab ? 'var(--primary)' : 'var(--bg)',
              color: activeTab === tab ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 12,
              textTransform: 'capitalize'
            }}
          >
            {tab === 'themes' ? '🎨' : tab === 'accents' ? '✨' : tab === 'fonts' ? '🔤' : '⚙️'} {tab}
          </button>
        ))}
      </div>
      
      {activeTab === 'themes' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {themes.map(theme => (
            <button
              key={theme.id}
              style={{
                padding: 16,
                borderRadius: 12,
                border: '2px solid var(--border-color)',
                background: theme.bg,
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{theme.icon}</div>
              <div style={{ fontWeight: 600, color: theme.text, marginBottom: 4 }}>{theme.name}</div>
              <div style={{
                height: 4,
                borderRadius: 2,
                background: theme.primary,
                margin: '0 auto',
                width: 40
              }} />
            </button>
          ))}
        </div>
      )}
      
      {activeTab === 'accents' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {accents.map(accent => (
            <button
              key={accent.id}
              style={{
                padding: 16,
                borderRadius: 12,
                border: '2px solid var(--border-color)',
                background: 'var(--bg)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: accent.color,
                margin: '0 auto 8px'
              }} />
              <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 13 }}>{accent.name}</div>
            </button>
          ))}
        </div>
      )}
      
      {activeTab === 'fonts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {fonts.map(font => (
            <div
              key={font.id}
              style={{
                padding: 16,
                background: 'var(--bg)',
                borderRadius: 10,
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{font.name}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{font.sample}</div>
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
              Border Radius
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {roundedOptions.map(opt => (
                <button
                  key={opt.id}
                  style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 8,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: 12
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Compact Mode', desc: 'Reduce spacing' },
              { label: 'Blur Effects', desc: 'Enable background blur' },
              { label: 'Animations', desc: 'Enable transitions' },
              { label: 'Shadows', desc: 'Enable box shadows' },
            ].map((setting, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 12,
                  background: 'var(--bg)',
                  borderRadius: 10
                }}
              >
                <div>
                  <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{setting.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{setting.desc}</div>
                </div>
                <button style={{
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  border: 'none',
                  background: i < 2 ? 'var(--primary)' : 'var(--border-color)',
                  cursor: 'pointer',
                  position: 'relative'
                }}>
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: 3,
                    left: i < 2 ? 23 : 3,
                    transition: 'left 0.2s'
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeCustomizer;
