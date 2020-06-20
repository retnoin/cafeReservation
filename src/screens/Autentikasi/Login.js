import React, { useState, Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Alert, Image, Dimensions, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native'
import { connect } from 'react-redux';
import { LoaderModal } from '../../components/common/Loader';
// TODO actions

import { LoginAuth } from '../../redux/actions/authActions';
import { bindActionCreators } from 'redux';
import style from "./style";

const { width, height } = Dimensions.get('screen');

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    _onLogin = () => {
        let link = 'user/login';
        let data = {
            name: this.state.username,
            password: this.state.password
        }
        this.props.LoginAuth(link, data)
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {(this.props.loadingLogin) && <LoaderModal title="Loging In.." />}
                <ImageBackground
                    //source={require('../../assets/bg.jpeg')}
                    style={style.container} >
                    <View style={style.containerLogin}>
                        {/* <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>LOGIN</Text> */}
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../../assets/aalem.png')}
                                style={style.imgSize}
                            />
                        </View>
                        <TextInput
                            placeholder="username"
                            placeholderTextColor="##8b5824"
                            onChangeText={(username) => this.setState({ username: username })}
                            style={style.textInput}
                            autoCapitalize={false}
                        />
                        <TextInput
                            placeholder="password"
                            placeholderTextColor="#8b5824"
                            onChangeText={(passwod) => this.setState({ password: passwod })}
                            style={style.textInput}
                            autoCapitalize={false}
                        />
                        <View style={{ paddingVertical: 8 }}>
                            <Button
                                title="LOGIN"
                                onPress={this._onLogin}
                            />
                        </View>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 20,
                    }}>
                        <View style={{marginBottom: 10,marginTop: 20, borderBottomWidth: 2, borderBottomColor: "#8b582424", width: "100%"}}/>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.textWhite}>Belum punya akun?</Text>
                            <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('register')}
                            >
                                <Text style={style.textWhite}> Daftar disini</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loadingLogin: state.authReducer.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        LoginAuth,
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);


