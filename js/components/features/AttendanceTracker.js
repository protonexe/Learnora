const AttendanceTracker = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [records, setRecords] = React.useState(() => JSON.parse(localStorage.getItem('attendance-records') || '[]'));
  const [showAdd, setShowAdd] = React.useState(false);
  const [newRecord, setNewRecord] = React.useState({ date: '', subject: '', status: 'present' });

  React.useEffect(() => { localStorage.setItem('attendance-records', JSON.stringify(records)); }, [records]);

  const addRecord = () => {
    if (!newRecord.date || !newRecord.subject) return;
    setRecords([{ id: Date.now(), ...newRecord }, ...records]);
    setNewRecord({ date: '', subject: '', status: 'present' });
    setShowAdd(false);
    showToast?.('Attendance recorded!', 'success');
  };

  const deleteRecord = (id) => setRecords(records.filter(r => r.id !== id));

  const getStats = () => {
    const total = records.length;
    const present = records.filter(r => r.status === 'present').length;
    const absent = records.filter(r => r.status === 'absent').length;
    const late = records.filter(r => r.status === 'late').length;
    return { total, present, absent, late, percentage: total > 0 ? ((present / total) * 100).toFixed(1) : 0 };
  };

  const stats = getStats();
  const statusColors = { present: '#10b981', absent: '#f43f5e', late: '#f59e0b' };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>📅 Attendance</h1>
        </div>
        <button onClick={() => setShowAdd(true)} style={styles.addButton}><Icon name="plus" size={18} /> Add</button>
      </div>

      <div style={styles.statsCard}>
        <div style={styles.statBox}><span style={styles.statValue}>{stats.percentage}%</span><span style={styles.statLabel}>Present</span></div>
        <div style={styles.statBox}><span style={{...styles.statValue, color: '#10b981'}}>{stats.present}</span><span style={styles.statLabel}>Present</span></div>
        <div style={styles.statBox}><span style={{...styles.statValue, color: '#f43f5e'}}>{stats.absent}</span><span style={styles.statLabel}>Absent</span></div>
        <div style={styles.statBox}><span style={{...styles.statValue, color: '#f59e0b'}}>{stats.late}</span><span style={styles.statLabel}>Late</span></div>
      </div>

      {showAdd && (
        <div style={styles.card}>
          <input type="date" value={newRecord.date} onChange={(e) => setNewRecord({...newRecord, date: e.target.value})} style={styles.input} />
          <input type="text" value={newRecord.subject} onChange={(e) => setNewRecord({...newRecord, subject: e.target.value})} placeholder="Subject" style={styles.input} />
          <select value={newRecord.status} onChange={(e) => setNewRecord({...newRecord, status: e.target.value})} style={styles.select}>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addRecord} style={styles.primaryButton}>Add</button>
            <button onClick={() => setShowAdd(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {records.length === 0 ? (
        <div style={styles.emptyState}><p>No attendance records yet.</p></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {records.map(record => (
            <div key={record.id} style={{ ...styles.recordCard, borderLeftColor: statusColors[record.status] }}>
              <div style={{ flex: 1 }}>
                <h3 style={styles.recordSubject}>{record.subject}</h3>
                <p style={styles.recordDate}>{new Date(record.date).toLocaleDateString()}</p>
              </div>
              <span style={{ ...styles.statusBadge, background: `${statusColors[record.status]}20`, color: statusColors[record.status] }}>
                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              </span>
              <button onClick={() => deleteRecord(record.id)} style={styles.deleteButton}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  statsCard: { display: 'flex', justifyContent: 'space-around', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '24px' },
  statBox: { textAlign: 'center' },
  statValue: { display: 'block', fontSize: '24px', fontWeight: '700', color: 'var(--primary-500)' },
  statLabel: { display: 'block', fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  select: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '60px', color: 'var(--text-tertiary)' },
  recordCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '4px solid' },
  recordSubject: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  recordDate: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  statusBadge: { padding: '4px 12px', borderRadius: 'var(--radius-md)', fontSize: '12px', fontWeight: '600' },
  deleteButton: { background: 'transparent', border: 'none', fontSize: '20px', color: 'var(--text-tertiary)', cursor: 'pointer' }
};

window.AttendanceTracker = AttendanceTracker;
