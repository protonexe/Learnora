const Pagination = ({ total, current, pageSize = 10, onChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  const pages = [];
  
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= current - 2 && i <= current + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      <button onClick={() => onChange(Math.max(1, current - 1))} disabled={current === 1} style={{ padding: '8px 12px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '6px', cursor: current === 1 ? 'not-allowed' : 'pointer', opacity: current === 1 ? 0.5 : 1 }}>←</button>
      {pages.map((page, idx) => (
        page === '...' 
          ? <span key={idx} style={{ padding: '8px' }}>...</span>
          : <button key={idx} onClick={() => onChange(page)} style={{ padding: '8px 12px', background: current === page ? 'var(--primary-500)' : 'var(--bg-tertiary)', border: 'none', borderRadius: '6px', cursor: 'pointer', color: current === page ? '#fff' : 'var(--text-primary)' }}>{page}</button>
      ))}
      <button onClick={() => onChange(Math.min(totalPages, current + 1))} disabled={current === totalPages} style={{ padding: '8px 12px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '6px', cursor: current === totalPages ? 'not-allowed' : 'pointer', opacity: current === totalPages ? 0.5 : 1 }}>→</button>
    </div>
  );
};

window.Pagination = Pagination;
