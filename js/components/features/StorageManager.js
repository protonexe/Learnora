import React from 'react';
import { Download, Upload, Cloud, HardDrive, Folder, File, Image, Film, Music, Archive, FileText, Trash2, RefreshCw, CheckCircle, XCircle, Clock, AlertCircle, MoreVertical, X, Search, Filter, Grid, List } from './Icon';

const StorageManager = ({ onClose }) => {
  const [view, setView] = React.useState('grid');
  const [filter, setFilter] = React.useState('all');
  
  const storage = {
    used: 4.2,
    total: 10,
    percentage: 42
  };
  
  const files = [
    { id: 1, name: 'Course Videos', type: 'folder', size: '2.1 GB', items: 45, icon: '📁', color: '#3b82f6' },
    { id: 2, name: 'PDF Documents', type: 'folder', size: '850 MB', items: 32, icon: '📁', color: '#ef4444' },
    { id: 3, name: 'Physics Lecture.mp4', type: 'video', size: '420 MB', icon: '🎬', color: '#8b5cf6' },
    { id: 4, name: 'Notes.docx', type: 'document', size: '2.3 MB', icon: '📝', color: '#3b82f6' },
    { id: 5, name: 'Diagrams.pdf', type: 'document', size: '5.8 MB', icon: '📄', color: '#ef4444' },
    { id: 6, name: 'Audio.mp3', type: 'audio', size: '8.5 MB', icon: '🎵', color: '#10b981' },
    { id: 7, name: 'Images.zip', type: 'archive', size: '120 MB', icon: '📦', color: '#f59e0b' },
    { id: 8, name: 'Screenshot.png', type: 'image', size: '2.1 MB', icon: '🖼️', color: '#ec4899' },
  ];
  
  const getTypeIcon = (type) => {
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
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 500,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: 20,
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Cloud size={20} /> Storage Manager
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
          background: 'var(--bg)',
          borderRadius: 12,
          padding: 16,
          marginBottom: 16
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Storage Used</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {storage.used} GB / {storage.total} GB
            </span>
          </div>
          <div style={{
            height: 8,
            background: 'var(--border-color)',
            borderRadius: 4,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${storage.percentage}%`,
              background: storage.percentage > 80 ? '#ef4444' : storage.percentage > 50 ? '#f59e0b' : '#10b981',
              borderRadius: 4
            }} />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 8,
            fontSize: 12,
            color: 'var(--text-secondary)'
          }}>
            <span>{storage.percentage}% used</span>
            <span>{storage.total - storage.used} GB free</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          {['all', 'folder', 'video', 'document', 'image'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                border: 'none',
                background: filter === f ? 'var(--primary)' : 'var(--bg)',
                color: filter === f ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 12,
                textTransform: 'capitalize'
              }}
            >
              {f === 'all' ? 'All' : f === 'document' ? 'Docs' : f}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
            <button
              onClick={() => setView('grid')}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: 'none',
                background: view === 'grid' ? 'var(--primary)' : 'var(--bg)',
                color: view === 'grid' ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              ⊞
            </button>
            <button
              onClick={() => setView('list')}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: 'none',
                background: view === 'list' ? 'var(--primary)' : 'var(--bg)',
                color: view === 'list' ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {filteredFiles.map(file => (
              <div
                key={file.id}
                style={{
                  background: 'var(--bg)',
                  borderRadius: 12,
                  padding: 16,
                  textAlign: 'center',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{file.icon}</div>
                <div style={{
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  fontSize: 13,
                  marginBottom: 4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {file.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  {file.size}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredFiles.map(file => (
              <div
                key={file.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 12,
                  background: 'var(--bg)',
                  borderRadius: 10,
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: 28 }}>{file.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{file.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {file.type === 'folder' ? `${file.items} items` : file.size}
                  </div>
                </div>
                <button style={{
                  padding: 8,
                  borderRadius: 6,
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}>
                  <MoreVertical size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorageManager;
