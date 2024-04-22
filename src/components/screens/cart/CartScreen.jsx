import {StyleSheet, ScrollView} from "react-native";
import CartItem from "./cartItem/CartItem";
import {useDispatch, useSelector} from "react-redux";
import {getCartList, getTotalPrice} from "../../../redux/reducers/cartReducer";
import IsEmpty from "../../reused/IsEmpty";
import NextStepButton from "../order/orderSteps/NextStepButton";
import {setOrderProductsList} from "../../../redux/reducers/tempOrderReducer";

const CartScreen = () => {
    const cartList = useSelector(getCartList)
    const dispatch = useDispatch()
    if (cartList.length === 0) return <IsEmpty context={'Cart'}/>
    const cartListComponents = cartList.map(el => <CartItem key={`${el.product.id}${el.color}${el.size}`}
                                                            id={el.product.id} img={el.product.images[0]}
                                                            name={el.product.name} price={el.product.price}
                                                            categoryName={el.product.category} amount={el.amount}
                                                            color={el.color} size={el.size}/>)
    const setCartItemsToOrder = () => dispatch(setOrderProductsList(cartList))
    return (
        <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{rowGap: 25, paddingBottom: 200}} alignItems='column'
        >
            {cartListComponents}
            <NextStepButton handler={setCartItemsToOrder} navigatePath={'OrderScreen'} propsStyles={{marginRight: '5%'}}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        gap: 10
    }
})

export default CartScreen;
