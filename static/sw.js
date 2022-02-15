// THIS FILE SHOULD NOT BE VERSION CONTROLLED

// https://github.com/NekR/self-destroying-sw

// remove e from the callback function
self.addEventListener('install', function () {
  self.skipWaiting()
})

// remove e from the callback function
self.addEventListener('activate', function () {
  self.registration.unregister()
    .then(function () {
      return self.clients.matchAll()
    })
    .then(function (clients) {
      clients.forEach(client => client.navigate(client.url))
    })
})
