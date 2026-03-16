import React from 'react';
import { Settings, User, Bell, Lock, Palette, Globe, Moon, Sun, Monitor, Volume2, VolumeX, Smartphone, Mail, Key, Eye, EyeOff, Check, X, Trash2, Edit2, Plus } from './Icon';

const SettingsPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = React.useState('profile');
  const [profile, setProfile] = React.useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Passionate learner',
    location: 'New York, USA',
    website: 'https://example.com',
    phone: '+1 234 567 8900'
  });
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: true,
    achievements: true,
    reminders: true,
    weekly: false,
    marketing: false
  });
  const [appearance, setAppearance] = React.useState({
    theme: 'dark',
    fontSize: 'medium',
    reducedMotion: false,
    compactMode: false
  });
  const [privacy, setPrivacy] = React.useState({
    profilePublic: true,
    showProgress: true,
    showStreak: true,
    allowMessages: true,
    dataCollection: true
  });
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'security', label: 'Security', icon: '🛡️' },
  ];
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 600,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex'
    }}>
      <div style={{
        width: 180,
        background: 'var(--bg)',
        padding: 16,
        borderRight: '1px solid var(--border-color)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: 'var(--text-primary)', fontSize: 16 }}>
          ⚙️ Settings
        </h3>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 8,
              border: 'none',
              background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
              color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 14,
              marginBottom: 4,
              textAlign: 'left'
            }}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        {activeTab === 'profile' && (
          <div>
            <h4 style={{ margin: '0 0 20px 0', color: 'var(--text-primary)' }}>Profile Settings</h4>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                color: 'white'
              }}>
                {profile.name.charAt(0)}
              </div>
              <div>
                <button style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 13,
                  marginRight: 8
                }}>
                  Change Photo
                </button>
                <button style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: 13
                }}>
                  Remove
                </button>
              </div>
            </div>
            
            {Object.entries(profile).map(([key, value]) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 6, color: 'var(--text-secondary)', fontSize: 13, textTransform: 'capitalize' }}>
                  {key}
                </label>
                <input
                  type={key === 'email' ? 'email' : key === 'website' ? 'url' : 'text'}
                  value={value}
                  onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 8,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>
            ))}
            
            <button style={{
              width: '100%',
              padding: 14,
              borderRadius: 10,
              border: 'none',
              background: 'var(--primary)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
              marginTop: 12
            }}>
              Save Changes
            </button>
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <div>
            <h4 style={{ margin: '0 0 20px 0', color: 'var(--text-primary)' }}>Notification Preferences</h4>
            
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 0',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <span style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <button
                  onClick={() => setNotifications({ ...notifications, [key]: !value })}
                  style={{
                    width: 48,
                    height: 28,
                    borderRadius: 14,
                    border: 'none',
                    background: value ? 'var(--primary)' : 'var(--border-color)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s'
                  }}
                >
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: 3,
                    left: value ? 23 : 3,
                    transition: 'left 0.2s'
                  }} />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'appearance' && (
          <div>
            <h4 style={{ margin: '0 0 20px 0', color: 'var(--text-primary)' }}>Appearance</h4>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 10, color: 'var(--text-secondary)', fontSize: 13 }}>Theme</label>
              <div style={{ display: 'flex', gap: 12 }}>
                {['light', 'dark', 'system'].map(theme => (
                  <button
                    key={theme}
                    onClick={() => setAppearance({ ...appearance, theme })}
                    style={{
                      flex: 1,
                      padding: 16,
                      borderRadius: 10,
                      border: `2px solid ${appearance.theme === theme ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: 'var(--bg)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻'}</span>
                    <span style={{ color: 'var(--text-primary)', textTransform: 'capitalize', fontSize: 13 }}>{theme}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 10, color: 'var(--text-secondary)', fontSize: 13 }}>Font Size</label>
              <div style={{ display: 'flex', gap: 12 }}>
                {['small', 'medium', 'large'].map(size => (
                  <button
                    key={size}
                    onClick={() => setAppearance({ ...appearance, fontSize: size })}
                    style={{
                      flex: 1,
                      padding: 12,
                      borderRadius: 8,
                      border: `2px solid ${appearance.fontSize === size ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: appearance.fontSize === size ? 'var(--primary)' + '20' : 'var(--bg)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {Object.entries(appearance).filter(([k]) => k !== 'theme' && k !== 'fontSize').map(([key, value]) => (
              <div key={key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 0',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <span style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <button
                  onClick={() => setAppearance({ ...appearance, [key]: !value })}
                  style={{
                    width: 48,
                    height: 28,
                    borderRadius: 14,
                    border: 'none',
                    background: value ? 'var(--primary)' : 'var(--border-color)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: 3,
                    left: value ? 23 : 3,
                    transition: 'left 0.2s'
                  }} />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'privacy' && (
          <div>
            <h4 style={{ margin: '0 0 20px 0', color: 'var(--text-primary)' }}>Privacy Settings</h4>
            
            {Object.entries(privacy).map(([key, value]) => (
              <div key={key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 0',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <span style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <button
                  onClick={() => setPrivacy({ ...privacy, [key]: !value })}
                  style={{
                    width: 48,
                    height: 28,
                    borderRadius: 14,
                    border: 'none',
                    background: value ? 'var(--primary)' : 'var(--border-color)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: 3,
                    left: value ? 23 : 3,
                    transition: 'left 0.2s'
                  }} />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'security' && (
          <div>
            <h4 style={{ margin: '0 0 20px 0', color: 'var(--text-primary)' }}>Security</h4>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>
            
            <button style={{
              width: '100%',
              padding: 14,
              borderRadius: 10,
              border: 'none',
              background: 'var(--primary)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
              marginBottom: 24
            }}>
              Update Password
            </button>
            
            <div style={{
              background: '#ef444420',
              borderRadius: 10,
              padding: 16,
              border: '1px solid #ef4444'
            }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#ef4444' }}>Danger Zone</h5>
              <p style={{ margin: '0 0 12px 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                Once you delete your account, there is no going back.
              </p>
              <button style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: 'none',
                background: '#ef4444',
                color: 'white',
                cursor: 'pointer',
                fontSize: 13
              }}>
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;
