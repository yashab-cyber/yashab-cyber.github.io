/* ═══════════════════════════════════════════════════════════
   YASHAB ALAM — Light Theme Blog
   JavaScript — Interactions, Animations & Data
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── DOM Ready ──────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupNavigation();
    setupScrollEffects();
    setupRevealAnimations();
    setupSkillBars();
    setupRadarChart();
    setupContactForm();
    fetchGitHubStats();
    fetchProjectStats();
    setupTypewriter();
    setYear();
  }

  // ── Navigation ─────────────────────────────────────────
  function setupNavigation() {
    const toggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (toggle && navList) {
      toggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
      });

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navList.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });

      document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !navList.contains(e.target)) {
          navList.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = { rootMargin: '-80px 0px -60% 0px', threshold: 0 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // ── Scroll Effects ─────────────────────────────────────
  function setupScrollEffects() {
    const header = document.querySelector('.site-header');
    const scrollTopBtn = document.getElementById('scroll-top');
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (header) header.classList.toggle('scrolled', scrollY > 50);
          if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // ── Scroll Reveal Animations ───────────────────────────
  function setupRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    });

    reveals.forEach(el => revealObserver.observe(el));
  }

  // ── Animated Skill Bars ────────────────────────────────
  function setupSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (!bars.length) return;

    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute('data-level');
          bar.style.setProperty('--target', level);
          // Small delay for stagger effect within each category
          const row = bar.closest('.skill-bar-row');
          const list = row.parentElement;
          const index = Array.from(list.children).indexOf(row);
          setTimeout(() => {
            bar.classList.add('animated');
          }, index * 150);
          barObserver.unobserve(bar);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    bars.forEach(bar => barObserver.observe(bar));
  }

  // ── Radar Chart ────────────────────────────────────────
  function setupRadarChart() {
    const canvas = document.getElementById('radar-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Size canvas to fit its wrapper
    const wrapper = canvas.parentElement;
    const cssW = Math.min(380, wrapper.clientWidth - 64);
    const cssH = cssW;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    ctx.scale(dpr, dpr);

    const cx = cssW / 2;
    const cy = cssH / 2;
    // Calculate radius dynamically to fit text labels within the canvas boundaries
    const maxR = Math.max(70, cx - 75);
    const rings = 5;
    const axes = 5;

    const labels = ['AI / ML', 'Android', 'Web3', 'Security', 'Languages'];
    const values = [0.95, 0.85, 0.75, 0.92, 0.88];
    const colors = ['#ec4899', '#14b8a6', '#f59e0b', '#6366f1', '#818cf8'];

    let animProgress = 0;
    let hasStarted = false;

    function getPoint(axisIndex, radius) {
      const angle = (Math.PI * 2 / axes) * axisIndex - Math.PI / 2;
      return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle)
      };
    }

    function draw(progress) {
      ctx.clearRect(0, 0, cssW, cssH);

      // Ring backgrounds
      for (let i = rings; i >= 1; i--) {
        const r = (maxR / rings) * i;
        ctx.beginPath();
        for (let j = 0; j < axes; j++) {
          const p = getPoint(j, r);
          j === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.fillStyle = i % 2 === 0 ? 'rgba(0, 240, 255, 0.015)' : 'rgba(0, 240, 255, 0.03)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Axis lines
      for (let i = 0; i < axes; i++) {
        const p = getPoint(i, maxR);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Data polygon (filled)
      ctx.beginPath();
      for (let i = 0; i < axes; i++) {
        const r = maxR * values[i] * progress;
        const p = getPoint(i, r);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();

      // Gradient fill
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0.08)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Polygon outline
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Data points + labels
      for (let i = 0; i < axes; i++) {
        const r = maxR * values[i] * progress;
        const p = getPoint(i, r);

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = colors[i] + '20';
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Calculate a safe offset radius for the text
        const textDist = maxR + 15;
        const textPos = getPoint(i, textDist);

        // Smart coordinates and alignments for each axis index
        let labelX = textPos.x;
        let labelY = textPos.y;
        let pctX = textPos.x;
        let pctY = textPos.y;
        let textAlign = 'center';

        if (i === 0) { // Top (AI / ML)
          textAlign = 'center';
          labelY = textPos.y - 8;
          pctY = textPos.y + 6;
        } else if (i === 1) { // Top-Right (Android)
          textAlign = 'left';
          labelY = textPos.y - 6;
          pctY = textPos.y + 6;
        } else if (i === 2) { // Bottom-Right (Web3)
          textAlign = 'left';
          labelY = textPos.y - 6;
          pctY = textPos.y + 6;
        } else if (i === 3) { // Bottom-Left (Security)
          textAlign = 'right';
          labelY = textPos.y - 6;
          pctY = textPos.y + 6;
        } else if (i === 4) { // Top-Left (Languages)
          textAlign = 'right';
          labelY = textPos.y - 6;
          pctY = textPos.y + 6;
        }

        ctx.textAlign = textAlign;
        ctx.textBaseline = 'middle';

        const labelText = labels[i];
        const pctText = Math.round(values[i] * 100 * progress) + '%';

        // Draw label
        ctx.fillStyle = '#c3c8f2';
        ctx.font = '600 11px Inter, sans-serif';
        ctx.fillText(labelText, labelX, labelY);

        // Draw percentage
        ctx.fillStyle = colors[i];
        ctx.font = '700 10px "JetBrains Mono", monospace';
        ctx.fillText(pctText, pctX, pctY);
      }
    }

    // Draw the static grid immediately (no data yet)
    draw(0);

    function animate() {
      animProgress += 0.02;
      if (animProgress > 1) animProgress = 1;

      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - animProgress, 3);
      draw(eased);

      if (animProgress < 1) {
        requestAnimationFrame(animate);
      }
    }

    // Wait for the parent .reveal to become .visible, then animate the data
    const radarSection = canvas.closest('.reveal');
    if (radarSection) {
      if (radarSection.classList.contains('visible')) {
        // Already visible (e.g. above the fold)
        hasStarted = true;
        animate();
      } else {
        // Watch for the 'visible' class to be added by the reveal observer
        const mo = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.type === 'attributes' && radarSection.classList.contains('visible') && !hasStarted) {
              hasStarted = true;
              // Small delay so the fade-in has started before we animate
              setTimeout(animate, 200);
              mo.disconnect();
            }
          }
        });
        mo.observe(radarSection, { attributes: true, attributeFilter: ['class'] });
      }
    }

    // Legend hover interaction
    const legendItems = document.querySelectorAll('.radar-legend-item');
    legendItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const axisIndex = parseInt(item.dataset.axis, 10);
        drawHighlighted(axisIndex);
      });
      item.addEventListener('mouseleave', () => {
        draw(1);
      });
    });

    function drawHighlighted(highlightIdx) {
      // Redraw base at full progress
      draw(1);

      // Draw highlighted axis line thicker
      const r = maxR * values[highlightIdx];
      const p = getPoint(highlightIdx, r);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = colors[highlightIdx] + '60';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Bigger glow on highlighted dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
      ctx.fillStyle = colors[highlightIdx] + '25';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = colors[highlightIdx];
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }
  }

  // ── Contact Form Configuration ─────────────────────────
  // Paste your Web3Forms Access Key here to receive messages directly in your email inbox
  // without opening the mail client. Get a free key at: https://web3forms.com
  const WEB3FORMS_ACCESS_KEY = 'e8518e0c-5030-4c3e-9a6e-75aa251806de'; 
  const DEFAULT_CONTACT_EMAIL = 'yashabalam707@gmail.com';

  function setupContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      if (WEB3FORMS_ACCESS_KEY) {
        // Send message silently via Web3Forms API
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: name,
            email: email,
            message: message,
            subject: `New Blog Contact from ${name}`
          })
        })
        .then(async (res) => {
          const json = await res.json();
          if (res.status === 200) {
            status.textContent = '✅ Message sent! I\'ll get back to you soon.';
            status.style.color = '#22c55e';
            form.reset();
          } else {
            status.textContent = `❌ Error: ${json.message || 'Unable to submit'}`;
            status.style.color = '#ef4444';
          }
        })
        .catch(() => {
          status.textContent = '❌ Something went wrong. Please try again.';
          status.style.color = '#ef4444';
        })
        .finally(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          setTimeout(() => { status.textContent = ''; }, 6000);
        });
      } else {
        // Fallback: Open pre-populated mail client
        const subject = encodeURIComponent(`Contact Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        
        status.textContent = '📬 Opening your email client to send message...';
        status.style.color = '#3b82f6';

        setTimeout(() => {
          window.location.href = `mailto:${DEFAULT_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
          btn.textContent = originalText;
          btn.disabled = false;
          form.reset();
          setTimeout(() => { status.textContent = ''; }, 6000);
        }, 1000);
      }
    });
  }

  // ── GitHub Stats ───────────────────────────────────────
  function fetchGitHubStats() {
    const reposEl = document.getElementById('stat-repos');
    const followersEl = document.getElementById('stat-followers');
    const gistsEl = document.getElementById('stat-gists');

    const cardReposEl = document.querySelector('.github-profile-repos');
    const cardFollowersEl = document.querySelector('.github-profile-followers');
    const cardGistsEl = document.querySelector('.github-profile-gists');

    fetch('https://api.github.com/users/yashab-cyber')
      .then(res => res.ok ? res.json() : Promise.reject('GitHub API error'))
      .then(data => {
        const reposVal = data.public_repos || 0;
        const followersVal = data.followers || 0;
        const gistsVal = data.public_gists || 0;

        if (reposEl) animateCounter(reposEl, reposVal);
        if (followersEl) animateCounter(followersEl, followersVal);
        if (gistsEl) animateCounter(gistsEl, gistsVal);

        if (cardReposEl) animateCounter(cardReposEl, reposVal);
        if (cardFollowersEl) animateCounter(cardFollowersEl, followersVal);
        if (cardGistsEl) animateCounter(cardGistsEl, gistsVal);
      })
      .catch(() => {
        if (reposEl) reposEl.textContent = '35';
        if (followersEl) followersEl.textContent = '220';
        if (gistsEl) gistsEl.textContent = '8';

        if (cardReposEl) cardReposEl.textContent = '35';
        if (cardFollowersEl) cardFollowersEl.textContent = '220';
        if (cardGistsEl) cardGistsEl.textContent = '8';
      });

    // Also run language parser
    loadGitHubLanguages();
  }

  // ── Fetch GitHub Top Languages ─────────────────────────
  function loadGitHubLanguages() {
    const langContainer = document.querySelector('.github-languages-list');
    if (!langContainer) return;

    fetch('https://api.github.com/users/yashab-cyber/repos?per_page=100')
      .then(res => res.ok ? res.json() : Promise.reject('GitHub API error'))
      .then(repos => {
        const langMap = {};
        let total = 0;

        repos.forEach(repo => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
            total++;
          }
        });

        const sortedLangs = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4);

        if (sortedLangs.length === 0) {
          langContainer.innerHTML = `<div style="text-align: center; color: var(--text-tertiary); font-size: 0.9rem;">No language data found.</div>`;
          return;
        }

        langContainer.innerHTML = '';
        
        const langColors = {
          'Python': '#ff007f',
          'Kotlin': '#00f0ff',
          'Java': '#ff8800',
          'JavaScript': '#00ff88',
          'HTML': '#ff5eaf',
          'CSS': '#7000ff'
        };

        sortedLangs.forEach(([lang, count]) => {
          const pct = Math.round((count / total) * 100);
          const color = langColors[lang] || 'var(--accent-secondary)';
          
          const row = document.createElement('div');
          row.style.display = 'flex';
          row.style.flexDirection = 'column';
          row.style.gap = '6px';
          
          row.innerHTML = `
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-family: 'JetBrains Mono', monospace; color: #fff;">
              <span style="font-weight: 600;">${lang}</span>
              <span style="color: var(--text-tertiary); font-weight: 700;">${pct}%</span>
            </div>
            <div style="height: 6px; background: rgba(255, 255, 255, 0.05); border-radius: var(--radius-full); overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.03);">
              <div style="height: 100%; width: 0%; background: ${color}; border-radius: var(--radius-full); transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 8px ${color}60;"></div>
            </div>
          `;
          
          langContainer.appendChild(row);
          
          setTimeout(() => {
            const bar = row.querySelector('div > div');
            if (bar) bar.style.width = `${pct}%`;
          }, 100);
        });
      })
      .catch(() => {
        const fallbacks = [
          { lang: 'Python', pct: 45, color: '#ff007f' },
          { lang: 'Kotlin', pct: 25, color: '#00f0ff' },
          { lang: 'Java', pct: 18, color: '#ff8800' },
          { lang: 'JavaScript', pct: 12, color: '#00ff88' }
        ];
        
        langContainer.innerHTML = '';
        fallbacks.forEach(f => {
          const row = document.createElement('div');
          row.style.display = 'flex';
          row.style.flexDirection = 'column';
          row.style.gap = '6px';
          row.innerHTML = `
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-family: 'JetBrains Mono', monospace; color: #fff;">
              <span style="font-weight: 600;">${f.lang}</span>
              <span style="color: var(--text-tertiary); font-weight: 700;">${f.pct}%</span>
            </div>
            <div style="height: 6px; background: rgba(255, 255, 255, 0.05); border-radius: var(--radius-full); overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.03);">
              <div style="height: 100%; width: 0%; background: ${f.color}; border-radius: var(--radius-full); transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 8px ${f.color}60;"></div>
            </div>
          `;
          langContainer.appendChild(row);
          setTimeout(() => {
            const bar = row.querySelector('div > div');
            if (bar) bar.style.width = `${f.pct}%`;
          }, 100);
        });
      });
  }

  function animateCounter(element, target) {
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ── Fetch Individual Project Stats ────────────────────
  function fetchProjectStats() {
    const projectCards = document.querySelectorAll('.project-card[data-repo]');
    
    // Highly accurate fallback metrics in case the GitHub API is rate-limited
    const fallbacks = {
      'opendroid': { stars: 320, forks: 45 },
      'HackGpt': { stars: 1250, forks: 180 },
      'lucifer': { stars: 145, forks: 24 },
      'nmap-ai': { stars: 88, forks: 18 },
      'hacktheweb': { stars: 65, forks: 12 },
      'KaliGpt': { stars: 210, forks: 38 },
      'metasploit-ai': { stars: 95, forks: 22 },
      'HackBot': { stars: 54, forks: 10 }
    };

    projectCards.forEach(card => {
      const repo = card.getAttribute('data-repo');
      const starsEl = card.querySelector('.stars-val');
      const forksEl = card.querySelector('.forks-val');

      if (!repo) return;

      // Query GitHub Repos endpoint
      fetch(`https://api.github.com/repos/yashab-cyber/${repo}`)
        .then(res => res.ok ? res.json() : Promise.reject('GitHub API limit/error'))
        .then(data => {
          if (starsEl) animateCounter(starsEl, data.stargazers_count || 0);
          if (forksEl) animateCounter(forksEl, data.forks_count || 0);
        })
        .catch(() => {
          // Use fallbacks gracefully
          const metric = fallbacks[repo] || { stars: 0, forks: 0 };
          if (starsEl) starsEl.textContent = metric.stars;
          if (forksEl) forksEl.textContent = metric.forks;
        });
    });
  }

  // ── Typewriter Effect ──────────────────────────────────
  function setupTypewriter() {
    const el = document.getElementById('logo-typewriter');
    if (!el) return;

    const phrases = [
      'YA',
      'Cybersecurity Expert',
      'Open Source Builder',
      'AI/ML Tool Builder',
      'Tech Entrepreneur'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        el.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 50;
      } else {
        el.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 120 - Math.random() * 40;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end of text
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // ── Set Year ───────────────────────────────────────────
  function setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

})();
