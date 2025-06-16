// Research Page JavaScript

class ResearchManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupMobileNavigation();
    this.initializeAnimations();
    this.setupScrollAnimations();
    this.startNodeAnimations();
  }

  setupEventListeners() {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.smoothScroll(e));
    });

    // Window events
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 100));
    
    // Download tracking
    this.setupDownloadTracking();
  }

  // Mobile Navigation
  setupMobileNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileNavOverlay) {
      // Open mobile menu
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.add('active');
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });

      // Close mobile menu
      const closeMobileMenu = () => {
        mobileMenuBtn.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
      };

      if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileMenu);
      }

      // Close on overlay click
      mobileNavOverlay.addEventListener('click', (e) => {
        if (e.target === mobileNavOverlay) {
          closeMobileMenu();
        }
      });

      // Close on link click
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          closeMobileMenu();
        });
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
          closeMobileMenu();
        }
      });
    }
  }

  // Smooth Scrolling
  smoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update active navigation
        this.updateActiveNavigation(targetId);
      }
    }
  }

  // Update Active Navigation
  updateActiveNavigation(activeId) {
    // Update desktop navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      }
    });

    // Update mobile navigation
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      }
    });
  }

  // Scroll Animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Special handling for publication cards
          if (entry.target.classList.contains('publication-card')) {
            this.animatePublicationCard(entry.target);
          }
          
          // Special handling for research area cards
          if (entry.target.classList.contains('research-area-card')) {
            this.animateResearchAreaCard(entry.target);
          }
          
          // Special handling for methodology steps
          if (entry.target.classList.contains('flow-step')) {
            this.animateMethodologyStep(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.publication-card, .research-area-card, .flow-step, .stat-item').forEach(el => {
      observer.observe(el);
    });
  }

  // Initialize Animations
  initializeAnimations() {
    // Animate hero stats on load
    this.animateHeroStats();
    
    // Add loading animation class
    document.body.classList.add('loaded');
  }

  // Animate Hero Stats
  animateHeroStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || stat.textContent.replace(/\D/g, ''));
      const originalText = stat.textContent;
      let current = 0;
      const increment = target / 30; // 30 frames
      const duration = 2000; // 2 seconds
      const interval = duration / 30;
      
      const updateCount = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.ceil(current) + (originalText.includes('+') ? '+' : '');
          setTimeout(updateCount, interval);
        } else {
          stat.textContent = originalText;
        }
      };
      
      // Start animation after a delay
      setTimeout(updateCount, 500);
    });
  }

  // Animate Publication Card
  animatePublicationCard(card) {
    const progressBar = card.querySelector('.progress-fill');
    if (progressBar) {
      const targetWidth = progressBar.style.width;
      progressBar.style.width = '0%';
      
      setTimeout(() => {
        progressBar.style.width = targetWidth;
      }, 300);
    }
  }

  // Animate Research Area Card
  animateResearchAreaCard(card) {
    const icon = card.querySelector('.area-icon');
    if (icon) {
      icon.style.transform = 'scale(0.8)';
      setTimeout(() => {
        icon.style.transform = 'scale(1)';
      }, 200);
    }
  }

  // Animate Methodology Step
  animateMethodologyStep(step) {
    const stepNumber = step.querySelector('.step-number');
    if (stepNumber) {
      stepNumber.style.transform = 'rotate(-180deg) scale(0.5)';
      setTimeout(() => {
        stepNumber.style.transform = 'rotate(0deg) scale(1)';
      }, 300);
    }
  }

  // Start Node Animations
  startNodeAnimations() {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach((node, index) => {
      // Add floating animation with different delays
      node.style.animationDelay = `${index * 0.5}s`;
      
      // Add pulse effect on hover
      node.addEventListener('mouseenter', () => {
        node.style.transform = 'scale(1.05)';
      });
      
      node.addEventListener('mouseleave', () => {
        node.style.transform = 'scale(1)';
      });
    });

    // Animate connection lines
    const lines = document.querySelectorAll('.line');
    lines.forEach((line, index) => {
      line.style.animationDelay = `${index * 0.3}s`;
    });
  }

  // Download Tracking
  setupDownloadTracking() {
    const downloadLinks = document.querySelectorAll('a[href$=".pdf"]');
    
    downloadLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const fileName = link.getAttribute('href').split('/').pop();
        console.log(`📥 Download initiated: ${fileName}`);
        
        // Add download feedback
        const originalText = link.innerHTML;
        link.innerHTML = '<span class="download-icon">✅</span> Downloaded!';
        
        setTimeout(() => {
          link.innerHTML = originalText;
        }, 2000);
        
        // Track download (you can integrate with analytics here)
        this.trackDownload(fileName);
      });
    });
  }

  // Track Download
  trackDownload(fileName) {
    // Placeholder for analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'download', {
        'event_category': 'Research',
        'event_label': fileName,
        'value': 1
      });
    }
  }

  // Handle Scroll
  handleScroll() {
    const scrollTop = window.pageYOffset;
    
    // Update navigation based on scroll position
    this.updateNavigationOnScroll(scrollTop);
    
    // Parallax effect for research visualization
    this.updateParallaxEffect(scrollTop);
  }

  // Update Navigation on Scroll
  updateNavigationOnScroll(scrollTop) {
    const sections = ['research', 'publications', 'methodology'];
    const navHeight = 80;
    
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop - navHeight;
        const sectionHeight = section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          this.updateActiveNavigation(sectionId);
        }
      }
    });
  }

  // Update Parallax Effect
  updateParallaxEffect(scrollTop) {
    const visualization = document.querySelector('.research-visualization');
    if (visualization) {
      const speed = 0.5;
      const yPos = -(scrollTop * speed);
      visualization.style.transform = `translateY(${yPos}px)`;
    }
  }

  // Handle Resize
  handleResize() {
    // Update any size-dependent calculations
    this.updateResponsiveElements();
  }

  // Update Responsive Elements
  updateResponsiveElements() {
    const visualization = document.querySelector('.research-visualization');
    if (visualization && window.innerWidth <= 768) {
      visualization.style.transform = 'none'; // Disable parallax on mobile
    }
  }

  // Utility Functions
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ResearchManager();
});

// Add loading screen removal
window.addEventListener('load', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  // Allow keyboard navigation through sections
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    const sections = ['research', 'publications', 'methodology'];
    const current = sections.find(id => 
      document.getElementById(id).getBoundingClientRect().top <= 100
    );
    
    if (current) {
      const currentIndex = sections.indexOf(current);
      let nextIndex;
      
      if (e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % sections.length;
      } else {
        nextIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
      }
      
      if (e.ctrlKey) { // Only if Ctrl is held
        e.preventDefault();
        document.getElementById(sections[nextIndex]).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ResearchManager;
}
