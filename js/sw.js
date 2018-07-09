importScripts('https://www.gstatic.com/firebasejs/4.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.9.1/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyD1KiLXHweGyxO0z5154e07nivRTWoZba8",
    authDomain: "push-test-ce1fe.firebaseapp.com",
    databaseURL: "https://push-test-ce1fe.firebaseio.com",
    projectId: "push-test-ce1fe",
    storageBucket: "push-test-ce1fe.appspot.com",
    messagingSenderId: "385788056475"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[js/sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
        body: 'Background Message body.'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
  
console.log('Started', self);
self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log('Installed...', event);
});
self.addEventListener('activate', function(event) {
    console.log('Activated', event);
});
self.addEventListener('push', function(event) {
    console.log('Push message received', event);
    // TODO
});