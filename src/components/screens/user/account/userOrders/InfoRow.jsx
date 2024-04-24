import {StyleSheet, Text, View} from "react-native";

const InfoRow = ({title, text}) => {
    return (
        <View style={styles.row}>
            <Text style={styles.rowText}>
                {title}
            </Text>
            <Text textBreakStrategy ='simple' style={styles.rowSubText}>
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        gap: 10,
        overflowWrap: 'break-word',
        justifyContent: 'space-between'
    },
    rowText: {
        fontSize: 18,
        color: '#808080',
        maxWidth: '25%'
    },
    rowSubText: {
        fontSize: 16,
        alignSelf: "flex-end",
        maxWidth: '70%'
    }
})
export default InfoRow;
