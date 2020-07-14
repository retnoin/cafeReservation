import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { COLOR } from '../../components/common/color';
import {fcmService} from "../../helper/fcmService";

class SplashScreen extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        fcmService.register(this.onRegister, this.onNotification,
        this.onOpenNotification);
    }

    onRegister(token){
        console.log('[Notification FCM] onRegister ', token);
    }

    onNotification(notif){
        console.log("[Notification FCM] notification ", notif);
        const channelObj = {
            channelId : "SampleChannelID",
            channelName: "SampleChannelName",
            channelDes: "SampleChannelDes"
        }

        const channel = fcmService.buildChannel(channelObj);

        const buildNotify = {
            dataId: notif._notificationId,
            title: notif._title,
            content: notif._body,
            // sound: 'default',
            channel: channel,
            data: {},
            colorBgIcon: '#1A243B',
            // large: 'ic_launcher',
            // small: 'ic_launcher',
            vibrate: true
        }

        const notification = fcmService.buildNotification(buildNotify);
        fcmService.displayNotification(notification);
    }

    onOpenNotification(notif){
        console.log("[Notification FCM] onNotification ", notif);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#f0f0e5" }}>
                <Image
                    style={{ width: width / 4, height: width / 4 }}
                    source={require('../../assets/aalem.png')}
                />
                <View style={{ position: 'absolute', bottom: 10 }}>
                    <ActivityIndicator color={COLOR.primary_color} size='large' />
                </View>
            </View>
        );
    }
}
const { width, height } = Dimensions.get('screen')

export default SplashScreen;
