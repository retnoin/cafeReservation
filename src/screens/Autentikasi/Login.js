import React, { useState, Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Alert, Image, Dimensions, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native'
import { connect } from 'react-redux';
import { LoaderModal } from '../../components/common/Loader';
// TODO actions

import { LoginAuth } from '../../redux/actions/authActions';
import { bindActionCreators } from 'redux';

const { width, height } = Dimensions.get('screen');

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    _onLogin = () => {
        this.props.LoginAuth(this.state.username, this.state.password)
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {(this.props.loadingLogin) && <LoaderModal title="Loging In.." />}
                <ImageBackground
                    source={require('../../assets/bg.jpeg')}
                    style={style.container} >
                    <View style={style.containerLogin}>
                        {/* <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>LOGIN</Text> */}
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../../assets/logo.png')}
                                style={{ width: width / 2, height: width / 2 }}
                            />
                        </View>
                        <TextInput
                            placeholder="username"
                            onChangeText={(username) => this.setState({ username: username })}
                            style={style.textInput}
                            autoCapitalize={false}
                        />
                        <TextInput
                            placeholder="passwod"
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
                        bottom: 10,
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Belum punya akun?</Text>
                            <TouchableOpacity
                            // onPress={() => this.props.navigation.navigate('register')}
                            >
                                <Text>daftar disin</Text>
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





const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fde3a7',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerLogin: {
        width: width - 40,
        // backgroundColor: 'blue'
    },
    textInput: {
        marginVertical: 20,
        padding: 15,
        borderWidth: 0.5,
        borderRadius: 10
    }
})

