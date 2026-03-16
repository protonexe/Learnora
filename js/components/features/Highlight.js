const Highlight = ({ text, query, color = '#f59e0b' }) => {
  if (!query) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() 
          ? <mark key={i} style={{ background: color, color: '#000', padding: '0 2px', borderRadius: '2px' }}>{part}</mark>
          : part
      )}
    </span>
  );
};

const HighlightText = ({ text, highlight, style = {} }) => {
  if (!highlight) return <span style={style}>{text}</span>;
  
  const parts = String(text).split(new RegExp(`(${String(highlight)})`, 'gi'));
  return (
    <span style={style}>
      {parts.map((part, i) => 
        part.toLowerCase() === String(highlight).toLowerCase()
          ? <mark key={i} style={{ background: '#f59e0b40', color: 'inherit', borderRadius: '2px' }}>{part}</mark>
          : part
      )}
    </span>
  );
};

window.Highlight = Highlight;
window.HighlightText = HighlightText;
