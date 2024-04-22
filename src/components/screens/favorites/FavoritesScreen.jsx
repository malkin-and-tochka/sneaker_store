import {StyleSheet, Text, ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import FavoritesItem from "./FavoritesItem";
import {useEffect} from "react";
import {getFavorites} from "../../../api/favoritesApi";
import {getFavList, setFavorites} from "../../../redux/reducers/favoritesReducer";
import IsEmpty from "../../reused/IsEmpty";

const FavoritesScreen = () => {
    const favList = useSelector(getFavList)
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            const data = await getFavorites()
            if (data.length !== 0) dispatch(setFavorites(data))
        })()
    }, []);
    if (favList.length === 0) return <IsEmpty context={'Favorites'}/>
    const favListComponents = favList.map(el => <FavoritesItem key={el.id} id={el.id}
                                                               img={el.imageResponseList[0].url} name={el.name}
                                                               price={el.price}
                                                               categoryName={el.categoryName}/>
    )
    return (
        <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{rowGap: 25, paddingBottom: 200}}
                    alignItems='column'>
            {favListComponents}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        gap: 10
    }
})

export default FavoritesScreen;
