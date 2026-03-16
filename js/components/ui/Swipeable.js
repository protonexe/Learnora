const Swipeable = ({ children, onSwipeLeft, onSwipeRight, threshold = 50 }) => {
  const [startX, setStartX] = React.useState(0);
  const [currentX, setCurrentX] = React.useState(0);
  const [isSwiping, setIsSwiping] = React.useState(false);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    setCurrentX(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    if (currentX > threshold && onSwipeRight) onSwipeRight();
    else if (currentX < -threshold && onSwipeLeft) onSwipeLeft();
    setCurrentX(0);
    setIsSwiping(false);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateX(${currentX}px)`,
        transition: isSwiping ? 'none' : 'transform 0.3s ease',
        touchAction: 'pan-y'
      }}
    >
      {children}
    </div>
  );
};

window.Swipeable = Swipeable;
