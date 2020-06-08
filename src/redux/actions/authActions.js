import { AUTH_SERVICE } from '../../utils/Constants';
import { ToastAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { base_url } from '../../utils/config';


export const LoginAuth = (email, password) => {
    return ((dispatch) => {
        dispatch({
            type: AUTH_SERVICE.REQ_LOGIN_APPS
        });                                                                                                              
        console.log(email, password)
        fetch(`${base_url}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then((res) => res.json())
            .then((res) => {
                console.info("RESPONSE :", res);
                if (res.status == 200) {
                    dispatch({
                        type: AUTH_SERVICE.SUCCES_LOGIN_APPS,
                        payload: "Indah BUll"
                    });
                    AsyncStorage.setItem('user',res.email);
                    ToastAndroid.show(res.message, ToastAndroid.SHORT)
                } else {
                    dispatch({
                        type: AUTH_SERVICE.FAILED_LOGIN_APPS,
                    });
                    Alert.alert("Gagal", res.message);
                }
            }).catch((err) => {
                dispatch({
                    type: AUTH_SERVICE.FAILED_LOGIN_APPS,
                });
                Alert.alert('Gagal', "Waktu Request Habis.")
            })
    })
}

export const logout = () => {
    return ((dispatch) => {
        console.log("LOGOUT")
        dispatch({
            type: AUTH_SERVICE.LOGOUT_USER
        });
        AsyncStorage.removeItem('user');
    })
}

export const ceksession = () => {
    return (async(dispatch) => {
        var user = await AsyncStorage.getItem('user')
        dispatch({
            type: AUTH_SERVICE.REQ_SESSION
        })
        dispatch({
            type: AUTH_SERVICE.SUCCES_LOGIN_APPS,
            payload: user
        });
        if (user !== undefined) {
            dispatch(AUTH_SERVICE.SESSION_SUCCES)
        } else {
            AUTH_SERVICE.FAILED_LOGIN_APPS
        }
    })
}