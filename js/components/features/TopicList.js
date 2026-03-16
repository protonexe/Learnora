const TopicList = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px'}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
      </div>
      <div style={{padding:20}}>
        {['Math','Physics','Chemistry','Biology'].map((t,i)=><div key={i} style={{padding:14,background:'var(--bg-secondary)',borderRadius:10,marginBottom:8}}>{t}</div>)}
      </div>
    </div>
  );
};
