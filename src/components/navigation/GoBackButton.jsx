import React from 'react';
import CustomButton from "../reused/CustomButton";
import {useNavigation} from "@react-navigation/native";
import {AntDesign} from '@expo/vector-icons';

const GoBackButton = ({propsStyles, handler}) => {
    const navigation = useNavigation()
    return (
        <CustomButton propStyles={[{borderRadius: 15, width: 50, height: 50}, propsStyles]}
                      textStyles={{fontSize: 25, fontWeight: '500'}} fill={true} handle={handler ? handler : () => navigation.goBack()}>
            <AntDesign name="left" size={24} color="white"/>
        </CustomButton>
    );
};

export default GoBackButton;
