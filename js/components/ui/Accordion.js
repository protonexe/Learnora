const Accordion = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = React.useState([]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => prev.includes(index) ? [] : [index]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item, idx) => (
        <div key={idx} style={{
          background: 'var(--bg-secondary)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          overflow: 'hidden'
        }}>
          <button
            onClick={() => toggleItem(idx)}
            style={{
              width: '100%',
              padding: '16px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'left'
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
              {item.title}
            </span>
            <Icon 
              name={openItems.includes(idx) ? 'chevron-up' : 'chevron-down'} 
              size={18} 
              color="var(--text-tertiary)" 
            />
          </button>
          
          {openItems.includes(idx) && (
            <div style={{
              padding: '0 16px 16px',
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6'
            }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Collapse = ({ isOpen, children }) => (
  <div style={{
    height: isOpen ? 'auto' : 0,
    overflow: 'hidden',
    transition: 'height 0.3s ease'
  }}>
    {children}
  </div>
);

window.Accordion = Accordion;
window.Collapse = Collapse;
