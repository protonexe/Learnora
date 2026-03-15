const RecentlyViewed = ({ limit = 5 }) => {
  const [items, setItems] = React.useState([]);
  const isMobile = window.innerWidth <= 768;

  React.useEffect(() => {
    const saved = localStorage.getItem('learnora-recently-viewed') || '[]';
    setItems(JSON.parse(saved).slice(0, limit));
  }, []);

  const getIcon = (type) => {
    const icons = {
      course: '📚',
      quiz: '📝',
      flashcards: '🗂️',
      ebook: '📖',
      video: '🎬',
      assignment: '📋'
    };
    return icons[type] || '📄';
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 86400000) return 'Today';
    if (diff < 172800000) return 'Yesterday';
    return date.toLocaleDateString();
  };

  if (items.length === 0) return null;

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      padding: isMobile ? '14px' : '18px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: isMobile ? '12px' : '16px'
      }}>
        <h3 style={{
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '700',
          margin: 0,
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '18px' }}>🕐</span>
          Recently Viewed
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item, idx) => (
          <div key={item.id || idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: item.color || 'var(--primary-500)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              {getIcon(item.type)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: '13px',
                fontWeight: '600',
                margin: 0,
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {item.name || item.title}
              </p>
              <p style={{
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                margin: '2px 0 0 0'
              }}>
                {formatDate(item.viewedAt)}
              </p>
            </div>
            <Icon name="chevron-right" size={16} color="var(--text-tertiary)" />
          </div>
        ))}
      </div>
    </div>
  );
};

const addToRecentlyViewed = (item) => {
  const saved = JSON.parse(localStorage.getItem('learnora-recently-viewed') || '[]');
  
  // Remove if already exists
  const filtered = saved.filter(i => i.id !== item.id);
  
  // Add to front
  const newItems = [{ ...item, viewedAt: Date.now() }, ...filtered].slice(0, 20);
  
  localStorage.setItem('learnora-recently-viewed', JSON.stringify(newItems));
};

window.RecentlyViewed = RecentlyViewed;
window.addToRecentlyViewed = addToRecentlyViewed;
