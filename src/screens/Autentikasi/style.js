import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('screen');
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fde3a7',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerContent: {
        height: Dimensions.get('window').height - 100,
        justifyContent: 'center',
        flex: 1,
    },
    containerLogin: {
        width: width - 40,
        // backgroundColor: 'blue'
    },
    textInput: {
        marginVertical: 20,
        padding: 15,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#FFF',
        color: '#FFF'
    },
    imgSize: {
        width: width / 4,
        height: width / 4
    },
    textWhite:{
        color: '#FFF'
    },
    buttonLogin: {
        padding: 30,
    }
})

module.exports = style;