importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// ====== PEGA LA MISMA CONFIG DE FIREBASE ======
firebase.initializeApp({
  apiKey: "AIzaSyCofh_DKfPTm4drmjtVu0-qbU5W5yRCchE",
  authDomain: "escuela-notificaciones-ce01b.firebaseapp.com",
  projectId: "escuela-notificaciones-ce01b",
  messagingSenderId: "6514299276",
  appId: "1:6514299276:web:751e2dff8da75716c646a9"
});

var messaging = firebase.messaging();

// Notificacion en segundo plano (cuando la app esta cerrada)
messaging.onBackgroundMessage(function(payload) {
  var title = payload.notification ? payload.notification.title : 'Nueva publicacion';
  var options = {
    body: payload.notification ? payload.notification.body : '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      url: payload.data && payload.data.url ? payload.data.url : '/'
    }
  };

  self.registration.showNotification(title, options);
});

// Al hacer clic en la notificacion, abrir el sitio
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = event.notification.data && event.notification.data.url ? event.notification.data.url : '/';
  event.waitUntil(clients.openWindow(url));
});