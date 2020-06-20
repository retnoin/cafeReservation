import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { COLOR } from '../../components/common/color';

class SplashScreen extends Component {
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
