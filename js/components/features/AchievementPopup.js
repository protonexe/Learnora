const AchievementPopup = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.8)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'linear-gradient(135deg,#fbbf24,#f59e0b)',borderRadius:20,padding:40,textAlign:'center',color:'white',animation:'bounce 0.5s'}}>
        <div style={{fontSize:64,marginBottom:16}}>🏆</div>
        <div style={{fontSize:24,fontWeight:700,marginBottom:8}}>Achievement Unlocked!</div>
        <p style={{opacity:0.9,marginBottom:20}}>Week Warrior - 7 day streak</p>
        <button onClick={onClose} style={{padding:'12px 32px',borderRadius:12,border:'none',background:'white',color:'#f59e0b',cursor:'pointer',fontWeight:600}}>Awesome!</button>
      </div>
    </div>
  );
};
