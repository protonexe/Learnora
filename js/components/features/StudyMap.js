const StudyMap = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:64,marginBottom:16}}>🗺️</div>
        <h2 style={{margin:0,fontSize:20,color:'var(--text-primary)'}}>Learning Map</h2>
        <p style={{color:'var(--text-secondary)'}}>Visualize your learning journey</p>
        <button onClick={onClose} style={{marginTop:20,padding:'12px 24px',borderRadius:8,border:'none',background:'var(--primary)',color:'white',cursor:'pointer'}}>Close</button>
      </div>
    </div>
  );
};
