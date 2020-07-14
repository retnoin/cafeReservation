import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '../components/common/color';

export default class Badge extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={{marginTop: 10}}>
            <MaterialIcons name="notifications" size={25} color='#CCC' />
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
                }}>2</Text>
            </View>
        </View>
    );
  }
}
