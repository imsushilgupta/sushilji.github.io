if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
  if (!('Notification' in window)) {
  console.log('This browser does not support notifications!');
}

else{
    alert('my alert');
    Notification.requestPermission(function(status) {
  console.log('Notification permission status:', status);
alert(status);
    });
    if (Notification.permission == 'granted') {
  navigator.serviceWorker.getRegistration().then(function(reg) {

    // TODO 2.4 - Add 'options' object to configure the notification
      var options={
       body:'First Notifications!',
       icon: 'img/notification-flat.png',
  vibrate: [100, 50, 100],
  data: {
    dateOfArrival: Date.now(),
    primaryKey: 1
  },
          actions: [
  {action: 'explore', title: 'Go to the site',
    icon: 'img/checkmark.png'},
  {action: 'close', title: 'Close the notification',
    icon: 'img/xmark.png'},
]
          
      };

    reg.showNotification('Hello world!',options);
  });
}
}
pushButton.addEventListener('click', function() {
  pushButton.disabled = true;
  if (isSubscribed) {
    unsubscribeUser();
  } else {
    subscribeUser();
  }
});

swRegistration.pushManager.getSubscription()
.then(function(subscription) {
  isSubscribed = (subscription !== null);

  updateSubscriptionOnServer(subscription);

  if (isSubscribed) {
    console.log('User IS subscribed.');
  } else {
    console.log('User is NOT subscribed.');
  }

  updateBtn();
});


