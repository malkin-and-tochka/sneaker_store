import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, View} from "react-native";
import CustomButton from "../../../reused/CustomButton";
import {AntDesign} from "@expo/vector-icons";

const NextStepButton = ({propsStyles, navigatePath, handler, navigationProps}) => {
    const navigation = useNavigation()
    const combineHandler = () => {
        handler()
        if (navigatePath) navigation.navigate(navigatePath, navigationProps)
    }
    return (
        <CustomButton propStyles={[{
            borderRadius: 10,
            width: 160,
            height: 50,
            backgroundColor: '#ABDD48',
            borderWidth: 0,
            alignSelf: 'flex-end'
        }, propsStyles]}
                      textStyles={{fontSize: 25, fontWeight: '500'}} fill={true} handle={combineHandler}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Text style={{fontSize: 25, color: '#000'}}>Next step</Text>
                <AntDesign name="right" size={24} color="black"/>
            </View>
        </CustomButton>
    );
};

export default NextStepButton;
