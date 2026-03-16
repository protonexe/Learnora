const AudioPlayer = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'linear-gradient(135deg,#1e1b4b,#312e81)',zIndex:1000,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'white',padding:40}}>
      <button onClick={onClose} style={{position:'absolute',top:20,right:20,padding:'10px',borderRadius:8,border:'none',background:'rgba(255,255,255,0.1)',color:'white',cursor:'pointer'}}>×</button>
      <div style={{fontSize:80,marginBottom:24}}>🎵</div>
      <div style={{fontSize:20,fontWeight:600,marginBottom:8}}>Focus Music</div>
      <p style={{opacity:0.7,marginBottom:32}}>Ambient Sounds</p>
      <div style={{width:'100%',maxWidth:300,marginBottom:24}}>
        <input type="range" style={{width:'100%',accentColor:'white'}}/>
      </div>
      <div style={{display:'flex',gap:24}}>
        <button style={{width:48,height:48,borderRadius:'50%',border:'none',background:'rgba(255,255,255,0.2)',color:'white',cursor:'pointer',fontSize:18}}>⏮</button>
        <button style={{width:64,height:64,borderRadius:'50%',border:'none',background:'white',color:'#1e1b4b',cursor:'pointer',fontSize:24}}>▶</button>
        <button style={{width:48,height:48,borderRadius:'50%',border:'none',background:'rgba(255,255,255,0.2)',color:'white',cursor:'pointer',fontSize:18}}>⏭</button>
      </div>
    </div>
  );
};
