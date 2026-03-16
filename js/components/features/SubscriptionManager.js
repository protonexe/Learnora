const SubscriptionManager = ({ onClose }) => {
  const plans = [
    { name: 'Free', price: '$0', features: ['Basic features', '5 courses', 'Limited support'] },
    { name: 'Pro', price: '$9.99', features: ['All features', 'Unlimited courses', 'Priority support'], current: true },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>💳 Subscription</h2>
      </div>
      <div style={{ padding: 20 }}>
        {plans.map((p, i) => (
          <div key={i} style={{ background: p.current ? 'var(--primary)' + '15' : 'var(--bg-secondary)', borderRadius: 12, padding: 20, marginBottom: 12, border: p.current ? '2px solid var(--primary)' : '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>{p.price}</span>
            </div>
            {p.features.map((f, j) => <div key={j} style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>✓ {f}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
};
