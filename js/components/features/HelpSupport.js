const HelpSupport = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [faq] = React.useState([
    { q: 'How do I track my study time?', a: 'Use the Focus Timer or Pomodoro widget to track your sessions automatically.' },
    { q: 'Can I create custom flashcards?', a: 'Yes! Go to Flashcard Builder to create your own decks with custom questions and answers.' },
    { q: 'How do I earn badges?', a: 'Complete study sessions, maintain streaks, take quizzes, and explore different features to unlock badges.' },
    { q: 'Is my data backed up?', a: 'Use the Data Backup feature to export your data. You can import it later on any device.' },
    { q: 'How do I change the theme?', a: 'Go to Settings > Theme to choose from different color themes.' },
  ]);

  const sendFeedback = (message) => {
    if (!message.trim()) return;
    showToast?.('Feedback sent! Thank you!', 'success');
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>❓ Help & Support</h1>
      </div>

      <div style={styles.options}>
        <button style={styles.optionBtn}><span style={styles.optionIcon}>💬</span>Live Chat</button>
        <button style={styles.optionBtn}><span style={styles.optionIcon}>📧</span>Email Support</button>
        <button style={styles.optionBtn}><span style={styles.optionIcon}>📖</span>Documentation</button>
      </div>

      <h3 style={styles.sectionTitle}>Frequently Asked Questions</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {faq.map((item, idx) => (
          <details key={idx} style={styles.faqItem}>
            <summary style={styles.faqQuestion}>{item.q}</summary>
            <p style={styles.faqAnswer}>{item.a}</p>
          </details>
        ))}
      </div>

      <h3 style={{ ...styles.sectionTitle, marginTop: '24px' }}>Send Feedback</h3>
      <div style={styles.feedbackCard}>
        <textarea id="feedbackInput" placeholder="Tell us what you think..." style={styles.textarea} rows={4} />
        <button onClick={() => sendFeedback(document.getElementById('feedbackInput').value)} style={styles.sendButton}>Send Feedback</button>
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  options: { display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' },
  optionBtn: { flex: 1, minWidth: '150px', padding: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' },
  optionIcon: { fontSize: '32px' },
  sectionTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-secondary)' },
  faqItem: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px', cursor: 'pointer' },
  faqQuestion: { fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 },
  faqAnswer: { fontSize: '13px', color: 'var(--text-secondary)', margin: '12px 0 0 0', lineHeight: '1.5' },
  feedbackCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  textarea: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px', resize: 'vertical' },
  sendButton: { width: '100%', padding: '14px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }
};

window.HelpSupport = HelpSupport;
