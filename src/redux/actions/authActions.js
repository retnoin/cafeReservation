import { AUTH_SERVICE } from '../../utils/Constants';
import { ToastAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { base_url } from '../../utils/config';


export const LoginAuth = (link, data) => {
    return ((dispatch) => {
        dispatch({
            type: AUTH_SERVICE.REQ_LOGIN_APPS
        });                    
        fetch(`${base_url}${link}`, {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => res.json())
            .then((res) => {
                console.log("RESPONSE :", res.data);
                if (res.status == 200) {
                    console.log('BANKAI >> ',res.data[0]);
                    if(res.data == ''){
                        dispatch({
                            type: AUTH_SERVICE.FAILED_LOGIN_APPS,
                            payload: "Indah BUll"
                        });
                        alert('Failed login');
                    }else{
                        dispatch({
                            type: AUTH_SERVICE.SUCCES_LOGIN_APPS,
                            payload: "Indah BUll"
                        });
                        AsyncStorage.setItem('user', JSON.stringify(res.data[0]));
                        ToastAndroid.show(res.message, ToastAndroid.SHORT)
                    }
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