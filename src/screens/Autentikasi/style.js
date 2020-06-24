import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('screen');
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0e5',
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
        borderColor: '#8b5824',
        color: '#8b5824'
    },
    imgSize: {
        width: width / 6,
        height: width / 6,
        marginBottom: 15
    },
    textWhite:{
        color: '#8b5824'
    },
    buttonLogin: {
        padding: 30,
    }
})

module.exports = style;