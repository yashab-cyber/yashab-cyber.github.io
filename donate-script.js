// Donation Page JavaScript

class DonationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeAnimations();
    this.setupScrollAnimations();
    this.initChart();
    this.startTypingAnimation();
  }

  setupEventListeners() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => this.switchTab(btn));
    });

    // Mobile navigation
    this.setupMobileNavigation();

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.smoothScroll(e));
    });

    // Window events
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 100));
  }

  // Tab Management
  switchTab(clickedTab) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const targetTab = clickedTab.dataset.tab;

    // Remove active class from all tabs and contents
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked tab and corresponding content
    clickedTab.classList.add('active');
    const targetContent = document.getElementById(targetTab);
    if (targetContent) {
      targetContent.classList.add('active');
    }
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

  // Scroll Handling
  handleScroll() {
    this.updateNavigation();
    this.handleScrollAnimations();
  }

  updateNavigation() {
    const nav = document.querySelector('.top-nav');
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(10, 15, 26, 0.98)';
    } else {
      nav.style.background = 'rgba(10, 15, 26, 0.95)';
    }
  }

  // Animations
  initializeAnimations() {
    this.animateStats();
    this.animateProgressBars();
  }

  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const animateNumber = (element, target) => {
      const increment = target / 30;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        if (element.dataset.target === '0') {
          element.textContent = '$' + Math.floor(current);
        } else {
          element.textContent = Math.floor(current);
        }
      }, 50);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const number = entry.target;
          const target = parseInt(number.dataset.target);
          if (!isNaN(target)) {
            animateNumber(number, target);
          }
          observer.unobserve(number);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => observer.observe(number));
  }

  animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressFill = entry.target;
          const targetWidth = progressFill.dataset.target || 0;
          setTimeout(() => {
            progressFill.style.width = targetWidth + '%';
          }, 500);
          observer.unobserve(progressFill);
        }
      });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => observer.observe(bar));
  }

  setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.crypto-card, .tier-card, .goal-card, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.6s ease';
      observer.observe(element);
    });
  }

  // Terminal Typing Animation
  startTypingAnimation() {
    const command = document.querySelector('.typing-animation');
    if (!command) return;

    const text = 'support --donate';
    let index = 0;
    
    command.textContent = '';
    
    const typeWriter = () => {
      if (index < text.length) {
        command.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 1000);
  }

  // Chart Creation
  initChart() {
    const canvas = document.getElementById('allocationChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;

    const data = [
      { label: 'Development', value: 40, color: '#58a6ff' },
      { label: 'Infrastructure', value: 25, color: '#00ffd5' },
      { label: 'Education', value: 15, color: '#ffa657' },
      { label: 'Community', value: 10, color: '#ff6b6b' },
      { label: 'Research', value: 10, color: '#51cf66' }
    ];

    let currentAngle = -Math.PI / 2;
    
    data.forEach(segment => {
      const sliceAngle = (segment.value / 100) * 2 * Math.PI;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = '#1a1f2e';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      currentAngle += sliceAngle;
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1f2e';
    ctx.fill();
  }

  // Resize Handler
  handleResize() {
    this.initChart();
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

  // Toast Notification
  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const messageEl = toast.querySelector('.toast-message');
    const iconEl = toast.querySelector('.toast-icon');
    
    messageEl.textContent = message;
    
    // Set icon based on type
    switch (type) {
      case 'success':
        iconEl.textContent = '✅';
        toast.style.background = '#51cf66';
        break;
      case 'error':
        iconEl.textContent = '❌';
        toast.style.background = '#ff6b6b';
        break;
      case 'warning':
        iconEl.textContent = '⚠️';
        toast.style.background = '#ffd43b';
        break;
      default:
        iconEl.textContent = 'ℹ️';
        toast.style.background = '#58a6ff';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
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
}

// Global Functions for HTML onclick handlers
function copyAddress(button) {
  const address = button.dataset.address;
  
  navigator.clipboard.writeText(address).then(() => {
    button.innerHTML = '<span class="copy-icon">✅</span> Copied!';
    donationManager.showToast('Address copied to clipboard!', 'success');
    
    setTimeout(() => {
      button.innerHTML = '<span class="copy-icon">📋</span> Copy';
    }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = address;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    donationManager.showToast('Address copied to clipboard!', 'success');
  });
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    donationManager.showToast('Text copied to clipboard!', 'success');
  }).catch(() => {
    // Fallback
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    donationManager.showToast('Text copied to clipboard!', 'success');
  });
}

function openEmail(subject) {
  const email = 'yashabalam707@gmail.com';
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  window.open(mailtoLink);
}

function selectTier(tierName, suggestedAmount) {
  const message = `Selected ${tierName.charAt(0).toUpperCase() + tierName.slice(1)} tier ($${suggestedAmount} suggested)`;
  donationManager.showToast(message, 'info');
  
  // Scroll to donation methods
  const donateSection = document.getElementById('donate');
  if (donateSection) {
    donateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Optional: Pre-fill amount in donation forms
  console.log(`User selected ${tierName} tier with suggested amount: $${suggestedAmount}`);
}

// Enhanced Cryptocurrency Price Tracker (Optional Feature)
class CryptoPriceTracker {
  constructor() {
    this.prices = {};
    this.updateInterval = null;
  }

  async fetchPrices() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana,bitcoin,ethereum,litecoin,dogecoin&vs_currencies=usd');
      const data = await response.json();
      
      this.prices = {
        sol: data.solana?.usd || 0,
        btc: data.bitcoin?.usd || 0,
        eth: data.ethereum?.usd || 0,
        ltc: data.litecoin?.usd || 0,
        doge: data.dogecoin?.usd || 0
      };
      
      this.updatePriceDisplays();
    } catch (error) {
      console.log('Price fetch failed:', error);
    }
  }

  updatePriceDisplays() {
    // Add price displays to crypto cards if needed
    const cryptoCards = document.querySelectorAll('.crypto-card');
    cryptoCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      let price = 0;
      
      if (title.includes('solana')) price = this.prices.sol;
      else if (title.includes('bitcoin')) price = this.prices.btc;
      else if (title.includes('ethereum')) price = this.prices.eth;
      else if (title.includes('litecoin')) price = this.prices.ltc;
      
      if (price > 0) {
        let priceDisplay = card.querySelector('.crypto-price');
        if (!priceDisplay) {
          priceDisplay = document.createElement('div');
          priceDisplay.className = 'crypto-price';
          priceDisplay.style.cssText = 'font-size: 0.9rem; color: var(--accent-success); margin-top: 0.5rem;';
          card.querySelector('.crypto-info').appendChild(priceDisplay);
        }
        priceDisplay.textContent = `$${price.toLocaleString()}`;
      }
    });
  }

  startTracking() {
    this.fetchPrices();
    this.updateInterval = setInterval(() => {
      this.fetchPrices();
    }, 60000); // Update every minute
  }

  stopTracking() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
}

// Donation Analytics (Optional Feature)
class DonationAnalytics {
  constructor() {
    this.events = [];
  }

  trackEvent(eventName, data = {}) {
    const event = {
      name: eventName,
      timestamp: new Date().toISOString(),
      data: data,
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    this.events.push(event);
    console.log('Analytics Event:', event);
    
    // Send to analytics service (implement as needed)
    this.sendToAnalytics(event);
  }

  sendToAnalytics(event) {
    // Implement your analytics service integration here
    // Example: Google Analytics, Mixpanel, etc.
  }

  trackPageView() {
    this.trackEvent('page_view', {
      page: 'donation',
      referrer: document.referrer
    });
  }

  trackDonationIntent(method, tier) {
    this.trackEvent('donation_intent', {
      method: method,
      tier: tier
    });
  }

  trackAddressCopy(currency) {
    this.trackEvent('address_copy', {
      currency: currency
    });
  }
}

// Initialize everything when DOM is ready
let donationManager;
let cryptoTracker;
let analytics;

document.addEventListener('DOMContentLoaded', () => {
  donationManager = new DonationManager();
  cryptoTracker = new CryptoPriceTracker();
  analytics = new DonationAnalytics();
  
  // Start optional features
  cryptoTracker.startTracking();
  analytics.trackPageView();
  
  console.log('Donation page initialized successfully');
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (cryptoTracker) {
    cryptoTracker.stopTracking();
  }
});

// Error Handling
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
  if (analytics) {
    analytics.trackEvent('javascript_error', {
      message: e.message,
      filename: e.filename,
      lineno: e.lineno
    });
  }
});

// Enhanced Copy Function with Analytics
window.copyAddressWithAnalytics = function(button, currency) {
  copyAddress(button);
  if (analytics) {
    analytics.trackAddressCopy(currency);
  }
};

// Enhanced Tier Selection with Analytics
window.selectTierWithAnalytics = function(tierName, suggestedAmount) {
  selectTier(tierName, suggestedAmount);
  if (analytics) {
    analytics.trackDonationIntent('tier_selection', tierName);
  }
};
