const CACHE_NAME = 'mercado-barter';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json', // Certifique-se de incluir o manifest.json aqui
  // Listar todos os arquivos estáticos que você deseja que sejam armazenados em cache
];

self.addEventListener('install', (event) => {
  // Realiza a instalação do service worker
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - retorna a resposta do cache
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['mercado-barter'];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Remove caches que não estão na whitelist
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});