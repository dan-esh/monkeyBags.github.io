// Make sure sw are supported (navigator is the browser object)
if ('serviceWorker' in navigator) {
  //console.log('Service Worker Supported');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      //.register('../sw_cached_pages.js')// register the service worker (1/7)
      .register('../sw_cached_site.js')// register the service worker (1/7)
      .then(reg => console.log('Service Worker: Registered '))
      .catch(err => console.log(`Service Worker: Error: ${err}`));
  });
}
