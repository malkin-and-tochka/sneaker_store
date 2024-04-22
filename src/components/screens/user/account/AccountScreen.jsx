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
import FormElement from "../admin/FormElement";

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
            <View style={styles.wrapper}>
                {editMode ? (
                    <>
                        <FormElement textStyles={styles.text} handle={text => handleFirstNameChange(text)} value={newInfo.firstName} title={'Your first name'}
                                     label={'Your first name'}/>
                        <FormElement textStyles={styles.text} handle={text => handleLastNameChange(text)} value={newInfo.lastName} title={'Your last name'}
                                     label={'Your last name'}/>
                        <FormElement textStyles={styles.text} handle={text => handleEmailChange(text)} value={newInfo.email} title={'Your email'}
                                     label={'Your email'}/>
                        <FormElement textStyles={styles.text} handle={text => handleMobilePhoneChange(text)} value={newInfo.mobilePhone} title={'Your mobile phone'}
                                     label={'Your mobile phone'}/>
                        <CustomButton handle={handleSave} buttonText={"Save"} fill={true} propStyles={{height: 40}}/>
                    </>
                ) : (
                    <>
                        <Text style={styles.textInfo}>First name:  {accountInfo.firstName}</Text>
                        <Text style={styles.textInfo}>Last name:  {accountInfo.lastName}</Text>
                        <Text style={styles.textInfo}>Email:  {accountInfo.email}</Text>
                        <Text style={styles.textInfo}>Mobile phone:  {accountInfo.mobilePhone ? accountInfo.mobilePhone : 'Empty'}</Text>
                        <CustomButton handle={handleEdit} buttonText={"Change"} fill={true} propStyles={{height: 40}}/>
                    </>
                )}
                {isAdmin && <CustomButton buttonText={'Admin page'} fill={true} handle={()=>navigation.navigate('Admin')}/>}
            </View>
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
})

export default AccountScreen
