import React from 'react';
import { Share2, Link, Mail, MessageSquare, Twitter, Facebook, Copy, Check, X, QrCode, Download } from './Icon';

const ShareModal = ({ content, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const [showQR, setShowQR] = React.useState(false);
  
  const shareOptions = [
    { id: 'link', icon: '🔗', label: 'Copy Link', action: 'copy' },
    { id: 'twitter', icon: '🐦', label: 'Twitter', action: 'twitter' },
    { id: 'facebook', icon: '📘', label: 'Facebook', action: 'facebook' },
    { id: 'whatsapp', icon: '💬', label: 'WhatsApp', action: 'whatsapp' },
    { id: 'email', icon: '📧', label: 'Email', action: 'email' },
    { id: 'qr', icon: '📱', label: 'QR Code', action: 'qr' },
  ];
  
  const shareContent = content || {
    title: 'Check out this course on Learnora!',
    description: 'I\'m learning Physics on Learnora. It\'s amazing!',
    url: 'https://learnora.app/course/physics-101',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200'
  };
  
  const handleShare = (action) => {
    if (action === 'copy') {
      navigator.clipboard.writeText(shareContent.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (action === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent.description)}&url=${encodeURIComponent(shareContent.url)}`, '_blank');
    } else if (action === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareContent.url)}`, '_blank');
    } else if (action === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareContent.description + ' ' + shareContent.url)}`, '_blank');
    } else if (action === 'email') {
      window.open(`mailto:?subject=${encodeURIComponent(shareContent.title)}&body=${encodeURIComponent(shareContent.description + '\n\n' + shareContent.url)}`, '_blank');
    } else if (action === 'qr') {
      setShowQR(!showQR);
    }
  };
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 24,
      width: 400
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Share2 size={20} /> Share
        </h3>
        <button
          onClick={onClose}
          style={{
            padding: 4,
            borderRadius: 6,
            border: 'none',
            background: 'transparent',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: 18
          }}
        >
          <X size={20} />
        </button>
      </div>
      
      <div style={{
        display: 'flex',
        gap: 12,
        padding: 16,
        background: 'var(--bg)',
        borderRadius: 12,
        marginBottom: 20
      }}>
        <img
          src={shareContent.image}
          alt="Share"
          style={{
            width: 60,
            height: 60,
            borderRadius: 8,
            objectFit: 'cover'
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
            {shareContent.title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
            {shareContent.description}
          </div>
          <div style={{ fontSize: 11, color: 'var(--primary)' }}>
            {shareContent.url}
          </div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
        {shareOptions.map(option => (
          <button
            key={option.id}
            onClick={() => handleShare(option.action)}
            style={{
              padding: 16,
              borderRadius: 12,
              border: '1px solid var(--border-color)',
              background: 'var(--bg)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8
            }}
          >
            <span style={{ fontSize: 24 }}>{option.icon}</span>
            <span style={{ fontSize: 12, color: 'var(--text-primary)' }}>{option.label}</span>
          </button>
        ))}
      </div>
      
      {showQR && (
        <div style={{
          background: 'white',
          borderRadius: 12,
          padding: 20,
          textAlign: 'center',
          marginBottom: 20
        }}>
          <div style={{
            width: 150,
            height: 150,
            background: 'black',
            margin: '0 auto 12px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 12
          }}>
            [QR Code]
          </div>
          <p style={{ margin: '0 0 12px 0', fontSize: 13, color: 'var(--text-secondary)' }}>
            Scan to open on another device
          </p>
          <button style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--primary)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            margin: '0 auto'
          }}>
            <Download size={16} /> Download QR
          </button>
        </div>
      )}
      
      <div>
        <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
          Share Link
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={shareContent.url}
            readOnly
            style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg)',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
          <button
            onClick={() => handleShare('copy')}
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              border: 'none',
              background: copied ? '#10b981' : 'var(--primary)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
