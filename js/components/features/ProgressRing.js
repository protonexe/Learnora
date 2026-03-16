const ProgressRing = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <svg width="200" height="200">
        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--border-color)" strokeWidth="12"/>
        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--primary)" strokeWidth="12" strokeDasharray={2*Math.PI*80*0.75} transform="rotate(-90 100 100)"/>
      </svg>
      <button onClick={onClose} style={{position:'absolute',top:20,right:20}}>×</button>
    </div>
  );
};
