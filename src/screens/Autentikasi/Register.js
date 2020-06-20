import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, Button, Alert, Image, Dimensions, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native'
import style from "./style";
import * as Http from "../../helper/http";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'hello',
            email: '',
            phone: '',
            password: ''
        };
        // this._onLogin.bind(this) = this._onLogin();
    }

    componentWillMount(){
        // http.post('tes', 'baka','hello');
    }

    _onLogin(){
        let param = {
            link: 'user/add',
            method: 'post',
            data: {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password
            }
        }

        Http.post(param)
        .then((res) => {
            alert('Daftar berhasil');
            this.props.navigation.navigate('auth');
        })
        .catch((err) => {
            console.log('Erro');
        });
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
                            <Text style={{fontSize: 28, color: '#8b5824'}}>Register</Text>
                        </View>

                        <TextInput
                            placeholder="name"
                            placeholderTextColor="#8b5824"
                            onChangeText={(name) => this.setState({ name: name })}
                            style={style.textInput}
                            autoCapitalize={false}
                        />
                        <TextInput
                            placeholder="email"
                            placeholderTextColor="#8b5824"
                            onChangeText={(email) => this.setState({ email: email })}
                            style={style.textInput}
                            autoCapitalize={false}
                        />
                        <TextInput
                            placeholder="phone"
                            placeholderTextColor="#8b5824"
                            onChangeText={(phone) => this.setState({ phone: phone })}
                            style={style.textInput}
                            autoCapitalize={false}
                        />
                        <TextInput
                            placeholder="password"
                            placeholderTextColor="#8b5824"
                            onChangeText={(password) => this.setState({ password: password })}
                            style={style.textInput}
                            autoCapitalize={false}
                            secureTextEntry={true}
                        />
                        <View style={{ paddingVertical: 9, height: 100 }}>
                            <Button
                                title="LOGIN"
                                onPress={this._onLogin.bind(this)}
                            />
                        </View>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 10,
                    }}>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

export default Register;
