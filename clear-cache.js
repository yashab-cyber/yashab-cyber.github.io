// Cache Buster Script - Run this in browser console to clear all caches
console.log('🧹 Clearing all caches...');

// Clear browser cache
if ('caches' in window) {
  caches.keys().then(names => {
    names.forEach(name => {
      console.log('Deleting cache:', name);
      caches.delete(name);
    });
  });
}

// Unregister service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      console.log('Unregistering service worker:', registration);
      registration.unregister();
    });
  });
}

// Clear localStorage and sessionStorage
localStorage.clear();
sessionStorage.clear();

// Force reload
console.log('✅ Cache cleared! Reloading page...');
setTimeout(() => {
  window.location.reload(true);
}, 1000);
