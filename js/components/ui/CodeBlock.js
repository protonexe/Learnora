const CodeBlock = ({ code, language = 'javascript', showLineNumbers = true }) => {
  const [copied, setCopied] = React.useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div style={{
      background: '#1e1e2e',
      borderRadius: '12px',
      overflow: 'hidden',
      margin: '16px 0'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        background: '#181825',
        borderBottom: '1px solid #313244'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f38ba8' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fab387' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#a6e3a1' }} />
        </div>
        <span style={{ fontSize: '12px', color: '#6c7086' }}>{language}</span>
      </div>

      {/* Code */}
      <div style={{ display: 'flex', overflow: 'auto' }}>
        {showLineNumbers && (
          <div style={{
            padding: '16px 12px',
            background: '#181825',
            color: '#6c7086',
            fontSize: '13px',
            lineHeight: '1.6',
            textAlign: 'right',
            userSelect: 'none',
            borderRight: '1px solid #313244'
          }}>
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}
        <pre style={{
          margin: 0,
          padding: '16px',
          color: '#cdd6f4',
          fontSize: '13px',
          lineHeight: '1.6',
          overflow: 'auto'
        }}>
          <code>{code}</code>
        </pre>
      </div>

      {/* Copy Button */}
      <button
        onClick={copyCode}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          padding: '6px 12px',
          background: copied ? '#a6e3a1' : '#313244',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '12px',
          color: copied ? '#1e1e2e' : '#cdd6f4',
          fontWeight: '500'
        }}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  );
};

window.CodeBlock = CodeBlock;
