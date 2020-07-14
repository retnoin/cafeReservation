import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import * as Http from "../../helper/http";
import * as Hooks from "../../helper/hooks";

import { COLOR } from '../../components/common/color';
import { compose } from 'redux';

export default class HistoryOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            dataOrder: []
        };
    }

    componentDidMount = async() => {
        var user = await AsyncStorage.getItem("user");
        var obj = JSON.parse(user);
        this.setState({
            userId: obj.userId
        })
        this.listOrder();
    }

    listOrder(){
        let paramPost = {
            link: 'order/orderbyuser',
            method: 'post',
            data: {
                userId: this.state.userId
            }
        }

        Http.post(paramPost)
        .then((res) => {
            this.setState({dataOrder: res.data});
        })
        .catch(err => {
            alert('Ops: something error');
        });
    }

    _renderOrderList(){
        let component = [];
        let {dataOrder} = this.state;
        dataOrder.map((item, i) => {
            let total = parseInt(item.totalPrices) + 2000;
            let data = (
                <View>
                    <View style={{marginBottom: 10}}></View>
                    <TouchableOpacity onPress={() => this.props.navigation.push('payment', {orderId: item.orderId})}>
                    <View style={{ flexDirection: "row", backgroundColor: '#FFF' }}>
                        <View style={{ paddingHorizontal: 10, padding: 15 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ paddingHorizontal: 10 }}>Order ID: {item.orderId}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ paddingHorizontal: 10 }}>Status Pembayaran : {item.statusOrder}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ paddingHorizontal: 10 }}>Status : {item.statusPayment}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ paddingHorizontal: 10 }}>Total : {Hooks.formatMoney(total)}</Text>
                            </View>
                        </View>
                    </View>
                    </TouchableOpacity>
                </View>
            )
            component.push(data);
        });
        return component;
    }

    render() {
        return (
        <View style={{flex: 1, padding: 15}}>
            {this._renderOrderList()}
        </View>
        );
    }
}
