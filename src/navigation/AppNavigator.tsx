import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ShoppingScreen from '../screens/ShoppingScreen';
import PantryScreen from '../screens/PantryScreen';
import ItemAddModalScreen from '../screens/ItemAddModalScreen';

import { MainTab, MainTabRoutes } from './MainRoutes';

const ShoppingStack = createStackNavigator();
function ShoppingStackNavigator() {
    return (
        <ShoppingStack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: "modal"
            }}
        >
            <ShoppingStack.Screen name='Shopping' component={ShoppingScreen}/>
            <ShoppingStack.Screen name='ItemAddModal' component={ItemAddModalScreen}/>
        </ShoppingStack.Navigator>
    )
};

const PantryStack = createStackNavigator();
function PantryStackNavigator() {
    return (
        <PantryStack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: "modal"
            }}
        >
            <PantryStack.Screen name='Pantry' component={PantryScreen}/>
        </PantryStack.Navigator>
    )
};

const MainNavigation = (): React.ReactElement => {
    return (
        <NavigationContainer>
            <MainTab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        marginTop: 54
                    }
                }}
            >
                <MainTab.Screen name={MainTabRoutes.ShoppingTab} component={ShoppingStackNavigator} />
                <MainTab.Screen name={MainTabRoutes.PantryTab} component={PantryStackNavigator} />
            </MainTab.Navigator>
        </NavigationContainer>
    )
};

export default MainNavigation;