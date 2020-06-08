import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLOR } from '../../components/common/color';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import 'moment/locale/id'

const { width, height } = Dimensions.get("screen")

class Meja extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tanggal: 'Pilih Tanggal',
            isDatePickerVisible: false
        };
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleConfirm = (date) => {
        this.setState({
            isDatePickerVisible: !this.state.isDatePickerVisible,
            tanggal: moment(date).format('dddd, DD MMMM YYYY')
        });
        this.hideDatePicker();
    };


    render() {
        console.log(this.state.isDatePickerVisible)
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Pilih Jumlah Orang</Text>
                        <View style={{ borderBottomWidth: 2, borderBottomColor: "#dedede", marginTop: 5, marginBottom: 15 }} />
                        <View style={{ flexDirection: "row" }}>
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                horizontal>
                                <TouchableOpacity style={{
                                    height: 40, width: 40, borderRadius: 25,
                                    backgroundColor: "#fff", alignItems: "center", justifyContent: "center"
                                }}>
                                    <Text style={{ color: "#000" }}>1</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity style={{
                                    height: 40, width: 40, borderRadius: 25,
                                    backgroundColor: "#fff", alignItems: "center", justifyContent: "center"
                                }}>
                                    <Text style={{ color: "#000" }}>2</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity style={{
                                    height: 40, width: 40, borderRadius: 25,
                                    backgroundColor: "#fff", alignItems: "center", justifyContent: "center"
                                }}>
                                    <Text style={{ color: "#000" }}>3</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity style={{
                                    height: 40, width: 40, borderRadius: 25,
                                    backgroundColor: "#fff", alignItems: "center", justifyContent: "center"
                                }}>
                                    <Text style={{ color: "#000" }}>4</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity style={{
                                    height: 40, width: 40, borderRadius: 25,
                                    backgroundColor: "#000", alignItems: "center", justifyContent: "center"
                                }}>
                                    <Text style={{ color: "#fff" }}>5</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity style={{
                                    height: 40, width: 40, borderRadius: 25,
                                    backgroundColor: "#fff", alignItems: "center", justifyContent: "center"
                                }}>
                                    <Text style={{ color: "#000" }}>6</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity style={{
                                    height: 40, width: 40, borderRadius: 25,
                                    backgroundColor: "#fff", alignItems: "center", justifyContent: "center"
                                }}>
                                    <Text style={{ color: "#000" }}>7</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity style={{
                                    height: 40, width: 40, borderRadius: 25,
                                    backgroundColor: "#fff", alignItems: "center", justifyContent: "center"
                                }}>
                                    <Text style={{ color: "#000" }}>8</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity style={{
                                    height: 40, width: 40, borderRadius: 25,
                                    backgroundColor: "#fff", alignItems: "center", justifyContent: "center"
                                }}>
                                    <Text style={{ color: "#000" }}>9</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity style={{
                                    height: 40, width: 40, borderRadius: 25,
                                    backgroundColor: "#fff", alignItems: "center", justifyContent: "center"
                                }}>
                                    <Text style={{ color: "#000" }}>10</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                            </ScrollView>
                        </View>
                        <View style={{
                            borderBottomWidth: 2, borderBottomColor: "#dedede",
                            marginTop: 15, marginBottom: 10
                        }} />
                        <View style={{
                            width: width - 40, borderWidth: 2, borderColor: "#dedede",
                            borderRadius: 10, flexDirection: "row", justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Text style={{
                                fontSize: 14, fontWeight: "bold", paddingVertical: 15,
                                padding: 10
                            }}>
                                {this.state.tanggal}
                            </Text>
                            <TouchableOpacity
                                onPress={this.showDatePicker}>
                                <Fontisto name="date" color={COLOR.primary_color} size={25}
                                    style={{ paddingHorizontal: 10 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingVertical: 20 }} />
                        <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 15 }}>Pilih Jam</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity
                                    style={{
                                        borderColor: "grey", borderWidth: 2,
                                        paddingVertical: 1.5, paddingHorizontal: 5
                                    }}>
                                    <Text>12.00</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity
                                    style={{
                                        borderColor: "grey", borderWidth: 2,
                                        paddingVertical: 1.5, paddingHorizontal: 5
                                    }}>
                                    <Text>12.30</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity
                                    style={{
                                        borderColor: "grey", borderWidth: 2,
                                        paddingVertical: 1.5, paddingHorizontal: 5
                                    }}>
                                    <Text>13.00</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity
                                    style={{
                                        borderColor: "#000", borderWidth: 2,
                                        paddingVertical: 1.5, paddingHorizontal: 5
                                    }}>
                                    <Text>13.30</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity
                                    style={{
                                        borderColor: "#000", borderWidth: 2,
                                        paddingVertical: 1.5, paddingHorizontal: 5
                                    }}>
                                    <Text>14.00</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity
                                    style={{
                                        borderColor: "#000", borderWidth: 2,
                                        paddingVertical: 1.5, paddingHorizontal: 5
                                    }}>
                                    <Text>14.30</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                                <TouchableOpacity
                                    style={{
                                        borderColor: "#000", borderWidth: 2,
                                        paddingVertical: 1.5, paddingHorizontal: 5
                                    }}>
                                    <Text>15.00</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 5 }} />
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ marginTop: 50 }} />
                    <View
                        style={{
                            backgroundColor: "#fff", marginHorizontal: 20, borderRadius: 15,
                            paddingVertical: 20, paddingHorizontal: 10
                        }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: 100, height: 100, backgroundColor: "blue" }} />
                            <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ fontSize: 16 }}>Jumlah kursi 4</Text>
                                <Text style={{ fontSize: 16, marginVertical: 5 }}>Meja 5</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <MaterialIcons name="access-time" color={COLOR.primary_color} size={20} />
                                        <View style={{ paddingVertical: 1.5, paddingHorizontal: 10 }}>
                                            <Text>14.30</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Fontisto name="date" color={COLOR.primary_color} size={20} />
                                    <Text style={{ paddingHorizontal: 10 }}>{this.state.tanggal}</Text>
                                </View>
                                <View style={{ marginTop: 5 }} />
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <MaterialIcons name="person-outline" color={COLOR.primary_color} size={25} />
                                    <View style={{ marginHorizontal: 5 }} />
                                    <Text
                                        style={{
                                            paddingHorizontal: 10, borderWidth: 2, borderColor: "#dedede",
                                            borderRadius: 5
                                        }}>7</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingVertical: 10 }} />
                        <View style={{
                            marginTop: 10, marginBottom: 10, borderBottomWidth: 2,
                            borderBottomColor: "#dedede", width: "100%"
                        }} />
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Rp 50.000</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('pesan')}
                                style={{
                                    padding: 10, backgroundColor: COLOR.primary_color, borderRadius: 10,
                                    alignItems: "center"
                                }}>
                                <Text style={{ color: COLOR.white }}>Pesan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 5 }} />
                </View>
                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                    onChange={this.handleConfirm}
                    minimumDate={new Date()}

                />
            </ScrollView>
        )
    }
}

export default Meja;
