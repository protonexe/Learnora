import React from 'react';
import { X, MessageSquare, Send, Paperclip, Image, Smile, AtSign, Hash, MessageCircle, Check, Clock, Eye, ThumbsUp, Reply, MoreHorizontal, Edit2, Trash2, Copy, Star, Pin, Archive } from './Icon';

const DirectMessages = ({ onClose }) => {
  const [selectedChat, setSelectedChat] = React.useState(1);
  const [message, setMessage] = React.useState('');
  
  const chats = [
    { id: 1, name: 'Alice Johnson', avatar: 'A', lastMessage: 'Thanks for the help!', time: '2m ago', unread: 2, online: true },
    { id: 2, name: 'Bob Wilson', avatar: 'B', lastMessage: 'See you tomorrow', time: '1h ago', unread: 0, online: false },
    { id: 3, name: 'Study Group', avatar: '👥', lastMessage: 'Charlie: Ready for the quiz?', time: '3h ago', unread: 5, online: true },
  ];
  
  const messages = [
    { id: 1, sender: 'Alice', text: 'Hey! Can you help me with physics?', time: '10:30 AM', isMe: false },
    { id: 2, sender: 'Me', text: 'Sure! What do you need help with?', time: '10:32 AM', isMe: true },
    { id: 3, sender: 'Alice', text: 'Can you explain Newton\'s laws?', time: '10:33 AM', isMe: false },
    { id: 4, sender: 'Me', text: 'Of course! Let me share a quick summary...', time: '10:35 AM', isMe: true },
  ];
  
  const sendMessage = () => {
    if (!message.trim()) return;
    setMessage('');
  };
  
  return (
    <div style={{ background: 'var(--card-bg)', borderRadius: 16, width: 600, height: 500, display: 'flex', overflow: 'hidden' }}>
      <div style={{ width: 220, borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 16, borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>💬 Messages</h3>
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          {chats.map(chat => (
            <div key={chat.id} onClick={() => setSelectedChat(chat.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, cursor: 'pointer', background: selectedChat === chat.id ? 'var(--primary)' + '15' : 'transparent', borderLeft: selectedChat === chat.id ? '3px solid var(--primary)' : '3px solid transparent' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, position: 'relative' }}>
                {chat.avatar}
                {chat.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: '#10b981', border: '2px solid var(--card-bg)' }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 13 }}>{chat.name}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{chat.time}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.lastMessage}</div>
              </div>
              {chat.unread > 0 && <span style={{ background: 'var(--primary)', color: 'white', padding: '2px 6px', borderRadius: 10, fontSize: 10, fontWeight: 600 }}>{chat.unread}</span>}
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 16, borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>A</div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Alice Johnson</div>
              <div style={{ fontSize: 12, color: '#10b981' }}>● Online</div>
            </div>
          </div>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>✕</button>
        </div>
        
        <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.isMe ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
              <div style={{ maxWidth: '70%', padding: '12px 16px', borderRadius: 16, background: msg.isMe ? 'var(--primary)' : 'var(--bg)', color: msg.isMe ? 'white' : 'var(--text-primary)' }}>
                <div style={{ fontSize: 14 }}>{msg.text}</div>
                <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4, textAlign: 'right' }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ padding: 16, borderTop: '1px solid var(--border-color)', display: 'flex', gap: 8 }}>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." style={{ flex: 1, padding: '12px 16px', borderRadius: 24, border: '1px solid var(--border-color)', background: 'var(--bg)', color: 'var(--text-primary)', outline: 'none' }} />
          <button onClick={sendMessage} style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;
