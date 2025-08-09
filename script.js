/* Portfolio Interactivity Script */
(function(){
  const typingEl = document.getElementById('typing');
  const phrases = [
    'AI-Powered Cybersecurity Innovator',
    'Ethical Hacker & VAPT Specialist',
    'Building Intelligent Security Systems',
    'Founder & CEO @ ZehraSec',
    'Open-Source Security Advocate'
  ];
  let pi = 0, ci = 0, erasing = false;
  function typeLoop(){
    if(!typingEl) return;
    const phrase = phrases[pi];
    if(!erasing){
      typingEl.textContent = phrase.slice(0, ++ci);
      if(ci === phrase.length){
        erasing = true; setTimeout(typeLoop, 1800); return;
      }
      setTimeout(typeLoop, 55 + Math.random()*45);
    } else {
      typingEl.textContent = phrase.slice(0, --ci);
      if(ci === 0){ erasing = false; pi = (pi+1)%phrases.length; }
      setTimeout(typeLoop, 35 + Math.random()*65);
    }
  }
  typeLoop();

  // Navigation toggle
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-menu');
  if(toggle && navList){
    toggle.addEventListener('click', ()=>{
      const open = navList.getAttribute('data-open') === 'true';
      navList.setAttribute('data-open', !open);
      toggle.setAttribute('aria-expanded', String(!open));
    });
    navList.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{
      navList.setAttribute('data-open','false');
      toggle.setAttribute('aria-expanded','false');
    }));
  }

  // Fetch GitHub user stats (public)
  async function fetchStats(){
    try {
      const r = await fetch('https://api.github.com/users/yashab-cyber');
      if(!r.ok) return;
      const j = await r.json();
      document.getElementById('followers').textContent = j.followers ?? '--';
      document.getElementById('repos').textContent = j.public_repos ?? '--';
      document.getElementById('gists').textContent = j.public_gists ?? '--';
    } catch(e){ /* silent */ }
  }
  fetchStats();

  // Progressive enhancement for project cards (stars)
  async function enrichProjects(){
    const cards = document.querySelectorAll('.project-card[data-repo]');
    await Promise.all(Array.from(cards).map(async card => {
      const repo = card.getAttribute('data-repo');
      try {
        const r = await fetch(`https://api.github.com/repos/yashab-cyber/${repo}`);
        if(!r.ok) return;
        const data = await r.json();
        const meta = document.createElement('div');
        meta.className='repo-meta';
        meta.style.cssText='margin-top:.4rem; font-size:.65rem; letter-spacing:1px; display:flex; gap:.9rem; color:#6aa578; font-weight:600; text-transform:uppercase;';
        meta.innerHTML = `<span>⭐ ${data.stargazers_count}</span><span>🍴 ${data.forks_count}</span><span>⬆️ ${data.updated_at.slice(0,10)}</span>`;
        card.appendChild(meta);
      } catch(_e){}
    }));
  }
  enrichProjects();

  // Contact form handler (local fallback)
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  if(form && statusEl){
    form.addEventListener('submit', async (e)=>{
      if(form.hasAttribute('data-submitting')) return;
      form.setAttribute('data-submitting','true');
      statusEl.textContent = 'Sending...';
      e.preventDefault();
      // If Netlify handles, just show UX feedback
      try {
        const fd = new FormData(form);
        const res = await fetch('/', { method:'POST', body: fd });
        if(res.ok){
          statusEl.textContent = 'Message sent successfully!';
          form.reset();
        } else {
          statusEl.textContent = 'Delivered (static fallback).';
        }
      } catch(err){
        statusEl.textContent = 'Local capture only (static site).';
      } finally {
        form.removeAttribute('data-submitting');
        setTimeout(()=> statusEl.textContent='', 5000);
      }
    });
  }

  // Year
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Intersection reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if(ent.isIntersecting){
        ent.target.classList.add('reveal');
        observer.unobserve(ent.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.info-card, .project-card, .stat-box, .research-item, .tier, .skill-column').forEach(el => {
    el.classList.add('will-reveal');
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `.will-reveal{opacity:0;transform:translateY(14px);transition:opacity .7s cubic-bezier(.4,0,.2,1),transform .7s cubic-bezier(.4,0,.2,1);} .reveal{opacity:1;transform:none;}`;
  document.head.appendChild(style);
})();
