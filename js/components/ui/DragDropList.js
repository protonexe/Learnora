const DragDropList = ({ items, onReorder, renderItem, handleKey }) => {
  const [draggedItem, setDraggedItem] = React.useState(null);

  const handleDragStart = (e, item, index) => {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newItems = [...items];
    const [removed] = newItems.splice(draggedItem.index, 1);
    newItems.splice(targetIndex, 0, removed);
    onReorder(newItems);
    setDraggedItem(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item, index) => (
        <div
          key={item.id || index}
          draggable
          onDragStart={(e) => handleDragStart(e, item, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          style={{
            background: draggedItem?.index === index ? 'var(--primary-500)20' : 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '12px',
            cursor: 'grab',
            transition: 'all 0.2s'
          }}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

window.DragDropList = DragDropList;
