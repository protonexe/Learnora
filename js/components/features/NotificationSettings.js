import React from 'react';
import { Bell, X, Check, Clock, Calendar, MessageSquare, Trash2, Archive, AlertCircle, Info, CheckCircle, XCircle } from './Icon';

const NotificationSettings = ({ onClose }) => {
  const [notifications, setNotifications] = React.useState([
    { id: 1, type: 'reminder', title: 'Study Reminder', desc: 'Daily reminder to study', email: true, push: true, schedule: 'daily', time: '09:00' },
    { id: 2, type: 'achievement', title: 'Achievements', desc: 'When you earn badges', email: true, push: true, schedule: 'instant' },
    { id: 3, type: 'course', title: 'Course Updates', desc: 'New content in courses', email: false, push: true, schedule: 'instant' },
    { id: 4, type: 'group', title: 'Study Groups', desc: 'Messages from groups', email: true, push: true, schedule: 'instant' },
    { id: 5, type: 'promotion', title: 'Promotions', desc: 'Special offers', email: false, push: false, schedule: 'never' },
    { id: 6, type: 'newsletter', title: 'Newsletter', desc: 'Weekly digest', email: true, push: false, schedule: 'weekly', time: 'Monday' },
  ]);
  
  const toggleNotification = (id, field) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, [field]: !n[field] } : n
    ));
  };
  
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'reminder': return '⏰';
      case 'achievement': return '🏆';
      case 'course': return '📚';
      case 'group': return '👥';
      case 'promotion': return '🎁';
      case 'newsletter': return '📰';
      default: return '🔔';
    }
  };
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 24,
      width: 450,
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bell size={20} /> Notification Settings
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        background: 'var(--bg)',
        borderRadius: 12,
        marginBottom: 16
      }}>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
            Email Notifications
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            {notifications.filter(n => n.email).length} enabled
          </div>
        </div>
        <button
          onClick={() => setNotifications(notifications.map(n => ({ ...n, email: true })))}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: 12
          }}>
          Enable All
        </button>
      </div>
      
      <div>
        {notifications.map(notif => (
          <div
            key={notif.id}
            style={{
              background: 'var(--bg)',
              borderRadius: 12,
              padding: 16,
              marginBottom: 8
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 12
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>{getTypeIcon(notif.type)}</span>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {notif.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {notif.desc}
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteNotification(notif.id)}
                style={{
                  padding: 4,
                  borderRadius: 4,
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: 16 }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer'
              }}>
                <button
                  onClick={() => toggleNotification(notif.id, 'email')}
                  style={{
                    width: 40,
                    height: 22,
                    borderRadius: 11,
                    border: 'none',
                    background: notif.email ? 'var(--primary)' : 'var(--border-color)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: 2,
                    left: notif.email ? 20 : 2,
                    transition: 'left 0.2s'
                  }} />
                </button>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Email</span>
              </label>
              
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer'
              }}>
                <button
                  onClick={() => toggleNotification(notif.id, 'push')}
                  style={{
                    width: 40,
                    height: 22,
                    borderRadius: 11,
                    border: 'none',
                    background: notif.push ? 'var(--primary)' : 'var(--border-color)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: 2,
                    left: notif.push ? 20 : 2,
                    transition: 'left 0.2s'
                  }} />
                </button>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Push</span>
              </label>
              
              <select
                value={notif.schedule}
                onChange={(e) => setNotifications(notifications.map(n => 
                  n.id === notif.id ? { ...n, schedule: e.target.value } : n
                ))}
                style={{
                  padding: '4px 8px',
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: 12
                }}
              >
                <option value="instant">Instant</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Digest</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      
      <button style={{
        width: '100%',
        padding: 14,
        borderRadius: 10,
        border: '2px dashed var(--border-color)',
        background: 'transparent',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        marginTop: 8,
        fontSize: 14
      }}>
        + Add Custom Notification
      </button>
    </div>
  );
};

export default NotificationSettings;
