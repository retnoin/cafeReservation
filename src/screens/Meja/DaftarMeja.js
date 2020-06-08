import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { ingredients } from '../../service/dataArrays';
import styles from '../../components/common/styles';

export class DaftarMeja extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={ingredients}
                    renderItem={({ item, key }) => (
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('detailMeja')}
                            key={key}
                            style={styles.cardmejapopular}>
                            <Image
                                style={styles.cardhomeimage}
                                source={{ uri: item.photo_url }}
                            />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.harga}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    numColumns={2}
                />
            </View>
        )
    }
}

export default DaftarMeja
