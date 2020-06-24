import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLOR } from '../../components/common/color';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import 'moment/locale/id';
import * as Http from "../../helper/http";
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get("screen")

class Meja extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            meja: '',
            countPeople: '',
            timeOrder: '',
            tanggal: 'Pilih Tanggal',
            isDatePickerVisible: false,
            numberPeople: 10,
            numberTable: 10,
            timeAvailable: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30']
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

    getListTable(){
        let reqParam = {
            link: 'table/list',
            method: 'post',
            data: ''
        }
        Http.post(reqParam)
        .then((res) => {
            console.log('BAKA >> ', res);
        })
        .catch((err) => {

        });
    }

    addToTable() {
        let { meja, countPeople, timeOrder, tanggal } = this.state;
        if (meja == '' || countPeople == '' || timeOrder == '' || tanggal == 'Pilih Tanggal') {
            return alert('Please entry form order');
        }

        let reqParam = {
            link: 'table/add',
            method: 'post',
            data: {
                numberOfTable: this.state.meja,
                type: 'normal',
                manyOfSeats: this.state.countPeople,
                availableTime: this.state.tanggal+' '+this.state.timeOrder
            }
        }
        Http.post(reqParam)
        .then((response) => {
            console.log(response);
            this.addToOrder(response.data.tableId);
        }).catch(err => {
            alert('Ops: something error');
        });
    }
    componentDidMount = async () => {
        var user = await AsyncStorage.getItem("user");
        this.setState({userId: user.userId});
    }
    addToOrder(param) {
        let reqParam = {
            link: 'order/add',
            method: 'post',
            data: {
                tableId: param,
                userId: this.state.userId,
                foodId: '',
                drinkId: '',
                totalPrices: ''
            }
        }
        Http.post(reqParam)
            .then((res) => {
                let data = {
                    tableId: param,
                    orderId: res.data.orderId
                }
                this.props.navigation.navigate('Menu', data);
            })
            .catch((err) => {
                alert('Ops: something error');
            });
    }

    _selected(val, type){
        console.log('TES >> ', type);
        if(type == 'meja'){
            this.setState({
                meja: val.i
            });
        }

        if(type == 'people'){
            this.setState({
                countPeople: val.i
            });
        }

        if (type == 'time') {
            this.setState({
                timeOrder: val.i
            });
        }
    }

    _renderNumberPeople() {
        let component = [];
        for (let i = 1; i <= this.state.numberPeople; i++) {
            let data = (
                <View style={{ marginHorizontal: 5 }}>
                    <TouchableOpacity style={{
                        height: 40, width: 40, borderRadius: 25,
                        backgroundColor: this.state.countPeople == i ? '#CCC' : '#FFF', alignItems: "center", justifyContent: "center"
                    }} onPress={() => this._selected({i}, 'people')}>
                        <Text style={{ color: "#000" }}>{i}</Text>
                    </TouchableOpacity>
                </View>
                );
            component.push(data);
        }

        return component;
    }

    _renderTimeAvailable(){
        let component = [];
        this.state.timeAvailable.map((i) => {
            component.push(<View style={{ marginHorizontal: 5 }}>
                <TouchableOpacity
                    style={{
                        borderColor: "grey", borderWidth: 2,
                        paddingVertical: 1.5, paddingHorizontal: 5, backgroundColor: this.state.timeOrder == i ? '#CCC' : '#FFF'
                    }} onPress={() => this._selected({ i }, 'time')}>
                    <Text>{i}</Text>
                </TouchableOpacity>
            </View>)
        });

        return component;
    }

    _renderTable(){
        let component = [];
        for (let i = 1; i <= this.state.numberTable; i++) {
            let data = (
                <View style={{ marginHorizontal: 5 }}>
                    <TouchableOpacity style={{
                        height: 40, width: 40, borderRadius: 25,
                        backgroundColor: this.state.meja == i ? "#CCC" : "#fff", alignItems: "center", justifyContent: "center"
                    }} onPress={() => this._selected({i}, 'meja')}>
                        <Text style={{ color: "#000" }}>{i}</Text>
                    </TouchableOpacity>
                </View>
            );
            component.push(data);
        }

        return component;
    }

    render() {
        // console.log('AHO >> ', this.props.route.params.param);
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
                                {this._renderNumberPeople()}
                            </ScrollView>
                        </View>

                        <View style={{ borderBottomWidth: 2, borderBottomColor: "#dedede", marginTop: 5, marginBottom: 15 }} />
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Pilih Meja</Text>
                        <View style={{ borderBottomWidth: 2, borderBottomColor: "#dedede", marginTop: 5, marginBottom: 15 }} />
                        <View style={{ flexDirection: "row" }}>
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                horizontal>
                                {this._renderTable()}
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
                        <View style={{ paddingVertical: 10 }} />
                        <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 15 }}>Pilih Jam</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {this._renderTimeAvailable()}
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
                                <Text style={{ fontSize: 16, marginVertical: 5 }}>Meja {this.state.meja}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <MaterialIcons name="access-time" color={COLOR.primary_color} size={20} />
                                        <View style={{ paddingVertical: 1.5, paddingHorizontal: 10 }}>
                                            <Text>{this.state.timeOrder}</Text>
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
                                        }}>{this.state.countPeople}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingVertical: 10 }} />
                        <View style={{
                            marginTop: 10, marginBottom: 10, borderBottomWidth: 2,
                            borderBottomColor: "#dedede", width: "100%"
                        }} />
                        <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end" }}>
                            {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>Rp 50.000</Text> */}
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Menu')}//this.addToTable()}
                                style={{
                                    padding: 10, backgroundColor: COLOR.primary_color, borderRadius: 10,
                                    alignSelf: 'flex-end'
                                }}>
                                <Text style={{ color: COLOR.white }}>Booking Table</Text>
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
