import React from 'react';
import { X, Check, Clock, Calendar, DollarSign, CreditCard, Wallet, TrendingUp, TrendingDown, Receipt, ArrowUpRight, ArrowDownLeft, RefreshCw, Filter } from './Icon';

const SubscriptionManager = ({ onClose }) => {
  const [plan, setPlan] = React.useState('premium');
  const [billingCycle, setBillingCycle] = React.useState('monthly');
  
  const plans = [
    { id: 'free', name: 'Free', price: 0, features: ['Basic courses', '5 quizzes/day', 'Limited flashcards'] },
    { id: 'basic', name: 'Basic', price: 9.99, features: ['All courses', 'Unlimited quizzes', 'Flashcards', 'Study groups'] },
    { id: 'premium', name: 'Premium', price: 19.99, features: ['Everything in Basic', 'Live sessions', 'AI tutor', 'Certificates', 'Priority support'] },
  ];
  
  const invoices = [
    { id: 1, date: 'Jan 15, 2024', amount: 19.99, status: 'paid' },
    { id: 2, date: 'Dec 15, 2023', amount: 19.99, status: 'paid' },
    { id: 3, date: 'Nov 15, 2023', amount: 19.99, status: 'paid' },
  ];
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      width: 500,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: 20, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            💎 Subscription & Billing
          </h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
      </div>
      
      <div style={{ padding: 20, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white', margin: '0 20px 20px', borderRadius: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 14, opacity: 0.9 }}>Current Plan</span>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>PREMIUM</span>
        </div>
        <div style={{ fontSize: 28, fontWeight: 700 }}>$19.99/month</div>
        <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>Next billing: Feb 15, 2024</div>
      </div>
      
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Available Plans</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {plans.map(p => (
            <button
              key={p.id}
              onClick={() => setPlan(p.id)}
              style={{
                padding: 16,
                borderRadius: 12,
                border: `2px solid ${plan === p.id ? 'var(--primary)' : 'var(--border-color)'}`,
                background: plan === p.id ? 'var(--primary)' + '15' : 'var(--bg)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)' }}>${p.price}</div>
              {p.id === 'premium' && <div style={{ fontSize: 10, color: 'var(--primary)', marginTop: 4 }}>CURRENT</div>}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: 14 }}>Billing History</h4>
        {invoices.map(inv => (
          <div key={inv.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg)', borderRadius: 10, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#10b98120', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Receipt size={18} style={{ color: '#10b981' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 13 }}>Premium Subscription</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{inv.date}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>${inv.amount}</div>
              <div style={{ fontSize: 11, color: '#10b981' }}>✓ Paid</div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ padding: 20, borderTop: '1px solid var(--border-color)' }}>
        <button style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600, marginBottom: 10 }}>
          Update Plan
        </button>
        <button style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', cursor: 'pointer' }}>
          Cancel Subscription
        </button>
      </div>
    </div>
  );
};

export default SubscriptionManager;
