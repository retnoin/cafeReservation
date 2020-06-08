import { StyleSheet, Dimensions } from "react-native";
import { COLOR } from "./color";

const { width, height } = Dimensions.get("screen")



export default StyleSheet.create({
    container: {
        flex: 1
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 12,
        marginRight: 10,
    },
    dotView: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 20,
        position: 'absolute',
        bottom: 10
    },
    cardhomepopular: {
        width: (width / 2) - 30,
        margin: 10,
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: "space-between",
        shadowColor: "#000",
        textShadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: COLOR.white,
        paddingBottom: 10
    },
    cardhomeimage: {
        width: (width / 2) - 30,
        height: width / 2.5,
    },
    cardTable: {
        width: (width / 2) - 10,
        marginVertical: 5, marginHorizontal: 5,
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        textShadowOffset: {width: 0, height: 2},
        justifyContent: "flex-start",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: COLOR.white,
        paddingBottom: 10
    },
    cardimageTable: {
        width: (width / 2) - 10,
        height: width / 3,
    },
    containerLoader: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'black',
        opacity:0.5
    }
})