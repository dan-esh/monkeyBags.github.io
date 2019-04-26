const currentCache = 'v1';

const cacheAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  '/js/main.js'
];

// Call Install Event (2/7)
self.addEventListener('install', (event) => {
  console.log('Service Worker Installed');
  event.waitUntil(// browser will wait until sw installed
    caches
      .open(currentCache)
      .then(cache => {
        console.log('Service Worker: caching files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
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
  e.respondWith(fetch(e.request)// forwards the request
    // if the request fails to return a response, it loads resources from cache
    .catch(() => caches.match(e.request)));
});