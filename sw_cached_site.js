const currentCache = 'v3';

// Call Install Event (2/7)
self.addEventListener('install', (event) => {
  console.log('Service Worker Installed');
});

// Call Activate Event (4-5/7)
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  // Remove old caches
  event.waitUntil(
    // loop through the caches, delete if not current cache
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== currentCache){
            console.log('Service Worker: clearing old Cache');
            caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event (service worker intercepts request from browser)
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // clone the response from the server
        const responseClone = res.clone();
        // Open cache
        caches
          .open(currentCache)
          .then(cache => {
              // Add response clone to cache
              cache.put(e.request, responseClone);
          });
        return res;
      // if the connection drops
      }).catch(err => caches.match(e.request)
        .then(res => res))
  );
});