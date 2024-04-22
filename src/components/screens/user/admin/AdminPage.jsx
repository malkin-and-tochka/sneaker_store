import {View, StyleSheet, ScrollView} from "react-native";
import CreateProduct from "./CreateProduct";
import CreateCategory from "./CreateCategory";
import GoBackButton from "../../../navigation/GoBackButton";
import {useState} from "react";
import CustomButton from "../../../reused/CustomButton";
import CreateDiscount from "./CreateDiscount";

const AdminPage = () => {
    const [adminOptions, setAdminOptions] = useState('product')
    return (
        <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={[{paddingBottom: 200, paddingTop: 20}, styles.container]}
                    alignItems='column'>
            <View style={styles.row}>
                <CustomButton propStyles={styles.rowButtons} buttonText={'Product'}
                              handle={() => setAdminOptions('product')} fill={adminOptions !== 'product'}/>
                <CustomButton propStyles={styles.rowButtons} buttonText={'Category'}
                              handle={() => setAdminOptions('category')} fill={adminOptions !== 'category'}/>
                <CustomButton propStyles={styles.rowButtons} buttonText={'Discount'}
                              handle={() => setAdminOptions('discount')} fill={adminOptions !== 'discount'}/>
            </View>
            {adminOptions === 'product' ? <CreateProduct/> : null}
            {adminOptions === 'category' ? <CreateCategory/> : null}
            {adminOptions === 'discount' ? <CreateDiscount/> : null}
            <GoBackButton propsStyles={{alignSelf: 'flex-start', marginLeft: '5%'}}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#F5F5F5',
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        width: '90%',
        justifyContent: "space-between",
        marginBottom: 20
    },
    rowButtons: {
        width: '30%'
    }
});

export default AdminPage;
