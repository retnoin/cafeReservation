import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, MaterialIcons, Image, Alert } from 'react-native'
import {COLOR} from '../../components/common/color'
import ButtonTouch from '../../components/common/Button'
import { ScrollView } from 'react-native-gesture-handler'

import * as Http from "../../helper/http";
import * as Hooks from "../../helper/hooks";

const {width, height} = Dimensions.get("screen")

export class DetailProduk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }

    componentDidMount() {
        let {category, data} = this.props.route.params;
        console.log('BAKA >>', data);
        if(category == 'drink'){
            this.setState({
                data: data
            });
        }else{
            this.setState({
                data: data
            });
        }
    }

    _addToCart(){
        alert('oke');
    }


    _renderMenu(){
        let {data} = this.props.route.params;
        let component = [];
        component = 
        <View style={{flex: 1}}>
            <ScrollView>
                <Image
                    source={{ uri: 'https://thumbs.dreamstime.com/b/coming-soon-sign-door-hanging-plate-vector-coming-soon-sign-door-hanging-plate-150788650.jpg' }}
                    style={{ width: width, height: width / 2, justifyContent: "center" }}
                />
                <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ paddingVertical: 10, fontSize: 25, fontWeight: "bold" }}>{data.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ paddingVertical: 2, fontSize: 20, fontWeight: "200" }}>
                        </Text>
                    </View>
                    <View style={{ marginBottom: 10, marginTop: 20, borderBottomWidth: 2, borderBottomColor: "#dedede", width: "100%" }} />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Harga</Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{Hooks.formatMoney(data.price)}</Text>
                    </View>

                </View>
            </ScrollView>
            <View style={{ position: "absolute", bottom: 10, width: width }}>
                <ButtonTouch
                    onPress = {() => this._addToCart(data)}
                    label="Tambah Pesanan"
                    color={COLOR.primary_color}
                />
            </View>
        </View>

        return component;
    }

    _renderDrink(){
        let component;
        let {data} = this.state;
        component = 
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Image
                    source={{ uri: 'https://thumbs.dreamstime.com/b/coming-soon-sign-door-hanging-plate-vector-coming-soon-sign-door-hanging-plate-150788650.jpg' }}
                    style={{ width: width, height: width / 2, justifyContent: "center" }}
                />
                <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ paddingVertical: 10, fontSize: 25, fontWeight: "bold" }}>{data.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ paddingVertical: 2, fontSize: 20, fontWeight: "200" }}></Text>
                    </View>
                    <View style={{ marginBottom: 10, marginTop: 20, borderBottomWidth: 2, borderBottomColor: "#dedede", width: "100%" }} />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Harga</Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{Hooks.formatMoney(data.price)}</Text>
                    </View>

                </View>
            </ScrollView>
            <View style={{ position: "absolute", bottom: 10, width: width }}>
                <ButtonTouch
                    onPress = {() => this._addToCart(data)}
                    label="Tambah Pesanan"
                    color={COLOR.primary_color}
                />
            </View>
        </View>
        return component;
    }

    render() {
        let {category} = this.props.route.params;
        return (
            <View style={{flex: 1}}>
                {
                    category == 'drink' ? this._renderDrink() : this._renderMenu()
                }
            </View>
        )
    }
}

export default DetailProduk
