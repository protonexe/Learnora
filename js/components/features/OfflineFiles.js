import React from 'react';
import { X, Search, Filter, Grid, List, Download, Upload, Star, Clock, Eye, MoreHorizontal, Folder, File, Image, Film, Music, Archive, FileText, Trash2, Edit2, Share2, Copy, Tag, Calendar, HardDrive } from './Icon';

const OfflineFiles = ({ onClose }) => {
  const [view, setView] = React.useState('grid');
  const [filter, setFilter] = React.useState('all');
  
  const files = [
    { id: 1, name: 'Physics Course', type: 'folder', size: '2.1 GB', items: 45, offline: true, lastSync: '2 hours ago', icon: '📁', color: '#3b82f6' },
    { id: 2, name: 'Math Lectures', type: 'folder', size: '850 MB', items: 32, offline: true, lastSync: 'Yesterday', icon: '📁', color: '#10b981' },
    { id: 3, name: 'Lecture 1.mp4', type: 'video', size: '420 MB', offline: true, lastSync: '2 days ago', icon: '🎬', color: '#8b5cf6' },
    { id: 4, name: 'Notes.pdf', type: 'document', size: '2.3 MB', offline: true, lastSync: '1 week ago', icon: '📄', color: '#ef4444' },
    { id: 5, name: 'Diagrams.png', type: 'image', size: '5.8 MB', offline: false, lastSync: 'Never', icon: '🖼️', color: '#ec4899' },
  ];
  
  const storage = { used: 4.2, total: 10 };
  
  const getIcon = (type) => {
    switch (type) {
      case 'folder': return '📁';
      case 'video': return '🎬';
      case 'audio': return '🎵';
      case 'image': return '🖼️';
      case 'archive': return '📦';
      default: return '📄';
    }
  };
  
  const filteredFiles = filter === 'all' ? files : files.filter(f => f.type === filter);
  
  return (
    <div style={{ background: 'var(--card-bg)', borderRadius: 16, width: 500, maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 20, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            📥 Offline Files
          </h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
        
        <div style={{ background: 'var(--bg)', borderRadius: 10, padding: 14, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Offline Storage</span>
            <span style={{ color: 'var(--text-primary)', fontSize: 13 }}>{storage.used} GB / {storage.total} GB</span>
          </div>
          <div style={{ height: 6, background: 'var(--border-color)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(storage.used / storage.total) * 100}%`, background: '#10b981', borderRadius: 3 }} />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          {['all', 'folder', 'video', 'document', 'image'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 12px', borderRadius: 20, border: 'none', background: filter === f ? 'var(--primary)' : 'var(--bg)', color: filter === f ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: 12, textTransform: 'capitalize' }}>
              {f === 'all' ? '📂 All' : f === 'folder' ? '📁 Folders' : f === 'video' ? '🎬 Videos' : f === 'document' ? '📄 Docs' : '🖼️ Images'}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
            <button onClick={() => setView('grid')} style={{ padding: 8, borderRadius: 6, border: 'none', background: view === 'grid' ? 'var(--primary)' : 'var(--bg)', color: view === 'grid' ? 'white' : 'var(--text-secondary)', cursor: 'pointer' }}>⊞</button>
            <button onClick={() => setView('list')} style={{ padding: 8, borderRadius: 6, border: 'none', background: view === 'list' ? 'var(--primary)' : 'var(--bg)', color: view === 'list' ? 'white' : 'var(--text-secondary)', cursor: 'pointer' }}>☰</button>
          </div>
        </div>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {filteredFiles.map(file => (
              <div key={file.id} style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, textAlign: 'center', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{file.icon}</div>
                <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 13, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{file.type === 'folder' ? `${file.items} items` : file.size}</div>
                {file.offline && <div style={{ marginTop: 8, fontSize: 10, color: '#10b981' }}>✓ Available offline</div>}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredFiles.map(file => (
              <div key={file.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                <div style={{ fontSize: 28 }}>{file.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{file.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{file.type === 'folder' ? `${file.items} items` : file.size} • {file.lastSync}</div>
                </div>
                {file.offline ? <span style={{ color: '#10b981', fontSize: 12 }}>✓</span> : <button style={{ padding: 6, borderRadius: 4, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontSize: 11 }}>Download</button>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineFiles;
