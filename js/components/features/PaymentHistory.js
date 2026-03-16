const PaymentHistory = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const payments = [
    { id: 1, date: 'Mar 1, 2026', amount: '$9.99', status: 'Completed', item: 'Pro Subscription' },
    { id: 2, date: 'Feb 1, 2026', amount: '$9.99', status: 'Completed', item: 'Pro Subscription' },
    { id: 3, date: 'Jan 1, 2026', amount: '$9.99', status: 'Completed', item: 'Pro Subscription' },
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>💳 Payment History</h1>
      </div>

      <div style={styles.list}>
        {payments.map(p => (
          <div key={p.id} style={styles.item}>
            <div>
              <h3 style={styles.itemName}>{p.item}</h3>
              <p style={styles.itemDate}>{p.date}</p>
            </div>
            <div style={styles.right}>
              <span style={styles.amount}>{p.amount}</span>
              <span style={styles.status}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, list: { display: 'flex', flexDirection: 'column', gap: '12px' }, item: { display: 'flex', justifyContent: 'space-between', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }, itemName: { margin: 0, fontSize: '15px', fontWeight: 600 }, itemDate: { margin: '4px 0 0', fontSize: '13px', color: '#888' }, right: { textAlign: 'right' }, amount: { display: 'block', fontSize: '16px', fontWeight: 700, color: 'var(--primary-500)' }, status: { display: 'block', fontSize: '12px', color: '#10b981', marginTop: '4px' }};

window.PaymentHistory = PaymentHistory;
