import React, { Component } from 'react'
import { Text, View } from 'react-native'

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
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

export default DetailProduk
