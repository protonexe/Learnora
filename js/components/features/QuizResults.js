const QuizResults = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'rgba(255,255,255,0.2)',color:'white',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20,color:'white'}}>📝 Quiz Results</h2>
      </div>
      <div style={{padding:40,textAlign:'center'}}>
        <div style={{fontSize:64,fontWeight:700,color:'#10b981',marginBottom:8}}>85%</div>
        <div style={{fontSize:18,color:'var(--text-secondary)',marginBottom:32}}>8/10 correct</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
          <div style={{background:'var(--bg-secondary)',borderRadius:12,padding:16}}><div style={{fontSize:24,fontWeight:700,color:'#10b981'}}>8</div><div style={{fontSize:12,color:'var(--text-secondary)'}}>Correct</div></div>
          <div style={{background:'var(--bg-secondary)',borderRadius:12,padding:16}}><div style={{fontSize:24,fontWeight:700,color:'#f43f5e'}}>2</div><div style={{fontSize:12,color:'var(--text-secondary)'}}>Incorrect</div></div>
        </div>
      </div>
    </div>
  );
};
