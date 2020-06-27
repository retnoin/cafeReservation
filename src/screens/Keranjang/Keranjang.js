import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLOR } from '../../components/common/color';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input'

class Keranjang extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView>
                <View style={{
                    backgroundColor: "#fff", marginTop: 10, marginHorizontal: 10,
                    borderRadius: 15, paddingVertical: 10, paddingHorizontal: 10
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: 120, height: 120, backgroundColor: "red" }} />
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Meja 10</Text>
                            <View style={{
                                borderBottomWidth: 2, borderBottomColor: "#dedede", marginTop: 5,
                                marginBottom: 5, width: "70%"
                            }} />
                            <Text style={{ fontSize: 16 }}>Jumlah kursi 4</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <MaterialIcons name="access-time" color={COLOR.primary_color} size={20} />
                                    <View style={{ paddingVertical: 1.5, paddingHorizontal: 10 }}>
                                        <Text>00.00</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Fontisto name="date" color={COLOR.primary_color} size={20} />
                                <Text style={{ paddingHorizontal: 10 }}>22/6/2020</Text>
                            </View>
                            <View style={{ marginTop: 5 }} />
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <MaterialIcons name="person-outline" color={COLOR.primary_color} size={25} />
                                <View style={{ marginHorizontal: 5 }} />
                                <Text style={{
                                    paddingHorizontal: 10, borderWidth: 2, borderColor: "#dedede",
                                    borderRadius: 5
                                }}>0</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10 }} />
                    <View style={{
                        marginTop: 5, marginBottom: 5, borderBottomWidth: 2,
                        borderBottomColor: "#dedede", width: "100%"
                    }} />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 16 }}>Harga</Text>
                        <Text style={{ fontSize: 16 }}>Rp 50.000</Text>
                    </View>
                </View>
                <View style={{
                    backgroundColor: "#fff", marginTop: 10, marginHorizontal: 10,
                    borderRadius: 15, paddingVertical: 10, paddingHorizontal: 10
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
                            Pesanan
                        </Text>
                    </View>
                    <View style={{
                        marginTop: 5, marginBottom: 10, width: "100%",
                        borderBottomWidth: 2, borderBottomColor: "#dedede"
                    }} />
                    <View style={{ flexDirection: "row", marginBottom: 15 }}>
                        <View style={{ width: 80, height: 80, backgroundColor: "grey" }} />
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text>Marie Cookies</Text>
                            <Text style={{ marginBottom: 14 }}>Rp 23.000</Text>
                            <NumericInput value={this.state.value}
                                onChange={value => this.setState({ value })}
                                minValue={1}
                                totalWidth={100}
                                totalHeight={30}
                                valueType='real'
                                rounded
                                textColor={COLOR.primary_color}
                                iconStyle={{ color: 'white' }}
                                rightButtonBackgroundColor={COLOR.primary_color}
                                leftButtonBackgroundColor={COLOR.primary_color} />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 15 }}>
                        <View style={{ width: 80, height: 80, backgroundColor: "brown" }} />
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text>Tropical Coffe</Text>
                            <Text style={{ marginBottom: 14 }}>Rp 25.000</Text>
                            <NumericInput value={this.state.value}
                                onChange={value => this.setState({ value })}
                                minValue={1}
                                totalWidth={100}
                                totalHeight={30}
                                valueType='real'
                                rounded
                                textColor={COLOR.primary_color}
                                iconStyle={{ color: 'white' }}
                                rightButtonBackgroundColor={COLOR.primary_color}
                                leftButtonBackgroundColor={COLOR.primary_color} />
                        </View>
                    </View>
                </View>
                <View style={{
                    backgroundColor: "#fff", marginTop: 10, marginHorizontal: 10,
                    borderRadius: 15, paddingVertical: 10, paddingHorizontal: 10
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
                            Detail Pembayaran
                        </Text>
                    </View>
                    <View style={{
                        marginTop: 5, marginBottom: 10, width: "100%",
                        borderBottomWidth: 2, borderBottomColor: "#dedede"
                    }} />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 16 }}>Sub Total</Text>
                        <Text style={{ fontSize: 16 }}>Rp 98.000</Text>
                    </View>
                    <View style={{ 
                        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                        marginTop : 8}}>
                        <Text style={{ fontSize: 16 }}>PPN</Text>
                        <Text style={{ fontSize: 16 }}>Rp 2.000</Text>
                    </View>
                    <View style={{
                        borderStyle: 'dotted',
                        borderWidth: 1,
                        borderRadius: 1,
                        marginTop : 8
                    }} />
                    <View style={{
                        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                        marginTop: 8
                    }}>
                        <Text style={{ fontSize: 16 }}>Total Pembayaran</Text>
                        <Text style={{ fontSize: 16 }}>Rp 100.000</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            padding: 10, backgroundColor: COLOR.primary_color, borderRadius: 10,
                            alignItems: "center", marginTop: 10
                        }}>
                        <Text style={{ color: COLOR.white }}>Pesan</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}

export default Keranjang;
