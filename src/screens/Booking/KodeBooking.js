import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { COLOR } from '../../components/common/color';
import { ScrollView } from 'react-native-gesture-handler';


class KodeBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: "#dedede" }}>
                    <View style={{ padding: 10, backgroundColor: "#fff" }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Update Pesanan</Text>
                                <View style={{ borderBottomWidth: 2, borderBottomColor: "#dedede", marginTop: 5, marginBottom: 15 }} />
                            </View>
                        </View>
                        <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('detailBooking')}>
                            <View style={{ paddingVertical: 10, backgroundColor: COLOR.secondary_color, marginHorizontal: 10 }}>
                                <Text style={{ marginHorizontal: 10 }}>Pembayaran anda telah dikonfirmasi, lihat kode reservasi anda</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginTop: 10, marginBottom: 10, borderRightWidth: 2, width: "100%" }} />
                    </View>
                    <View style={{ padding: 10, backgroundColor: "#fff", marginTop: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Riwayat Pesanan</Text>
                                <View style={{ borderBottomWidth: 2, borderBottomColor: "#dedede", marginTop: 5, marginBottom: 15 }} />
                            </View>
                        </View>
                        <TouchableOpacity>
                            <View style={{ paddingVertical: 10, backgroundColor: COLOR.secondary_color, marginHorizontal: 10 }}>
                                <Text style={{ marginHorizontal: 10, fontWeight: "bold", marginBottom: 5 }}>Pesanan Selesai</Text>
                                <Text style={{ marginHorizontal: 10 }}>Pesanan xxx telah selesai</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10, marginTop: 5 }}>
                                    <Fontisto name="clock" color="grey" size={12} />
                                    <Text style={{ marginHorizontal: 5, color: "grey", fontSize: 12 }}>30 Mei 2020</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginTop: 10, marginBottom: 10, borderRightWidth: 2, width: "100%" }} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default KodeBooking;