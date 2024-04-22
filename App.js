import {StatusBar, StyleSheet, View} from 'react-native';
import Header from './src/components/reused/Header';
import {Provider} from "react-redux";
import {store} from "./src/redux/store";
import Navigation from "./src/components/navigation/Navigation";

export default function App() {
    return (
        <View style={styles.container}>
            <Provider store={store}>
                <StatusBar/>
                <Header/>
                <Navigation/>
            </Provider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EBEE",
        // paddingBottom: 200
    },
    BGImage: {
        flex: 0.5,
        justifyContent: 'center',
        width: '100%'
    }
});
