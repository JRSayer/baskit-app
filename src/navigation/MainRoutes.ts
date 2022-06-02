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

type Category = {
    categoryId: string,
    categoryName: string,
    categoryColor: string
}

export enum MainTabRoutes {
    ShoppingTab = 'Shopping',
    PantryTab = 'Pantry',
    SettingsTab = 'Settings',
};
export type MainTabParamList = {
    [MainTabRoutes.ShoppingTab]: undefined,
    [MainTabRoutes.PantryTab]: undefined,
    [MainTabRoutes.SettingsTab]: undefined,
};
export const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

export enum ShoppingStackRoutes {
    ShoppingStack = 'ShoppingStack',
    ShoppingItemAdd = 'ShoppingItemAdd',
    ShoppingItemAddCategorySelect = 'ShoppingItemAddCategorySelect',
    ShoppingItemAddCategoryCreate = 'ShoppingItemAddCategoryCreate',
    ShoppingItemUpdate = 'ShoppingItemUpdate',
    ShoppingCategoryUpdate = 'ShoppingCategoryUpdate'
};
export type ShoppingStackParamList = {
    [ShoppingStackRoutes.ShoppingStack]: undefined,
    [ShoppingStackRoutes.ShoppingItemAdd]: undefined,
    [ShoppingStackRoutes.ShoppingItemAddCategorySelect]: undefined,
    [ShoppingStackRoutes.ShoppingItemAddCategoryCreate]: undefined,
    [ShoppingStackRoutes.ShoppingItemUpdate]: {item: Item},
    [ShoppingStackRoutes.ShoppingCategoryUpdate]: {category: Category}
};
export const ShoppingStack = createStackNavigator<ShoppingStackParamList>();

export enum PantryStackRoutes {
    PantryStack = 'PantryStack',
    PantryItemAdd = 'PantryItemAdd',
    PantryItemAddCategorySelect = 'PantryItemAddCategorySelect',
    PantryItemAddCategoryCreate = 'PantryItemAddCategoryCreate',
    PantryItemUpdate = 'PantryItemUpdate',
    PantryCategoryUpdate = 'PantryCategoryUpdate'
};
export type PantryStackParamList = {
    [PantryStackRoutes.PantryStack]: undefined,
    [PantryStackRoutes.PantryItemAdd]: undefined,
    [PantryStackRoutes.PantryItemAddCategorySelect]: undefined,
    [PantryStackRoutes.PantryItemAddCategoryCreate]: undefined,
    [PantryStackRoutes.PantryItemUpdate]: {item: Item},
    [PantryStackRoutes.PantryCategoryUpdate]: {category: Category}
};
export const PantryStack = createStackNavigator<PantryStackParamList>();

export enum SettingsStackRoutes {
    SettingsStack = 'SettingsStack',
    SettingsNotifications = 'SettingsNotifications',
    SettingsCatManagement = 'SettingsCatManagement',
    SettingsCategoryEdit = 'SettingsCategoryEdit',
    SettingsCategoryAdd = 'SettingsCategoryAdd',
    SettingsItemManagement = 'SettingsItemManagement',
    SettingsItemEdit = 'SettingsItemEdit',
    SettingsCustomisation = 'SettingsCustomisation',
    SettingsHelp = 'SettingsHelp',
    SettingsAbout = 'SettingsAbout',
    SettingsReset = 'SettingsReset',
};
export type SettingsStackParamList = {
    [SettingsStackRoutes.SettingsStack]: undefined,
    [SettingsStackRoutes.SettingsNotifications]: undefined,
    [SettingsStackRoutes.SettingsCatManagement]: undefined,
    [SettingsStackRoutes.SettingsCategoryEdit]: {category: Category},
    [SettingsStackRoutes.SettingsCategoryAdd]: undefined,
    [SettingsStackRoutes.SettingsItemManagement]: undefined,
    [SettingsStackRoutes.SettingsItemEdit]: {item: Item},
    [SettingsStackRoutes.SettingsCustomisation]: undefined,
    [SettingsStackRoutes.SettingsHelp]: undefined,
    [SettingsStackRoutes.SettingsAbout]: undefined,
    [SettingsStackRoutes.SettingsReset]: undefined,
};
export const SettingsStack = createStackNavigator<SettingsStackParamList>();