import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ingredients } from '../../service/dataArrays';
import { COLOR } from '../../components/common/color';
import styles from '../../components/common/styles';
import * as Http from "../../helper/http";
import * as Hooks from "../../helper/hooks";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import {  } from 'react-native-gesture-handler';

class DaftarMeja extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodId: '',
            drinkId: '',
            dataPrice: ''
        };
        // this._onLogin.bind(this) = this._onLogin();
    }

    componentDidMount(){
        this.getItemList();
        this.getDrinkList();
    }

    getItemList(){
        let requestParam = {
            link: 'food/list',
            method: 'get',
            data: ''
        }

        Http.post(requestParam)
        .then((res) => {
            console.log('Well >> ', res);
            let data = res.data;
            if(res.status == 200){
                this.setState({
                    dataItem: data
                });
            }else{
                alert('Data Not Found');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getDrinkList(){
        let requestParam = {
            link: 'drink/list',
            method: 'get',
            data: ''
        }

        Http.post(requestParam)
        .then((res) => {
            console.log('Drink >> ', res);
            let data = res.data;
            if(res.status == 200){
                this.setState({
                    dataDrink: data
                });
            }else{
                alert('Data Not Found');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    _ChooseMenu(param, type){
        let price = [];
        price.push({price: param.price});
        if(type=="makanan"){
            console.log(type);
            this.setState({ foodId: param.foodId, dataPrice: price})
        }else{
            console.log(type);
            this.setState({ drinkId: param.drinkId, dataPrice: price})
        }
    }

    goDetailProduk = (item, category) => {
        this.props.navigation.navigate('detailProduk', {
            data: item,
            category: category
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                <View style={{ margin: 15 }}>
                    <Text style={{ fontSize: 20, textAlign: "left" }}>Menu Food</Text>
                </View>
                <View style={{alignItems: "center", justifyContent:"center"}}>
                    <FlatList
                    data={this.state.dataItem}
                    renderItem={({ item }) => (
                            <TouchableOpacity
                            onPress={() => this.goDetailProduk(item, 'makanan')}
                                style={styles.cardmejapopular}>
                                <Image
                                    style={[styles.cardhomeimage, { marginLeft: 10, marginRight: 10 }]}
                                    source={{ uri: 'https://thumbs.dreamstime.com/b/coming-soon-sign-door-hanging-plate-vector-coming-soon-sign-door-hanging-plate-150788650.jpg' }}
                                />
                                <View style={{ paddingLeft: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name} {this.state.foodId == item.foodId ? <MaterialIcons name="check" size={25} color="#089e0f" /> : ''}</Text>
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>{Hooks.formatMoney(item.price)}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={{margin: 15}}>
                    <Text style={{ fontSize: 20, textAlign: "left"}}>Drink</Text>
                </View>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <FlatList
                        data={this.state.dataDrink}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => this.goDetailProduk(item, 'drink')}
                                style={[styles.cardmejapopular, {paddingBottom: 15, paddingTop: 15}]}>
                                <Image
                                    style={[styles.cardhomeimage, { marginLeft: 10, marginRight: 10 }]}
                                    source={{ uri: 'https://thumbs.dreamstime.com/b/coming-soon-sign-door-hanging-plate-vector-coming-soon-sign-door-hanging-plate-150788650.jpg' }}
                                />
                                <View style={{ paddingLeft: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name} {this.state.drinkId == item.drinkId ? <MaterialIcons name="check" size={25} color="#089e0f" /> : ''}</Text>
                                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{Hooks.formatMoney(item.price)}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                </ScrollView>
            </View>
        )
    }
}

export default DaftarMeja
