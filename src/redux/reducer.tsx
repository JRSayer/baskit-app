import { v4 as uuid } from 'uuid';

export const ADD_CATEGORY = 'ADD_CATEGORY';

export const addCategory = (categoryName:string, categoryColor:string) => ({
    type: ADD_CATEGORY,
    payload: {
        categoryName,
        categoryColor
    }
});

const INTIAL_STATE = {
    categoriesData: [
        {
            categoryId: 'f26d7e51-788d-4129-b2cb-f1f2c48f5a55',
            categoryName: 'Default Category',
            categoryColor: '#000'
        }
    ],
    itemsData: [],
    selectCategoryId: 'f26d7e51-788d-4129-b2cb-f1f2c48f5a55'
};

const rootReducer = (state = INTIAL_STATE, action:any) => {
    switch (action.type) {
        case ADD_CATEGORY:
            const id: string = uuid();
            return {
                ...state,
                categoriesData: state.categoriesData.concat({
                    categoryId: id,
                    categoryName: action.payload.categoryName,
                    categoryColor: action.payload.categoryColor
                })
            }
        default:
            return state
    }
};

export default rootReducer;