import {useDispatch, useSelector} from "react-redux";
import {getAllCategories, setCategories} from "../../../redux/reducers/categoriesReducer";
import {RefreshControl, ScrollView} from "react-native";
import {useCallback, useEffect, useState} from "react";
import {getCategories} from "../../../api/categoriesApi";
import CategoryDescription from "./CategoryDescription";

const CategoriesList = () => {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        (async () => {
            const res = await getCategories()
            if(res) dispatch(setCategories(res))
            setRefreshing(false);
        })()
    }, []);
    useEffect(() => {
        (async ()=>{
            const res = await getCategories()
            if(res) dispatch(setCategories(res))
        })()
    }, []);
    const categoriesList = useSelector(getAllCategories)
    const categoriesListToComponent = categoriesList.map(el =><CategoryDescription key={el.id} name={el.name} description={el.description} id={el.id} image={el.imageResponseList[0]}/> )
    return (
        <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{alignItems: 'center', paddingBottom: 200}} alignItems='column'
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            {categoriesListToComponent}
        </ScrollView>
    );
};
export default CategoriesList;
