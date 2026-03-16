const StudyBudget = ({ onBack, showToast }) => {
  const [expenses, setExpenses] = React.useState(() => JSON.parse(localStorage.getItem('study-budget')) || [
    { id: 1, item: 'Textbooks', amount: 150, category: 'Books' },
    { id: 2, item: 'Notebooks', amount: 25, category: 'Supplies' }
  ]);
  const [budget, setBudget] = React.useState(500);

  const addExpense = () => {
    const item = prompt('Item:');
    const amount = parseFloat(prompt('Amount:'));
    if (item && amount) {
      const newE = { id: Date.now(), item, amount, category: 'Other' };
      setExpenses([...expenses, newE]);
      localStorage.setItem('study-budget', JSON.stringify([...expenses, newE]));
    }
  };

  const total = expenses.reduce((a, e) => a + e.amount, 0);
  const remaining = budget - total;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Budget</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
          <div style={{ background: '#ecfdf5', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>${remaining}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Remaining</div>
          </div>
          <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>${total}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Spent</div>
          </div>
        </div>
        <button onClick={addExpense} style={{ width: '100%', padding: '15px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', marginBottom: '20px' }}>+ Add Expense</button>
        <div style={{ display: 'grid', gap: '12px' }}>
          {expenses.map(e => (
            <div key={e.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '500' }}>{e.item}</span>
              <span style={{ fontWeight: 'bold', color: '#ef4444' }}>${e.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.StudyBudget = StudyBudget;
