import React from 'react';
import { Wallet, CreditCard, Plus, X, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, Filter, Search, DollarSign, TrendingUp, TrendingDown, Calendar, RefreshCw } from './Icon';

const PaymentHistory = ({ onClose }) => {
  const [filter, setFilter] = React.useState('all');
  
  const transactions = [
    { id: 1, type: 'payment', title: 'Course: Advanced Physics', amount: -49, date: '2024-01-15', status: 'completed', method: 'Credit Card' },
    { id: 2, type: 'payment', title: 'Course: Calculus Mastery', amount: -39, date: '2024-01-10', status: 'completed', method: 'PayPal' },
    { id: 3, type: 'refund', title: 'Refund: Chemistry Basics', amount: 25, date: '2024-01-08', status: 'completed', method: 'Credit Card' },
    { id: 4, type: 'payment', title: 'Course: Python Programming', amount: -59, date: '2024-01-05', status: 'completed', method: 'Credit Card' },
    { id: 5, type: 'payment', title: 'Tutoring Session', amount: -45, date: '2024-01-03', status: 'pending', method: 'Credit Card' },
    { id: 6, type: 'subscription', title: 'Premium Subscription', amount: -19, date: '2024-01-01', status: 'completed', method: 'Credit Card' },
  ];
  
  const balance = 125.50;
  const totalSpent = 211;
  const totalSaved = 25;
  
  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 24,
      width: 450,
      maxHeight: '80vh',
      overflow: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          💳 Payment History
        </h3>
        <button
          onClick={onClose}
          style={{
            padding: 4,
            borderRadius: 6,
            border: 'none',
            background: 'transparent',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>
      </div>
      
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        borderRadius: 12,
        padding: 20,
        color: 'white',
        marginBottom: 20
      }}>
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>Available Balance</div>
        <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>${balance.toFixed(2)}</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Total Spent</div>
            <div style={{ fontWeight: 600 }}>${totalSpent}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Total Saved</div>
            <div style={{ fontWeight: 600 }}>${totalSaved}</div>
          </div>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 16
      }}>
        {['all', 'payment', 'refund', 'subscription'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 12px',
              borderRadius: 20,
              border: 'none',
              background: filter === f ? 'var(--primary)' : 'var(--bg)',
              color: filter === f ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 12,
              textTransform: 'capitalize'
            }}
          >
            {f === 'all' ? 'All' : f === 'payment' ? 'Payments' : f}
          </button>
        ))}
      </div>
      
      <div>
        {filteredTransactions.map(transaction => (
          <div
            key={transaction.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 14,
              background: 'var(--bg)',
              borderRadius: 10,
              marginBottom: 8
            }}
          >
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: transaction.amount > 0 ? '#10b98120' : '#ef444420',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {transaction.amount > 0 ? (
                <ArrowDownLeft size={20} style={{ color: '#10b981' }} />
              ) : (
                <ArrowUpRight size={20} style={{ color: '#ef4444' }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>
                {transaction.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {transaction.date} • {transaction.method}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontWeight: 600,
                color: transaction.amount > 0 ? '#10b981' : '#ef4444'
              }}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount < 0 ? '$' + Math.abs(transaction.amount) : '$' + transaction.amount}
              </div>
              <div style={{
                fontSize: 11,
                color: transaction.status === 'completed' ? '#10b981' : '#f59e0b'
              }}>
                {transaction.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
