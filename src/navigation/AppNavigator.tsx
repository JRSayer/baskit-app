import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ShoppingScreen from '../screens/ShoppingScreen';
import PantryScreen from '../screens/PantryScreen';
import ItemAddModalScreen from '../screens/ItemAddModalScreen';
import ItemAddModalCategorySelectScreen from '../screens/ItemAddModalCategorySelectScreen'
import ItemAddModalCategoryCreateScreen from '../screens/ItemAddModalCategoryCreateScreen'
import ItemEditModalScreen from '../screens/ItemEditModalScreen'
import PantryItemEditModalScreen from '../screens/PantryItemEditModalScreen'
import PantryItemAddModalScreen from '../screens/PantryItemAddModalScreen'
import PantryItemAddModalCategorySelectScreen from '../screens/PantryItemAddModalCategorySelectScreen'
import PantryItemAddModalCategoryCreateScreen from '../screens/PantryItemAddModalCategoryCreateScreen'

import { MainTab, MainTabRoutes, ShoppingStack, ShoppingStackRoutes, PantryStack, PantryStackRoutes } from './MainRoutes';

// const ShoppingStack = createStackNavigator();
const ShoppingStackNavigator = (): React.ReactElement => {
    return (
        <ShoppingStack.Navigator
            initialRouteName={ShoppingStackRoutes.ShoppingStack}
            screenOptions={{
                headerShown: false,
                presentation: 'transparentModal',
                cardStyle: {backgroundColor: 'transparent'},
                cardOverlayEnabled: true,
                animationEnabled: true,
                animationTypeForReplace: 'push'
            }}
        >
            <ShoppingStack.Screen name={ShoppingStackRoutes.ShoppingStack} component={ShoppingScreen}/>
            <ShoppingStack.Screen name={ShoppingStackRoutes.ShoppingItemAdd} component={ItemAddModalScreen}/>
            <ShoppingStack.Screen name={ShoppingStackRoutes.ShoppingItemAddCategorySelect} component={ItemAddModalCategorySelectScreen}/>
            <ShoppingStack.Screen name={ShoppingStackRoutes.ShoppingItemAddCategoryCreate} component={ItemAddModalCategoryCreateScreen}/>
            <ShoppingStack.Screen name={ShoppingStackRoutes.ShoppingItemUpdate} component={ItemEditModalScreen}/>
        </ShoppingStack.Navigator>
    )
};

// const PantryStack = createStackNavigator();
const PantryStackNavigator = (): React.ReactElement => {
    return (
        <PantryStack.Navigator
            initialRouteName={PantryStackRoutes.PantryStack}
            screenOptions={{
                headerShown: false,
                presentation: 'transparentModal',
                cardStyle: {backgroundColor: 'transparent'},
                cardOverlayEnabled: true,
                animationEnabled: true,
                animationTypeForReplace: 'push'
            }}
        >
            <PantryStack.Screen name={PantryStackRoutes.PantryStack} component={PantryScreen}/>
            <PantryStack.Screen name={PantryStackRoutes.PantryItemUpdate} component={PantryItemEditModalScreen}/>
            <PantryStack.Screen name={PantryStackRoutes.PantryItemAdd} component={PantryItemAddModalScreen}/>
            <PantryStack.Screen name={PantryStackRoutes.PantryItemAddCategorySelect} component={PantryItemAddModalCategorySelectScreen}/>
            <PantryStack.Screen name={PantryStackRoutes.PantryItemAddCategoryCreate} component={PantryItemAddModalCategoryCreateScreen}/>
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
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: '#2d3132'
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