import { View, StyleSheet, Pressable, Text} from "react-native";

const Paginator = ({totalPages, setCurrentPage, currentPage}) => {
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);

    return (
        <View style={styles.paginatorWrapper}>
            {pages.map((page) => (
                <Pressable style={[styles.regularButton, page === currentPage ? styles.activeButton : {}]} key={page} onPress={() => setCurrentPage(page)}>
                    <Text style={styles.regularText}>{page}</Text>
                </Pressable>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    paginatorWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "center",
        gap: 10
    },
    activeButton: {
        backgroundColor: '#100F14',
    },
    regularButton: {
        backgroundColor: '#808080',
        width: 40,
        height: 45,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    regularText: {
        color: '#F5F5F5',
        fontSize: 20
    }
})

export default Paginator
