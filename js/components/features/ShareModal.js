const ShareModal = ({ isOpen, onClose, title, url, description }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const shareOptions = [
    { id: 'copy', icon: '🔗', label: 'Copy Link', action: 'copy' },
    { id: 'twitter', icon: '𝕏', label: 'Twitter', action: 'twitter' },
    { id: 'facebook', icon: '📘', label: 'Facebook', action: 'facebook' },
    { id: 'linkedin', icon: '💼', label: 'LinkedIn', action: 'linkedin' },
    { id: 'email', icon: '📧', label: 'Email', action: 'email' },
  ];

  const handleShare = (action) => {
    const shareUrl = url || window.location.href;
    const shareText = description || `Check out "${title}" on Learnora!`;

    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: '20px',
          padding: '24px',
          width: '90%',
          maxWidth: '400px',
          boxShadow: '0 25px 80px rgba(0,0,0,0.4)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Share</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--text-secondary)' }}>✕</button>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
          {title || 'Share this content'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
          {shareOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleShare(option.action)}
              style={{
                padding: '16px 8px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '20px' }}>{option.icon}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '500' }}>{option.label}</span>
            </button>
          ))}
        </div>

        {/* Copy Link Input */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={url || window.location.href}
            readOnly
            style={{
              flex: 1,
              padding: '12px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '13px',
              color: 'var(--text-primary)'
            }}
          />
          <button
            onClick={() => handleShare('copy')}
            style={{
              padding: '12px 20px',
              background: copied ? 'var(--success)' : 'var(--primary-500)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

window.ShareModal = ShareModal;
