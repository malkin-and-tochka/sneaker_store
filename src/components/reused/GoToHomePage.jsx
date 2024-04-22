
import {Pressable} from "react-native";
import CustomButton from "./CustomButton";
import {useNavigation} from "@react-navigation/native";

const GoToHomePage = () => {
    const navigation = useNavigation()
    return (
        <CustomButton buttonText={'Go back'} fill={true} handle={()=>navigation.navigate('Home')} propStyles={{width: 100, height: 40}}/>
    );
};

export default GoToHomePage;
