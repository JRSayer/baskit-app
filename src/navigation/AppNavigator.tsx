import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ShoppingScreen from '../screens/ShoppingScreen'
import PantryScreen from '../screens/PantryScreen'

import { MainTab, MainTabRoutes } from './MainRoutes'

const MainNavigation = (): React.ReactElement => {
    return (
        <NavigationContainer>
            <MainTab.Navigator>
                <MainTab.Screen name={MainTabRoutes.Shopping} component={ShoppingScreen} />
                <MainTab.Screen name={MainTabRoutes.Pantry} component={PantryScreen} />
            </MainTab.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation