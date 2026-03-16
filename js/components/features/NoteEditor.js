const NoteEditor = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,display:'flex',flexDirection:'column'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <button style={{padding:'8px 16px',borderRadius:8,border:'none',background:'var(--primary)',color:'white',cursor:'pointer',fontWeight:600}}>Save</button>
      </div>
      <div style={{flex:1,padding:20}}>
        <input type="text" placeholder="Note title..." style={{width:'100%',padding:'12px',borderRadius:8,border:'1px solid var(--border-color)',background:'var(--bg-secondary)',color:'var(--text-primary)',fontSize:18,fontWeight:600,marginBottom:16}}/>
        <textarea placeholder="Start writing..." style={{width:'100%',flex:1,borderRadius:8,border:'1px solid var(--border-color)',background:'var(--bg-secondary)',color:'var(--text-primary)',fontSize:14,padding:12,resize:'none'}}/>
      </div>
    </div>
  );
};
