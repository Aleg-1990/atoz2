self.addEventListener('install', function(event) {
    const CACHE_PREV_VERSION = 'v5';
    const CACHE_VERSION = 'v6';
    event.waitUntil(
        caches.open('static-'+CACHE_VERSION).then(function(cache) {
            caches.delete('static-v3');
            caches.delete('static-v4');
            caches.delete('static-'+CACHE_PREV_VERSION);
            return cache.addAll([
                '/atoz2',
                '/atoz2/static/js/main.js',
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