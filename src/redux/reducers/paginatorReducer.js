export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

const initialState = {
    pageSize: 5,
    currentPage: 1
};

export const paginatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.size,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.newCurrentPage,
            };
        default:
            return state;
    }
};

export const setPageSize = size => ({type: SET_PAGE_SIZE, size});
export const setCurrentPage = newCurrentPage => ({type: SET_CURRENT_PAGE, newCurrentPage});

export const getPageSize = (state) => state.pagination.pageSize;
export const getCurrentPage = (state) => state.pagination.currentPage;
