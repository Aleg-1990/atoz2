self.addEventListener('install', function(event) {
    const CACHE_VERSION = 8;
    event.waitUntil(
        caches.open('static-v'+CACHE_VERSION).then(function(cache) {
            for (i = 1; i < CACHE_VERSION; i++) {
                caches.delete('static-v'+i);
            }
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