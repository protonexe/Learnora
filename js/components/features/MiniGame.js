const MiniGame = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:64}}>🎮</div>
        <h2>Mini Game</h2>
        <p>Coming Soon!</p>
        <button onClick={onClose} style={{marginTop:20,padding:'10px 24px',borderRadius:8,border:'none',background:'white',color:'#6366f1',cursor:'pointer'}}>Close</button>
      </div>
    </div>
  );
};
