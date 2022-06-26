import { v4 as uuid } from 'uuid';

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const UPDATE_ITEM_SHOPPING = 'UPDATE_ITEM_SHOPPING';
export const UPDATE_ITEM_SHOPPING_CHECKED = 'UPDATE_ITEM_SHOPPING_CHECKED';
export const UPDATE_ITEM_QUANTITY_WANTED = 'UPDATE_ITEM_QUANTITY_WANTED';
export const UPDATE_ITEM_QUANTITY_OWNED = 'UPDATE_ITEM_QUANTITY_OWNED';

export const UPDATE_ITEM_PANTRY = 'UPDATE_ITEM_PANTRY';

export const UPDATE_SELECT_CATEGORY = 'UPDATE_SELECT_CATEGORY';


export const CLEAR_ITEMS_LIST = 'CLEAR_ITEMS_LIST';
export const CLEAR_ITEMS_PANTRY = 'CLEAR_ITEMS_PANTRY';
export const CLEAR_ITEMS_ALL = 'CLEAR_ITEMS_ALL';
export const CLEAR_CATEGORIES_ALL = 'CLEAR_CATEGORIES_ALL';
export const CLEAR_DATA_ALL = 'CLEAR_DATA_ALL';

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
export const updateCategory = (categoryId:string, newCategoryName:string, newCategoryColor:string) => ({
    type: UPDATE_CATEGORY,
    payload: {
        categoryId,
        newCategoryName,
        newCategoryColor
    }
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
export const updateItem = (itemId:string, newItemCategoryId:string, newItemName:string, newItemNotes:string, newItemQuantityWanted:number, newItemQuantityOwned:number) => ({
    type: UPDATE_ITEM,
    payload: {
        itemId, 
        newItemCategoryId, 
        newItemName, 
        newItemNotes, 
        newItemQuantityWanted,
        newItemQuantityOwned
    }
});
export const updateItemShopping = (itemId:string, newItemCategoryId:string, newItemName:string, newItemNotes:string, newItemQuantityWanted:number) => ({
    type: UPDATE_ITEM_SHOPPING,
    payload: {
        itemId, 
        newItemCategoryId, 
        newItemName, 
        newItemNotes, 
        newItemQuantityWanted
    }
});
export const updateItemShoppingChecked = (itemId: string, newItemCheckedInList: boolean) => ({
    type: UPDATE_ITEM_SHOPPING_CHECKED,
    payload: {
        itemId,
        newItemCheckedInList
    }
});
export const updateItemQuantityWanted = (itemId: string, newItemQuantityWanted: number) => ({
    type: UPDATE_ITEM_QUANTITY_WANTED,
    payload: {
        itemId,
        newItemQuantityWanted
    }
});
export const updateItemQuantityOwned = (itemId: string, newItemQuantityOwned: number) => ({
    type: UPDATE_ITEM_QUANTITY_OWNED,
    payload: {
        itemId,
        newItemQuantityOwned
    }
});

export const updateItemPantry = (itemId:string, newItemCategoryId:string, newItemName:string, newItemNotes:string, newItemQuantityOwned:number) => ({
    type: UPDATE_ITEM_PANTRY,
    payload: {
        itemId, 
        newItemCategoryId, 
        newItemName, 
        newItemNotes, 
        newItemQuantityOwned
    }
});

export const updateSelectCategory = (selectCategoryId:string) => ({
    type: UPDATE_SELECT_CATEGORY,
    payload: selectCategoryId
});

const INTIAL_STATE = {
    categoriesData: [
        {
            categoryId: 'f26d7e51-788d-4129-b2cb-f1f2c48f5a55',
            categoryName: 'Sample Category',
            categoryColor: '#000000'
        }
    ],
    itemsData: [
        {
            itemId: '49bd4e3f-616b-4a29-9567-aaacc1e31ee2',
            itemCategory: 'f26d7e51-788d-4129-b2cb-f1f2c48f5a55',
            itemName: 'This is a sample item',
            itemNotes: 'There aren\'t any notes here yet!',
            itemQuantityWanted: 1,
            itemQuantityOwned: 1,
            itemCheckedInList: false
        }
    ],
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
        case UPDATE_CATEGORY:
            return {
                ...state,
                categoriesData: state.categoriesData.map(category => {
                    if (category.categoryId === action.payload.categoryId) {
                        return {
                            ...category,
                            categoryName: action.payload.newCategoryName,
                            categoryColor: action.payload.newCategoryColor
                        }
                    }
                    return category
                })
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
        case UPDATE_ITEM:
            return {
                ...state,
                itemsData: state.itemsData.map(item => {
                    if (item.itemId === action.payload.itemId) {
                        return {
                            ...item,
                            itemCategory: action.payload.newItemCategoryId,
                            itemName: action.payload.newItemName,
                            itemNotes: action.payload.newItemNotes,
                            itemQuantityWanted: action.payload.newItemQuantityWanted,
                            itemQuantityOwned: action.payload.newItemQuantityOwned
                        }
                    }
                    return item
                })
            }
        case UPDATE_ITEM_SHOPPING:
            return {
                ...state,
                itemsData: state.itemsData.map(item => {
                    if (item.itemId === action.payload.itemId) {
                        return {
                            ...item,
                            itemCategory: action.payload.newItemCategoryId,
                            itemName: action.payload.newItemName,
                            itemNotes: action.payload.newItemNotes,
                            itemQuantityWanted: action.payload.newItemQuantityWanted,
                        }
                    }
                    return item
                })
            }
        case UPDATE_ITEM_SHOPPING_CHECKED:
            return {
                ...state,
                itemsData: state.itemsData.map(item => {
                    if (item.itemId === action.payload.itemId) {
                        return {
                            ...item,
                            itemCheckedInList: action.payload.newItemCheckedInList
                        }
                    }
                    return item
                })
            }
        case UPDATE_ITEM_QUANTITY_WANTED:
            return {
                ...state,
                itemsData: state.itemsData.map(item => {
                    if (item.itemId === action.payload.itemId) {
                        return {
                            ...item,
                            itemQuantityWanted: action.payload.newItemQuantityWanted
                        }
                    }
                    return item
                })
            }
        case UPDATE_ITEM_QUANTITY_OWNED:
            return {
                ...state,
                itemsData: state.itemsData.map(item => {
                    if (item.itemId === action.payload.itemId) {
                        return {
                            ...item,
                            itemQuantityOwned: action.payload.newItemQuantityOwned
                        }
                    }
                    return item
                })
            }
        case UPDATE_ITEM_PANTRY:
            return {
                ...state,
                itemsData: state.itemsData.map(item => {
                    if (item.itemId === action.payload.itemId) {
                        return {
                            ...item,
                            itemCategory: action.payload.newItemCategoryId,
                            itemName: action.payload.newItemName,
                            itemNotes: action.payload.newItemNotes,
                            itemQuantityOwned: action.payload.newItemQuantityOwned,
                        }
                    }
                    return item
                })
            }
        case UPDATE_SELECT_CATEGORY:
            return {
                ...state,
                selectCategoryId: action.payload
            }
        case CLEAR_ITEMS_LIST:
            return {
                ...state,
                itemsData: state.itemsData.map(item => {
                    if (item.itemQuantityWanted > 0) {
                        return {
                            ...item,
                            itemQuantityWanted: 0
                        }
                    }
                    return item
                })
            }
        case CLEAR_ITEMS_PANTRY:
            return {
                ...state,
                itemsData: state.itemsData.map(item => {
                    if (item.itemQuantityOwned > 0) {
                        return {
                            ...item,
                            itemQuantityOwned: 0
                        }
                    }
                    return item
                })
            }
        case CLEAR_ITEMS_ALL:
            return {
                ...state,
                itemsData: []
            }
        case CLEAR_CATEGORIES_ALL:
            return {
                ...state,
                categoriesData: [
                    {
                        categoryId: "f26d7e51-788d-4129-b2cb-f1f2c48f5a55",
                        categoryName: "Default Category",
                        categoryColor: "#14121E",
                        categoryUpdated: "1654027382389"
                    }
                ],
                itemsData: state.itemsData.map(item => {
                    return {
                        ...item,
                        itemCategory: "f26d7e51-788d-4129-b2cb-f1f2c48f5a55"
                    }
                })
            }
        case CLEAR_DATA_ALL:
            return {
                ...state,
                categoriesData: [
                    {
                        categoryId: "f26d7e51-788d-4129-b2cb-f1f2c48f5a55",
                        categoryName: "Default Category",
                        categoryColor: "#14121E",
                        categoryUpdated: "1654027382389"
                    }
                ],
                itemsData: []
            }
        default:
            return state
    }
};

export default rootReducer;
