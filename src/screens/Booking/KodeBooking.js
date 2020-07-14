import React, { Component } from 'react';
import { View, Text, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { COLOR } from '../../components/common/color';
import { ScrollView } from 'react-native-gesture-handler';

import { showBadge } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Badge from "../../components/badge";

import userStore from '../../helper/storeUser';

import * as Http from "../../helper/http";
import * as Hooks from "../../helper/hooks";


class KodeBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNotif: [],
            userId: '',
            reload: false,
            refreshing: false
        };

    }

    componentDidMount = async () => {
        const store = await userStore();
        var user = await AsyncStorage.getItem("user");
        var obj = JSON.parse(user);
        this.setState({
            userId: obj.userId
        });

        this.getListNotif();
    }

    getListNotif = () => {
        let reqParam = {
            link: 'notification/notifbyuser',
            method: 'post',
            data: {
                userId: this.state.userId
            }
        }

        Http.post(reqParam)
        .then((res) => {
            let response = res.data;
            let countBadge = response.length;
            this.setState({
               listNotif : response
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    notifRead(param){
        let read = 1;
        let reqParam = {
            link: 'notification/update/'+param,
            method: 'put',
            data: {
                isRead: read
            }
        }

        Http.post(reqParam)
        .then((res) => {
            let response = res.data;
            console.log('res >>', response);
            let count = response.length;
            this.props.showBadge(count);
            setTimeout(() => {
                this.getListNotif();
            }, 100);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    _onRefresh() {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.getListNotif();
            this.setState({refreshing: false});
        }, 100);
    }

    _renderNotif(){
        let component = [];
        let {listNotif} = this.state;
        listNotif.map((item, i) => {
            let data  = (
                <View>
                    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.notifRead(item.notifId)}>
                        <View style={{ paddingVertical: 10, backgroundColor: COLOR.secondary_color, marginHorizontal: 10 }}>
                            <Text style={{ marginHorizontal: 10 }}>Kode Pemesanan : {item.orderId}</Text>
                        </View>
                        <View style={{ paddingVertical: 10, backgroundColor: COLOR.secondary_color, marginHorizontal: 10 }}>
                            <Text style={{ marginHorizontal: 10 }}>{item.content}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: 10, marginBottom: 10, borderRightWidth: 2, width: "100%" }} />
                </View>
            )

            component.push(data);
        });

        return component;
    }

    render() {
        return (
            <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                />
            }
            >
                <View style={{ flex: 1, backgroundColor: "#dedede" }}>
                    <View style={{ padding: 10, backgroundColor: "#fff" }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Pesanan</Text>
                                <View style={{ borderBottomWidth: 2, borderBottomColor: "#dedede", marginTop: 5, marginBottom: 15 }} />
                            </View>
                        </View>
                        {this._renderNotif()}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        badge: state.authReducer.badge
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ showBadge }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(KodeBooking);
