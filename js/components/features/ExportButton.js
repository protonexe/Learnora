const ExportButton = ({ data, filename = 'export', formats = ['json', 'csv', 'txt'] }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const exportAs = (format) => {
    let content, type, ext;
    
    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      type = 'application/json';
      ext = 'json';
    } else if (format === 'csv') {
      if (Array.isArray(data) && data.length > 0) {
        const headers = Object.keys(data[0]);
        const rows = data.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','));
        content = [headers.join(','), ...rows].join('\n');
      } else content = '';
      type = 'text/csv';
      ext = 'csv';
    } else {
      content = typeof data === 'string' ? data : JSON.stringify(data);
      type = 'text/plain';
      ext = 'txt';
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${ext}`;
    a.click();
    setShowMenu(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setShowMenu(!showMenu)} style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
        Export ↓
      </button>
      {showMenu && (
        <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '4px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', zIndex: 10 }}>
          {formats.map(f => (
            <button key={f} onClick={() => exportAs(f)} style={{ display: 'block', width: '100%', padding: '10px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '13px' }}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

window.ExportButton = ExportButton;
