const QuickQuiz = ({ onClose }) => {
  const questions = [
    {q:'What is 5x5?',options:['20','25','30','35'],a:1},
    {q:'Capital of Japan?',options:['Seoul','Beijing','Tokyo','Bangkok'],a:2},
  ];
  const [idx,setIdx] = React.useState(0);
  const [selected,setSelected] = React.useState(-1);

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <span style={{fontSize:14,color:'var(--text-secondary)'}}>Q{idx+1}/{questions.length}</span>
      </div>
      <div style={{padding:20}}>
        <div style={{fontSize:18,fontWeight:600,color:'var(--text-primary)',marginBottom:24}}>{questions[idx].q}</div>
        {questions[idx].options.map((opt,i)=>(
          <button key={i} onClick={()=>setSelected(i)} style={{width:'100%',padding:16,marginBottom:12,borderRadius:12,border:selected===i?'2px solid var(--primary)':'1px solid var(--border-color)',background:selected===i?'var(--primary)15':'var(--bg-secondary)',color:'var(--text-primary)',cursor:'pointer',textAlign:'left'}}>{opt}</button>
        ))}
        <button onClick={()=>{setSelected(-1);setIdx((idx+1)%questions.length)}} style={{width:'100%',padding:16,borderRadius:12,border:'none',background:'var(--primary)',color:'white',cursor:'pointer',fontWeight:600,marginTop:16}}>Next Question</button>
      </div>
    </div>
  );
};
