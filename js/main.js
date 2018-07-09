
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

alert("Initializing");
if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
    document.querySelector('.token').innerHTML = "Service Worker and Push is supported";
    alert("Service Worker and Push is supported");
    navigator.serviceWorker.register('js/sw.js').then(function(reg) {
        console.log(':^)', reg);
        messaging.useServiceWorker(reg);
        alert("Requesting permission.");
        messaging.requestPermission().then(function() {
            console.log('Notification permission granted.');
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // ...
            return messaging.getToken();
        }).then(function(token) {
            console.log(token);
            document.querySelector('.token').innerHTML = token;
            alert(token);
        }).catch(function(err) {
            console.log('Unable to get permission to notify.', err);
            document.querySelector('.token').innerHTML = err;
            alert(err);
        });

        messaging.onMessage(function(payload) {
            console.log(payload);
            document.querySelector('.token').innerHTML = payload;
        });
    })
    .catch(function(error) {
        console.error('Service Worker Error', error);
        document.querySelector('.token').innerHTML = error;
        alert(error);
    });
} else {
    console.warn('Push messaging is not supported');
    document.querySelector('.token').innerHTML = "Push messaging is not supported";
    alert("Push messaging is not supported");
}
