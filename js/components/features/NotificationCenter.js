import React from 'react';
import { Bell, Clock, BookOpen, MessageSquare, Calendar, FileText, Video, CheckCircle, X, Settings } from './Icon';

const NotificationCenter = ({ onClose }) => {
  const [activeTab, setActiveTab] = React.useState('all');
  const [notifications, setNotifications] = React.useState([
    { id: 1, type: 'reminder', title: 'Study Reminder', message: 'Time for your daily math practice!', time: '5 min ago', read: false, icon: '⏰' },
    { id: 2, type: 'achievement', title: 'Badge Unlocked!', message: 'You earned the "Week Warrior" badge', time: '1 hour ago', read: false, icon: '🏆' },
    { id: 3, type: 'course', title: 'New Course Available', message: 'Advanced Physics is now available', time: '2 hours ago', read: true, icon: '📚' },
    { id: 4, type: 'message', title: 'New Message', message: 'Alice sent you a message', time: '3 hours ago', read: true, icon: '💬' },
    { id: 5, type: 'schedule', title: 'Upcoming Session', message: 'Study group meeting in 1 hour', time: 'Yesterday', read: true, icon: '📅' },
    { id: 6, type: 'assignment', title: 'Assignment Due', message: 'Physics homework due tomorrow', time: 'Yesterday', read: true, icon: '📝' },
  ]);
  
  const tabs = [
    { id: 'all', label: 'All', icon: <Bell size={16} /> },
    { id: 'unread', label: 'Unread', icon: <Clock size={16} /> },
    { id: 'reminders', label: 'Reminders', icon: <Clock size={16} /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={16} /> },
  ];
  
  const filteredNotifications = React.useMemo(() => {
    if (activeTab === 'all') return notifications;
    if (activeTab === 'unread') return notifications.filter(n => !n.read);
    if (activeTab === 'reminders') return notifications.filter(n => n.type === 'reminder');
    if (activeTab === 'achievements') return notifications.filter(n => n.type === 'achievement');
    return notifications;
  }, [notifications, activeTab]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const Trophy = ({ size, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 380,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: 16,
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bell size={20} /> Notifications
          {unreadCount > 0 && (
            <span style={{
              background: '#ef4444',
              color: 'white',
              padding: '2px 8px',
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 600
            }}>
              {unreadCount}
            </span>
          )}
        </h3>
        <button
          onClick={markAllRead}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: 'none',
            background: 'transparent',
            color: 'var(--primary)',
            cursor: 'pointer',
            fontSize: 12
          }}
        >
          Mark all read
        </button>
      </div>
      
      <div style={{
        display: 'flex',
        gap: 4,
        padding: 12,
        borderBottom: '1px solid var(--border-color)',
        overflowX: 'auto'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
              color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              whiteSpace: 'nowrap'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      
      <div style={{ flex: 1, overflow: 'auto' }}>
        {filteredNotifications.length === 0 ? (
          <div style={{
            padding: 40,
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            No notifications
          </div>
        ) : (
          filteredNotifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              style={{
                padding: 14,
                borderBottom: '1px solid var(--border-color)',
                background: notif.read ? 'transparent' : 'var(--primary)' + '08',
                cursor: 'pointer',
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'var(--bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                flexShrink: 0
              }}>
                {notif.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 4
                }}>
                  <span style={{
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    fontSize: 14
                  }}>
                    {notif.title}
                  </span>
                  <span style={{
                    fontSize: 11,
                    color: 'var(--text-secondary)',
                    flexShrink: 0
                  }}>
                    {notif.time}
                  </span>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {notif.message}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                style={{
                  padding: 4,
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  opacity: 0.5
                }}
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
