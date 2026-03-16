import React from 'react';
import { X, Download, Upload, File, Folder, Image, Film, Music, Archive, FileText, Search, Grid, List, SortAsc, SortDesc, Filter, Trash2, Edit2, Share2, Copy, MoreVertical, Eye, Clock, HardDrive } from './Icon';

const FilePreview = ({ file, onClose }) => {
  const [view, setView] = React.useState('grid');
  
  const previewFiles = [
    { id: 1, name: 'presentation.pptx', type: 'document', size: '5.2 MB', modified: '2 hours ago', thumbnail: '📽️' },
    { id: 2, name: 'diagram.png', type: 'image', size: '2.4 MB', modified: '5 hours ago', thumbnail: '🖼️' },
    { id: 3, name: 'video_lecture.mp4', type: 'video', size: '156 MB', modified: 'Yesterday', thumbnail: '🎬' },
    { id: 4, name: 'audio_notes.mp3', type: 'audio', size: '12 MB', modified: '2 days ago', thumbnail: '🎵' },
    { id: 5, name: 'project.zip', type: 'archive', size: '45 MB', modified: '1 week ago', thumbnail: '📦' },
    { id: 6, name: 'notes.pdf', type: 'document', size: '1.8 MB', modified: '1 week ago', thumbnail: '📄' },
  ];
  
  const getIcon = (type) => {
    switch (type) {
      case 'image': return '🖼️';
      case 'video': return '🎬';
      case 'audio': return '🎵';
      case 'archive': return '📦';
      default: return '📄';
    }
  };
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 600,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: 20, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            📁 File Preview
          </h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
      </div>
      
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
        {['grid', 'list'].map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              flex: 1,
              padding: 12,
              border: 'none',
              background: view === v ? 'var(--primary)' : 'transparent',
              color: view === v ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontSize: 13
            }}
          >
            {v === 'grid' ? '⊞' : '☰'} {v}
          </button>
        ))}
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {previewFiles.map(f => (
              <div key={f.id} style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, textAlign: 'center', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>{f.thumbnail}</div>
                <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 13, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{f.size}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {previewFiles.map(f => (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg)', borderRadius: 10, cursor: 'pointer' }}>
                <div style={{ fontSize: 28 }}>{f.thumbnail}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{f.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{f.size} • {f.modified}</div>
                </div>
                <button style={{ padding: 8, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePreview;
