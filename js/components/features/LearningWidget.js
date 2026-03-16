const LearningWidget = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000}}>
      <div style={{padding:20}}>
        <button onClick={onClose}>← Back</button>
        <h2>📚 Learning Widget</h2>
      </div>
    </div>
  );
};
