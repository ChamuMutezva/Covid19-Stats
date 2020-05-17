const filesToCache = [
    '/',
    'styles.css',
    'images/still_life_medium.jpg',
    'index.html',
    'about.html',
    'myth.html',
    'prevention.html',
    'output.css',
    'app.webmanifest',
    'images/7.png',
    'images/24.png',
    'images/26.png',
    'images/28.png',
    'images/52.png',
    'images/COVID-19.svg',
    'images/mb---uv-light-edited.png',
    'images/mb-alcohol.jpg',
    'images/mb-breathing-exercice.jpg',
    'images/mb-cold-snow.png',
    'images/mb-hot-bath.png',
    'images/mb-mosquito-bite.png',
    'images/mb-recovery.jpg',
    'images/mb-sun-exposure.png',
    'images/mythbuster-4.png',
    'images/mythbuster1.png',
    'images/mythbuster2.png',
    'images/mythbuster3.png',
    'images/mythbuster5.png',
    'images/mythbusters-25.png',
    'images/mythbusters-27.png',
    'images/mythbusting15.png',
    'images/world.png'
    
  ];
  
  const staticCacheName = 'pages-cache-v1';
  
  self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
    );
  });

self.addEventListener('activate', event => {
    console.log('Service worker activating...');
});

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
});