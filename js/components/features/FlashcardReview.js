const FlashcardReview = ({ onClose }) => {
  const cards = [
    {q:'What is 2+2?',a:'4'},
    {q:'Capital of France?',a:'Paris'},
    {q:'H2O?',a:'Water'},
  ];
  const [idx,setIdx] = React.useState(0);
  const [show,setShow] = React.useState(false);

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,display:'flex',flexDirection:'column'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <span style={{fontSize:14,color:'var(--text-secondary)'}}>{idx+1}/{cards.length}</span>
      </div>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:40}}>
        <div style={{background:'var(--bg-secondary)',borderRadius:16,padding:40,textAlign:'center',width:'100%',maxWidth:400,border:'1px solid var(--border-color)'}}>
          <div style={{fontSize:14,color:'var(--text-secondary)',marginBottom:16}}>Question</div>
          <div style={{fontSize:24,fontWeight:600,color:'var(--text-primary)',marginBottom:32}}>{cards[idx].q}</div>
          {show && (
            <div style={{borderTop:'1px solid var(--border-color)',paddingTop:24,marginTop:16}}>
              <div style={{fontSize:14,color:'#10b981',marginBottom:8}}>Answer</div>
              <div style={{fontSize:20,fontWeight:600,color:'var(--text-primary)'}}>{cards[idx].a}</div>
            </div>
          )}
        </div>
      </div>
      <div style={{padding:20,display:'flex',gap:12}}>
        <button onClick={()=>setShow(!show)} style={{flex:1,padding:16,borderRadius:12,border:'none',background:'var(--primary)',color:'white',cursor:'pointer',fontWeight:600}}>{show?'Hide':'Show'} Answer</button>
        <button onClick={()=>{setShow(false);setIdx((idx+1)%cards.length)}} style={{flex:1,padding:16,borderRadius:12,border:'none',background:'#10b981',color:'white',cursor:'pointer',fontWeight:600}}>Next Card</button>
      </div>
    </div>
  );
};
