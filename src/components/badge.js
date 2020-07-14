import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '../components/common/color';

import { showBadge } from '../redux/actions/authActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Http from "../helper/http";

class Badge extends Component {
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
            this.props.showBadge(count);
            this.setState({
                countBadge: count
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        console.log('WELCOME <<', this.props.badge);
        let checkedBadge = false;
        if(this.props.badge > 0){
            checkedBadge = true;
        }

        return (
            <View style={{marginTop: 10}}>
                <MaterialIcons name="notifications" size={25} color='#CCC' />
                {
                    (checkedBadge != false) ? 
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
                            }}>{this.props.badge}</Text>
                        </View>
                    : <Text></Text>
                }
                
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Badge);
