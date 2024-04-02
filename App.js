import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationRow from './src/components/NavigationRow'
import HomeScreen from './src/components/screens/HomeScreen';
import CartScreen from './src/components/reused/cart/CartScreen';
import SearchScreen from './src/components/screens/search/SearchScreen';
import AccountScreen from './src/components/screens/AccountScreen';
import Header from './src/components/Header';
import ProductPage from "./src/components/Product/ProductPage";

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <View style={styles.container}>
            <Header/>
            <NavigationContainer>
                <NavigationRow/>
                <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="Cart" component={CartScreen}/>
                    <Stack.Screen name="Search" component={SearchScreen}/>
                    <Stack.Screen name="Account" component={AccountScreen}/>
                    <Stack.Screen name="productPage" component={ProductPage}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // height: '100%',
        flex: 1,
        top: 50,
        backgroundColor: "#E8EBEE",
        // paddingBottom: 200
    },
    BGImage: {
        flex: 0.5,
        justifyContent: 'center',
        width: '100%'
    }
});
