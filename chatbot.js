/* Minimal AI-style Chatbot Widget (client-side only) */
(function(){
  const STYLE = `
  .chatbot-root { position: fixed; bottom: 18px; right: 18px; z-index: 1200; font-family: 'Inter', system-ui, sans-serif; }
  .cb-toggle { background: linear-gradient(135deg,#00ff41,#039a30); color:#000; border:none; width:54px; height:54px; border-radius:50%; cursor:pointer; font-size:1.15rem; font-weight:700; box-shadow:0 6px 22px -6px rgba(0,255,65,.5); position:relative; display:flex; align-items:center; justify-content:center; }
  .cb-toggle:focus { outline:2px solid #fff; }
  .cb-panel { position:absolute; bottom:70px; right:0; width: min(340px,90vw); background:#060606; border:1px solid #121212; border-radius:16px; box-shadow:0 14px 48px -10px rgba(0,0,0,.75),0 0 0 1px rgba(0,255,65,.15); display:grid; grid-template-rows:auto 1fr auto; max-height:520px; overflow:hidden; opacity:0; transform: translateY(14px) scale(.96); pointer-events:none; transition:opacity .35s cubic-bezier(.4,0,.2,1), transform .35s cubic-bezier(.4,0,.2,1); }
  .cb-panel.open { opacity:1; transform:translateY(0) scale(1); pointer-events:auto; }
  .cb-header { padding:.85rem 1rem; display:flex; gap:.75rem; align-items:center; background:#040d06; border-bottom:1px solid #0d2d16; }
  .cb-avatar { width:36px; height:36px; border-radius:50%; background:radial-gradient(circle at 30% 30%,#00ff41,#018d2a); display:flex; align-items:center; justify-content:center; font-size:.8rem; font-weight:700; color:#001b08; letter-spacing:.5px; box-shadow:0 0 0 1px rgba(0,255,65,.35); }
  .cb-title { font-size:.8rem; font-weight:600; color:#e8ffe9; line-height:1.2; }
  .cb-title small { display:block; font-size:.6rem; font-weight:500; color:#7ea786; margin-top:2px; }
  .cb-body { padding:1rem .9rem 1.15rem; overflow-y:auto; display:flex; flex-direction:column; gap:.75rem; scrollbar-width:thin; }
  .cb-msg { display:grid; gap:.4rem; font-size:.72rem; line-height:1.35; max-width:80%; position:relative; }
  .cb-msg.bot { align-self:flex-start; }
  .cb-msg.user { align-self:flex-end; text-align:right; }
  .cb-bubble { background:#071108; border:1px solid #132d19; padding:.6rem .7rem .65rem; border-radius:12px 12px 12px 4px; color:#cfead1; position:relative; box-shadow:0 4px 14px -6px rgba(0,255,65,.18); }
  .cb-msg.user .cb-bubble { background:#0d2414; border-color:#1f4029; border-radius:12px 12px 4px 12px; }
  .cb-time { font-size:.5rem; letter-spacing:1px; text-transform:uppercase; color:#5d6c60; font-weight:600; }
  .cb-input-row { display:flex; gap:.55rem; padding:.7rem .75rem .8rem; background:#040404; border-top:1px solid #121212; }
  .cb-input-row form { display:flex; gap:.55rem; width:100%; }
  .cb-input-row input { flex:1; background:#0c0c0c; border:1px solid #1b1f1c; border-radius:10px; padding:.65rem .7rem; color:#e6e6e6; font-size:.7rem; }
  .cb-input-row input:focus { outline:2px solid #1f4029; border-color:#1f4029; }
  .cb-input-row button { background:#071108; border:1px solid #1f4029; color:#00ff41; font-size:.65rem; letter-spacing:1px; text-transform:uppercase; font-weight:600; padding:.65rem .9rem; border-radius:10px; cursor:pointer; }
  .cb-faq { display:flex; flex-wrap:wrap; gap:.4rem; padding:.45rem 1rem .7rem; background:#060606; border-bottom:1px solid #121212; }
  .cb-faq button { background:#0c0c0c; color:#7ea786; border:1px solid #1b1f1c; font-size:.55rem; letter-spacing:.8px; text-transform:uppercase; padding:.4rem .55rem; border-radius:6px; cursor:pointer; font-weight:600; }
  .cb-faq button:hover { color:#00ff41; border-color:#1f4029; }
  .cb-typing { display:flex; align-items:center; gap:4px; }
  .cb-dot { width:5px; height:5px; background:#00ff41; border-radius:50%; opacity:.35; animation:blink 1.4s infinite; }
  .cb-dot:nth-child(2){ animation-delay:.25s; }
  .cb-dot:nth-child(3){ animation-delay:.5s; }
  @keyframes blink { 0%,80%,100% { opacity:.15; transform:translateY(0);} 40% { opacity:.9; transform:translateY(-2px);} }
  @media (max-width:480px){ .cb-panel { width: min(100vw,360px); right:-4px; } }
  `;

  function injectStyle(){ if(document.getElementById('cb-style')) return; const s=document.createElement('style'); s.id='cb-style'; s.textContent=STYLE; document.head.appendChild(s);} injectStyle();

  const root = document.getElementById('chatbot-root');
  if(!root) return;
  root.innerHTML = `
    <button class="cb-toggle" aria-label="Open chat assistant" aria-haspopup="dialog" aria-expanded="false">AI</button>
    <div class="cb-panel" role="dialog" aria-modal="false" aria-label="AI assistant panel">
      <div class="cb-header">
        <div class="cb-avatar" aria-hidden="true">AI</div>
        <div class="cb-title">Security Assistant <small>Ask about skills, projects or support</small></div>
      </div>
      <div class="cb-faq" aria-label="Quick questions">
        <button data-q="What is ZehraSec?">ZehraSec?</button>
        <button data-q="List featured projects">Projects</button>
        <button data-q="How to donate?">Donate</button>
        <button data-q="Contact info">Contact</button>
      </div>
      <div class="cb-body" id="cb-body"></div>
      <div class="cb-input-row">
        <form id="cb-form" autocomplete="off">
          <input id="cb-input" name="message" placeholder="Ask about expertise, projects, donations..." aria-label="Message" required />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>`;

  const toggle = root.querySelector('.cb-toggle');
  const panel = root.querySelector('.cb-panel');
  const body = root.querySelector('#cb-body');
  const form = root.querySelector('#cb-form');
  const input = root.querySelector('#cb-input');

  const FAQ = {
    'what is zehrasec': 'ZehraSec is an AI-driven cybersecurity company focused on VAPT, automation, analyst augmentation and education.',
    'list featured projects': 'Highlighted projects: NMAP-AI (AI network scanning), LEWIS (analyst intelligence system), CyberRotate Pro (IP rotation), NEO (AI automation assistant).',
    'how to donate': 'You can donate via GitHub Sponsors, PayPal or crypto (SOL & BTC) on the donation page. Bronze to Platinum tiers offer escalating benefits.',
    'contact info': 'Email: yashabalam707@gmail.com • LinkedIn: /in/yashab-alam • Website: zehrasec.com',
    'skills': 'Core skills: Penetration Testing, Vulnerability Analysis, Network Security, Deep Learning, MLOps, Full-Stack Dev.'
  };

  function time(){ return new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}); }

  function addMessage(role, text){
    const wrap = document.createElement('div');
    wrap.className = `cb-msg ${role}`;
    wrap.innerHTML = `<div class="cb-bubble">${text}</div><span class="cb-time">${time()}</span>`;
    body.appendChild(wrap); body.scrollTop = body.scrollHeight;
  }

  function addTyping(){
    const wrap = document.createElement('div');
    wrap.className='cb-msg bot cb-typing';
    wrap.innerHTML = `<div class="cb-bubble"><div style="display:flex; gap:4px; align-items:center;"><span class="cb-dot"></span><span class="cb-dot"></span><span class="cb-dot"></span></div></div>`;
    body.appendChild(wrap); body.scrollTop = body.scrollHeight; return wrap;
  }

  function generateResponse(q){
    const norm = q.toLowerCase().trim();
    for(const key of Object.keys(FAQ)){
      if(norm.includes(key)) return FAQ[key];
    }
    if(/donat|support/.test(norm)) return FAQ['how to donate'];
    if(/project|repo|github/.test(norm)) return FAQ['list featured projects'];
    if(/contact|email|reach/.test(norm)) return FAQ['contact info'];
    if(/skill|expertise/.test(norm)) return FAQ['skills'];
    return 'I\'m a lightweight on-device helper. Ask about ZehraSec, projects, donations, contact, or skills.';
  }

  toggle.addEventListener('click', ()=>{
    const open = panel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    if(open) { input.focus(); if(body.childElementCount===0){ addMessage('bot','Hi! I\'m the portfolio assistant. Ask anything about projects, skills, or how to support.'); } }
  });

  root.querySelectorAll('.cb-faq button').forEach(btn=> btn.addEventListener('click', ()=>{
    input.value = btn.dataset.q || btn.textContent;
    form.dispatchEvent(new Event('submit', {cancelable:true, bubbles:true}));
  }));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const val = input.value.trim(); if(!val) return; input.value=''; addMessage('user', val);
    const typing = addTyping();
    setTimeout(()=> { typing.remove(); addMessage('bot', generateResponse(val)); }, 550 + Math.random()*600);
  });
})();
