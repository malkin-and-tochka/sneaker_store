import {useMemo} from "react";
import Paginator from "./Paginator";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getPageSize, setCurrentPage} from "../../../../redux/reducers/paginatorReducer";
import Product from "../../../Product/Product";
import GoBackButton from "../../../navigation/GoBackButton";

const PaginatorView = ({items}) => {
    // if (items.length === 0) return <><Text>Empty :(</Text><GoBackButton/></>
    const dispatch = useDispatch()
    const currentPage = useSelector(getCurrentPage)
    const itemsPerPage = useSelector(getPageSize);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);
    const setNewCurrentPage = newCurrentPage => dispatch(setCurrentPage(newCurrentPage))
    const ProductsToJSX = useMemo(() => currentItems.map(el => <Product key={el.id}
                                                                        description={el.description}
                                                                        price={el.price}
                                                                        images={el.imageResponseList}
                                                                        categoryName={el.categoryName}
                                                                        name={el.name}
                                                                        colors={el.colors}
                                                                        id={el.id}
                                                                        sizes={el.sizes}/>), [currentItems])
    return (
        <>
            {ProductsToJSX}
            <Paginator totalPages={totalPages} setCurrentPage={setNewCurrentPage} currentPage={currentPage}/>
        </>
    );
}

export default PaginatorView
