const DailyLearning = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'linear-gradient(135deg,#10b981,#059669)',zIndex:1000,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'white',padding:40}}>
      <button onClick={onClose} style={{position:'absolute',top:20,right:20,padding:'10px',borderRadius:8,border:'none',background:'rgba(255,255,255,0.2)',color:'white',cursor:'pointer'}}>×</button>
      <div style={{fontSize:64,marginBottom:16}}>📖</div>
      <h2 style={{fontSize:28,marginBottom:8}}>Daily Learning</h2>
      <p style={{opacity:0.9}}>Keep learning every day!</p>
    </div>
  );
};
