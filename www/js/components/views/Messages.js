const MessagesView = ({ onBack, showToast, userRole }) => {
  const isMobile = window.innerWidth <= 768;
  const [conversations, setConversations] = React.useState([]);
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [messageText, setMessageText] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = () => {
    if (window.Database) {
      const db = window.Database;
      const savedConversations = JSON.parse(localStorage.getItem('learnora_conversations') || '[]');
      
      if (savedConversations.length === 0) {
        const mockConversations = [
          { id: 1, name: 'Mr. Johnson', role: 'teacher', avatar: '👨‍🏫', lastMessage: 'Great job on your assignment!', time: '2 min ago', unread: 2 },
          { id: 2, name: 'Ms. Garcia', role: 'teacher', avatar: '👩‍🏫', lastMessage: 'Please review the material.', time: '1 hour ago', unread: 0 },
          { id: 3, name: 'Study Group', role: 'group', avatar: '👥', lastMessage: 'Anyone ready for the quiz?', time: '3 hours ago', unread: 5 },
        ];
        setConversations(mockConversations);
      } else {
        setConversations(savedConversations);
      }
    }
  };

  const loadMessages = (chatId) => {
    const savedMessages = JSON.parse(localStorage.getItem(`learnora_messages_${chatId}`) || '[]');
    if (savedMessages.length === 0) {
      setMessages([
        { id: 1, sender: 'them', text: 'Hi! How is your studies going?', time: '10:30 AM' },
        { id: 2, sender: 'me', text: 'Going well! Just finished the chapter.', time: '10:32 AM' },
        { id: 3, sender: 'them', text: 'Great! Let me know if you need help.', time: '10:35 AM' },
      ]);
    } else {
      setMessages(savedMessages);
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem(`learnora_messages_${selectedChat.id}`, JSON.stringify(updatedMessages));
    setMessageText('');
    
    setConversations(conversations.map(c => 
      c.id === selectedChat.id 
        ? { ...c, lastMessage: messageText, time: 'Just now' }
        : c
    ));
    localStorage.setItem('learnora_conversations', JSON.stringify(conversations));
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
    loadMessages(chat.id);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0' : '16px 20px', height: 'calc(100vh - 140px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', padding: isMobile ? '12px' : '0' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Messages</h1>
        <button style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          + New
        </button>
      </div>

      <div style={{ display: 'flex', gap: '16px', height: 'calc(100% - 60px)' }}>
        {/* Conversation List */}
        <div style={{ width: isMobile ? (selectedChat ? '0' : '100%') : '320px', background: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, display: isMobile && selectedChat ? 'none' : 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <input type="text" placeholder="Search messages..." style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', fontSize: '13px' }} />
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {conversations.map((chat, idx) => (
              <div key={chat.id} onClick={() => selectChat(chat)} style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', background: selectedChat?.id === chat.id ? 'var(--primary-500)15' : 'transparent', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '48px', height: '48px', background: 'var(--bg-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{chat.avatar}</div>
                    {chat.unread > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px', background: 'var(--danger)', borderRadius: '50%', fontSize: '11px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{chat.unread}</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{chat.name}</p>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{chat.time}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {selectedChat ? (
            <>
              <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => setSelectedChat(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: isMobile ? 'block' : 'none' }}><Icon name="arrow-left" size={20} /></button>
                <div style={{ width: '40px', height: '40px', background: 'var(--bg-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{selectedChat.avatar}</div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{selectedChat.name}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', margin: 0 }}>{selectedChat.role === 'teacher' ? 'Teacher' : 'Online'}</p>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                {messages.map((msg, idx) => (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
                    <div style={{ maxWidth: '70%', padding: '12px 16px', borderRadius: '16px', background: msg.sender === 'me' ? 'var(--primary-500)' : 'var(--bg-tertiary)', color: msg.sender === 'me' ? '#fff' : 'var(--text-primary)' }}>
                      <p style={{ fontSize: '14px', margin: 0 }}>{msg.text}</p>
                      <p style={{ fontSize: '10px', opacity: 0.7, margin: '4px 0 0 0', textAlign: 'right' }}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}>
                <input type="text" value={messageText} onChange={e => setMessageText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Type a message..." style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', fontSize: '14px' }} />
                <button onClick={handleSendMessage} style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-500)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>➤</button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

window.MessagesView = MessagesView;
