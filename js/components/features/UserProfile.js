const UserProfile = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'linear-gradient(135deg,#8b5cf6,#6366f1)',padding:40,textAlign:'center',color:'white'}}>
        <button onClick={onClose} style={{position:'absolute',top:16,right:16,padding:'8px 12px',borderRadius:8,border:'none',background:'rgba(255,255,255,0.2)',color:'white',cursor:'pointer'}}>×</button>
        <div style={{width:80,height:80,borderRadius:'50%',background:'white',margin:'0 auto 16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:700,color:'#8b5cf6'}}>S</div>
        <h2 style={{margin:0,fontSize:24}}>Student</h2>
        <p style={{opacity:0.8}}>student@email.com</p>
      </div>
    </div>
  );
};
