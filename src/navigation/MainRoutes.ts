import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

type Item = {
    itemCategory: string,
    itemCheckedInList?: boolean,
    itemId: string,
    itemName: string,
    itemNotes: string,
    itemQuantityOwned: number,
    itemQuantityWanted: number,
}

export enum MainTabRoutes {
    ShoppingTab = 'Shopping',
    PantryTab = 'Pantry',
};
export type MainTabParamList = {
    [MainTabRoutes.ShoppingTab]: undefined,
    [MainTabRoutes.PantryTab]: undefined,
};
export const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

export enum ShoppingStackRoutes {
    ShoppingStack = 'ShoppingStack',
    ShoppingItemAdd = 'ShoppingItemAdd',
    ShoppingItemAddCategorySelect = 'ShoppingItemAddCategorySelect',
    ShoppingItemAddCategoryCreate = 'ShoppingItemAddCategoryCreate',
    ShoppingItemUpdate = 'ShoppingItemUpdate'
};
export type ShoppingStackParamList = {
    [ShoppingStackRoutes.ShoppingStack]: undefined,
    [ShoppingStackRoutes.ShoppingItemAdd]: undefined,
    [ShoppingStackRoutes.ShoppingItemAddCategorySelect]: undefined,
    [ShoppingStackRoutes.ShoppingItemAddCategoryCreate]: undefined,
    [ShoppingStackRoutes.ShoppingItemUpdate]: {item: Item},
};
export const ShoppingStack = createStackNavigator<ShoppingStackParamList>();

export enum PantryStackRoutes {
    PantryStack = 'PantryStack',
    PantryItemAdd = 'PantryItemAdd',
    PantryItemAddCategorySelect = 'PantryItemAddCategorySelect',
    PantryItemAddCategoryCreate = 'PantryItemAddCategoryCreate',
    PantryItemUpdate = 'PantryItemUpdate'
};
export type PantryStackParamList = {
    [PantryStackRoutes.PantryStack]: undefined,
    [PantryStackRoutes.PantryItemAdd]: undefined,
    [PantryStackRoutes.PantryItemAddCategorySelect]: undefined,
    [PantryStackRoutes.PantryItemAddCategoryCreate]: undefined,
    [PantryStackRoutes.PantryItemUpdate]: {item: Item},
};
export const PantryStack = createStackNavigator<PantryStackParamList>();