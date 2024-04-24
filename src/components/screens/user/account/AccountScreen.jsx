import {ScrollView, StyleSheet, View} from 'react-native';
import UserOrdersList from "./userOrders/UserOrdersList";
import UserProfileInfo from "./UserProfileInfo";

const AccountScreen = () => {
    return (
        <View style={styles.container}>
            <UserProfileInfo/>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{rowGap: 25, paddingBottom: 200, paddingTop: 50}} alignItems='column'>
                <UserOrdersList/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#5552FF',
        gap: 10,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        width: '90%'
    },
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    textInfo: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff'
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff',
        textAlign: "left",
        width: '90%'
    },
    title: {
        fontSize: 24,
        marginLeft: '5%'
    }
})

export default AccountScreen
