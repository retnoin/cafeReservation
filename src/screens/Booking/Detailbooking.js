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
            <ScrollView>
                <View style={{
                    backgroundColor: "#fff", marginTop: 20, marginHorizontal: 10,
                    borderRadius: 15, paddingVertical: 10, paddingHorizontal: 10,
                    marginBottom: 20
                }}>
                    <View>
                        <Text style={{ fontSize: 20}}>Kode Reservasi : </Text>
                        <View style={{ width: width, alignItems: "baseline" }}>
                            <View style={{
                                padding: 20, borderRadius: 20, borderWidth: 3,
                                borderColor: COLOR.primary_color, marginTop: 20, marginBottom: 20 }}>
                                <Text style={{ fontSize: 30, fontWeight: "bold" }}>JK98123456</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 19}}>Terimakasih telah melakukan reservasi{"\n"}
            Selanjutnya tunjukkan kode ini kepada Server kami.</Text>
                    </View>
                    <Text style={{ fontSize: 19, marginTop: 5, marginBottom:5 }}>Sampai jumpa di cafe !</Text>
                </View>
            </ScrollView>
        )
    }
}

export default Detailbooking;