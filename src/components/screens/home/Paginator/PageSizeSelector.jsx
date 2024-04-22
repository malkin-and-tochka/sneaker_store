import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getPageSize, setPageSize} from "../../../../redux/reducers/paginatorReducer";

const PageSizeSelector = () => {
    const [menuVisible, setMenuVisible] = useState(false)
    const options = [5, 10, 15, 20];
    const pageSize = useSelector(getPageSize)
    const dispatch = useDispatch()
    const setNewPageSize = newPageSize => {
        if (pageSize !== newPageSize) {
            dispatch(setPageSize(newPageSize))
            setMenuVisible(false)
        }
    }
    return (
        <View>
            <Pressable style={styles.button} onPress={() => setMenuVisible(prevState => !prevState)}>
                <Text style={styles.textButton}>Select page size</Text>
            </Pressable>
            {menuVisible && <View style={styles.menu}>
                {options.map(el => <TouchableOpacity
                    key={el}
                    onPress={()=>setNewPageSize(el)}
                    style={[styles.microButtonsRegular, pageSize === el ? styles.activeMicroButton : {}]}>
                    <Text style={styles.microButtonsText}>
                        {el}
                    </Text>
                </TouchableOpacity>)}
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        top: 35,
        left: 0,
        backgroundColor: '#100F14',
        width: 160,
        zIndex: 100,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        height: 40
    },
    button: {
        backgroundColor: '#100F14',
        width: 160,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 5
    },
    textButton: {
        color: '#f5f5f5',
        fontSize: 16
    },
    microButtonsText: {
        color: '#f5f5f5',
        fontSize: 16
    },
    microButtonsRegular: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#808080',
        width: 40
    },
    activeMicroButton: {
        backgroundColor: '#100F14'
    }
})

export default PageSizeSelector
