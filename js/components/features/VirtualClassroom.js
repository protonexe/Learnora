const VirtualClassroom = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',zIndex:1000,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'white',padding:40}}>
      <button onClick={onClose} style={{position:'absolute',top:20,right:20,padding:'10px 16px',borderRadius:8,border:'none',background:'rgba(255,255,255,0.2)',color:'white',cursor:'pointer'}}>Close</button>
      <div style={{fontSize:64,marginBottom:16}}>🏫</div>
      <h2 style={{fontSize:28,marginBottom:8}}>Virtual Classroom</h2>
      <p style={{opacity:0.9,marginBottom:24}}>Join live sessions with teachers</p>
      <button style={{padding:'14px 32px',borderRadius:12,border:'none',background:'white',color:'#6366f1',cursor:'pointer',fontWeight:700}}>Join Now</button>
    </div>
  );
};
