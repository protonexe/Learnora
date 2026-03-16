const XPProgress = ({ onClose }) => {
  const xp = 1250;
  const level = 5;
  const nextLevel = (level + 1) * 500;
  const currentLevel = level * 500;
  const progress = ((xp - currentLevel) / (nextLevel - currentLevel)) * 100;

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'linear-gradient(135deg,#8b5cf6,#6366f1)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'rgba(255,255,255,0.2)',color:'white',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20,color:'white'}}>⭐ XP Progress</h2>
      </div>
      <div style={{padding:40,textAlign:'center'}}>
        <div style={{fontSize:64,fontWeight:700,color:'#8b5cf6',marginBottom:8}}>Level {level}</div>
        <div style={{fontSize:18,color:'var(--text-secondary)',marginBottom:32}}>{xp} / {nextLevel} XP</div>
        <div style={{height:12,background:'var(--bg)',borderRadius:6,overflow:'hidden',marginBottom:16}}>
          <div style={{height:'100%',width:progress+'%',background:'linear-gradient(90deg,#8b5cf6,#6366f1)'}}/>
        </div>
        <p style={{color:'var(--text-tertiary)',fontSize:14}}>{nextLevel - xp} XP to Level {level + 1}</p>
      </div>
    </div>
  );
};
