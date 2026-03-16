const MotivationalBanner = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'linear-gradient(135deg,#1e1b4b,#312e81)',zIndex:1000,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'white',padding:40}}>
      <button onClick={onClose} style={{position:'absolute',top:20,right:20,padding:'10px',borderRadius:8,border:'none',background:'rgba(255,255,255,0.1)',color:'white',cursor:'pointer'}}>×</button>
      <div style={{fontSize:48,marginBottom:24}}>💪</div>
      <h2 style={{fontSize:28,textAlign:'center',marginBottom:16}}>You Got This!</h2>
      <p style={{textAlign:'center',opacity:0.8,fontSize:16,lineHeight:1.6}}>"The secret of getting ahead is getting started."</p>
      <p style={{opacity:0.6,marginTop:24}}>- Mark Twain</p>
    </div>
  );
};
