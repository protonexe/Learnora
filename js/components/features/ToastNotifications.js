import React from 'react';
import { X, Check, AlertCircle, Info, AlertTriangle, XCircle, Bell, Clock, CheckCircle, Error, Close } from './Icon';

const Toast notifications = ({ toasts, removeToast }) => {
  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          style={{
            background: 'var(--card-bg)',
            borderRadius: 10,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            minWidth: 300,
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            border: `1px solid ${toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#ef4444' : toast.type === 'warning' ? '#f59e0b' : 'var(--primary)'}`,
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          <div style={{ fontSize: 20 }}>
            {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : toast.type === 'warning' ? '⚠' : 'ℹ'}
          </div>
          <div style={{ flex: 1 }}>
            {toast.title && <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{toast.title}</div>}
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{toast.message}</div>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            style={{ padding: 4, borderRadius: 4, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const ToastContainer = () => {
  const [toasts, setToasts] = React.useState([
    { id: 1, type: 'success', title: 'Saved!', message: 'Your changes have been saved successfully.' },
    { id: 2, type: 'info', title: 'New Update', message: 'A new version is available.' },
  ]);
  
  const removeToast = (id) => {
    setToasts(toasts.filter(t => t.id !== id));
  };
  
  return <ToastNotifications toasts={toasts} removeToast={removeToast} />;
};

export default ToastContainer;
