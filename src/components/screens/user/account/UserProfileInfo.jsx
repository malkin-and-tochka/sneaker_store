import React, {useEffect, useState} from 'react';
import {getAccountData, getAccountRoles, updateAccountData} from "../../../../api/accountApi";
import {
    getAccountInfoSelector,
    isUserAdmin,
    setAllAccountInfo, setEmail, setFirstName, setLastName, setMobilePhone,
    setRoles
} from "../../../../redux/reducers/accauntReducer";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet, Text, View} from "react-native";
import FormElement from "../admin/FormElement";
import CustomButton from "../../../reused/CustomButton";

const UserProfileInfo = () => {
    useEffect(() => {
        (async () => {
            const data = await getAccountData()
            const roles = await getAccountRoles()
            if (data) dispatch(setAllAccountInfo(data))
            if (roles) dispatch(setRoles(roles))
        })();

    }, []);

    const navigation = useNavigation()
    const accountInfo = useSelector(getAccountInfoSelector);
    const isAdmin = useSelector(isUserAdmin)
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);
    const [newInfo, setNewInfo] = useState({...accountInfo});
    const [newInfoErrors, setNewInfoErrors] = useState({
        mobilePhone: '',
        lastName: '',
        firstName: ''
    });

    const handleEdit = () => {
        setEditMode(true);
    };
    const handleMobilePhoneChange = (text) => setNewInfo((prevInfo) => ({...prevInfo, mobilePhone: text}));
    const handleLastNameChange = (text) => setNewInfo((prevInfo) => ({...prevInfo, lastName: text}));
    const handleFirstNameChange = (text) => setNewInfo((prevInfo) => ({...prevInfo, firstName: text}));

    const handleSave = async () => {
        setNewInfoErrors({
            mobilePhone: '',
            lastName: '',
            firstName: ''
        })
        let valid = true
        if (JSON.stringify(accountInfo) === JSON.stringify(newInfo)) {
            setEditMode(false);
            valid = false
        }
        if (newInfo.firstName.length === 0 || newInfo.firstName.length > 120) {
            setNewInfoErrors(prevState => ({...prevState, firstName: 'Size has to be between 1 and 120'}))
            valid = false
        }
        if (newInfo.lastName.length === 0 || newInfo.lastName.length > 120) {
            setNewInfoErrors(prevState => ({...prevState, lastName: 'Size has to be between 1 and 120'}))
            valid = false
        }
        if (valid) {
            const res = await updateAccountData(newInfo.firstName, newInfo.lastName, newInfo.mobilePhone)
            if (res.code === '400'){
                setNewInfoErrors(prevState => ({...prevState, ...res.value}))
            } else {
                dispatch(setFirstName(newInfo.firstName));
                dispatch(setLastName(newInfo.lastName));
                dispatch(setEmail(newInfo.email));
                dispatch(setMobilePhone(newInfo.mobilePhone));
                setEditMode(false);
            }
        }
    };
    return (
        <View style={styles.wrapper}>
            {editMode ? (
                <>
                    <FormElement validator={newInfoErrors.firstName} textStyles={styles.text} handle={text => handleFirstNameChange(text)}
                                 value={newInfo.firstName} title={'Your first name'}
                                 label={'Your first name'}/>
                    <FormElement validator={newInfoErrors.lastName} textStyles={styles.text} handle={text => handleLastNameChange(text)}
                                 value={newInfo.lastName} title={'Your last name'}
                                 label={'Your last name'}/>
                    <FormElement validator={newInfoErrors.mobilePhone} textStyles={styles.text} handle={text => handleMobilePhoneChange(text)}
                                 value={newInfo.mobilePhone} title={'Your mobile phone'}
                                 label={'Your mobile phone'}/>
                    <CustomButton handle={handleSave} buttonText={"Save"} fill={true} propStyles={{height: 40}}/>
                </>
            ) : (
                <>
                    <Text style={styles.textInfo}>First name: {accountInfo.firstName}</Text>
                    <Text style={styles.textInfo}>Last name: {accountInfo.lastName}</Text>
                    <Text style={styles.textInfo}>Email: {accountInfo.email}</Text>
                    <Text style={styles.textInfo}>Mobile
                        phone: {accountInfo.mobilePhone ? accountInfo.mobilePhone : 'Empty'}</Text>
                    <CustomButton handle={handleEdit} buttonText={"Change"} fill={true} propStyles={{height: 40}}/>
                </>
            )}
            {isAdmin &&
                <CustomButton buttonText={'Admin page'} fill={true} handle={() => navigation.navigate('Admin')}/>}
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

export default UserProfileInfo;
