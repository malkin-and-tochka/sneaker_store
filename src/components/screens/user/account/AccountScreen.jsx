import {ScrollView, StyleSheet, Text, View} from 'react-native';
import UserOrdersList from "./userOrders/UserOrdersList";
import UserProfileInfo from "./UserProfileInfo";
import {useDispatch, useSelector} from "react-redux";
import {getFirstName, setAllAccountInfo, setRoles} from "../../../../redux/reducers/accauntReducer";
import {useEffect} from "react";
import {getAccountData, getAccountRoles} from "../../../../api/accountApi";

const AccountScreen = () => {
    const username = useSelector(getFirstName)
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            const data = await getAccountData()
            const roles = await getAccountRoles()
            if (data) dispatch(setAllAccountInfo(data))
            if (roles) dispatch(setRoles(roles))
        })();
    }, []);
    return (
        <View style={styles.container}>
            <UserProfileInfo/>
            <Text style={styles.title}>{username} orders:</Text>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{rowGap: 25, paddingBottom: 200, paddingTop: 20}} alignItems='column'>
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
    title: {
        fontSize: 24,
        marginLeft: '5%'
    }
})

export default AccountScreen
