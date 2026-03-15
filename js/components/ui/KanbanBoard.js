const KanbanBoard = ({ columns = [], onCardMove, onCardClick }) => {
  const [cards, setCards] = React.useState({});
  const [draggedCard, setDraggedCard] = React.useState(null);

  // Initialize cards by column
  React.useEffect(() => {
    const cardMap = {};
    columns.forEach(col => {
      cardMap[col.id] = col.cards || [];
    });
    setCards(cardMap);
  }, [columns]);

  const handleDragStart = (card, columnId) => {
    setDraggedCard({ card, columnId });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId) => {
    if (!draggedCard) return;
    
    if (draggedCard.columnId !== targetColumnId) {
      // Remove from old column
      const newCards = { ...cards };
      newCards[draggedCard.columnId] = newCards[draggedCard.columnId].filter(c => c.id !== draggedCard.card.id);
      
      // Add to new column
      newCards[targetColumnId] = [...newCards[targetColumnId], draggedCard.card];
      setCards(newCards);
      
      onCardMove?.(draggedCard.card, draggedCard.columnId, targetColumnId);
    }
    
    setDraggedCard(null);
  };

  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      overflowX: 'auto',
      padding: '4px'
    }}>
      {columns.map(column => (
        <div
          key={column.id}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(column.id)}
          style={{
            minWidth: '280px',
            maxWidth: '320px',
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            padding: '12px'
          }}
        >
          {/* Column Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            padding: '0 4px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>{column.icon || '📋'}</span>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>{column.title}</span>
              <span style={{
                fontSize: '12px',
                padding: '2px 8px',
                background: 'var(--bg-tertiary)',
                borderRadius: '10px',
                color: 'var(--text-tertiary)'
              }}>
                {cards[column.id]?.length || 0}
              </span>
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '100px' }}>
            {cards[column.id]?.map(card => (
              <div
                key={card.id}
                draggable
                onDragStart={() => handleDragStart(card, column.id)}
                onClick={() => onCardClick?.(card)}
                style={{
                  background: 'var(--bg-primary)',
                  borderRadius: '10px',
                  padding: '12px',
                  cursor: 'grab',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s'
                }}
              >
                <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0' }}>{card.title}</h4>
                {card.description && (
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>
                    {card.description}
                  </p>
                )}
                {card.tag && (
                  <span style={{
                    display: 'inline-block',
                    marginTop: '8px',
                    padding: '2px 8px',
                    background: card.color || 'var(--primary-500)',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    {card.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

window.KanbanBoard = KanbanBoard;
