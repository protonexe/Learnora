const MasonryGrid = ({ items = [], renderItem, columns = 3, gap = 16 }) => {
  const isMobile = window.innerWidth <= 768;
  const columnCount = isMobile ? 2 : columns;

  // Distribute items into columns
  const columnHeights = Array(columnCount).fill(0);
  const distributedItems = items.reduce((acc, item, idx) => {
    // Find shortest column
    const shortestCol = columnHeights.indexOf(Math.min(...columnHeights));
    
    if (!acc[shortestCol]) acc[shortestCol] = [];
    acc[shortestCol].push({ item, index: idx });
    
    // Simulate height (in real app, use actual measurements)
    columnHeights[shortestCol] += 1;
    
    return acc;
  }, []);

  return (
    <div style={{
      display: 'flex',
      gap: `${gap}px`,
      alignItems: 'flex-start'
    }}>
      {distributedItems.map((colItems, colIdx) => (
        <div
          key={colIdx}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: `${gap}px`
          }}
        >
          {colItems.map(({ item, index }) => (
            <div key={index}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

window.MasonryGrid = MasonryGrid;
