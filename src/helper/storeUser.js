import AsyncStorage from "@react-native-community/async-storage"


const userStore = async () => {
    let user = await AsyncStorage.getItem('user');

    return {
        user
    }
};

export default userStore;

