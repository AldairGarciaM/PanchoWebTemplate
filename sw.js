'use strict';

const CACHE_NAME='CACHE-1';
const CACHE_DYNAMIC_NAME='DYMAMIC-V1';
const CACHE_INMUTABLE_NAME='INMUTANLE-V1';
const CACHE_ITEMS=50;

const OFFLINE_NAME='OFFLINE';
const OFFLINE_URL='internet.html'

// CODELAB: Update cache names any time any of the cached files change.


// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/index.html',
  '/assets/images/cientifico1.png',
  '/assets/images/ALIENkING.png',
  '/assets/images/DOG1 - copia.png',
  '/assets/images/JASON1.png',
  
];

self.addEventListener('install',(event)=>{
    event.waitUntil((async()=>{
        const cache = await caches.open(OFFLINE_NAME);
        await cache.add(new Request(OFFLINE_URL),{cache: 'reload'});
    }))
})

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
   const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
    .then(cache=>{
        return cache.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js'
        ])
        return newRespsaa
    })

    event.waitUntil(Promise.all([cachestatic, cacheInmutable]))
  self.skipWaiting();
});

const respuesta = fetch(e.request)
.then(cache=>{
    caches.open(CACHE_DYNAMIC_NAME,CACHE_ITEMS)

});
    return respuesta.clone();

self.addEventListener ('fetch',e);
    const respuesta2 = new Promise((resolve, reject)=>{

        const primerFalla = () =>{

        }
    })
    
    e.respondWith(respuesta2)

self.addEventListener('fetch',e=>{
    const resCacheNet=caches.match(e.request)
    .then(res =>{
        if(res) return res;
        return fetch(e.request)
        .then(newResp=>{
            caches.open(CACHE_DYNAMIC_NAME)
            .then(cache=>{
                cache.put(e.request, newResp)
                limpiarcache(CACHE_DYNAMIC_NAME,CACHE_ITEMS)
            });
            return newResp.clone();
        }).catch(err=>{
            if(e.request.headers.get('acept').includes('text/html')){
                return caches.match('/internet.html');
            }
        });
    });

    e.respondWith(resCacheNet);
})    

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  // CODELAB: Add fetch event handler here.
  // if (evt.request.mode !== 'navigate') {
  //   // Not a page navigation, bail.
  //   console.log("Fetch no navigate");
  //   return;
  // }
  console.log('[ServiceWorker] Fetch', evt.request.url);
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              console.log("RESP", response);
              return response || fetch(evt.request);
            });
      })
  );
});