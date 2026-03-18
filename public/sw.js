// Service worker placeholder — no caching strategy implemented
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
