import { useState, useRef } from "react";

/* ─── SVG TULIP ─────────────────────────────────────────────── */
function Tulip({ color = "#e8708a", size = 1, opacity = 1, stem = "#6aab5e" }) {
  return (
    <svg width={44 * size} height={72 * size} viewBox="0 0 44 72" fill="none" style={{ opacity }}>
      <path d="M22 72 Q18 55 20 42" stroke={stem} strokeWidth={2.5 * size} strokeLinecap="round" />
      <path d="M20 58 Q12 52 10 44" stroke={stem} strokeWidth={1.8 * size} strokeLinecap="round" />
      <ellipse cx="22" cy="28" rx="9" ry="16" fill={color} opacity="0.9" transform="rotate(-12 22 28)" />
      <ellipse cx="22" cy="28" rx="9" ry="16" fill={color} opacity="0.9" transform="rotate(12 22 28)" />
      <ellipse cx="22" cy="26" rx="7" ry="18" fill={color} />
      <ellipse cx="19" cy="20" rx="3" ry="8" fill="white" opacity="0.22" transform="rotate(-8 19 20)" />
    </svg>
  );
}

function Flower({ color = "#f9a8c9", center = "#ffe066", size = 1, opacity = 1 }) {
  return (
    <svg width={40 * size} height={40 * size} viewBox="0 0 40 40" fill="none" style={{ opacity }}>
      {[0,45,90,135,180,225,270,315].map((a,i) => (
        <ellipse key={i} cx="20" cy="20" rx="5" ry="11"
          fill={color} opacity="0.85"
          transform={`rotate(${a} 20 20) translate(0 -8)`} />
      ))}
      <circle cx="20" cy="20" r="7" fill={center} />
      <circle cx="18" cy="18" r="2.5" fill="white" opacity="0.3" />
    </svg>
  );
}

function Blossom({ size = 1, opacity = 1 }) {
  return (
    <svg width={28 * size} height={28 * size} viewBox="0 0 28 28" fill="none" style={{ opacity }}>
      {[0,72,144,216,288].map((a,i) => (
        <ellipse key={i} cx="14" cy="14" rx="4" ry="9"
          fill="#ffb8d4" opacity="0.8"
          transform={`rotate(${a} 14 14) translate(0 -5)`} />
      ))}
      <circle cx="14" cy="14" r="4" fill="#ffe4f0" />
      <circle cx="13" cy="13" r="1.5" fill="#ff8fb1" opacity="0.6" />
    </svg>
  );
}

/* ─── FLOATING FLORA ─────────────────────────────────────────── */
const floraItems = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  type: ["tulip","flower","blossom","petal"][i % 4],
  left: (i * 3.4) % 100,
  delay: (i * 0.5) % 15,
  dur: 9 + (i * 0.65) % 13,
  size: 0.5 + (i * 0.028) % 0.85,
  color: ["#f9a8c9","#f4759b","#ffc2d8","#ffaacc","#ff85b3","#e8708a"][i % 6],
  opacity: 0.28 + (i * 0.014) % 0.5,
}));

function FloatingFlora() {
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1, overflow:"hidden" }}>
      {floraItems.map(item => (
        <div key={item.id} style={{
          position:"absolute", left:`${item.left}%`, bottom:"-80px",
          animation:`floraRise ${item.dur}s ${item.delay}s linear infinite`,
        }}>
          {item.type==="tulip" && <Tulip color={item.color} size={item.size} opacity={item.opacity}/>}
          {item.type==="flower" && <Flower color={item.color} size={item.size} opacity={item.opacity}/>}
          {item.type==="blossom" && <Blossom size={item.size} opacity={item.opacity}/>}
          {item.type==="petal" && (
            <div style={{ width:12*item.size, height:18*item.size,
              background:`radial-gradient(ellipse,${item.color}cc,${item.color}44)`,
              borderRadius:"50% 50% 50% 0", opacity:item.opacity,
              transform:`rotate(${item.id*13}deg)` }}/>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── CORNER BOUQUET ─────────────────────────────────────────── */
function CornerBouquet({ corner="tl" }) {
  const flipX = corner==="tr"||corner==="br";
  const flipY = corner==="bl"||corner==="br";
  return (
    <div style={{
      position:"fixed",
      [flipY?"bottom":"top"]:0, [flipX?"right":"left"]:0,
      transform:`${flipX?"scaleX(-1)":""}${flipY?" scaleY(-1)":""}`,
      zIndex:2, pointerEvents:"none",
    }}>
      <svg width="195" height="215" viewBox="0 0 195 215" fill="none">
        <path d="M30 215 Q42 158 64 110" stroke="#7ab86e" strokeWidth="3" strokeLinecap="round"/>
        <path d="M58 215 Q70 165 86 130" stroke="#7ab86e" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M14 215 Q26 165 37 120" stroke="#6aab5e" strokeWidth="2" strokeLinecap="round"/>
        <path d="M48 215 Q32 175 22 140" stroke="#7ab86e" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="53" cy="160" rx="13" ry="6" fill="#a8d48a" opacity="0.7" transform="rotate(-30 53 160)"/>
        <ellipse cx="73" cy="170" rx="10" ry="5" fill="#8ec87c" opacity="0.6" transform="rotate(20 73 170)"/>
        <g transform="translate(44,56)"><Tulip color="#e8708a" size={1.15}/></g>
        <g transform="translate(69,80)"><Tulip color="#f9a8c9" size={0.92}/></g>
        <g transform="translate(17,84)"><Tulip color="#ff85b3" size={0.88}/></g>
        <g transform="translate(104,90)"><Flower color="#ffc2d8" center="#ffe8c0" size={0.82}/></g>
        <g transform="translate(9,114)"><Flower color="#f4759b" center="#fff0a0" size={0.67}/></g>
        <g transform="translate(83,114)"><Blossom size={0.9}/></g>
        {[[133,70],[27,60],[93,50],[154,100],[113,130],[60,30]].map(([x,y],i)=>(
          <ellipse key={i} cx={x} cy={y} rx="5" ry="8"
            fill={["#f9a8c9","#ffb8d4","#ffc2d8"][i%3]}
            opacity="0.48" transform={`rotate(${i*37} ${x} ${y})`}/>
        ))}
        <circle cx="156" cy="56" r="4" fill="#ffe4f0" opacity="0.6"/>
        <circle cx="122" cy="40" r="3" fill="#ffb8d4" opacity="0.5"/>
        <circle cx="32" cy="44" r="3.5" fill="#ffc2d8" opacity="0.45"/>
      </svg>
    </div>
  );
}

/* ─── CONFETTI ───────────────────────────────────────────────── */
const confPieces = Array.from({length:75},(_,i)=>({
  id:i, x:15+(i*0.95)%70,
  dx:(i%2===0?1:-1)*(60+(i*7)%220),
  dy:180+(i*7)%550,
  color:["#e8708a","#f9a8c9","#ff85b3","#ffc2d8","#ffe4f0","#ffaacc","#f4759b","#ffe066","#fff0a0"][i%9],
  size:5+(i*0.2)%8, delay:(i*0.009)%0.65,
  shape:["50%","3px","0%"][i%3],
}));

function Confetti() {
  return <>
    {confPieces.map(p=>(
      <div key={p.id} style={{
        position:"fixed",left:`${p.x}vw`,top:"38vh",
        width:p.size,height:p.size,background:p.color,borderRadius:p.shape,
        pointerEvents:"none",zIndex:1000,
        animation:`confettiFall ${1.1+(p.id*0.014)%1}s ${p.delay}s linear forwards`,
        "--dx":`${p.dx}px`,"--dy":`${p.dy}px`,
      }}/>
    ))}
  </>;
}

/* ─── STYLES ─────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --rose:#e8708a;--rose-deep:#c94f72;--rose-mid:#f4a0b5;
    --text:#4a1c2f;--text-mid:#8b4a62;--text-soft:#c29aab;
    --sh:rgba(232,112,138,.28);--sh2:rgba(232,112,138,.5);
  }
  body{font-family:'DM Sans',sans-serif;}

  .wrap{
    min-height:100vh;
    background:
      radial-gradient(ellipse 80% 60% at 20% 0%,#ffd6e8,transparent 55%),
      radial-gradient(ellipse 70% 50% at 80% 100%,#ffc8d8,transparent 50%),
      radial-gradient(ellipse 60% 70% at 50% 50%,#fff0f5,transparent 70%),
      linear-gradient(160deg,#ffedf5,#ffd8e8 40%,#ffe8d0 80%,#fff0e8);
    display:flex;align-items:center;justify-content:center;
    padding:20px;position:relative;overflow:hidden;
  }

  @keyframes floraRise{
    0%{transform:translateY(0) rotate(0deg);opacity:0;}
    8%{opacity:1;}92%{opacity:.6;}
    100%{transform:translateY(-110vh) rotate(360deg);opacity:0;}
  }
  @keyframes confettiFall{
    0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:1;}
    100%{transform:translate(var(--dx),var(--dy)) rotate(720deg) scale(.3);opacity:0;}
  }
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
  @keyframes cardIn{from{opacity:0;transform:translateY(60px) scale(.9);}to{opacity:1;transform:translateY(0) scale(1);}}
  @keyframes bounceIn{from{transform:scale(0) rotate(-15deg);opacity:0;}to{transform:scale(1) rotate(0);opacity:1;}}
  @keyframes heartPop{0%{transform:scale(0) rotate(-20deg);opacity:0;}60%{transform:scale(1.35) rotate(8deg);}100%{transform:scale(1) rotate(0);opacity:1;}}
  @keyframes pulsGlow{
    0%,100%{box-shadow:0 8px 24px var(--sh2);}
    50%{box-shadow:0 8px 36px rgba(232,112,138,.65),0 0 0 10px rgba(244,160,181,.15);}
  }
  @keyframes nameFloat{
    0%,100%{transform:translateY(0);}
    50%{transform:translateY(-5px);}
  }
  @keyframes starSpin{
    0%{transform:rotate(0deg) scale(1);}
    50%{transform:rotate(180deg) scale(1.2);}
    100%{transform:rotate(360deg) scale(1);}
  }

  .card{
    background:rgba(255,255,255,.84);backdrop-filter:blur(24px);
    border-radius:36px;padding:48px 40px 40px;
    max-width:440px;width:100%;
    border:2px solid rgba(255,180,210,.6);
    box-shadow:0 2px 0 rgba(255,255,255,.9) inset,0 24px 64px var(--sh),0 4px 16px rgba(255,200,220,.4);
    position:relative;z-index:10;
    animation:cardIn .8s cubic-bezier(.34,1.56,.64,1) forwards;
  }
  .card::before{
    content:'🌷 🌸 🌺 🌸 🌷';
    display:block;text-align:center;font-size:1.1rem;letter-spacing:5px;
    margin-bottom:18px;animation:fadeUp .7s .2s both;
    filter:drop-shadow(0 2px 4px var(--sh));
  }
  .card::after{
    content:'';position:absolute;top:-2px;left:10%;right:10%;height:4px;
    background:linear-gradient(90deg,transparent,#f9a8c9,#e8708a,#f9a8c9,transparent);
    border-radius:4px;
  }
  .card-fl{position:absolute;font-size:1.35rem;opacity:.32;pointer-events:none;}

  /* ── NAME BANNER ── */
  .name-banner{
    text-align:center;margin-bottom:22px;animation:fadeUp .7s .32s both;
  }
  .for-text{
    font-size:.72rem;font-weight:600;color:var(--text-soft);
    letter-spacing:2.5px;text-transform:uppercase;margin-bottom:4px;
  }
  .mairam-name{
    font-family:'Cormorant Garamond',serif;
    font-size:3rem;font-weight:600;font-style:italic;
    background:linear-gradient(135deg,#e8708a,#c94f72,#f4759b);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    line-height:1; display:inline-block;
    animation:nameFloat 3s ease-in-out 1s infinite;
    filter:drop-shadow(0 2px 8px rgba(232,112,138,.3));
  }
  .name-flowers{font-size:1.1rem;letter-spacing:4px;margin-top:4px;color:var(--rose-mid);}

  .divider{
    display:flex;align-items:center;justify-content:center;
    gap:8px;margin:14px 0 22px;
    color:var(--rose-mid);font-size:.95rem;letter-spacing:4px;
    animation:fadeUp .7s .5s both;
  }
  .divider::before,.divider::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,#f9a8c9,transparent);}

  /* ── MESSAGE BOX ── */
  .msg-card{
    background:linear-gradient(135deg,rgba(252,228,236,.7),rgba(255,220,238,.5));
    border:1.5px solid rgba(244,160,181,.35);
    border-radius:24px;padding:22px 24px;margin-bottom:28px;
    text-align:center;position:relative;overflow:hidden;
    animation:fadeUp .7s .55s both;
  }
  .msg-card::before{
    content:'';position:absolute;inset:0;
    background:url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10 Q22 6 24 10 Q28 8 27 12 Q32 14 28 17 Q30 22 25 21 Q23 26 20 24 Q17 26 15 21 Q10 22 12 17 Q8 14 13 12 Q12 8 16 10 Z' fill='%23f9a8c9' opacity='0.12'/%3E%3C/svg%3E") repeat;
    opacity:0.5;
  }
  .msg-icon{font-size:2rem;display:block;margin-bottom:10px;animation:starSpin 8s linear infinite;}
  .msg-text{
    font-family:'Cormorant Garamond',serif;
    font-size:1.5rem;font-weight:600;font-style:italic;
    color:var(--text);line-height:1.35;position:relative;
  }
  .msg-text em{color:var(--rose-deep);}
  .msg-flowers{font-size:1.4rem;letter-spacing:3px;margin-top:10px;display:block;}

  /* ── BUTTONS ── */
  .answer-btns{display:flex;gap:14px;justify-content:center;align-items:center;flex-wrap:wrap;min-height:64px;position:relative;animation:fadeUp .7s .7s both;}

  .btn-yes{
    padding:16px 42px;
    background:linear-gradient(135deg,#f4759b,var(--rose),var(--rose-deep));
    color:white;border:none;border-radius:50px;
    font-family:'DM Sans',sans-serif;font-size:1.05rem;font-weight:700;
    cursor:pointer;
    box-shadow:0 8px 24px var(--sh2);
    transition:all .25s;
    animation:pulsGlow 2.2s 1.8s ease-in-out infinite;
  }
  .btn-yes:hover{transform:translateY(-4px) scale(1.07);box-shadow:0 16px 36px var(--sh2);}
  .btn-yes:active{transform:scale(.95);}

  .btn-maybe{
    padding:14px 26px;background:rgba(255,240,248,.85);color:var(--text-mid);
    border:2px solid rgba(244,160,181,.5);border-radius:50px;
    font-family:'DM Sans',sans-serif;font-size:.9rem;font-weight:600;
    cursor:pointer;flex-shrink:0;
    transition:transform .38s cubic-bezier(.34,1.56,.64,1),box-shadow .25s;
  }
  .btn-maybe:hover{background:white;border-color:var(--rose-mid);}

  /* ── CELEBRATE ── */
  .cel{text-align:center;}
  .cel-emoji{font-size:5.5rem;display:block;animation:heartPop .9s cubic-bezier(.34,1.56,.64,1);}
  .cel-name{
    font-family:'Cormorant Garamond',serif;
    font-size:2.6rem;font-weight:600;font-style:italic;
    background:linear-gradient(135deg,#e8708a,#c94f72);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    margin:12px 0 4px;animation:fadeUp .6s .2s both;
  }
  .cel-sub{font-size:1rem;color:var(--text-mid);line-height:1.65;margin-bottom:24px;animation:fadeUp .6s .35s both;}
  .cel-flowers{font-size:2rem;letter-spacing:4px;margin-bottom:28px;animation:fadeUp .8s .5s both;}

  .btn-again{
    padding:14px 36px;
    background:linear-gradient(135deg,#f4759b,var(--rose),var(--rose-deep));
    color:white;border:none;border-radius:50px;
    font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:700;
    cursor:pointer;box-shadow:0 8px 24px var(--sh2);transition:all .25s;
  }
  .btn-again:hover{transform:translateY(-3px);box-shadow:0 14px 32px var(--sh2);}
`;

const DODGE = ["🙈 Maybe…","🥺 Are you sure?","😏 Really tho?","🤔 Think harder~","🤭 Just say yes!","💭 Come onnnn~"];

export default function App() {
  const [screen, setScreen] = useState("request"); // request | celebrate
  const [dodges, setDodges] = useState(0);
  const [dodgePos, setDodgePos] = useState({ x:0, y:0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const cardRef = useRef(null);

  const dodge = () => {
    const c = cardRef.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    setDodgePos({
      x: (Math.random()-.5)*(r.width*.6),
      y: (Math.random()-.5)*(r.height*.4),
    });
    setDodges(d => d+1);
  };

  const handleYes = () => {
    setShowConfetti(true);
    setScreen("celebrate");
    setTimeout(()=>setShowConfetti(false), 3500);
  };

  const reset = () => {
    setScreen("request");
    setDodges(0);
    setDodgePos({x:0,y:0});
  };

  return (
    <>
      <style>{css}</style>
      <div className="wrap">
        <FloatingFlora />
        <CornerBouquet corner="tl" />
        <CornerBouquet corner="tr" />
        <CornerBouquet corner="bl" />
        <CornerBouquet corner="br" />
        {showConfetti && <Confetti />}

        {/* ── REQUEST SCREEN ── */}
        {screen === "request" && (
          <div className="card" ref={cardRef}>
            <span className="card-fl" style={{top:12,left:16,transform:"rotate(-22deg)"}}>🌷</span>
            <span className="card-fl" style={{top:12,right:16,transform:"rotate(22deg)"}}>🌸</span>
            <span className="card-fl" style={{bottom:14,left:16,transform:"rotate(15deg)"}}>🌺</span>
            <span className="card-fl" style={{bottom:14,right:16,transform:"rotate(-15deg)"}}>🌹</span>

            {/* Name */}
            <div className="name-banner">
              <p className="for-text">✨ this is for ✨</p>
              <span className="mairam-name">Mairam</span>
              <div className="name-flowers">🌷 🌸 🌷</div>
            </div>

            <div className="divider">🌸 🌸 🌸</div>

            {/* Message */}
            <div className="msg-card">
              <span className="msg-icon">💌</span>
              <p className="msg-text">
                Would you like to go on<br/>
                a <em>date</em> with me?
              </p>
              <span className="msg-flowers">🌷 🌸 🌹 🌸 🌷</span>
            </div>

            {/* Buttons */}
            <div className="answer-btns">
              <button className="btn-yes" onClick={handleYes}>
                💖 Yes, I would!
              </button>
              <button
                className="btn-maybe"
                onClick={dodge}
                style={{
                  transform:`translate(${dodgePos.x}px,${dodgePos.y}px)`,
                  transition:"transform .38s cubic-bezier(.34,1.56,.64,1)",
                }}
              >
                {DODGE[Math.min(dodges, DODGE.length-1)]}
              </button>
            </div>
          </div>
        )}

        {/* ── CELEBRATE ── */}
        {screen === "celebrate" && (
          <div className="card cel">
            <span className="card-fl" style={{top:12,left:16,transform:"rotate(-22deg)"}}>🌷</span>
            <span className="card-fl" style={{top:12,right:16,transform:"rotate(22deg)"}}>🌸</span>
            <span className="card-fl" style={{bottom:14,left:16,transform:"rotate(15deg)"}}>🌺</span>
            <span className="card-fl" style={{bottom:14,right:16,transform:"rotate(-15deg)"}}>🌹</span>

            <span className="cel-emoji">🥰</span>
            <div className="cel-name">Mairam said YES!</div>
            <p className="cel-sub">
              You've made me the happiest person 🥹<br/>
              I'll plan something extra special<br/>
              just for you, my lovely 🌹✨
            </p>
            <div className="cel-flowers">🌷 💕 🌸 💖 🌺</div>
            <button className="btn-again" onClick={reset}>
              🌸 View Again
            </button>
          </div>
        )}
      </div>
    </>
  );
}
