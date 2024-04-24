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
import {useEffect} from "react";
import {refresh} from "../../api/authApi";
import OrderScreen from "../screens/order/OrderScreen";
import CategoriesList from "../screens/categories/CategoriesList";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import CategoryProductsScreen from "../screens/categories/CategoryProductsScreen";
import UserOrderScreen from "../screens/user/account/userOrders/UserOrderScreen";
import {Text, TouchableOpacity} from "react-native";
import Header from "../reused/Header";


const Stack = createNativeStackNavigator()

const Navigation = () => {
    const isUserAuth = useSelector(getIsAuth)
    return (
        <NavigationContainer>
            <Header/>
            <NavigationRow/>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={'Home'}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Cart" component={isUserAuth ? CartScreen : CombineForm}/>
                <Stack.Screen name="Account" component={isUserAuth ? AccountScreen : CombineForm}/>
                <Stack.Screen name="productPage" component={ProductPage}/>
                <Stack.Screen name="Admin" component={AdminPage}/>
                <Stack.Screen name="CombineForm" component={CombineForm}/>
                <Stack.Screen name="Categories" component={CategoriesList}/>
                <Stack.Screen name="Favorites" component={isUserAuth ? FavoritesScreen : CombineForm}/>
                <Stack.Screen name="CategoryScreen" component={CategoryProductsScreen}/>
                <Stack.Screen name="OrderScreen" component={OrderScreen}/>
                <Stack.Screen name="UserOrders" component={UserOrderScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation
