const BrainStorm = ({ onClose }) => {
  const ideas = [
    {text:'Study group for math',votes:5},
    {text:'Review session Friday',votes:3},
  ];

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20}}>💡 Brainstorm</h2>
      </div>
      <div style={{padding:20}}>
        {ideas.map((idea,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:14,background:'var(--bg-secondary)',borderRadius:12,marginBottom:8,border:'1px solid var(--border-color)'}}>
            <button style={{padding:'6px 12px',borderRadius:6,border:'none',background:'var(--primary)',color:'white',cursor:'pointer'}}>👍 {idea.votes}</button>
            <span style={{fontSize:14,color:'var(--text-primary)'}}>{idea.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
