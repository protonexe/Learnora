const ReadingList = ({ onClose }) => {
  const books = [
    {title:'Calculus Basics',author:'Dr. Smith',progress:45},
    {title:'Physics Fundamentals',author:'Prof. Johnson',progress:30},
  ];

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20}}>📚 Reading List</h2>
      </div>
      <div style={{padding:20}}>
        {books.map((b,i)=>(
          <div key={i} style={{background:'var(--bg-secondary)',borderRadius:12,padding:16,marginBottom:12,border:'1px solid var(--border-color)'}}>
            <div style={{fontSize:16,fontWeight:600,color:'var(--text-primary)',marginBottom:4}}>{b.title}</div>
            <div style={{fontSize:13,color:'var(--text-secondary)',marginBottom:12}}>{b.author}</div>
            <div style={{height:6,background:'var(--bg)',borderRadius:3}}><div style={{height:'100%',width:b.progress+'%',background:'var(--primary)'}}/></div>
          </div>
        ))}
      </div>
    </div>
  );
};
