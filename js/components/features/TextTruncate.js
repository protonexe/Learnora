const Truncate = ({ text, maxLength = 100, expandLabel = 'Show more', collapseLabel = 'Show less' }) => {
  const [expanded, setExpanded] = React.useState(false);

  if (!text || text.length <= maxLength) return <span>{text}</span>;

  return (
    <span>
      {expanded ? text : text.slice(0, maxLength) + '...'}
      <button onClick={() => setExpanded(!expanded)} style={{ background: 'transparent', border: 'none', color: 'var(--primary-500)', cursor: 'pointer', fontSize: 'inherit', marginLeft: '4px' }}>
        {expanded ? collapseLabel : expandLabel}
      </button>
    </span>
  );
};

const TextClamp = ({ text, lines = 3 }) => (
  <div style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: lines, WebkitBoxOrient: 'vertical' }}>
    {text}
  </div>
);

window.Truncate = Truncate;
window.TextClamp = TextClamp;
