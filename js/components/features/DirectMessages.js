const DirectMessages = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [conversations, setConversations] = React.useState([
    { id: 1, name: 'Alex Chen', avatar: '👨‍🎓', lastMessage: 'Did you finish the math homework?', time: '2m ago', unread: 2 },
    { id: 2, name: 'Sarah Kim', avatar: '👩‍🎓', lastMessage: 'Great study session!', time: '1h ago', unread: 0 },
    { id: 3, name: 'Dr. Smith', avatar: '👨‍🏫', lastMessage: 'Please submit your assignment', time: 'Yesterday', unread: 0 },
  ]);
  const [selected, setSelected] = React.useState(null);
  const [message, setMessage] = React.useState('');

  const sendMessage = () => {
    if (!message.trim()) return;
    showToast?.('Message sent!', 'success');
    setMessage('');
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>💬 Messages</h1>
      </div>

      <div style={styles.container}>
        <div style={styles.sidebar}>
          {conversations.map(c => (
            <div key={c.id} onClick={() => setSelected(c)} style={{ ...styles.convItem, background: selected?.id === c.id ? 'var(--primary-100)' : 'transparent' }}>
              <span style={styles.avatar}>{c.avatar}</span>
              <div style={styles.convInfo}>
                <span style={styles.convName}>{c.name}</span>
                <span style={styles.convMsg}>{c.lastMessage}</span>
              </div>
              <div style={styles.convMeta}>
                <span style={styles.convTime}>{c.time}</span>
                {c.unread > 0 && <span style={styles.unreadBadge}>{c.unread}</span>}
              </div>
            </div>
          ))}
        </div>

        {selected ? (
          <div style={styles.chatArea}>
            <div style={styles.chatHeader}>
              <span style={styles.avatar}>{selected.avatar}</span>
              <span style={styles.chatName}>{selected.name}</span>
            </div>
            <div style={styles.messages}>
              <div style={{ ...styles.msg, background: 'var(--primary-100)', alignSelf: 'flex-start' }}>
                <p style={styles.msgText}>Hey! Did you finish the math homework?</p>
              </div>
            </div>
            <div style={styles.inputArea}>
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." style={styles.input} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} />
              <button onClick={sendMessage} style={styles.sendButton}>Send</button>
            </div>
          </div>
        ) : (
          <div style={styles.noChat}>Select a conversation</div>
        )}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  container: { display: 'flex', gap: '20px', height: '500px' },
  sidebar: { width: '300px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' },
  convItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' },
  avatar: { fontSize: '32px' },
  convInfo: { flex: 1, overflow: 'hidden' },
  convName: { display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' },
  convMsg: { display: 'block', fontSize: '12px', color: 'var(--text-tertiary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  convMeta: { textAlign: 'right' },
  convTime: { display: 'block', fontSize: '11px', color: 'var(--text-tertiary)' },
  unreadBadge: { display: 'inline-block', background: '#f43f5e', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', marginTop: '4px' },
  chatArea: { flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column' },
  chatHeader: { padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' },
  chatName: { fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' },
  messages: { flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' },
  msg: { padding: '12px 16px', borderRadius: '12px', maxWidth: '70%' },
  msgText: { fontSize: '14px', color: 'var(--text-primary)', margin: 0 },
  inputArea: { padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px' },
  input: { flex: 1, padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)' },
  sendButton: { padding: '12px 20px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  noChat: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }
};

window.DirectMessages = DirectMessages;
