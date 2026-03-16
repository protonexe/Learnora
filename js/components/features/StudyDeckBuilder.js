import React from 'react';
import { X, Plus, Minus, RotateCcw, Share2, Trash2, GripVertical, Check, Edit2, Copy, Download } from './Icon';

const StudyDeckBuilder = ({ onClose }) => {
  const [cards, setCards] = React.useState([
    { id: 1, front: 'What is photosynthesis?', back: 'Process by which plants convert light into energy', color: '#10b981' },
    { id: 2, front: 'What is H2O?', back: 'Water - two hydrogen atoms, one oxygen', color: '#3b82f6' },
    { id: 3, front: 'Capital of France?', back: 'Paris', color: '#f59e0b' },
  ]);
  const [editingId, setEditingId] = React.useState(null);
  const [newCard, setNewCard] = React.useState({ front: '', back: '', color: '#8b5cf6' });
  
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#6366f1'];
  
  const addCard = () => {
    if (!newCard.front || !newCard.back) return;
    setCards([...cards, { id: Date.now(), ...newCard }]);
    setNewCard({ front: '', back: '', color: '#8b5cf6' });
  };
  
  const deleteCard = (id) => {
    setCards(cards.filter(c => c.id !== id));
  };
  
  const duplicateCard = (card) => {
    setCards([...cards, { ...card, id: Date.now() }]);
  };
  
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
            🗂️ Flashcard Deck Builder
          </h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
      </div>
      
      <div style={{ padding: 16, background: 'var(--bg)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Question (front)"
            value={newCard.front}
            onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
            style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-primary)', outline: 'none' }}
          />
          <input
            type="text"
            placeholder="Answer (back)"
            value={newCard.back}
            onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
            style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-primary)', outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {colors.map(color => (
              <button
                key={color}
                onClick={() => setNewCard({ ...newCard, color })}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  border: newCard.color === color ? '2px solid white' : 'none',
                  background: color,
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
          <button onClick={addCard} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Plus size={16} /> Add Card
          </button>
        </div>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {cards.map((card, i) => (
            <div key={card.id} style={{ display: 'flex', alignItems: 'stretch', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                <GripVertical size={16} />
              </div>
              <div style={{ flex: 1, display: 'flex', gap: 10 }}>
                <div style={{ flex: 1, background: card.color + '20', borderLeft: `3px solid ${card.color}`, borderRadius: 8, padding: 12 }}>
                  <div style={{ fontSize: 11, color: card.color, marginBottom: 4, fontWeight: 600 }}>QUESTION</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{card.front}</div>
                </div>
                <div style={{ flex: 1, background: 'var(--bg)', borderRadius: 8, padding: 12 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4, fontWeight: 600 }}>ANSWER</div>
                  <div style={{ color: 'var(--text-primary)' }}>{card.back}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button onClick={() => duplicateCard(card)} style={{ padding: 6, borderRadius: 4, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <Copy size={14} />
                </button>
                <button onClick={() => deleteCard(card.id)} style={{ padding: 6, borderRadius: 4, border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ padding: 16, borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{cards.length} cards in deck</span>
        <button style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 600 }}>
          Save Deck
        </button>
      </div>
    </div>
  );
};

export default StudyDeckBuilder;
