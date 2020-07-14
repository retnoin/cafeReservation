import firebase from "react-native-firebase";
import type { Notifications, NotificationsOpen } from "react-native-firebase";

class FCMService {
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister);
        this.createNotificationListener(onRegister, onNotification, onOpenNotification);
    }

    checkPermission = (onRegister) => {
        firebase.messaging().hasPermission()
        .then(enable => {
            if(enable){
                this.getToken(onRegister);
            }else{
                this.requestPermission(onRegister);
            }
        }).catch(err => {
            console.log('Permission rejected', err);
        });
    }

    getToken = (onRegister) => {
        firebase.messaging().getToken()
        .then(fcmToken => {
            if(fcmToken){
                onRegister(fcmToken);
            }else{
                console.log('User does not have a devices token');
            }
        }).catch(err => {
            console.log('getToken rejected ', err);
        });
    }

    requestPermission = (onRegister) => {
        firebase.messaging().requestPermission()
        .then(() => {
            this.getToken(onRegister);
        })
        .catch(err => {
            console.log('Request permission rejected ', err);
        });
    }

    deleteToken = () => {
        firebase.messaging().deleteToken()
        .catch(err => {
            console.log('Delete token error ', err);
        });
    }

    createNotificationListener = (onRegister, onNotification, onOpenNotification) => {
        this.notificationListener = firebase.notifications()
        .onNotification((notification: Notification) => {
            onNotification(notification);
        })

        this.notificationOpenedListener = firebase.notifications()
        .onNotificationOpened((notificationOpen: NotificationOpen) => {
            if(notificationOpen){
                const notification: Notification = notificationOpen.notification;
                onOpenNotification(notification);
                this.removeDeliveredNotification(notification);
            }
        })

        firebase.notifications().getInitialNotification()
        .then(notificationOpen => {
            if(notificationOpen){
                const notification: Notification = notificationOpen.notification;
                onOpenNotification(notification);
                this.removeDeliveredNotification(notification);
            }
        })

        this.messageListener = firebase.messaging().onMessage((message) => {
            onNotification(message);
        })

        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
            console.log('New Token refresh ', fcmToken);
            onRegister(fcmToken);
        })
    }

    unRegister = () => {
        this.notificationListener();
        this.notificationOpenedListener();  
        this.messageListener();
        this.onTokenRefreshListener();

    }

    buildChannel = (obj) => {
        return new firebase.notifications.Android.Channel(
            obj.channelId, obj.channelName,
            firebase.notifications.Android.Importance.High)
            .setDescription(obj.channelDes)
    }

    buildNotification = (obj) => {
        firebase.notifications().android.createChannel(obj.channel);

        return new firebase.notifications.Notification()
        // .setSound(obj.sound)
        .setNotificationId(obj.dataId)
        .setTitle(obj.title)
        .setBody(obj.content)
        .setData(obj.data)
        //For Android
        .android.setChannelId(obj.channel.channelId)
        // .android.setLargeIcon(obj.largeIcon)
        // .android.setSmallIcon(obj.smallIcon)
        .android.setColor(obj.colorBgIcon)
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setVibrate(obj.vibrate);
        // .android.setAutoCancel(true)
    }

    scheduleNotification = (notification, days, minutes) => {
        const date = new Date();
        if(days){
            date.setDate(date.getDate() + days);
        }

        if(minutes){
            date.setDate(date.getMinutes() + minutes);
        }

        firebase.notifications()
        .scheduleNotification(notification, {fireDate: date.getTime()});
    }

    displayNotification = (notification) => {
        firebase.notifications().displayNotification(notification)  .catch(err => console.log('Display notification error ', err));
    }

    removeDeliveredNotification = (notification) => {
        firebase.notifications().removeDeliveredNotification(notification.notificationId);
    }
}

export const fcmService = new FCMService();