import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { ingredients } from '../../service/dataArrays';
import styles from '../../components/common/styles';
import * as Http from "../../helper/http";
import * as Hooks from "../../helper/hooks";

class DaftarMeja extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataItem: []
        };
        // this._onLogin.bind(this) = this._onLogin();
    }

    componentDidMount(){
        this.getItemList();
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

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent:"center" }}>
                <FlatList
                    data={this.state.dataItem}
                    renderItem={({ item}) => (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('detailMeja', {param: item.foodId})}
                            style={styles.cardmejapopular}>
                            <Image
                                style={[styles.cardhomeimage, {marginLeft: 10, marginRight: 10}]}
                                source={{ uri: 'https://thumbs.dreamstime.com/b/coming-soon-sign-door-hanging-plate-vector-coming-soon-sign-door-hanging-plate-150788650.jpg' }}
                            />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>{Hooks.formatMoney(item.price)}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

export default DaftarMeja
