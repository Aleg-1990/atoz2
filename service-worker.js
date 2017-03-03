self.addEventListener('install', function(event) {
    const CACHE_VERSION = 'v5';
    event.waitUntil(
        caches.open('static-'+CACHE_VERSION).then(function(cache) {
            return cache.addAll([
                '/atoz2',
                '/atoz2/static/js/main.js?'+CACHE_VERSION,
                '//cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.debug.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});