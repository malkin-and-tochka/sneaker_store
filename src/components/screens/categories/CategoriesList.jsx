import {useDispatch, useSelector} from "react-redux";
import {getAllCategories, setCategories} from "../../../redux/reducers/categoriesReducer";
import {ScrollView, StyleSheet, Text} from "react-native";
import {useEffect} from "react";
import {getCategories} from "../../../api/categoriesApi";
import CustomButton from "../../reused/CustomButton";
import {useNavigation} from "@react-navigation/native";
import CategoryDescription from "./CategoryDescription";

const CategoriesList = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    useEffect(() => {
        (async ()=>{
            const res = await getCategories()
            // console.log('categories', res)
            if(res) dispatch(setCategories(res))
        })()
    }, []);
    const categoriesList = useSelector(getAllCategories)
    const categoriesListToComponent = categoriesList.map(el =><CategoryDescription key={el.id} name={el.name} description={el.description} id={el.id} image={el.imageResponseList[0]}/> )
    return (
        <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{alignItems: 'center'}} alignItems='column'>
            {categoriesListToComponent}
        </ScrollView>
    );
};

const styles = StyleSheet.create({

})

export default CategoriesList;
