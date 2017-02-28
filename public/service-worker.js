self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('static-v3').then(function(cache) {
            return cache.addAll([
                '/',
                '/static/js/main.js',
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