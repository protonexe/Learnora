const Breadcrumbs = ({ items = [], separator = '›' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
    {items.map((item, idx) => (
      <React.Fragment key={idx}>
        {idx > 0 && <span style={{ color: 'var(--text-tertiary)' }}>{separator}</span>}
        {item.href ? (
          <a href={item.href} style={{ color: idx === items.length - 1 ? 'var(--text-primary)' : 'var(--primary-500)', textDecoration: 'none', fontWeight: idx === items.length - 1 ? 600 : 400 }}>{item.label}</a>
        ) : (
          <span style={{ color: idx === items.length - 1 ? 'var(--text-primary)' : 'var(--text-tertiary)', fontWeight: idx === items.length - 1 ? 600 : 400 }}>{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </div>
);

window.Breadcrumbs = Breadcrumbs;
