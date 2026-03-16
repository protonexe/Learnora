import React from 'react';
import { Folder, ChevronRight, File, Image, FileText, Music, Video, FolderPlus, Search, Grid, List, MoreVertical, Star, Clock, Trash2, Download } from './Icon';

const FileExplorer = ({ onClose }) => {
  const [currentPath, setCurrentPath] = React.useState(['My Files']);
  const [files, setFiles] = React.useState([
    { id: 1, name: 'Documents', type: 'folder', size: 0, date: '2024-01-15' },
    { id: 2, name: 'Images', type: 'folder', size: 0, date: '2024-01-14' },
    { id: 3, name: 'Notes.txt', type: 'txt', size: '12 KB', date: '2024-01-13' },
    { id: 4, name: 'Resume.pdf', type: 'pdf', size: '2.4 MB', date: '2024-01-12' },
    { id: 5, name: 'Study Guide.docx', type: 'doc', size: '856 KB', date: '2024-01-11' },
    { id: 6, name: 'Presentation.pptx', type: 'ppt', size: '5.2 MB', date: '2024-01-10' },
  ]);
  const [view, setView] = React.useState('grid');
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState(null);
  const [sortBy, setSortBy] = React.useState('name');
  
  const navigateToFolder = (folderName) => {
    setCurrentPath([...currentPath, folderName]);
  };
  
  const navigateBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };
  
  const getIcon = (type) => {
    switch (type) {
      case 'folder': return '📁';
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'ppt': return '📽️';
      case 'xls': return '📊';
      case 'txt': return '📃';
      case 'img': return '🖼️';
      case 'mp3': return '🎵';
      case 'mp4': return '🎬';
      default: return '📄';
    }
  };
  
  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'size') return parseFloat(b.size) - parseFloat(a.size);
    return new Date(b.date) - new Date(a.date);
  });
  
  const folders = filteredFiles.filter(f => f.type === 'folder');
  const regularFiles = filteredFiles.filter(f => f.type !== 'folder');
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 600,
      height: 500,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: 16,
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Folder size={20} /> File Explorer
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            style={{
              padding: 8,
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <FolderPlus size={18} />
          </button>
          <button
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
            style={{
              padding: 8,
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            {view === 'grid' ? <List size={18} /> : <Grid size={18} />}
          </button>
        </div>
      </div>
      
      <div style={{
        padding: '8px 16px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <button
          onClick={navigateBack}
          disabled={currentPath.length === 1}
          style={{
            padding: 4,
            borderRadius: 4,
            border: 'none',
            background: 'transparent',
            color: currentPath.length === 1 ? 'var(--border-color)' : 'var(--text-secondary)',
            cursor: currentPath.length === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
        </button>
        {currentPath.map((path, i) => (
          <React.Fragment key={i}>
            {i > 0 && <ChevronRight size={14} style={{ color: 'var(--text-secondary)' }} />}
            <button
              onClick={() => setCurrentPath(currentPath.slice(0, i + 1))}
              style={{
                padding: '4px 8px',
                borderRadius: 4,
                border: 'none',
                background: i === currentPath.length - 1 ? 'var(--primary)' : 'transparent',
                color: i === currentPath.length - 1 ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 13
              }}
            >
              {path}
            </button>
          </React.Fragment>
        ))}
      </div>
      
      <div style={{
        padding: 12,
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        gap: 12
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: 'var(--bg)',
          borderRadius: 8,
          border: '1px solid var(--border-color)'
        }}>
          <Search size={16} style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: 13
            }}
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontSize: 13
          }}
        >
          <option value="name">Name</option>
          <option value="size">Size</option>
          <option value="date">Date</option>
        </select>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
        {folders.length > 0 && (
          <>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
              Folders
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: view === 'grid' ? 'repeat(4, 1fr)' : '1fr',
              gap: 8,
              marginBottom: 16
            }}>
              {folders.map(folder => (
                <div
                  key={folder.id}
                  onClick={() => navigateToFolder(folder.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: view === 'grid' ? 12 : 10,
                    background: 'var(--bg)',
                    borderRadius: 8,
                    cursor: 'pointer',
                    border: selected === folder.id ? '1px solid var(--primary)' : '1px solid transparent'
                  }}
                >
                  <span style={{ fontSize: view === 'grid' ? 32 : 20 }}>📁</span>
                  {view === 'list' && (
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{folder.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{folder.date}</div>
                    </div>
                  )}
                  {view === 'grid' && (
                    <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 12 }}>
                      {folder.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        
        {regularFiles.length > 0 && (
          <>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
              Files
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: view === 'grid' ? 'repeat(4, 1fr)' : '1fr',
              gap: 8
            }}>
              {regularFiles.map(file => (
                <div
                  key={file.id}
                  onClick={() => setSelected(file.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: view === 'grid' ? 12 : 10,
                    background: selected === file.id ? 'var(--primary)' + '20' : 'var(--bg)',
                    borderRadius: 8,
                    cursor: 'pointer',
                    border: selected === file.id ? '1px solid var(--primary)' : '1px solid transparent'
                  }}
                >
                  <span style={{ fontSize: view === 'grid' ? 32 : 20 }}>{getIcon(file.type)}</span>
                  {view === 'list' && (
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{file.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                        {file.size} • {file.date}
                      </div>
                    </div>
                  )}
                  {view === 'grid' && (
                    <div style={{
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      fontSize: 11,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%'
                    }}>
                      {file.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        
        {filteredFiles.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: 40,
            color: 'var(--text-secondary)'
          }}>
            No files found
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
