import {View, StyleSheet, TextInput} from "react-native";

const SearchInput = ({setSearchString,searchString}) => {

    return (
        <TextInput onChangeText={text=>setSearchString(text)} value={searchString} style={styles.textInput} placeholder='search...'/>
    );
};

const styles = StyleSheet.create({
    textInput: {

    }
})

export default SearchInput;
