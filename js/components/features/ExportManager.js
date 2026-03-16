import React from 'react';
import { Download, Share2, Printer, FileText, Copy, Check, ExternalLink, Edit2, Trash2, Folder, File, Image, Film, Music, Archive, FileCode } from './Icon';

const ExportManager = ({ onClose }) => {
  const [selectedFormat, setSelectedFormat] = React.useState('pdf');
  const [options, setOptions] = React.useState({
    includeProgress: true,
    includeNotes: true,
    includeCertificates: false,
    includeTimeline: true,
    compress: false,
    quality: 'high'
  });
  const [exporting, setExporting] = React.useState(false);
  const [exported, setExported] = React.useState(false);
  
  const formats = [
    { id: 'pdf', name: 'PDF', icon: '📄', description: 'Best for printing and sharing' },
    { id: 'docx', name: 'Word', icon: '📝', description: 'Editable document' },
    { id: 'xlsx', name: 'Excel', icon: '📊', description: 'Spreadsheet format' },
    { id: 'json', name: 'JSON', icon: '💻', description: 'Data interchange format' },
    { id: 'csv', name: 'CSV', icon: '📋', description: 'Spreadsheet compatible' },
    { id: 'md', name: 'Markdown', icon: '📑', description: 'Lightweight markup' },
  ];
  
  const exportData = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    }, 2000);
  };
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 24,
      width: 450
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Download size={20} /> Export Data
      </h3>
      
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', marginBottom: 10, color: 'var(--text-secondary)', fontSize: 13 }}>
          Select Format
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {formats.map(format => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              style={{
                padding: 14,
                borderRadius: 10,
                border: `2px solid ${selectedFormat === format.id ? 'var(--primary)' : 'var(--border-color)'}`,
                background: selectedFormat === format.id ? 'var(--primary)' + '15' : 'var(--bg)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>{format.icon}</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{format.name}</div>
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', marginBottom: 10, color: 'var(--text-secondary)', fontSize: 13 }}>
          Export Options
        </label>
        <div style={{ background: 'var(--bg)', borderRadius: 10, padding: 4 }}>
          {Object.entries(options).map(([key, value]) => (
            <div key={key} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 12px',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <span style={{ color: 'var(--text-primary)', fontSize: 13, textTransform: 'capitalize' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              {typeof value === 'boolean' ? (
                <button
                  onClick={() => setOptions({ ...options, [key]: !value })}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    border: 'none',
                    background: value ? 'var(--primary)' : 'var(--border-color)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: 3,
                    left: value ? 23 : 3,
                    transition: 'left 0.2s'
                  }} />
                </button>
              ) : (
                <select
                  value={value}
                  onChange={(e) => setOptions({ ...options, [key]: e.target.value })}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--border-color)',
                    background: 'var(--card-bg)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: 12
                  }}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <div style={{
          background: 'var(--bg)',
          borderRadius: 10,
          padding: 16,
          border: '1px dashed var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Folder size={24} style={{ color: 'var(--primary)' }} />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>My Learnora Data</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Last exported: Never</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            Includes: Courses, Progress, Notes, Achievements, Study History
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 10,
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          <Share2 size={18} /> Share
        </button>
        <button
          onClick={exportData}
          disabled={exporting}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 10,
            border: 'none',
            background: exported ? '#10b981' : exporting ? '#f59e0b' : 'var(--primary)',
            color: 'white',
            cursor: exporting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontWeight: 600
          }}
        >
          {exporting ? (
            <>⏳ Exporting...</>
          ) : exported ? (
            <>✓ Exported!</>
          ) : (
            <><Download size={18} /> Export Now</>
          )}
        </button>
      </div>
    </div>
  );
};

export default ExportManager;
