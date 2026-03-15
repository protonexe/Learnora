const FileExplorer = ({ 
  files = [], 
  onFileClick,
  onFolderClick,
  initialPath = []
}) => {
  const [currentPath, setCurrentPath] = React.useState(initialPath);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const currentFolder = files.reduce((acc, file) => {
    if (file.path.join('/') === currentPath.join('/')) {
      return file;
    }
    return acc;
  }, null);

  const contents = currentFolder?.contents || [];

  const navigateTo = (folder) => {
    setCurrentPath(folder.path);
    setSelectedFile(null);
  };

  const goBack = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const getFileIcon = (type) => {
    const icons = {
      folder: '📁',
      file: '📄',
      image: '🖼️',
      video: '🎬',
      audio: '🎵',
      pdf: '📕',
      doc: '📝',
      code: '💻',
      archive: '📦'
    };
    return icons[type] || icons.file;
  };

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      border: '1px solid var(--border-color)',
      overflow: 'hidden',
      height: '400px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Breadcrumb */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'var(--bg-tertiary)'
      }}>
        <button
          onClick={goBack}
          disabled={currentPath.length === 0}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: currentPath.length > 0 ? 'pointer' : 'not-allowed',
            opacity: currentPath.length > 0 ? 1 : 0.3,
            padding: '4px'
          }}
        >
          <Icon name="arrow-left" size={16} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, overflow: 'hidden' }}>
          <button
            onClick={() => setCurrentPath([])}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: 'var(--primary-500)'
            }}
          >
            Home
          </button>
          {currentPath.map((folder, idx) => (
            <React.Fragment key={idx}>
              <Icon name="chevron-right" size={12} color="var(--text-tertiary)" />
              <button
                onClick={() => setCurrentPath(currentPath.slice(0, idx + 1))}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: idx === currentPath.length - 1 ? 'var(--text-primary)' : 'var(--primary-500)'
                }}
              >
                {folder}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Files Grid */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '12px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '12px',
        alignContent: 'start'
      }}>
        {contents.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '40px',
            color: 'var(--text-tertiary)'
          }}>
            This folder is empty
          </div>
        ) : (
          contents.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedFile(item.name);
                if (item.type === 'folder') {
                  navigateTo(item);
                } else {
                  onFileClick?.(item);
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedFile === item.name ? 'var(--primary-500)15' : 'transparent',
                border: selectedFile === item.name ? '1px solid var(--primary-500)' : '1px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '32px' }}>{getFileIcon(item.type)}</span>
              <span style={{
                fontSize: '12px',
                textAlign: 'center',
                color: 'var(--text-primary)',
                wordBreak: 'break-word'
              }}>
                {item.name}
              </span>
              {item.size && (
                <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                  {item.size}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

window.FileExplorer = FileExplorer;
