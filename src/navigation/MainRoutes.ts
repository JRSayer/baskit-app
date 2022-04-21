import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export enum MainTabRoutes {
    ShoppingTab = 'ShoppingTab',
    PantryTab = 'PantryTab',
}

export type MainTabParamList = {
    [MainTabRoutes.ShoppingTab]: undefined,
    [MainTabRoutes.PantryTab]: undefined,
}

export const MainTab = createMaterialTopTabNavigator<MainTabParamList>();