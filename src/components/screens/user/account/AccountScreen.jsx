import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from "react";
import {
    getAccountInfoSelector, isUserAdmin, setAllAccountInfo,
    setEmail,
    setFirstName,
    setLastName,
    setMobilePhone, setRoles
} from "../../../../redux/reducers/accauntReducer";
import {getAccountData, getAccountRoles, updateAccountData} from "../../../../api/accountApi";
import CustomButton from "../../../reused/CustomButton";
import {useNavigation} from "@react-navigation/native";
import {getOrders} from "../../../../api/orderApi";

const AccountScreen = () => {
    useEffect(() => {
        (async () => {
            const data = await getAccountData()
            const roles = await getAccountRoles()
            if (data) dispatch(setAllAccountInfo(data))
            if (roles) dispatch(setRoles(roles))
            const res = await getOrders()
            console.log(res)
        })();

    }, []);

    const navigation = useNavigation()
    const accountInfo = useSelector(getAccountInfoSelector);
    const isAdmin = useSelector(isUserAdmin)
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);
    const [newInfo, setNewInfo] = useState({...accountInfo});

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        if (JSON.stringify(accountInfo) === JSON.stringify(newInfo)) {
            setEditMode(false);
            return
        }
        dispatch(setFirstName(newInfo.firstName));
        dispatch(setLastName(newInfo.lastName));
        dispatch(setEmail(newInfo.email));
        dispatch(setMobilePhone(newInfo.mobilePhone));
        updateAccountData(newInfo.firstName, newInfo.lastName, newInfo.mobilePhone)
        setEditMode(false);
    };
    const handleFirstNameChange = useCallback((text) => {
        setNewInfo((prevInfo) => ({...prevInfo, firstName: text}));
    }, []);

    const handleLastNameChange = useCallback((text) => {
        setNewInfo((prevInfo) => ({...prevInfo, lastName: text}));
    }, []);

    const handleEmailChange = useCallback((text) => {
        setNewInfo((prevInfo) => ({...prevInfo, email: text}));
    }, []);

    const handleMobilePhoneChange = useCallback((text) => {
        setNewInfo((prevInfo) => ({...prevInfo, mobilePhone: text}));
    }, []);

    return (
        <View style={styles.container}>
            {editMode ? (
                <>
                    <TextInput value={newInfo.firstName} placeholder={'Your first name'} onChangeText={handleFirstNameChange}/>
                    <TextInput value={newInfo.lastName} placeholder={'Your last name'} onChangeText={handleLastNameChange}/>
                    <TextInput value={newInfo.email} placeholder={'Your email'} onChangeText={handleEmailChange}/>
                    <TextInput value={newInfo.mobilePhone} placeholder={'Your mobile phone'} onChangeText={handleMobilePhoneChange}/>
                    <CustomButton handle={handleSave} buttonText={"Сохранить"} fill={true} propStyles={{height: 40}}/>
                </>
            ) : (
                <>
                    <Text style={styles.textInfo}>First name:  {accountInfo.firstName}</Text>
                    <Text style={styles.textInfo}>Last name:  {accountInfo.lastName}</Text>
                    <Text style={styles.textInfo}>Email:  {accountInfo.email}</Text>
                    <Text style={styles.textInfo}>Mobile phone:  {accountInfo.mobilePhone ? accountInfo.mobilePhone : 'Empty'}</Text>
                    <CustomButton handle={handleEdit} buttonText={"Изменить"} fill={true} propStyles={{height: 40}}/>
                </>
            )}
            {isAdmin && <CustomButton buttonText={'Admin page'} fill={true} handle={()=>navigation.navigate('Admin')}/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: 10,
        padding: 10
    },
    textInfo: {
        fontSize: 20,
        fontWeight: '500',
    }
})

export default AccountScreen
