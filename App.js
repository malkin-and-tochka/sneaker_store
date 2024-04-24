import {StatusBar, StyleSheet, View} from 'react-native';
import {Provider} from "react-redux";
import {store} from "./src/redux/store";
import Navigation from "./src/components/navigation/Navigation";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

export default function App() {
    return (
        <View style={styles.container}>
            <Provider store={store}>
                <StatusBar/>
                <Navigation/>
            </Provider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EBEE",
    }
});
