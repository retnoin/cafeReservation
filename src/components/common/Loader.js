import React, { Component } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    Modal,
    Dimensions
} from 'react-native';
import styles from './styles';
import { COLOR } from '../common/color';

const width = Dimensions.get('screen').width;

export function LoaderModal(props) {
    return (
        <Modal
            transparent>
            <View style={styles.containerLoader}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    backgroundColor: COLOR.white, borderRadius: 5,
                    marginHorizontal: 40, paddingHorizontal: 20, paddingVertical: 10
                }}>
                    <ActivityIndicator color={COLOR.black} size={props.size == "L" ? "large" : "small"} />
                    <Text style={{
                        color: COLOR.black, fontFamily: 'SFProDisplay-Regular',
                        fontSize: 14, paddingLeft: 5,
                    }}>{props.title}</Text>
                </View>
            </View>
        </Modal>
    )
}
