const SocialShare = ({ title, description, url, showToast }) => {
  const [copied, setCopied] = React.useState(false);

  const shareToSocial = (platform) => {
    const shareUrl = url || window.location.href;
    const shareTitle = title || 'Check this out!';
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast?.('Link copied!', 'success');
    } else {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  const platforms = [
    { id: 'twitter', icon: '𝕏', label: 'Twitter', color: '#000' },
    { id: 'facebook', icon: '📘', label: 'Facebook', color: '#1877f2' },
    { id: 'linkedin', icon: '💼', label: 'LinkedIn', color: '#0a66c2' },
    { id: 'whatsapp', icon: '💬', label: 'WhatsApp', color: '#25d366' },
    { id: 'telegram', icon: '✈️', label: 'Telegram', color: '#0088cc' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px'
      }}>
        {platforms.map(p => (
          <button
            key={p.id}
            onClick={() => shareToSocial(p.id)}
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
            <span style={{ fontSize: '20px' }}>{p.icon}</span>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '500' }}>{p.label}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={url || window.location.href}
          readOnly
          style={{
            flex: 1,
            padding: '10px 12px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontSize: '13px',
            color: 'var(--text-primary)'
          }}
        />
        <button
          onClick={() => shareToSocial('copy')}
          style={{
            padding: '10px 16px',
            background: copied ? 'var(--success)' : 'var(--primary-500)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            color: '#fff',
            whiteSpace: 'nowrap'
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

window.SocialShare = SocialShare;
