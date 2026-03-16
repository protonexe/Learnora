import React from 'react';
import { Bell, X, Check, Clock, Calendar, MessageSquare, Trash2, Archive, AlertCircle, Info, CheckCircle, XCircle, ThumbsUp, Star, Filter, Eye, EyeOff, Volume2, VolumeX, Moon, Sun, Wifi, WifiOff, Battery, Signal } from './Icon';

const SystemStatus = ({ onClose }) => {
  const [status, setStatus] = React.useState({
    notifications: true,
    sound: true,
    darkMode: true,
    wifi: true,
    battery: 75,
    storage: 42,
    dataUsage: 2.4,
    dataLimit: 10
  });
  
  const systemApps = [
    { name: 'Sync Service', status: 'active', icon: '🔄' },
    { name: 'Offline Mode', status: 'inactive', icon: '📴' },
    { name: 'Background Refresh', status: 'active', icon: '🔃' },
    { name: 'Auto-save', status: 'active', icon: '💾' },
    { name: 'Analytics', status: 'paused', icon: '📊' },
  ];
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 24,
      width: 380
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          ⚙️ System Status
        </h3>
        <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 4 }}>🔋</div>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 20 }}>{status.battery}%</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Battery</div>
        </div>
        <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 4 }}>{status.wifi ? '📶' : '📵'}</div>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 20 }}>{status.wifi ? 'Online' : 'Offline'}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Connection</div>
        </div>
      </div>
      
      <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Storage</span>
          <span style={{ color: 'var(--text-primary)', fontSize: 13 }}>{status.storage}% used</span>
        </div>
        <div style={{ height: 6, background: 'var(--border-color)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${status.storage}%`, background: status.storage > 80 ? '#ef4444' : '#10b981', borderRadius: 3 }} />
        </div>
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Quick Settings</h4>
        {[
          { label: 'Notifications', icon: '🔔', value: status.notifications, key: 'notifications' },
          { label: 'Sound', icon: '🔊', value: status.sound, key: 'sound' },
          { label: 'Dark Mode', icon: '🌙', value: status.darkMode, key: 'darkMode' },
          { label: 'WiFi', icon: '📶', value: status.wifi, key: 'wifi' },
        ].map((setting, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-primary)' }}>
              <span>{setting.icon}</span> {setting.label}
            </span>
            <button
              onClick={() => setStatus({ ...status, [setting.key]: !status[setting.key] })}
              style={{
                width: 44,
                height: 24,
                borderRadius: 12,
                border: 'none',
                background: status[setting.key] ? 'var(--primary)' : 'var(--border-color)',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: status[setting.key] ? 23 : 3, transition: 'left 0.2s' }} />
            </button>
          </div>
        ))}
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Background Services</h4>
        {systemApps.map((app, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: 'var(--bg)', borderRadius: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 20 }}>{app.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 13 }}>{app.name}</div>
            </div>
            <span style={{
              padding: '4px 8px',
              borderRadius: 4,
              fontSize: 11,
              background: app.status === 'active' ? '#10b98120' : app.status === 'paused' ? '#f59e0b20' : '#ef444420',
              color: app.status === 'active' ? '#10b981' : app.status === 'paused' ? '#f59e0b' : '#ef4444'
            }}>
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemStatus;
