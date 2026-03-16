const SubscriptionManager = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [plan, setPlan] = React.useState('free');

  const plans = [
    { id: 'free', name: 'Free', price: '$0', period: 'forever', features: ['Basic courses', 'Limited quizzes', '5 flashcard decks', 'Ads included'] },
    { id: 'pro', name: 'Pro', price: '$9.99', period: '/month', features: ['All courses', 'Unlimited quizzes', 'Unlimited flashcards', 'No ads', 'Priority support', 'Offline access'], popular: true },
    { id: 'team', name: 'Team', price: '$19.99', period: '/month', features: ['Everything in Pro', 'Up to 5 members', 'Group study rooms', 'Analytics dashboard', 'Admin tools'] },
  ];

  const upgrade = (planId) => {
    setPlan(planId);
    showToast?.(`Upgraded to ${planId}!`, 'success');
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>💎 Subscription</h1>
      </div>

      <div style={styles.currentPlan}>
        <span style={styles.currentLabel}>Current Plan:</span>
        <span style={styles.currentValue}>{plans.find(p => p.id === plan)?.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
        {plans.map(p => (
          <div key={p.id} style={{ ...styles.planCard, borderColor: p.popular ? 'var(--primary-500)' : 'var(--border-color)' }}>
            {p.popular && <span style={styles.popularBadge}>Most Popular</span>}
            <h3 style={styles.planName}>{p.name}</h3>
            <div style={styles.planPrice}>
              <span style={styles.priceValue}>{p.price}</span>
              <span style={styles.pricePeriod}>{p.period}</span>
            </div>
            <ul style={styles.featureList}>
              {p.features.map((f, i) => <li key={i} style={styles.featureItem}>✓ {f}</li>)}
            </ul>
            <button onClick={() => upgrade(p.id)} disabled={plan === p.id} style={{ ...styles.planButton, background: plan === p.id ? 'var(--bg-primary)' : p.popular ? 'var(--primary-500)' : 'var(--bg-secondary)', color: plan === p.id ? 'var(--text-tertiary)' : '#fff', border: plan === p.id ? '1px solid var(--border-color)' : 'none' }}>
              {plan === p.id ? 'Current Plan' : 'Select'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  currentPlan: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' },
  currentLabel: { fontSize: '14px', color: 'var(--text-secondary)' },
  currentValue: { fontSize: '16px', fontWeight: '600', color: 'var(--primary-500)' },
  planCard: { background: 'var(--bg-secondary)', border: '2px solid', borderRadius: 'var(--radius-xl)', padding: '24px', position: 'relative' },
  popularBadge: { position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary-500)', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '4px 12px', borderRadius: '10px' },
  planName: { fontSize: '20px', fontWeight: '700', margin: '0 0 12px 0', color: 'var(--text-primary)' },
  planPrice: { marginBottom: '20px' },
  priceValue: { fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)' },
  pricePeriod: { fontSize: '14px', color: 'var(--text-tertiary)' },
  featureList: { listStyle: 'none', padding: 0, margin: '0 0 20px 0' },
  featureItem: { fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' },
  planButton: { width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }
};

window.SubscriptionManager = SubscriptionManager;
