import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../components/common/styles';
import * as Http from "../../helper/http";
import * as Hooks from "../../helper/hooks";

import { ScrollView } from 'react-native-gesture-handler';
import { COLOR } from '../../components/common/color';

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
      <ScrollView>
        <View style={{
          backgroundColor: "#fff", marginTop: 10, marginHorizontal: 10,
          borderRadius: 15, paddingVertical: 10, paddingHorizontal: 10
        }}>
          <View>
            <Text style={{ marginTop: 5, fontSize: 18 }}>Batas waktu pembayaran yaitu 60 menit.{"\n"}
             Transfer total pembayaran ke rekening berikut ini, lalu unggah bukti transfer.{"\n"}
             Tunggu konfirmasi dari Admin kami untuk mendapatkan kode booking.
           </Text>
            <Text style={{ fontSize: 20, marginTop: 5 }}>Nomor Rekening : </Text>
            <Text style={{ fontSize: 25, marginTop: 5, fontWeight: "700" }}>
              XXXXXXXXXXXXX
           </Text>
            <Text style={{ fontSize: 25, marginTop: 5 }}>a/n alembana</Text>
            <Text style={{ fontSize: 18, marginTop: 5 }}>Rekening Bank Mandiri</Text>
          </View>
        </View>
        <View style={{
          backgroundColor: "#fff", marginTop: 10, marginHorizontal: 10,
          borderRadius: 15, paddingVertical: 10, paddingHorizontal: 10
        }}>
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
            <Text style={{ fontSize: 16 }}>Rp 98.000</Text>
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
            <Text style={{ fontSize: 16, fontWeight: "700" }}>Total Pembayaran</Text>
            <Text style={{ fontSize: 16, fontWeight: "700" }}>Rp 100.000</Text>
          </View>
          <TouchableOpacity
            style={{
              padding: 10, backgroundColor: COLOR.primary_color, borderRadius: 10,
              alignItems: "center", marginTop: 40
            }}>
            <Text style={{ color: COLOR.white, fontSize: 18, fontWeight: "600" }}>Upload Bukti Pembayaran</Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={{fontWeight: 'bold'}}>Kode Order: {this.props.route.params.orderId}</Text>
        <Text>Silahkan bayar sebelum waktunya habis</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('homemain')}></TouchableOpacity> */}
      </ScrollView>
    );
  }
}

export default Pesan;
