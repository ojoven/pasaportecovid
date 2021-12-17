const CACHE_VERSION = 1;
var CACHENAME = "cachestore_" + CACHE_VERSION;
var FILES = [
	"/index.html",
	"/favicon-32x32.png",
	"/favicon-16x16.png",
	"/favicon-96x96.png",
	"/android-icon-192x192.png",
	"/css/style.css",
	"/js/app.min.js",
	"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js",
	"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.js",
	"https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;600;700&display=swap"
];

self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open(CACHENAME).then(function (cache) {
			return cache.addAll(FILES);
		})
	);
});

self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request).then((r) => {
			console.log('[Servicio Worker] Obteniendo recurso: ' + e.request.url);
			return r || fetch(e.request).then((response) => {
				return caches.open(CACHENAME).then((cache) => {
					console.log('[Servicio Worker] Almacena el nuevo recurso: ' + e.request.url);
					cache.put(e.request, response.clone());
					return response;
				});
			});
		})
	);
});