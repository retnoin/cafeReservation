import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, ImageBackground } from 'react-native';
import { profil } from '../../service/dataArrays';
import styles from '../../components/common/styles';
import { COLOR } from '../../components/common/color';
import userStore from '../../helper/storeUser';
import ButtonTouch from '../../components/common/Button';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { LoaderModal } from '../../components/common/Loader'

const { width, height } = Dimensions.get("screen")

class Profil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: null,
            isLoading: false,
            email: '',
        };
    }

    componentDidMount = async () => {
        const store = await userStore();
        this.setState({ nama: "indah" });
        console.log(this.state.nama);
        var user = await AsyncStorage.getItem("user");
        console.log(user);
        let email = store.user;
        this.setState({ email: email });
    }

    onLogout = () => {
        this.setState({ isLoading: true })
        setTimeout(() => {
            this.props.logout();
        }, 2000);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {(this.state.isLoading) && <LoaderModal title="Keluar..." />}
                <ImageBackground
                    style={{ width: width, height: width / 1.5, justifyContent: "center" }}
                    source={{ uri: "https://images.unsplash.com/photo-1584535553837-33e69fc4ca4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" }}>
                    <View style={{ width: width, justifyContent: "center", alignItems: "center" }}>
                        <View style={{
                            borderRadius: 50, overflow: "hidden",
                            backgroundColor: "red", borderWidth: 5, borderColor: "#fff",
                            shadowColor: "#000",
                            textShadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5,
                            elevation: 5,
                        }}>
                            <Image
                                source={{ uri: "https://images.unsplash.com/photo-1512264716715-589ae22779b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=338&q=80" }}
                                style={{
                                    width: 100, height: 100,
                                }}
                            />
                        </View>

                        <Text style={{ color: "#fff" }}>{this.state.nama}</Text>
                    </View>
                </ImageBackground>
                <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ paddingVertical: 10, fontWeight: "600", fontSize: 16 }}>Nama</Text>
                        <Text style={{ paddingVertical: 10, fontWeight: "600", fontSize: 16 }}>Indah</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ paddingVertical: 10, fontWeight: "600", fontSize: 16 }}>E-mail</Text>
                        <Text style={{ paddingVertical: 10, fontWeight: "600", fontSize: 16 }}>{this.state.email}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ paddingVertical: 10, fontWeight: "600", fontSize: 16 }}>No Tlpn</Text>
                        <Text style={{ paddingVertical: 10, fontWeight: "600", fontSize: 16 }}>0000000</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ paddingVertical: 10, fontWeight: "600", fontSize: 16 }}>Alamat</Text>
                        <Text style={{ paddingVertical: 10, fontWeight: "600", fontSize: 16 }}>Yogyakarta</Text>
                    </View>
                </View>
                <View style={{ position: "absolute", bottom: 10, width: width }}>
                    <ButtonTouch
                        onPress={this.onLogout}
                        label="Logout CUK"
                        color={COLOR.primary_color}

                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logout
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
