import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';
// import uuid from 'react-native-uuid';

import styles from '../../components/common/styles';
import * as Http from "../../helper/http";
import * as Hooks from "../../helper/hooks";
import {base_url} from "../../utils/config";

import { ScrollView } from 'react-native-gesture-handler';
import { COLOR } from '../../components/common/color';
import { Header } from 'react-native/Libraries/NewAppScreen';

class Pesan extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  dataOrder: '',
	  dataImage: '',
	  loading: false
    };
  }

  componentDidMount(){
	// console.log('BAKA');
    // console.log(this.props.route.params.orderId);
	this.getOrder();
  }

  getOrder(){
    let orderId = this.props.route.params.orderId;
    if(orderId != ''){
      let reqParam = {
        link: 'order/search/'+orderId,
        method: 'get'
      }
      Http.post(reqParam).then((res) => {
        this.setState({dataOrder: res.data, loading: false});
      }).catch((err) => {
        console.log('Error');
      });
    }else{
      this.props.navigation.navigate('homemain');
    }
  }

uploadImagePayment(param){
	let paramPost = {
		link: 'order/update/'+this.state.dataOrder.orderId,
		method: 'put',
		data:{
			imageUrl: param.imageUrl
		}
	}
	Http.post(paramPost)
	.then((res) => {
		console.log('RESPONSE >>', res);
	})
	.catch(err => {
		console.log('Error');
	});
}

chooseImage(){
	let date = new Date();
	ImagePicker.openPicker({
		width: 300,
		height: 400,
		cropping: true
	}).then(image => {
		this.uploadImage(image);
	});
}

uploadImage(val){
	const uuid = '110ec58a-a0f2-4ac4-8393-c866d813b8d1';
	if(val.path){
		let fileExt = val.path.split('.').pop();
		// console.log('TOKEN >>', token);
		// console.log('BAKA >>', fileExt);
		let fileName = `${uuid}.${fileExt}`;
		let refStorage = firebase.storage().ref(`payment/images/${fileName}`);
		refStorage.putFile(val.path)
		.on(
			firebase.storage.TaskEvent.STATE_CHANGED,
			snapshot => {
				console.log('Snapshot >> ', snapshot.state);
				console.log('Progress >>', (snapshot.bytesTransferred/snapshot.totalBytes) * 100);

				if(snapshot.state == firebase.storage.TaskState.SUCCESS){
					console.log('SUCCESS');
				}
			}, err => {
				unsubscribe();
				console.log('Upload image error');
			},() => {
				refStorage.getDownloadURL().then((downloadUrl) => {
					console.log('File available at ', downloadUrl);
					this.uploadImagePayment({imageUrl: downloadUrl});
				})
			}
		);
	}
};


  render() { 
	let {dataOrder, loading} = this.state;
	console.log('LOADINg >>',loading);
    let totalPayment = parseInt(dataOrder.totalPrices) + 2000;
	if(loading){
		return (
			<View style={[styles.container, styles.horizontal]}>
				<ActivityIndicator size="large" color="#00ff00" />
			</View>
		)
	}
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
					Order ID: {dataOrder.orderId}
				</Text>
          	</View>
			<View style={{ flexDirection: "row" }}>
				<Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
					Status: {dataOrder.statusOrder}
				</Text>
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
            <Text style={{ fontSize: 16 }}>{Hooks.formatMoney(dataOrder.totalPrices)}</Text>
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
            <Text style={{ fontSize: 16, fontWeight: "700" }}>{Hooks.formatMoney(totalPayment)}</Text>
          </View>
		  {
					(dataOrder.imageUrl != '') ? 
						<View style={{
							padding: 10, backgroundColor: COLOR.primary_color, borderRadius: 10,
							alignItems: "center", marginTop: 40
						}}>
							<Text style={{ color: COLOR.white, fontSize: 18, fontWeight: "600" }}>Bukti payment sedang di check</Text>
						</View>
						: 
						<TouchableOpacity
							onPress={() => this.chooseImage()}
							style={{
								padding: 10, backgroundColor: COLOR.primary_color, borderRadius: 10,
								alignItems: "center", marginTop: 40
							}}>
							<Text style={{ color: COLOR.white, fontSize: 18, fontWeight: "600" }}>Upload Bukti Pembayaran</Text>
						</TouchableOpacity>
		  }
          
        </View>
        {/* <Text style={{fontWeight: 'bold'}}>Kode Order: {this.props.route.params.orderId}</Text>
        <Text>Silahkan bayar sebelum waktunya habis</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('homemain')}></TouchableOpacity> */}
      </ScrollView>
    );
  }
}

export default Pesan;
