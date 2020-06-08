import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { COLOR } from '../../components/common/color';

class SplashScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fcebae' }}>
                <Image
                    style={{ width: width / 1.5, height: width / 1.5 }}
                    source={require('../../assets/splash.png')}
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
