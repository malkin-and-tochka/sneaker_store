import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import NavigationRow from "./NavigationRow";
import HomeScreen from "../screens/home/HomeScreen";
import CartScreen from "../screens/cart/CartScreen";
import AccountScreen from "../screens/user/account/AccountScreen";
import ProductPage from "../Product/ProductPage";
import CombineForm from "../screens/authorization/CombineForm";
import AdminPage from "../screens/user/admin/AdminPage";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, setAuth} from "../../redux/reducers/authReducer";
import NeedToAuth from "./NeedToAuth";
import {useEffect} from "react";
import {refresh} from "../../api/authApi";
import OrderScreen from "../screens/order/OrderScreen";
import CategoriesList from "../screens/categories/CategoriesList";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import CategoryProductsScreen from "../screens/categories/CategoryProductsScreen";
import OrderAddress from "../screens/order/orderSteps/OrderAddress";
import OrderDiscount from "../screens/order/orderSteps/OrderDiscount";
import OrderPayment from "../screens/order/orderSteps/OrderPayment";


const Stack = createNativeStackNavigator()

const Navigation = () => {
    const dispatch = useDispatch()
    const isUserAuth = useSelector(getIsAuth)
    console.log(isUserAuth)
    useEffect(() => {
        (async () => {
            const checkOnAuth = await refresh()
            if (checkOnAuth) {
                dispatch(setAuth(true))
            } else {
                dispatch(setAuth(false))
            }
        })()
    }, []);
    return (
        <NavigationContainer>
            {isUserAuth && <NavigationRow/>}
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={isUserAuth ? 'Home' : 'NeedToAuth'}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Cart" component={CartScreen}/>
                <Stack.Screen name="Account" component={AccountScreen}/>
                <Stack.Screen name="productPage" component={ProductPage}/>
                <Stack.Screen name="Admin" component={AdminPage}/>
                <Stack.Screen name="CombineForm" component={CombineForm}/>
                <Stack.Screen name="NeedToAuth" component={NeedToAuth}/>
                <Stack.Screen name="Categories" component={CategoriesList}/>
                <Stack.Screen name="Favorites" component={FavoritesScreen}/>
                <Stack.Screen name="CategoryScreen" component={CategoryProductsScreen}/>
                <Stack.Screen name="OrderScreen" component={OrderScreen}/>
                <Stack.Screen name="OrderAddress" component={OrderAddress}/>
                <Stack.Screen name="OrderDiscount" component={OrderDiscount}/>
                <Stack.Screen name="OrderPayment" component={OrderPayment}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation
