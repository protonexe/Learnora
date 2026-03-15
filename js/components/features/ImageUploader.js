const ImageUploader = ({ onUpload, maxSize = 5, accept = 'image/*', showToast }) => {
  const [preview, setPreview] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    
    // Check size
    if (file.size > maxSize * 1024 * 1024) {
      showToast?.(`File too large. Max ${maxSize}MB`, 'error');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Simulate upload
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      onUpload?.(file);
      showToast?.('Image uploaded!', 'success');
    }, 1500);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: '2px dashed var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '40px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: preview ? 'transparent' : 'var(--bg-secondary)'
        }}
      >
        {preview ? (
          <div style={{ position: 'relative' }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                borderRadius: '12px'
              }}
            />
            <button
              onClick={(e) => { e.stopPropagation(); setPreview(null); }}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '28px',
                height: '28px',
                background: 'var(--danger)',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                color: '#fff',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📁</div>
            <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0' }}>
              Drop an image here
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>
              or click to browse • Max {maxSize}MB
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => handleFile(e.target.files[0])}
        style={{ display: 'none' }}
      />

      {uploading && (
        <div style={{
          marginTop: '12px',
          padding: '12px',
          background: 'var(--bg-tertiary)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{
            height: '4px',
            background: 'var(--bg-secondary)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'var(--primary-500)',
              animation: 'uploadProgress 1.5s ease infinite'
            }} />
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: '8px 0 0 0' }}>
            Uploading...
          </p>
        </div>
      )}
      <style>{`
        @keyframes uploadProgress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

window.ImageUploader = ImageUploader;
