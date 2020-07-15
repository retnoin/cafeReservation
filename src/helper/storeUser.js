import AsyncStorage from "@react-native-community/async-storage"


const userStore = async () => {
    let user = await AsyncStorage.getItem('user');
    let token = await AsyncStorage.getItem('tokenDevice');

    return {
        user,
        token
    }
};

export default userStore;

