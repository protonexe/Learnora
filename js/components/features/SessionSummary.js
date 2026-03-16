const SessionSummary = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'linear-gradient(135deg,#10b981,#059669)',zIndex:1000,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'white',padding:40}}>
      <button onClick={onClose} style={{position:'absolute',top:20,right:20,padding:'10px 16px',borderRadius:8,border:'none',background:'rgba(255,255,255,0.2)',color:'white',cursor:'pointer'}}>Close</button>
      <div style={{fontSize:64,marginBottom:16}}>✅</div>
      <div style={{fontSize:28,fontWeight:700,marginBottom:8}}>Session Complete!</div>
      <p style={{opacity:0.9,marginBottom:24}}>Great job studying today</p>
      <div style={{background:'rgba(255,255,255,0.2)',borderRadius:16,padding:24,width:'100%',maxWidth:300}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}><span>Duration</span><span>45 min</span></div>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}><span>XP Earned</span><span>+50</span></div>
        <div style={{display:'flex',justifyContent:'space-between'}}><span>Streak</span><span>7 days</span></div>
      </div>
    </div>
  );
};
