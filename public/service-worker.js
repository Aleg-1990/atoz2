self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('static-v2').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.js',
                '/static/js/bundle.js',
                '//cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.debug.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});