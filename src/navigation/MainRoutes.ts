import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

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
    ShoppingItemAddCategoryCreate = 'ShoppingItemAddCategoryCreate'
};
export type ShoppingStackParamList = {
    [ShoppingStackRoutes.ShoppingStack]: undefined,
    [ShoppingStackRoutes.ShoppingItemAdd]: undefined,
    [ShoppingStackRoutes.ShoppingItemAddCategorySelect]: undefined,
    [ShoppingStackRoutes.ShoppingItemAddCategoryCreate]: undefined,
};
export const ShoppingStack = createStackNavigator<ShoppingStackParamList>();

export enum PantryStackRoutes {
    PantryStack = 'PantryStack',
    PantryItemAdd = 'PantryItemAdd',
    PantryItemAddCategorySelect = 'PantryItemAddCategorySelect',
    PantryItemAddCategoryCreate = 'PantryItemAddCategoryCreate'
};
export type PantryStackParamList = {
    [PantryStackRoutes.PantryStack]: undefined,
    [PantryStackRoutes.PantryItemAdd]: undefined,
    [PantryStackRoutes.PantryItemAddCategorySelect]: undefined,
    [PantryStackRoutes.PantryItemAddCategoryCreate]: undefined,
};
export const PantryStack = createStackNavigator<PantryStackParamList>();