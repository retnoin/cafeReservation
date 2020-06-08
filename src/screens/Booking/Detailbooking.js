import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLOR } from '../../components/common/color';

const { width, height } = Dimensions.get("screen")

class Detailbooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <view style={{ width: width, justifyContent: "center", alignItems: "center" }}>
                    <view style={{ padding: 10, borderRadius: 20, borderWidth: 2, borderColor: "#000", marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Booking Meja</Text>
                    </view>
                </view>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>

                </View>
            </View>
        )
    }
}

export default Detailbooking;