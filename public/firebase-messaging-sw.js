importScripts('https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.3/firebase-messaging.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDi6t_zCvkGKeh90u0cvxVm7hml8K6xbs",
  authDomain: "allinone-1e128.firebaseapp.com",
  projectId: "allinone-1e128",
  storageBucket: "allinone-1e128.appspot.com",
  messagingSenderId: "370418206823",
  appId: "1:370418206823:web:cf75fc5b65c8a9f5d12cc2",
  measurementId: "G-HDBSJ90RVF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// //To stop listening for messages execute this returned function(unSubscribe)
messaging.onBackgroundMessage((payload) => {


  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // tag: "notification-1",
    actions: [{ action: "open_url", title: "Read Now" }],
    data: {
      url: payload.data.url
    }
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', function (event) {


  switch (event.action) {
    case 'open_url':
      event.notification.close()
      event.waitUntil(
        self.clients.openWindow(event.notification.data.url)
      )
      break;
    default:
      break;
  }
}
  , false);
