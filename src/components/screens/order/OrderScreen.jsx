import {StyleSheet, ScrollView} from 'react-native';
import OrderAddress from "./orderSteps/OrderAddress";
import OrderDiscount from "./orderSteps/OrderDiscount";
import OrderPayment from "./orderSteps/OrderPayment";
import {useState} from "react";

const OrderScreen = () => {
    const [screen, setScreen] = useState('screen')
    const handler = text => setScreen(text)
    return (
        <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{rowGap: 10, paddingBottom: 200, padding: 10}} alignItems='column'>
            {screen === 'screen' && <OrderAddress nextButtonHandler={()=>setScreen('discount')}/>}
            {screen === 'discount' && <OrderDiscount prevButtonHandler={()=>setScreen('screen')} nextButtonHandler={()=>setScreen('payment')}/>}
            {screen === 'payment' && <OrderPayment prevButtonHandler={()=>setScreen('discount')} nextButtonHandler={()=>{}}/>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
        padding: 10,
        gap: 10
    },
    input: {
        width: '80%',
        minHeight: 35,
        fontSize: 18,
        fontWeight: '500',
        borderColor: '#100F14',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        alignSelf: "flex-end"
    },
    inputsNames: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: "left"
        ,alignSelf: "flex-start"
    }
})

export default OrderScreen;
