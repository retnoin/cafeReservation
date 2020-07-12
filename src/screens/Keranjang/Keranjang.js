import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLOR } from '../../components/common/color';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ScrollView } from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';
import AsyncStorage from '@react-native-community/async-storage';

import { addToFoodCart, addToDrinkCart, addTableToCart } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Http from "../../helper/http";
import * as Hooks from "../../helper/hooks";
import { categories } from '../../service/dataArrays';

class Keranjang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueQtyFood: 0,
            valueQtyDrink: 0,
            subTotalMeja: 0,
            subTotalItem: {subTable: 0, subFood: 0, subDrink: 0},
            totalPayment: 0,
            ppn: 2000,
            userId: '',
            note: '',
            cart: '',
            timeFood: false,
            timeDrink: false
        };
    }

    componentDidMount = async() => {
        var user = await AsyncStorage.getItem("user");
        var obj = JSON.parse(user);
        this.setState({
            userId: obj.userId
        })
        console.log('PAGE TABLE', this.props.table);
        console.log('PAGE CART FOOD', this.props.cartFood);
        console.log('PAGE CART DRINK', this.props.cartDrink);
    }

    //Save Order Item
    saveOrderItem(param){
        let cartFood = this.props.cartFood;
        let cartDrink = this.props.cartDrink;

        if(cartFood != ''){
            this.saveOrderFood(param);
        }else{
            this.saveOrderDrink(param);
        }
    }

    saveOrder(total){
        var date = new Date();
        let th = date.getDate();
        let year = date.getFullYear();
        let month = date.getMonth();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let time = hour + ':' + minute;
        let dateOrder = year+'-'+month+'-'+th+' '+hour+':'+minute;

        let reqParam = {
            link: 'order/add',
            method: 'post',
            data: {
                userId: this.state.userId,
                note: this.state.note,
                orderDate: dateOrder,
                expired: time,
                totalPrices: total
            }
        }

        Http.post(reqParam).then((res) => {
            console.log('ORDER >>',res);
            let orderId = res.data.orderId;
            this.saveOrderFood(orderId);
            this.saveOrderTable(orderId);
            this.saveOrderDrink(orderId);
            this.props.navigation.navigate('payment',{orderId: orderId});
        }).catch((err) => {
            console.log('Error');
        });
    }

    saveOrderTable(param){
        let table = this.props.table;
        table.map((item, i) => {
            let reqParam = {
                link: 'order/add_table',
                method: 'post',
                data: {
                    orderId: param,
                    tableId: item.tableId,
                    timeChoosen: item.timeOrder
                }
            }

            console.log('FOOD >>', reqParam);
            Http.post(reqParam).then((res) => {
                console.log('RESPONSE >>', res);
            }).catch((err) => {
                console.log('Error');
            });
        });
    };

    saveOrderFood(param){
        let tes = [];
        let cartFood = this.props.cartFood;
        if(cartFood != ''){
            cartFood.map((item, i) => {
                let reqParam = {
                    link: 'order/add_item',
                    method: 'post',
                    data: {
                        orderId: param,
                        foodId: item.foodId,
                        drinkId: 0,
                        qty: 1
                    }
                }

                console.log('FOOD >>', reqParam);
                Http.post(reqParam).then((res) => {
                    let orderItemId = res.data.orderItemId;
                }).catch((err) => {
                    console.log('Error');
                });
            });
        }else{
            console.log('Data Not Found');
        }
    }

    saveOrderDrink(param){
        let cartDrink = this.props.cartDrink;
        if(cartDrink != ''){
            cartDrink.map((item, i) => {
                let reqParam = {
                    link: 'order/add_item',
                    method: 'post',
                    data: {
                        orderId: param,
                        drinkId: item.drinkId,
                        foodId: 0,
                        qty: 1
                    }
                }

                Http.post(reqParam).then((res) => {
                    console.log('TESTING >>', res);
                }).catch((err) => {
                    console.log('Error');
                });
            });
        }else{
            console.log('Data Not Found');
        }
    }

   
    _renderOrderTable(){
        let component = [];
        if(this.props.table == ''){
            return console.log('empty data table');
        }
        let tes = 0;
        this.props.table.map((table, i) => {
            tes += parseInt(table.price);
            component.push(
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: 120, height: 120, backgroundColor: "red" }} />
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Meja {table.meja}</Text>
                            <View style={{
                                borderBottomWidth: 2, borderBottomColor: "#dedede", marginTop: 5,
                                marginBottom: 5, width: "70%"
                            }} />
                            <Text style={{ fontSize: 16 }}>Jumlah kursi 4</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <MaterialIcons name="access-time" color={COLOR.primary_color} size={20} />
                                    <View style={{ paddingVertical: 1.5, paddingHorizontal: 10 }}>
                                        <Text>{table.timeOrder}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Fontisto name="date" color={COLOR.primary_color} size={20} />
                                <Text style={{ paddingHorizontal: 10 }}>{table.tanggal}</Text>
                            </View>
                            <View style={{ marginTop: 5 }} />
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <MaterialIcons name="person-outline" color={COLOR.primary_color} size={25} />
                                <View style={{ marginHorizontal: 5 }} />
                                <Text style={{
                                    paddingHorizontal: 10, borderWidth: 2, borderColor: "#dedede",
                                    borderRadius: 5
                                }}>{table.countPeople}</Text>
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
            );
        });
        this.state.subTotalItem.subTable = tes;
        return component;
    }

    _renderOrderFood(){
        let component = [];
        if(this.props.cartFood == ''){
            return console.log('empty data order');
        }
        let subItem = 0;
        this.props.cartFood.map((item, i) => {
            subItem += parseInt(item.price) * parseInt(item.qty);
            component.push(<View style={{ flexDirection: "row", marginBottom: 15 }}>
                <View style={{ width: 80, height: 80, backgroundColor: "grey" }} />
                <View style={{ paddingHorizontal: 10 }}>
                    <Text>{item.name}</Text>
                    <Text style={{ marginBottom: 14 }}>{Hooks.formatMoney(item.price)}</Text>
                    <NumericInput 
                        value={item.qty}
                        onChange={qty => this.addQtyFood({foodId:item.foodId, qty: qty})}
                        totalWidth={100}
                        totalHeight={30}
                        valueType='real'
                        rounded
                        textColor={COLOR.primary_color}
                        iconStyle={{ color: 'white' }}
                        rightButtonBackgroundColor={COLOR.primary_color}
                        leftButtonBackgroundColor={COLOR.primary_color} />
                </View>
            </View>)
        });
        console.log('FOOD TOTAL >>', subItem);
        this.state.subTotalItem.subFood = subItem;
        return component;
    }

    _renderOrderDrink() {
        let component = [];
        if (this.props.cartDrink == '') {
            return console.log('empty data order');
        }
        let subItem = 0;
        this.props.cartDrink.map((item, i) => {
            subItem += parseInt(item.price) * parseInt(item.qty);
            component.push(<View style={{ flexDirection: "row", marginBottom: 15 }}>
                <View style={{ width: 80, height: 80, backgroundColor: "grey" }} />
                <View style={{ paddingHorizontal: 10 }}>
                    <Text>{item.name}</Text>
                    <Text style={{ marginBottom: 14 }}>{Hooks.formatMoney(item.price)}</Text>
                    <NumericInput 
                        value={item.qty}
                        onChange={qty => this.addQtyDrink({drinkId:item.drinkId, qty: qty})}
                        totalWidth={100}
                        totalHeight={30}
                        valueType='real'
                        rounded
                        textColor={COLOR.primary_color}
                        iconStyle={{ color: 'white' }}
                        rightButtonBackgroundColor={COLOR.primary_color}
                        leftButtonBackgroundColor={COLOR.primary_color} />
                </View>
            </View>)
        });
        this.state.subTotalItem.subDrink = subItem;
        return component;
    }

    addQtyDrink(val){
        let drink = this.props.cartDrink;    
        if(val.qty == 0){
            drink.map((item, i) => {
                if(item.drinkId == val.drinkId){
                    drink.splice(i, 1);
                }
            })
            setTimeout(() => {
                this.setState({
                    timeDrink: true
                });
            }, 100);
        }else{
            drink.map((item, i) => {
                if(item.drinkId == val.drinkId){
                    item.qty = val.qty;
                }
            });
            setTimeout(() => {
                this.setState({
                    timeDrink: true
                });
            }, 100);
        }
    }

    addQtyFood(val){
        let food = this.props.cartFood;
        if (val.qty == 0) {
            food.map((item, i) => {
                if (item.foodId == val.foodId) {
                    food.splice(i, 1);
                }
            });
            setTimeout(() => {
                this.setState({
                    timeFood: true
                });
            }, 100);
        } else {
            food.map((item, i) => {
                if (item.foodId == val.foodId) {
                    item.qty = val.qty;
                }
            });
            setTimeout(() => {
                this.setState({
                    timeFood: true
                });
            }, 100);
        }

    }

    _rendeDetailPayment(){
        let total = 0;
        let {subTotalItem} = this.state;
        total = parseInt(subTotalItem.subFood) + parseInt(subTotalItem.subDrink) + parseInt(subTotalItem.subTable);
        let totalAll = total + 2000;

        let component = (
            <View>
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
                <Text style={{ fontSize: 16 }}>{Hooks.formatMoney(total)}</Text>
            </View>
            <View style={{
                flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                marginTop: 8
            }}>
                <Text style={{ fontSize: 16 }}>PPN</Text>
                <Text style={{ fontSize: 16 }}>Rp 2.000</Text>
            </View>
            <View style={{
                borderStyle: 'dotted',
                borderWidth: 1,
                borderRadius: 1,
                marginTop: 8
            }} />
            <View style={{
                flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                marginTop: 8
            }}>
                <Text style={{ fontSize: 16 }}>Total Pembayaran</Text>
                <Text style={{ fontSize: 16 }}>{Hooks.formatMoney(totalAll)}</Text>
            </View>
            <TouchableOpacity
                onPress = {() => this.saveOrder(total)}
                style={{
                    padding: 10, backgroundColor: COLOR.primary_color, borderRadius: 10,
                    alignItems: "center", marginTop: 10
                }}>
                <Text style={{ color: COLOR.white }}>Pesan</Text>
            </TouchableOpacity>
            </View>
        );
        console.log('BAKA A A >>', this.state.subTotalItem);
        return component;
    }

    _renderNote(){
        console.log('FOOD >> ',this.props.cartFood);
        let component = (
            <View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
                        Note
                    </Text>
                </View>
                <View>
                    <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={{borderWidth: 1, borderColor: '#CCC', paddingLeft: 15, paddingRight: 15, textAlignVertical: 'top'}}
                    placeholder = "Note..."
                    onChangeText={(text) => this.setState({ note: text })}
                    value={this.state.note} />
                </View>
            </View>
        )

        return component;
    }

    render() {
        return (
            <ScrollView>
                <View style={{
                    backgroundColor: "#fff", marginTop: 10, marginHorizontal: 10,
                    borderRadius: 15, paddingVertical: 10, paddingHorizontal: 10
                }}>
                    {this._renderOrderTable()}
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
                    {this._renderOrderFood()}
                    {this._renderOrderDrink()}
                </View>
                <View style={{
                    backgroundColor: "#fff", marginTop: 10, marginHorizontal: 10,
                    borderRadius: 15, paddingVertical: 10, paddingHorizontal: 10
                }}>
                    {this._renderNote()}
                </View>
                <View style={{
                    backgroundColor: "#fff", marginTop: 10, marginHorizontal: 10,
                    borderRadius: 15, paddingVertical: 10, paddingHorizontal: 10
                }}>
                    {this._rendeDetailPayment()}
                </View>

            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartFood: state.authReducer.cartFoodList,
        cartDrink: state.authReducer.cartDrinkList,
        table: state.authReducer.tableList
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addToFoodCart, addToDrinkCart, addTableToCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Keranjang);
