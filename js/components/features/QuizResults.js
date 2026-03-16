const QuizResults = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const results = [
    { quiz: 'Math Quiz', score: 85, date: 'Mar 15', total: 10 },
    { quiz: 'Physics Test', score: 70, date: 'Mar 12', total: 10 },
    { quiz: 'Chemistry Quiz', score: 90, date: 'Mar 10', total: 10 },
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>📝 Quiz Results</h1>
      </div>
      <div style={styles.grid}>
        {results.map((r, i) => (
          <div key={i} style={styles.card}>
            <h3 style={styles.quizName}>{r.quiz}</h3>
            <p style={styles.date}>{r.date}</p>
            <div style={styles.scoreBox}>
              <span style={styles.score}>{r.score}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, grid: { display: 'grid', gap: '16px' }, card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }, quizName: { fontSize: '16px', fontWeight: 600, margin: '0 0 4px' }, date: { fontSize: '12px', color: '#888', margin: '0 0 12px' }, scoreBox: { background: 'var(--primary-100)', borderRadius: '8px', padding: '12px', textAlign: 'center' }, score: { fontSize: '24px', fontWeight: 700, color: 'var(--primary-600)' }};

window.QuizResults = QuizResults;
