const http=require("http"),fs=require("fs"),path=require("path"),{WebSocketServer}=require("ws");
const L=require("./prompts"),rooms={};
const fresh=()=>({players:[],turn:0,round:1,scores:{},phase:"pick",card:null,log:[]});
const page=path.join(__dirname,"public","index.html");
const server=http.createServer((q,r)=>{
  if(q.url==="/health"){r.end("ok");return}
  fs.readFile(page,(e,d)=>{r.writeHead(e?500:200,{"Content-Type":"text/html; charset=utf-8"});r.end(d||"error")});
});
const wss=new WebSocketServer({server});
const view=r=>({...r.s,online:[...r.conns].map(c=>c.name)});
function bcast(r){const m=JSON.stringify({t:"state",s:view(r)});r.conns.forEach(c=>c.readyState===1&&c.send(m))}
function next(s){if(!s.players.length)return;s.turn=(s.turn+1)%s.players.length;if(s.turn===0)s.round++;s.phase="pick";s.card=null}
wss.on("connection",ws=>{
  ws.alive=true;ws.on("pong",()=>ws.alive=true);
  ws.on("message",raw=>{
    let m;try{m=JSON.parse(raw)}catch{return}
    if(m.t==="join"){
      const code=String(m.room||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8)||"FRIENDS";
      const name=String(m.name||"").trim().slice(0,20);if(!name)return;
      const r=rooms[code]=rooms[code]||{s:fresh(),conns:new Set()};
      clearTimeout(r.t);ws.r=r;ws.name=name;r.conns.add(ws);
      if(!r.s.players.includes(name)){r.s.players.push(name);r.s.scores[name]=0}
      ws.send(JSON.stringify({t:"joined",room:code}));return bcast(r);
    }
    const r=ws.r;if(!r)return;const s=r.s,cur=s.players[s.turn];
    if(m.t==="draw"&&ws.name===cur&&s.phase==="pick"&&L[m.lvl]&&(m.kind==="truth"||m.kind==="dare")){
      const oth=s.players.filter(p=>p!==cur),o=oth.length?oth[Math.floor(Math.random()*oth.length)]:"someone";
      const a=L[m.lvl][m.kind==="truth"?"t":"d"];
      s.phase="card";s.card={who:cur,kind:m.kind,lvl:m.lvl,lvlName:L[m.lvl].n,text:a[Math.floor(Math.random()*a.length)].replace(/\{o\}/g,o)};
    }else if(m.t==="done"&&s.phase==="card"){
      const c=s.card,ok=!!m.ok,pts=ok?(c.kind==="dare"?2:1)+(c.lvl==="hard"?1:0):-1;
      s.scores[c.who]=(s.scores[c.who]||0)+pts;
      s.log=[(ok?"✅ ":"🐔 ")+c.who+(ok?" did a "+c.kind:" chickened out")+" ("+(pts>0?"+":"")+pts+")"].concat(s.log).slice(0,8);
      next(s);
    }else if(m.t==="skip")next(s);
    else if(m.t==="reset"){const p=s.players;r.s=fresh();r.s.players=p;p.forEach(x=>r.s.scores[x]=0)}
    else return;
    bcast(r);
  });
  ws.on("close",()=>{const r=ws.r;if(!r)return;r.conns.delete(ws);bcast(r);
    if(!r.conns.size)r.t=setTimeout(()=>{for(const k in rooms)if(rooms[k]===r&&!r.conns.size)delete rooms[k]},36e5)});
});
setInterval(()=>wss.clients.forEach(w=>{if(!w.alive)return w.terminate();w.alive=false;w.ping()}),25000);
server.listen(process.env.PORT||3000,()=>console.log("Truth or Dare running"));
