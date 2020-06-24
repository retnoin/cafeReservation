import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Login from '../screens/Autentikasi/Login'
import Register from '../screens/Autentikasi/Register'
import keranjang from '../screens/Keranjang/Keranjang';
import { ceksession } from '../redux/actions/authActions';

import { COLOR } from '../components/common/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from '../screens/Home/Home';
import DetailProduk from '../screens/DetailProduk/DetailProduk';
import DaftarMeja from '../screens/Meja/DaftarMeja';
import Meja from '../screens/Meja/Meja';
import SplashScreen from '../screens/Splash/SplashScreen';
import Profil from '../screens/Profil/Profil';
import Keranjang from '../screens/Keranjang/Keranjang';
import Pesan from '../screens/Booking/Pesan';
import KodeBooking from '../screens/Booking/KodeBooking';
import Detailbooking from '../screens/Booking/Detailbooking';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



const Stack = createStackNavigator()

const Tabs = createBottomTabNavigator()

export const AuthNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="homemain" component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="keranjang" component={Keranjang}
            />
            <Stack.Screen
                name="detailProduk" component={DetailProduk}
                options={{
                    headerTitle: "Menu",
                    headerTitleStyle: {
                        color: COLOR.primary_color
                    },
                    headerStyle: {
                        backgroundColor: COLOR.secondary_color
                    }
                }}
            />
        </Stack.Navigator>

    )
}

const BookingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="mainBook" component={KodeBooking}
                options={{
                    headerTitle: "Notifikasi",
                    headerTitleStyle: {
                        color: COLOR.primary_color
                    },
                    headerStyle: {
                        backgroundColor: COLOR.secondary_color
                    }
                }}
            />
            <Stack.Screen name="detailBooking" component={Detailbooking}
                options={{
                    headerTitle: "Detail Booking",
                    headerTitleStyle: { color: COLOR.primary_color },
                    headerStyle: { backgroundColor: COLOR.secondary_color }
                }}
            />
        </Stack.Navigator >
    )
}

const MejaStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="daftarMeja" component={DaftarMeja}
                options={{
                    headerTitle: "Daftar Meja",
                    headerTitleStyle: {
                        color: COLOR.primary_color
                    },
                    headerStyle: {
                        backgroundColor: COLOR.secondary_color
                    }
                }}
            />
            <Stack.Screen name="detailMeja" component={Meja}
                options={{
                    headerTitle: "Detail Meja",
                    headerTitleStyle: { color: COLOR.primary_color },
                    headerStyle: { backgroundColor: COLOR.secondary_color }
                }}
            />
            <Stack.Screen
                name="pesan" component={Pesan}
                options={{
                    headerTitle: "Pesan",
                    headerTitleStyle: {
                        color: COLOR.primary_color
                    },
                    headerStyle: {
                        backgroundColor: COLOR.secondary_color
                    }
                }}
            />
        </Stack.Navigator >
    )
}

const authStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="auth" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export const MainTabs = () => {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: '#8b5824'
            }}>
            <Tabs.Screen
                name="homestack" component={HomeStack}
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" size={25} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="mejastack" component={MejaStack}
                options={{
                    title: "Booking",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="notebook-multiple" size={20} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="kodebooking" component={BookingStack}
                options={{
                    title: "Notifikasi",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="notifications" size={25} color={color} />
                    )
                }} />
            <Tabs.Screen
                name="profil" component={Profil}
                options={{
                    title: "Profil",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" size={25} color={color} />
                    )
                }} />
        </Tabs.Navigator>
    )
}

class MainNavigation extends Component {
    state = {
        isLoading: true
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 2000);
        this.props.ceksession();
    }

    render() {
        console.log("USER :", this.props.user);
        if (this.state.isLoading) {
            return <SplashScreen />
        }
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}>
                    {
                        this.props.user == undefined
                            ? <Stack.Screen name="login" component={authStack} />
                            : <Stack.Screen name="mainApps" component={MainTabs} />
                    }
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const mapStateTopProps = (state) => ({
    user: state.authReducer.user
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ceksession
    }, dispatch);
}


export default connect(mapStateTopProps, mapDispatchToProps)(MainNavigation);
