// Enhanced Cybersecurity Portfolio JavaScript

class PortfolioManager {
  constructor() {
    this.init();
  }
  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.setupObservers();
    this.initMobileNavigation();
    this.startAnimations();
  }
  setupEventListeners() {
    // DOM loaded - check if already loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.hideLoadingScreen();
      });
    } else {
      // DOM already loaded
      this.hideLoadingScreen();
    }

    // Window events
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 100));

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', this.toggleTheme.bind(this));
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      backToTop.addEventListener('click', this.scrollToTop.bind(this));
    }

    // Navigation
    this.setupNavigation();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.smoothScroll.bind(this));
    });

    // Contact form (if exists)
    this.setupContactForm();

    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }
  initializeComponents() {
    this.initTheme();
    this.initTypingEffect();
    this.initAnimationObserver();
    this.initParticles();
    this.enhanceAccessibility();
    this.handleErrors();
    this.measurePerformance();
  }

  setupObservers() {
    // Intersection Observer for animations
    this.observeElements();
    
    // Navigation active state observer
    this.observeNavigation();
  }

  startAnimations() {
    this.animateSkills();
    this.animateStats();
    // Project animations are now initialized in hideLoadingScreen
  }

  // Theme Management
  initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    this.setTheme(savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  }
  // Loading Screen
  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      // Ensure all project elements are ready
      this.prepareProjectElements();
      
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          // Initialize project animations after loading screen is hidden
          this.initProjectAnimations();
        }, 500);
      }, 1000);
    }
  }

  prepareProjectElements() {
    // Ensure all project cards are ready for animation
    const projectCards = document.querySelectorAll('.project-card');
    const features = document.querySelectorAll('.feature');
    const projectLinks = document.querySelectorAll('.project-link');
    
    // Set initial states
    projectCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
    });
    
    features.forEach(feature => {
      feature.style.opacity = '0';
      feature.style.transform = 'translateY(20px)';
    });
    
    // Trigger animations after a brief delay
    setTimeout(() => {
      projectCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.transition = 'all 0.6s ease-out';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
      });
      
      features.forEach((feature, index) => {
        setTimeout(() => {
          feature.style.transition = 'all 0.4s ease-out';
          feature.style.opacity = '1';
          feature.style.transform = 'translateY(0)';
        }, index * 50);
      });
    }, 200);
  }

  // Fallback to ensure loading screen is always hidden
  forceHideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
  }

  // Scroll Management
  handleScroll() {
    this.updateScrollProgress();
    this.updateBackToTopButton();
    this.updateNavigationState();
    this.handleScrollAnimations();
  }

  updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
      const scrolled = window.pageYOffset;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      scrollProgress.style.width = `${Math.min(progress, 100)}%`;
    }
  }

  updateBackToTopButton() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Navigation
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  updateNavigationState() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  observeNavigation() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // Typing Effect
  initTypingEffect() {
    const typingElement = document.getElementById('typingEffect');
    if (!typingElement) return;

    const texts = [
      'Ethical Hacker',
      'Cybersecurity Researcher', 
      'Founder @ Zehra Sec',
      'AI Security Expert',
      'VAPT Specialist',
      'Security Trainer'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const type = () => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let nextDelay = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentText.length) {
        nextDelay = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }

      setTimeout(type, nextDelay);
    };

    type();
  }

  // Animation Observer
  initAnimationObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);
  }

  observeElements() {
    const elementsToObserve = document.querySelectorAll(
      '.content-section, .experience-card, .project-card, .research-card, .contact-item, .timeline-item, .stat-item, .projects-intro, .projects-summary, .feature, .project-link'
    );

    elementsToObserve.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
      el.style.animationPlayState = 'paused';
      this.animationObserver.observe(el);
    });
  }

  handleScrollAnimations() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Skills Animation
  animateSkills() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
      setTimeout(() => {
        tag.style.animation = 'fadeInUp 0.6s ease-out forwards';
      }, index * 100);
    });
  }

  // Stats Animation
  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateNumber = (element, target) => {
      const increment = target / 30;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
      }, 50);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const number = entry.target;
          const target = parseInt(number.textContent);
          animateNumber(number, target);
          observer.unobserve(number);
        }
      });
    });

    statNumbers.forEach(number => observer.observe(number));
  }

  // Particles System
  initParticles() {
    this.createParticles();
  }

  createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      overflow: hidden;
    `;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(88, 166, 255, 0.3);
        border-radius: 50%;
        animation: float ${5 + Math.random() * 10}s infinite linear;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 10}s;
      `;
      particlesContainer.appendChild(particle);
    }

    document.body.appendChild(particlesContainer);
  }

  // Contact Form
  setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', this.handleContactSubmit.bind(this));
  }

  handleContactSubmit(e) {
    e.preventDefault();
    
    // Form validation and submission logic
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    this.showNotification('Message sent successfully!', 'success');
    e.target.reset();
  }

  // Smooth Scrolling
  smoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const headerOffset = 80;
      const elementPosition = targetSection.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Keyboard Navigation
  handleKeydown(e) {
    // Escape key to close modals/overlays
    if (e.key === 'Escape') {
      this.closeModals();
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.navigateWithKeys(e.key);
    }
  }

  navigateWithKeys(direction) {
    const sections = Array.from(document.querySelectorAll('.content-section'));
    const currentSection = sections.find(section => 
      section.getBoundingClientRect().top <= 100 && 
      section.getBoundingClientRect().bottom >= 100
    );
    
    if (currentSection) {
      const currentIndex = sections.indexOf(currentSection);
      let targetIndex;
      
      if (direction === 'ArrowDown') {
        targetIndex = Math.min(currentIndex + 1, sections.length - 1);
      } else {
        targetIndex = Math.max(currentIndex - 1, 0);
      }
      
      sections[targetIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  closeModals() {
    // Close any open modals or overlays
    const modals = document.querySelectorAll('.modal.open');
    modals.forEach(modal => modal.classList.remove('open'));
  }

  // Resize Handler
  handleResize() {
    this.updateParticles();
    this.updateAnimations();
  }

  updateParticles() {
    // Update particle positions on resize
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
    });
  }

  updateAnimations() {
    // Recalculate animation timings if needed
  }

  // Notification System
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--accent-primary);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Utility Functions
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Performance Monitoring
  measurePerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
        }, 0);
      });
    }
  }

  // Accessibility Enhancements
  enhanceAccessibility() {
    // Add skip links
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView();
        }
      });
    }

    // Enhance focus management
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  // Error Handling
  handleErrors() {
    window.addEventListener('error', (e) => {
      console.error('JavaScript Error:', e.error);
      // Optionally report to analytics
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled Promise Rejection:', e.reason);
      // Optionally report to analytics
    });
  }

  // Analytics (Optional)
  initAnalytics() {
    // Track page views, interactions, etc.
    this.trackEvent('page_view', {
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  }

  trackEvent(eventName, data) {
    // Send analytics data to your preferred service
    console.log('Analytics Event:', eventName, data);
  }

  // Mobile Navigation
  initMobileNavigation() {
    const mobileToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('mobileNavOverlay');
    
    if (!mobileToggle || !navMenu || !navOverlay) return;
    
    const toggleMobileNav = () => {
      const isActive = navMenu.classList.contains('active');
      
      if (isActive) {
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };
    
    mobileToggle.addEventListener('click', toggleMobileNav);
    navOverlay.addEventListener('click', toggleMobileNav);
    
    // Close mobile nav when clicking on nav links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMobileNav();
        }
      });
    });
    
    // Close mobile nav on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileNav();
      }
    });
    
    // Handle resize - close mobile nav if window gets larger
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && navMenu.classList.contains('active')) {
        toggleMobileNav();
      }
    });
  }

  // Project Animations and Interactions
  initProjectAnimations() {
    // Animate project features on hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', this.handleProjectHover.bind(this));
      card.addEventListener('mouseleave', this.handleProjectLeave.bind(this));
    });

    // Animate feature tags
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.style.animation = 'fadeInUp 0.6s ease-out forwards';
      }, index * 50);
    });

    // Project links interaction
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
      link.addEventListener('click', this.handleProjectLinkClick.bind(this));
    });

    // Projects summary stats animation
    this.animateProjectStats();
  }

  handleProjectHover(e) {
    const card = e.currentTarget;
    const features = card.querySelectorAll('.feature');
    
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.style.transform = 'translateY(-2px)';
        feature.style.boxShadow = '0 4px 8px rgba(88, 166, 255, 0.3)';
      }, index * 50);
    });
  }

  handleProjectLeave(e) {
    const card = e.currentTarget;
    const features = card.querySelectorAll('.feature');
    
    features.forEach(feature => {
      feature.style.transform = 'translateY(0)';
      feature.style.boxShadow = 'none';
    });
  }

  handleProjectLinkClick(e) {
    // Add click animation
    const link = e.currentTarget;
    link.style.transform = 'scale(0.95)';
    setTimeout(() => {
      link.style.transform = 'scale(1)';
    }, 150);
  }

  animateProjectStats() {
    const summaryStats = document.querySelectorAll('.projects-summary .stat-number');
    
    const animateProjectNumber = (element, target) => {
      const text = element.textContent;
      const isK = text.includes('K');
      const numericTarget = parseInt(text.replace(/[^0-9]/g, ''));
      const increment = numericTarget / 30;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericTarget) {
          current = numericTarget;
          clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (isK) {
          displayValue = displayValue + 'K+';
        } else if (text.includes('+')) {
          displayValue = displayValue + '+';
        }
        element.textContent = displayValue;
      }, 50);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const number = entry.target;
          animateProjectNumber(number, 0);
          observer.unobserve(number);
        }
      });
    });

    summaryStats.forEach(number => observer.observe(number));
  }
}

// Easter Eggs
class EasterEggs {
  constructor() {
    this.initKonamiCode();
    this.initSecretCommands();
  }

  initKonamiCode() {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    let userInput = [];

    document.addEventListener('keydown', (e) => {
      userInput.push(e.code);
      if (userInput.length > konamiCode.length) {
        userInput.shift();
      }
      
      if (userInput.join(',') === konamiCode.join(',')) {
        this.activateHackerMode();
        userInput = [];
      }
    });
  }

  initSecretCommands() {
    let commandBuffer = '';
    
    document.addEventListener('keypress', (e) => {
      commandBuffer += e.key;
      
      if (commandBuffer.includes('hack')) {
        this.showHackerTerminal();
        commandBuffer = '';
      } else if (commandBuffer.includes('matrix')) {
        this.startMatrixEffect();
        commandBuffer = '';
      }
      
      if (commandBuffer.length > 10) {
        commandBuffer = commandBuffer.slice(-10);
      }
    });
  }

  activateHackerMode() {
    document.body.style.filter = 'hue-rotate(120deg) contrast(1.2)';
    this.showNotification('🔐 Hacker Mode Activated!', 'success');
    
    setTimeout(() => {
      document.body.style.filter = '';
    }, 5000);
  }

  showHackerTerminal() {
    const terminal = document.createElement('div');
    terminal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #000;
      color: #00ff00;
      padding: 20px;
      border-radius: 8px;
      font-family: 'Fira Code', monospace;
      z-index: 9999;
      min-width: 300px;
      box-shadow: 0 0 50px rgba(0, 255, 0, 0.3);
    `;
    
    terminal.innerHTML = `
      <div>root@zehra-sec:~$ whoami</div>
      <div>yashab_alam</div>
      <div>root@zehra-sec:~$ access granted</div>
      <div style="color: #ff6b6b;">Welcome to the matrix, Neo...</div>
    `;
    
    document.body.appendChild(terminal);
    
    setTimeout(() => {
      document.body.removeChild(terminal);
    }, 3000);
  }

  startMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9998;
      pointer-events: none;
    `;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const columns = canvas.width / 20;
    const drops = Array(Math.floor(columns)).fill(1);
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff00';
      ctx.font = '20px Fira Code';
      
      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 20, y * 20);
        
        if (y * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };
    
    document.body.appendChild(canvas);
    const interval = setInterval(draw, 33);
    
    setTimeout(() => {
      clearInterval(interval);
      document.body.removeChild(canvas);
    }, 5000);
  }

  showNotification(message, type) {
    // Reuse the notification system from PortfolioManager
    const event = new CustomEvent('showNotification', {
      detail: { message, type }
    });
    document.dispatchEvent(event);
  }
}

// Initialize everything - handle both cases where DOM is already loaded or still loading
function initializePortfolio() {
  try {
    const portfolio = new PortfolioManager();
    const easterEggs = new EasterEggs();
    
    // Listen for custom events
    document.addEventListener('showNotification', (e) => {
      portfolio.showNotification(e.detail.message, e.detail.type);
    });
    
    console.log('Portfolio initialized successfully');
  } catch (error) {
    console.error('Portfolio initialization failed:', error);
    // Still hide loading screen even if there's an error
    setTimeout(() => {
      const loadingScreen = document.getElementById('loadingScreen');
      if (loadingScreen) {
        loadingScreen.style.display = 'none';
      }
    }, 1000);
  }
}

// Service Worker Registration (if available)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('SW registered:', registration);
      // Force update if there's a waiting service worker
      if (registration.waiting) {
        registration.waiting.postMessage({type: 'SKIP_WAITING'});
      }
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available, refresh the page
            window.location.reload();
          }
        });
      });
    })
    .catch(error => console.log('SW registration failed:', error));
}

// Emergency fallback - ensure loading screen disappears after 3 seconds no matter what
setTimeout(() => {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen && (loadingScreen.style.display !== 'none' && !loadingScreen.classList.contains('hidden'))) {
    console.warn('Loading screen took too long, forcing hide');
    loadingScreen.style.display = 'none';
  }
}, 3000);

// Mini Bot Functionality
initMiniBot();

// Mini Bot System
function initMiniBot() {
  let botIsOpen = false;
  
  const botResponses = {
    projects: {
      title: "📊 Complete Portfolio Overview",
      content: `I've built 8 comprehensive cybersecurity projects:

🌟 **LEWIS** - AI-powered Linux security automation platform (Featured)
🔒 **ZehraSec** - Full-stack cybersecurity training platform with payment integration  
🧠 **SentiAir** - Offline AI behavioral threat detection system with GUI/CLI
🛡️ **SentinelSec** - Advanced IDS with real-time monitoring and CVE intelligence
🔄 **CyberRotate Pro** - Professional IP rotation suite for cybersecurity research
🛡️ **ZehraShield** - 6-layer enterprise firewall with ML and zero trust architecture
🤖 **InstaSwarm** - Multi-account automation bot for social media research
👁️ **ZehraSight** - Enterprise AI cybersecurity suite with predictive intelligence

**Stats:** 50K+ lines of code | 25+ technologies | 8 GitHub repositories`
    },
    lewis: {
      title: "🧠 LEWIS - Flagship Project",
      content: `LEWIS (Linux Environment Working Intelligence System) is my most advanced project:

**🎯 Core Purpose:**
AI-powered Linux security automation platform combining machine learning with practical cybersecurity applications.

**🔥 Key Features:**
• AI-driven system auditing and vulnerability assessment
• Real-time threat detection with behavioral analysis  
• Educational tools for ethical hacking training
• Comprehensive analytics dashboard with detailed reporting
• Automated security assessments and remediation suggestions

**📚 Research Impact:**
• 50+ page comprehensive research paper published
• Covers cutting-edge AI integration in cybersecurity
• Detailed methodology and implementation analysis

**💡 Innovation:**
Revolutionary approach to Linux security automation, bridging the gap between AI/ML capabilities and real-world cybersecurity needs.`
    },
    skills: {
      title: "🛠️ Technical Expertise",
      content: `My technical skills span multiple cybersecurity domains:

**🔒 Core Security:**
• Ethical Hacking & Advanced Penetration Testing
• VAPT (Vulnerability Assessment & Penetration Testing)
• IDS/IPS Systems Design & Management
• Enterprise Firewall Architecture & Zero Trust
• Threat Intelligence Analysis & CVE Research

**🤖 AI & Development:**
• Python, Machine Learning, Deep Learning
• Full-Stack Development (Node.js, React, MongoDB)
• Linux System Administration & Automation
• Network Security (Scapy, packet analysis, protocol analysis)
• Enterprise Security Architecture

**📊 Tools & Frameworks:**
• Security: Metasploit, Nmap, Wireshark, Burp Suite
• AI/ML: TensorFlow, scikit-learn, pandas, numpy
• Development: Git, Docker, REST APIs, microservices
• Databases: MongoDB, MySQL, Redis

**💼 Business & Leadership:**
• Startup Leadership (Founder & CEO of Zehra Sec)
• Cybersecurity Training & Education Programs
• Business Development & Strategic Partnerships`
    },
    experience: {
      title: "💼 Professional Journey",
      content: `My career combines technical expertise with entrepreneurial leadership:

**🚀 Founder & CEO - Zehra Sec (Current)**
• Leading AI-integrated cybersecurity startup
• Developing innovative security solutions and products
• Building comprehensive training programs for cybersecurity professionals
• Managing product development and business strategy

**🎓 Cybersecurity Trainer & Ethical Hacker**
• Specialized VAPT services for enterprise clients
• Advanced penetration testing and security assessments
• Cybersecurity education and professional training
• Security consultation and architecture review

**📈 Business Development Manager**
• Strategic partnerships and business growth initiatives
• Startup ecosystem experience and mentorship
• Technology commercialization and market strategy

**🎓 Educational Background:**
• MBA in Business Administration (HBTU, Kanpur) - Strategic business development focus
• BCA in Computer Applications - Programming and system fundamentals
• Continuous learning in cybersecurity certifications and AI/ML`
    },
    zehra: {
      title: "🏢 About Zehra Sec",
      content: `Zehra Sec is my AI-integrated cybersecurity startup focused on innovation:

**🎯 Mission:**
Revolutionizing cybersecurity through AI integration, providing cutting-edge security solutions and comprehensive training programs.

**🛡️ Core Services:**
• Advanced VAPT (Vulnerability Assessment & Penetration Testing)
• AI-powered security tool development (LEWIS, ZehraSight, etc.)
• Professional cybersecurity training and certification programs
• Enterprise security consultation and architecture design
• Custom security solution development

**💡 Innovation Focus:**
• AI/ML integration in traditional security practices
• Automated threat detection and response systems
• Educational tools for next-generation cybersecurity professionals
• Research and development in emerging security technologies

**🌟 Unique Value:**
Combining academic research, practical implementation, and business acumen to deliver comprehensive cybersecurity solutions that address real-world challenges.

**🔗 Website:** zehrasec.com`
    },
    contact: {
      title: "📞 Let's Connect",
      content: `Ready to discuss cybersecurity solutions or collaboration opportunities?

**📧 Direct Contact:**
• Email: yashabalam9@gmail.com
• Phone: +91 8960457971
• Location: India

**🔗 Professional Profiles:**
• GitHub: github.com/yashab-cyber (View all 8 projects)
• LinkedIn: linkedin.com/in/yashabalam
• Company Website: zehrasec.com

**💼 Available Services:**
• Cybersecurity Consulting & Strategy
• AI-powered Security Solutions Development
• VAPT Audits & Penetration Testing
• Security Training & Education Programs
• Enterprise Security Architecture Review

**🤝 Collaboration Opportunities:**
• Research partnerships in AI security
• Joint venture opportunities
• Speaking engagements and conferences
• Technical consulting projects
• Startup mentorship and advisory roles

**⚡ Response Time:** Typically within 24 hours for professional inquiries.`
    },
    research: {
      title: "🔬 Research Focus Areas",
      content: `My research spans three key cybersecurity domains:

**🤖 AI-Integrated Security**
• Machine learning algorithms for threat detection
• AI-powered vulnerability assessment automation
• Intelligent security orchestration and response
• Behavioral analysis for anomaly detection

**🐧 Linux Security Systems**
• Advanced Linux hardening methodologies
• System-level security monitoring and automation
• Container and virtualization security
• Critical infrastructure protection

**🎓 Educational Technology**
• Interactive cybersecurity training platforms
• Gamified learning approaches for ethical hacking
• AI-enhanced skill assessment tools
• Next-generation security education frameworks

**📈 Research Impact:**
• 50+ pages of comprehensive research documentation
• Novel methodologies in AI-security integration
• Practical applications tested in real-world scenarios`
    },
    publications: {
      title: "📄 Publications & Academic Work",
      content: `My published research and ongoing academic contributions:

**🌟 Featured Publication:**
**LEWIS: Linux Environment Working Intelligence System**
• 50+ page comprehensive research paper (2025)
• AI-powered cybersecurity assistant for automation and threat detection
• Covers machine learning integration in security practices
• Detailed implementation methodology and testing results

**📚 Key Research Topics:**
• AI-driven threat detection algorithms
• Linux system security automation
• Machine learning in cybersecurity applications
• Educational frameworks for ethical hacking
• Real-time monitoring and response systems
• Integration methodologies for security tools

**🔄 Upcoming Publications:**
• AI Integration in Ethical Hacking (Blog Series)
• Advanced AI Security Frameworks (Conference Paper - 35% complete)
• Next-generation approaches to cybersecurity automation

**📥 Access:** Download the LEWIS research paper directly from this site`
    },
    methodology: {
      title: "⚙️ Research Methodology",
      content: `My systematic approach to cybersecurity research:

**📋 6-Step Research Process:**

**1. Problem Identification**
• Gap analysis in current cybersecurity practices
• Emerging threat landscape assessment
• Industry pain point analysis

**2. Literature Review**
• Comprehensive academic source analysis
• State-of-the-art solution evaluation
• Methodology comparison and benchmarking

**3. System Design**
• AI-security integration architecture
• Innovative solution design principles
• Scalability and security considerations

**4. Implementation**
• Proof-of-concept development
• Modern technology stack utilization
• Iterative development and testing

**5. Testing & Validation**
• Controlled environment testing
• Real-world scenario validation
• Performance benchmarking and optimization

**6. Documentation**
• Comprehensive findings documentation
• Methodology and process recording
• Future research recommendations

**🎯 Focus:** Bridging theoretical research with practical cybersecurity applications`
    }
  };

  // Make functions globally available
  window.toggleBot = function() {
    const botChat = document.getElementById('botChat');
    const botToggle = document.querySelector('.bot-toggle');
    
    if (!botChat || !botToggle) return;
    
    botIsOpen = !botIsOpen;
    
    if (botIsOpen) {
      botChat.style.display = 'flex';
      botToggle.innerHTML = '✖️';
      botToggle.style.background = 'linear-gradient(135deg, #ff6b6b, #ff5252)';
    } else {
      botChat.style.display = 'none';
      botToggle.innerHTML = '🤖';
      botToggle.style.background = 'var(--gradient-primary)';
    }
  };

  window.askBot = function(topic) {
    if (!botResponses[topic]) return;
    
    // Show typing indicator
    showTyping();
    
    // Simulate AI thinking time
    setTimeout(() => {
      removeTyping();
      
      const response = botResponses[topic];
      addBotMessage(`<strong>${response.title}</strong><br><br>${response.content}`);
      
      // Add follow-up suggestion
      setTimeout(() => {
        addBotMessage(`<br>💡 <em>Want to explore more? Try asking about other topics or scroll through the portfolio sections!</em>`);
      }, 1000);
      
    }, Math.random() * 800 + 600); // Random delay for realistic feel
  };

  function showTyping() {
    const messages = document.getElementById('botMessages');
    if (!messages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
      <span>Zehra AI is analyzing</span>
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  function addBotMessage(content) {
    const messages = document.getElementById('botMessages');
    if (!messages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message';
    messageDiv.innerHTML = content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  // Initialize bot with welcome notification
  setTimeout(() => {
    const botToggle = document.querySelector('.bot-toggle');
    if (!botToggle) return;
    
    // Determine page-specific welcome message
    let welcomeMessage = '👋 Ask me about Yashab\'s projects & skills!';
    if (window.location.pathname.includes('research.html')) {
      welcomeMessage = '🔬 Ask me about research, publications & LEWIS!';
    } else if (window.location.pathname.includes('donate.html')) {
      welcomeMessage = '💰 Ask me about donations & project funding!';
    }
    
    // Add welcome notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      bottom: 90px;
      right: 20px;
      background: var(--gradient-primary);
      color: white;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 12px;
      z-index: 999;
      animation: slideInRight 0.5s ease;
      box-shadow: 0 4px 15px rgba(88, 166, 255, 0.3);
    `;
    notification.textContent = welcomeMessage;
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
      notification.style.animation = 'slideInRight 0.5s ease reverse';
      setTimeout(() => notification.remove(), 500);
    }, 4000);
  }, 3000); // Show after page loads

  console.log('🤖 Mini Bot initialized successfully!');
}

// Initialize based on document state
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
  initializePortfolio();
}

// Add CSS for keyboard navigation
const keyboardNavCSS = `
  .keyboard-navigation *:focus {
    outline: 2px solid var(--accent-primary) !important;
    outline-offset: 2px !important;
  }
`;

const style = document.createElement('style');
style.textContent = keyboardNavCSS;
document.head.appendChild(style);
