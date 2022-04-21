import { v4 as uuid } from 'uuid';

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const addCategory = (categoryName:string, categoryColor:string) => ({
    type: ADD_CATEGORY,
    payload: {
        categoryName,
        categoryColor
    }
});
export const removeCategory = (categoryId:string) => ({
    type: REMOVE_CATEGORY,
    payload: categoryId
});

export const addItem = (itemCategoryId:string, itemName:string, itemNotes:string, itemQuantityWanted:number, itemQuantityOwned:number) => ({
    type: ADD_ITEM,
    payload: {
        itemCategoryId,
        itemName,
        itemNotes,
        itemQuantityWanted,
        itemQuantityOwned

    }
});
export const removeItem = (itemId:string) => ({
    type: REMOVE_ITEM,
    payload: itemId
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
            const genCategoryId: string = uuid();
            return {
                ...state,
                categoriesData: state.categoriesData.concat({
                    categoryId: genCategoryId,
                    categoryName: action.payload.categoryName,
                    categoryColor: action.payload.categoryColor
                })
            }
        case REMOVE_CATEGORY:
            return {
                ...state,
                categoriesData: state.categoriesData.filter(item => item.categoryId !== action.payload)
            }
        case ADD_ITEM:
            const genItemId: string = uuid();
            return {
                ...state,
                itemsData: state.itemsData.concat({
                    itemId: genItemId,
                    itemCategory: action.payload.itemCategoryId,
                    itemName: action.payload.itemName,
                    itemNotes: action.payload.itemNotes,
                    itemQuantityWanted: action.payload.itemQuantityWanted,
                    itemQuantityOwned: action.payload.itemQuantityOwned,
                    itemCheckedInList: false
                })
            }
        case REMOVE_ITEM:
            return {
                ...state,
                itemsData: state.itemsData.filter(item => item.itemId !== action.payload)
            }
        default:
            return state
    }
};

export default rootReducer;