import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '../components/common/color';

import * as Http from "../helper/http";

export default class Badge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countBadge: 0,
            userId: ''
        };
    }

    componentDidMount = async () => {
        var user = await AsyncStorage.getItem("user");
        var dataUser = JSON.parse(user);
        this.setState({userId: dataUser.userId});
        this.getNotif();
    }

    getNotif(){
        let paramPost = {
            link: 'notification/notifbyuser',
            method: 'post',
            data: {
                userId: this.state.userId
            }
        }

        Http.post(paramPost)
        .then((res) => {
            let count = res.data.length;
            AsyncStorage.setItem('bagde', JSON.stringify({count: count}));
            this.setState({
                countBadge: count
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <View style={{marginTop: 10}}>
                <MaterialIcons name="notifications" size={25} color='#CCC' />
                {
                    (this.state.countBadge != 0) ? 
                        <View style={{
                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 15,
                            height: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                        }}> 
                            <Text style={{
                                color: '#FFF',
                                fontSize: 10
                            }}>{this.state.countBadge}</Text>
                        </View>
                    : <Text></Text>
                }
                
            </View>
        );
    }
}
