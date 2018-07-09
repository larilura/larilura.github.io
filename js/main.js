
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

if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
    navigator.serviceWorker.register('js/sw.js').then(function(reg) {
        console.log(':^)', reg);
        messaging.useServiceWorker(reg);
        messaging.requestPermission().then(function() {
            console.log('Notification permission granted.');
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // ...
            return messaging.getToken();
        }).then(function(token) {
            console.log(token);
        }).catch(function(err) {
            console.log('Unable to get permission to notify.', err);
        });
    })
    .catch(function(error) {
        console.error('Service Worker Error', error);
    });
    } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
}
