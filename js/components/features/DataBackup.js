import React from 'react';
import { X, Search, Filter, Grid, List, Download, Upload, Trash2, Edit2, Copy, Share2, MoreHorizontal, Folder, File, Clock, User, Tag, Star } from './Icon';

const DataBackup = ({ onClose }) => {
  const [backupHistory, setBackupHistory] = React.useState([
    { id: 1, date: 'Jan 15, 2024', time: '10:30 AM', size: '2.4 GB', type: 'Auto', status: 'completed' },
    { id: 2, date: 'Jan 10, 2024', time: '3:15 PM', size: '2.3 GB', type: 'Manual', status: 'completed' },
    { id: 3, date: 'Jan 5, 2024', time: '9:00 AM', size: '2.1 GB', type: 'Auto', status: 'completed' },
  ]);
  
  const scheduledBackup = { nextDate: 'Jan 22, 2024', frequency: 'Weekly', enabled: true };
  
  return (
    <div style={{ background: 'var(--card-bg)', borderRadius: 16, width: 420, maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 20, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>💾 Data & Backup</h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
        </div>
      </div>
      
      <div style={{ padding: 20, borderBottom: '1px solid var(--border-color)' }}>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Scheduled Backup</h4>
        <div style={{ background: 'var(--bg)', borderRadius: 10, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Next: {scheduledBackup.nextDate}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Frequency: {scheduledBackup.frequency}</div>
          </div>
          <button style={{ padding: '10px 16px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Backup Now</button>
        </div>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Backup History</h4>
        {backupHistory.map(backup => (
          <div key={backup.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'var(--bg)', borderRadius: 10, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#10b98120', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 20 }}>✓</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{backup.type} Backup</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{backup.date} at {backup.time}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{backup.size}</div>
              <div style={{ fontSize: 11, color: '#10b981' }}>✓ Completed</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataBackup;
