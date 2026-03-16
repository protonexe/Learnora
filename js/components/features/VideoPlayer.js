const VideoPlayer = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'#000',zIndex:1000,display:'flex',flexDirection:'column'}}>
      <div style={{background:'rgba(0,0,0,0.8)',padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'rgba(255,255,255,0.2)',color:'white',cursor:'pointer'}}>← Back</button>
        <span style={{color:'white',fontWeight:600}}>Video Player</span>
        <div style={{width:60}}/>
      </div>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',background:'#111'}}>
        <div style={{textAlign:'center',color:'#666'}}>
          <div style={{fontSize:64,marginBottom:16}}>▶️</div>
          <p>Video content would play here</p>
        </div>
      </div>
    </div>
  );
};
