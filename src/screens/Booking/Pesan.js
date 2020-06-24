import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../components/common/styles';
import * as Http from "../../helper/http";
import * as Hooks from "../../helper/hooks";

class Pesan extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    console.log(this.props.route.params.dataOrder);
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold'}}>Kode Order: {this.props.route.params.orderId}</Text>
        <Text>Silahkan bayar sebelum waktunya habis</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('homemain')}></TouchableOpacity>
      </View>
    );
  }
}

export default Pesan;
