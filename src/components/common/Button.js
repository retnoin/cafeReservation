import React from 'react';
import { TouchableOpacity,Text } from "react-native";
import { COLOR } from "./color";



export default function ButtonTouch({
    onPress,
    label = 'default label',
    color=COLOR.black
}) {
    return (
        <TouchableOpacity
            style={{ padding: 10, backgroundColor: COLOR.secondary_color, marginHorizontal: 20,
            justifyContent: 'center',alignItems:'center' }}
            onPress={onPress}>
            <Text style={{fontSize:14,fontWeight:'bold',color:color}}>{label}</Text>
        </TouchableOpacity>
    )
}