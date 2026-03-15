const CopyToClipboard = ({ text, children, showFeedback = true }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        background: copied ? 'var(--success)' : 'var(--bg-tertiary)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '8px 12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '13px',
        color: copied ? '#fff' : 'var(--text-primary)',
        transition: 'all 0.2s'
      }}
    >
      <Icon name={copied ? 'check' : 'copy'} size={14} />
      {children || (copied && showFeedback ? 'Copied!' : 'Copy')}
    </button>
  );
};

const ClipboardPaste = ({ onPaste, placeholder = 'Paste content...' }) => {
  const [content, setContent] = React.useState('');
  const [pasting, setPasting] = React.useState(false);

  const handlePaste = async () => {
    setPasting(true);
    try {
      const text = await navigator.clipboard.readText();
      setContent(text);
      onPaste?.(text);
    } catch (err) {
      console.error('Failed to paste:', err);
    }
    setPasting(false);
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: '10px 12px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          background: 'var(--bg-primary)',
          fontSize: '14px'
        }}
      />
      <button
        onClick={handlePaste}
        disabled={pasting}
        style={{
          padding: '10px 16px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          cursor: pasting ? 'not-allowed' : 'pointer',
          fontSize: '13px',
          fontWeight: '500',
          color: 'var(--text-primary)'
        }}
      >
        {pasting ? 'Pasting...' : '📋 Paste'}
      </button>
    </div>
  );
};

window.CopyToClipboard = CopyToClipboard;
window.ClipboardPaste = ClipboardPaste;
