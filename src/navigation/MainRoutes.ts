import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export enum MainTabRoutes {
    Shopping = 'Shopping',
    Pantry = 'Pantry',
}

export type MainTabParamList = {
    [MainTabRoutes.Shopping]: undefined,
    [MainTabRoutes.Pantry]: undefined,
}

export const MainTab = createMaterialTopTabNavigator<MainTabParamList>();