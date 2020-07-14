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

import { addTableToCart } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width, height } = Dimensions.get("screen")

class Meja extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            meja: '',
            tableId: '',
            countPeople: '',
            timeOrder: '',
            tanggal: 'Pilih Tanggal',
            isDatePickerVisible: false,
            numberPeople: [],
            numberTable: [],
            timeAvailable: [],
            data: [],
            dataTable: [],
            orderTable: '',
            selectedTable: '',
            dataOrder: []
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
            method: 'get',
            data: ''
        }
        Http.post(reqParam)
        .then((res) => {
            let data = res.data;
            this.setState({ data: data});
            // data.map((item, i) => {
            // });
        })
        .catch((err) => {

        });
    }

    componentDidMount = async () => {
        var user = await AsyncStorage.getItem("user");
        var dataUser = JSON.parse(user);
        this.setState({userId: dataUser.userId});
        this.getListTable();
        this.orderList();
    }

    _selected(val, type){
        if(type == 'meja'){
            this.setState({
                meja: val.item.numberOfTable,
                tableId: val.item.tableId
            });
        }

        if(type == 'people'){
            this.setState({
                countPeople: val.i
            });
            this.setState({orderTable: ''});
            this.recommendTable(val.i);
        }

        if (type == 'time') {
            this.setState({
                timeOrder: val.timeOrder
            });
        }
    }

    orderList(){
        let paramPost = {
            link: 'order/list_order_table',
            method: 'get'
        }
        Http.post(paramPost)
        .then((res) => {
            let data = res.data;
            this.setState({dataOrder: data});
        }).catch(err => {
            alert('Ops: something error');
        });
    }

    recommendTable(param){
        let paramPost = {
            link: 'table/recommend_table',
            method: 'post',
            data: {
                people: param
            }
        }
        Http.post(paramPost)
        .then((res) => {
            let data = res.data;
            this.setState({dataTable: data});
        }).catch(err => {
            alert('Ops: something error');
        });
    }

    _saveToCart(){
        let table = '';
        if(this.state.orderTable.category == 'recommend'){
            if (this.state.tanggal == 'Pilih Tanggal') {
                return alert('Date field is required');
            }
            table = {
                meja: this.state.orderTable.numberOfTable,
                tableId: this.state.orderTable.tableId,
                timeOrder: this.state.orderTable.avalaibleTime,
                tanggal: this.state.tanggal,
                countPeople: this.state.orderTable.manyOfSeats,
                price: 50000
            }
        }else{
            let {meja, countPeople, timeOrder, tanggal, tableId} = this.state;
            if(meja == ''){
                return alert('Meja field is required');
            }
            if(timeOrder == ''){
                return alert('Time field is required');
            }
            if(countPeople == ''){
                return alert('Total people field is required');
            }
            if(tanggal == 'Pilih Tanggal'){
                return alert('Date field is required');
            }
    
            table = {
                meja : meja,
                tableId: tableId,
                timeOrder: timeOrder,
                tanggal: tanggal,
                countPeople: countPeople,
                price: 50000
            }
        }
        let checkBooking = false;
        this.state.dataOrder.map((item, i) => {
            if(item.tableId == this.state.tableId && item.timeChoosen == this.state.timeOrder){
                checkBooking = true;
            }
        });

        if(checkBooking == true){
            return alert('Maaf meja pada jam tersebut sudah di pesan silahkan pesan pada jam yang lain');
        }
        this.props.addTableToCart(table);
        this.props.navigation.push('Menu');
    }

    _selected_table(param){
        param.category = 'recommend';
        this.setState({ selectedTable: param.tableId, orderTable: param});
    }

    _renderNumberPeople() {
        let component = [];
        this.state.data.sort(function (a, b) { return a.manyOfSeats - b.manyOfSeats });
        for(let i = 1; i <= 10; i++) {
            let data = (
                <View style={{ marginHorizontal: 5 }}>
                    <TouchableOpacity style={{
                        height: 40, width: 40, borderRadius: 25,
                        backgroundColor: this.state.countPeople == i ? '#CCC' : '#FFF', alignItems: "center", justifyContent: "center"
                    }} onPress={() => this._selected({ i }, 'people')}>
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
        this.state.data.map((item, i) => {
            let timeOrder = item.avalaibleTime;
            component.push(<View style={{ marginHorizontal: 5 }}>
                <TouchableOpacity
                    style={{
                        borderColor: "grey", borderWidth: 2,
                        paddingVertical: 1.5, paddingHorizontal: 5, backgroundColor: this.state.timeOrder == item.avalaibleTime ? '#CCC' : '#FFF'
                    }} onPress={() => this._selected({ timeOrder }, 'time')}>
                    <Text>{item.avalaibleTime}</Text>
                </TouchableOpacity>
            </View>)
        });

        return component;
    }

    _renderTable(){
        let component = [];
        this.state.data.map((item, i) => {
            let data = (
                <View style={{ marginHorizontal: 5 }}>
                    <TouchableOpacity style={{
                        height: 40, width: 40, borderRadius: 25,
                        backgroundColor: this.state.meja == item.numberOfTable ? "#CCC" : "#fff", alignItems: "center", justifyContent: "center"
                    }} onPress={() => this._selected({ item }, 'meja')}>
                        <Text style={{ color: "#000" }}>{item.numberOfTable}</Text>
                    </TouchableOpacity>
                </View>
            );
            component.push(data);
        });

        return component;
    }

    _renderRecommendTables(){
        let component = [];
        if(this.state.dataTable == ''){
            component = (
                <View>
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
            )
        }else{
            this.state.dataTable.map((item, i) => {
                let data = (
                    <View>
                        <TouchableOpacity onPress={() => this._selected_table(item)}>
                        <View style={{ width: 100, height: 100, backgroundColor: "blue" }} />
                        <View style={{ paddingHorizontal: 10, backgroundColor: this.state.selectedTable == item.tableId ? '#CCC' : '#FFF' }}>
                            <Text style={{ fontSize: 16 }}>Jumlah kursi {item.manyOfSeats}</Text>
                            <Text style={{ fontSize: 16, marginVertical: 5 }}>Meja {item.numberOfTable}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <MaterialIcons name="access-time" color={COLOR.primary_color} size={20} />
                                    <View style={{ paddingVertical: 1.5, paddingHorizontal: 10 }}>
                                        <Text>{item.avalaibleTime}</Text>
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
                    </TouchableOpacity>
                    </View>
                )
                component.push(data);
            });
        }
        return component;
    }

    render() {
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
                        <View style={{ borderBottomWidth: 2, borderBottomColor: "#dedede", marginTop: 5, marginBottom: 15 }} />
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Recommend Tables</Text>
                        <View style={{ borderBottomWidth: 2, borderBottomColor: "#dedede", marginTop: 5, marginBottom: 15 }} />
                        <ScrollView showsHorizontalScrollIndicator={false}
                            horizontal>
                        <View style={{ flexDirection: "row" }}>
                            {this._renderRecommendTables()}
                        </View>
                        </ScrollView>
                        <View style={{ paddingVertical: 10 }} />
                        <View style={{
                            marginTop: 10, marginBottom: 10, borderBottomWidth: 2,
                            borderBottomColor: "#dedede", width: "100%"
                        }} />
                        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
                            {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>Rp 50.000</Text> */}
                            <TouchableOpacity
                                onPress={() => this.props.navigation.push('Menu')}//this.props.navigation.navigate('Menu')}
                                style={{
                                    padding: 10, backgroundColor: COLOR.primary_color, borderRadius: 10,
                                    alignSelf: 'flex-end'
                                }}>
                                <Text style={{ color: COLOR.white }}>Menu Cafe</Text>
                            </TouchableOpacity>
                            {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>Rp 50.000</Text> */}
                            <TouchableOpacity
                                onPress={() => this._saveToCart()}//this.props.navigation.navigate('Menu')}
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

const mapStateToProps = (state) => {
    return {
        table: state.tableList
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addTableToCart,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Meja);
