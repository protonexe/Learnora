const StudyContract = ({ onClose }) => {
  const [contracts, setContracts] = React.useState(() => {
    const saved = localStorage.getItem('learnora-contracts');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = React.useState(false);
  const [newContract, setNewContract] = React.useState({
    title: '',
    commitment: '',
    duration: 7,
    stakes: ''
  });

  const saveContracts = (newContracts) => {
    setContracts(newContracts);
    localStorage.setItem('learnora-contracts', JSON.stringify(newContracts));
  };

  const handleCreate = () => {
    if (!newContract.title || !newContract.commitment) return;
    
    const contract = {
      id: Date.now(),
      ...newContract,
      createdAt: new Date().toISOString(),
      completed: false,
      progress: 0
    };
    
    saveContracts([contract, ...contracts]);
    setNewContract({ title: '', commitment: '', duration: 7, stakes: '' });
    setShowForm(false);
  };

  const deleteContract = (id) => {
    saveContracts(contracts.filter(c => c.id !== id));
  };

  const updateProgress = (id, progress) => {
    saveContracts(contracts.map(c => 
      c.id === id ? { ...c, progress: Math.min(100, Math.max(0, progress)) } : c
    ));
  };

  const markComplete = (id) => {
    saveContracts(contracts.map(c => 
      c.id === id ? { ...c, completed: true, progress: 100 } : c
    ));
  };

  const getDaysRemaining = (createdAt, duration) => {
    const created = new Date(createdAt);
    const end = new Date(created.getTime() + duration * 24 * 60 * 60 * 1000);
    const now = new Date();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  const activeContracts = contracts.filter(c => !c.completed);
  const completedContracts = contracts.filter(c => c.completed);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 1000,
      overflow: 'auto',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}>
            ← Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20 }}>📜 Study Contracts</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--primary)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600
          }}
        >
          + New Contract
        </button>
      </div>

      <div style={{ padding: 20, maxWidth: 700, margin: '0 auto' }}>
        {/* Contract Form */}
        {showForm && (
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: 16 }}>Create a Study Contract</h3>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)' }}>Contract Title</label>
              <input
                type="text"
                value={newContract.title}
                onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
                placeholder="e.g., Complete Mathematics Course"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  fontSize: 14
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)' }}>Your Commitment</label>
              <textarea
                value={newContract.commitment}
                onChange={(e) => setNewContract({ ...newContract, commitment: e.target.value })}
                placeholder="I commit to studying Mathematics for at least 1 hour every day..."
                style={{
                  width: '100%',
                  minHeight: 80,
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)' }}>Duration (days)</label>
                <input
                  type="number"
                  value={newContract.duration}
                  onChange={(e) => setNewContract({ ...newContract, duration: parseInt(e.target.value) || 7 })}
                  min={1}
                  max={365}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg)',
                    color: 'var(--text-primary)',
                    fontSize: 14
                  }}
                />
              </div>
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)' }}>Stakes (what happens if you fail)</label>
                <input
                  type="text"
                  value={newContract.stakes}
                  onChange={(e) => setNewContract({ ...newContract, stakes: e.target.value })}
                  placeholder="e.g., No screen time for a week"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg)',
                    color: 'var(--text-primary)',
                    fontSize: 14
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleCreate}
                disabled={!newContract.title || !newContract.commitment}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 8,
                  border: 'none',
                  background: newContract.title && newContract.commitment ? 'var(--primary)' : 'var(--border-color)',
                  color: 'white',
                  cursor: newContract.title && newContract.commitment ? 'pointer' : 'not-allowed',
                  fontWeight: 600
                }}
              >
                Create Contract
              </button>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Active Contracts */}
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--text-secondary)' }}>
          Active Contracts ({activeContracts.length})
        </h3>
        
        {activeContracts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 40,
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            marginBottom: 20,
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📜</div>
            <p style={{ color: 'var(--text-secondary)' }}>No active contracts. Create one to stay accountable!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
            {activeContracts.map(contract => (
              <div
                key={contract.id}
                style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: 12,
                  padding: 16,
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 12
                }}>
                  <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text-primary)' }}>{contract.title}</h3>
                  <span style={{
                    padding: '4px 8px',
                    background: '#f59e0b15',
                    color: '#f59e0b',
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 600
                  }}>
                    {getDaysRemaining(contract.createdAt, contract.duration)} days left
                  </span>
                </div>

                <p style={{
                  margin: '0 0 12px 0',
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5
                }}>
                  {contract.commitment}
                </p>

                {contract.stakes && (
                  <p style={{
                    margin: '0 0 12px 0',
                    fontSize: 12,
                    color: '#f43f5e',
                    fontStyle: 'italic'
                  }}>
                    ⚠️ Stake: {contract.stakes}
                  </p>
                )}

                <div style={{
                  height: 8,
                  background: 'var(--bg)',
                  borderRadius: 4,
                  marginBottom: 12,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${contract.progress}%`,
                    background: contract.progress === 100 ? '#10b981' : 'var(--primary)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => updateProgress(contract.id, contract.progress + 10)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: 6,
                      border: 'none',
                      background: 'var(--primary)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 600
                    }}
                  >
                    +10% Progress
                  </button>
                  <button
                    onClick={() => markComplete(contract.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      border: 'none',
                      background: '#10b98115',
                      color: '#10b981',
                      cursor: 'pointer',
                      fontSize: 12
                    }}
                  >
                    ✓ Complete
                  </button>
                  <button
                    onClick={() => deleteContract(contract.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-tertiary)',
                      cursor: 'pointer',
                      fontSize: 12
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Contracts */}
        {completedContracts.length > 0 && (
          <>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--text-secondary)' }}>
              Completed Contracts ({completedContracts.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {completedContracts.map(contract => (
                <div
                  key={contract.id}
                  style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: 8,
                    padding: 12,
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}
                >
                  <span style={{ fontSize: 20 }}>🏆</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: 'var(--text-primary)', textDecoration: 'line-through' }}>
                      {contract.title}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteContract(contract.id)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 4,
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-tertiary)',
                      cursor: 'pointer',
                      fontSize: 12
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
