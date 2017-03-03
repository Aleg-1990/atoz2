self.addEventListener('install', function(event) {
    const CACHE_VERSION = 7;
    event.waitUntil(
        caches.open('static-'+CACHE_VERSION).then(function(cache) {
            // for (i = 0; i < CACHE_VERSION; i++) {
            //     caches.delete('static-v'+i);
            // }
            caches.delete('static-'+CACHE_PREV_VERSION);
            return cache.addAll([
                '/atoz2',
                '/atoz2/static/js/main.js',
                '//cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.debug.js'
            ]).then(() => {
                for (i = 0; i < CACHE_VERSION; i++) {
                    caches.delete('static-v'+i);
                }
            });
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