const FileUploader = ({ onUpload, accept = '*', multiple = false, maxSize = 10, maxFiles = 5 }) => {
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);

  const handleFiles = (newFiles) => {
    const validFiles = Array.from(newFiles).filter(file => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File too large. Max ${maxSize}MB`);
        return false;
      }
      return true;
    }).slice(0, maxFiles);
    
    setFiles([...files, ...validFiles].slice(0, maxFiles));
  };

  const upload = async () => {
    setUploading(true);
    for (const file of files) {
      await onUpload?.(file);
    }
    setFiles([]);
    setUploading(false);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload" style={{ display: 'block', padding: '40px', border: '2px dashed var(--border-color)', borderRadius: '12px', textAlign: 'center', cursor: 'pointer' }}>
        📁 Drop files here or click to upload
      </label>
      {files.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          {files.map((file, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '4px' }}>
              <span>{file.name}</span>
              <button onClick={() => removeFile(i)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--danger)' }}>×</button>
            </div>
          ))}
          <button onClick={upload} disabled={uploading} style={{ marginTop: '8px', width: '100%', padding: '12px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: uploading ? 'not-allowed' : 'pointer' }}>
            {uploading ? 'Uploading...' : `Upload ${files.length} files`}
          </button>
        </div>
      )}
    </div>
  );
};

window.FileUploader = FileUploader;
