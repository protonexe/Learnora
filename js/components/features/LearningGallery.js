const LearningGallery = ({ onClose }) => {
  const items = ['📚','📝','✍️','🧠','🎯','🏆','⭐','🔥'];

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20}}>🖼️ Gallery</h2>
      </div>
      <div style={{padding:20,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
        {items.map((item,i)=>(
          <div key={i} style={{aspectRatio:1,background:'var(--bg-secondary)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:32}}>{item}</div>
        ))}
      </div>
    </div>
  );
};
