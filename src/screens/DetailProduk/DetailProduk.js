import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, MaterialIcons, Image } from 'react-native'
import {COLOR} from '../../components/common/color'
import ButtonTouch from '../../components/common/Button'

const {width, height} = Dimensions.get("screen")

export class DetailProduk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {

    }


    render() {
        return (
            <View style={{flex: 1}}>
                <Image
                source={{ uri: 'https://thumbs.dreamstime.com/b/coming-soon-sign-door-hanging-plate-vector-coming-soon-sign-door-hanging-plate-150788650.jpg' }}
                style={{ width: width, height: width / 1, justifyContent: "center" }}
                />
                <View style={{marginHorizontal:20, marginTop: 10}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{paddingVertical: 10, fontSize: 25, fontWeight: "bold"}}>Wedang Uwuh</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{paddingVertical: 2, fontSize: 20, fontWeight: "200"}}>Minuman tradisional yang didalamnya terdapat jahe, kayu manis, dan lain-lain</Text>
                    </View>
                    <View style={{marginBottom: 10,marginTop: 20, borderBottomWidth: 2, borderBottomColor: "#dedede", width: "100%"}}/>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <Text style={{fontSize: 20, fontWeight: "bold"}}>Harga</Text>
                        <Text style={{fontSize: 20, fontWeight: "bold"}}>15000</Text>
                    </View>
                    
                </View>
                <View style={{ position: "absolute", bottom: 10, width: width }}>
                    <ButtonTouch
                        label="Tambah Pesanan"
                        color={COLOR.primary_color}
                    />
                    </View>
                </View>
        )
    }
}

export default DetailProduk
