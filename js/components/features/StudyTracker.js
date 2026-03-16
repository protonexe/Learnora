const StudyTracker = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000}}>
      <div style={{padding:20}}>
        <button onClick={onClose}>← Back</button>
        <h2>📊 Study Tracker</h2>
        <p>Track your daily study time</p>
      </div>
    </div>
  );
};
