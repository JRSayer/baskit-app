import * as React from 'react';
import { Animated, View, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs/src/types'

import ShoppingScreen from '../screens/ShoppingScreen';
import PantryScreen from '../screens/PantryScreen';
import ItemAddModalScreen from '../screens/ItemAddModalScreen';
import ItemAddModalCategorySelectScreen from '../screens/ItemAddModalCategorySelectScreen'
import ItemAddModalCategoryCreateScreen from '../screens/ItemAddModalCategoryCreateScreen'
import ItemEditModalScreen from '../screens/ItemEditModalScreen'
import ItemCategoryUpdateModalScreen from '../screens/ItemCategoryUpdateModalScreen'
import PantryItemEditModalScreen from '../screens/PantryItemEditModalScreen'
import PantryItemAddModalScreen from '../screens/PantryItemAddModalScreen'
import PantryItemAddModalCategorySelectScreen from '../screens/PantryItemAddModalCategorySelectScreen'
import PantryItemAddModalCategoryCreateScreen from '../screens/PantryItemAddModalCategoryCreateScreen'
import PantryCategoryUpdateModalScreen from '../screens/PantryCategoryUpdateModalScreen'

import { MainTab, MainTabRoutes, ShoppingStack, ShoppingStackRoutes, PantryStack, PantryStackRoutes } from './MainRoutes';
import hexToRGBa from '../functions/helperFunctions';

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
                animationTypeForReplace: 'push',
            }}
        >
            <ShoppingStack.Screen name={ShoppingStackRoutes.ShoppingStack} component={ShoppingScreen}/>
            <ShoppingStack.Screen name={ShoppingStackRoutes.ShoppingItemAdd} component={ItemAddModalScreen}/>
            <ShoppingStack.Screen name={ShoppingStackRoutes.ShoppingItemAddCategorySelect} component={ItemAddModalCategorySelectScreen}/>
            <ShoppingStack.Screen name={ShoppingStackRoutes.ShoppingItemAddCategoryCreate} component={ItemAddModalCategoryCreateScreen} />
            <ShoppingStack.Screen name={ShoppingStackRoutes.ShoppingItemUpdate} component={ItemEditModalScreen}/>
            <ShoppingStack.Screen name={ShoppingStackRoutes.ShoppingCategoryUpdate} component={ItemCategoryUpdateModalScreen}/>
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
                animationTypeForReplace: 'push',
            }}
        >
            <PantryStack.Screen name={PantryStackRoutes.PantryStack} component={PantryScreen}/>
            <PantryStack.Screen name={PantryStackRoutes.PantryItemUpdate} component={PantryItemEditModalScreen}/>
            <PantryStack.Screen name={PantryStackRoutes.PantryItemAdd} component={PantryItemAddModalScreen}/>
            <PantryStack.Screen name={PantryStackRoutes.PantryItemAddCategorySelect} component={PantryItemAddModalCategorySelectScreen}/>
            <PantryStack.Screen name={PantryStackRoutes.PantryItemAddCategoryCreate} component={PantryItemAddModalCategoryCreateScreen}/>
            <PantryStack.Screen name={PantryStackRoutes.PantryCategoryUpdate} component={PantryCategoryUpdateModalScreen}/>
        </PantryStack.Navigator>
    )
};

function MyTabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
    return (
      <View style={{ 
          flexDirection: 'row', 
          paddingTop: 96, 
          backgroundColor: '#F9F9FB',
          paddingHorizontal: 32,
          paddingBottom: 16
          }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
            //   navigation.navigate({ name: route.name, merge: true });
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0)),
          });
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ 
                  flex: 1,
                }}
            >
                {!isFocused ? (
                    <Animated.Text style={{ 
                        // color: hexToRGBa("#14121E", 0.25),
                        fontSize: 20,
                        fontWeight: '700',
                        marginBottom: 4
                        }}>
                      {label}
                    </Animated.Text>
                ):(
                    <Animated.Text style={{ 
                        fontSize: 20,
                        fontWeight: '700',
                        marginBottom: 4
                        }}>
                      {label}
                    </Animated.Text>
                )}
              {/* <Animated.Text style={{ 
                  opacity,
                //   backgroundColor: '#f6e',
                  fontSize: 20,
                  fontWeight: '700',
                  marginBottom: 4
                  }}>
                {label}
              </Animated.Text> */}
              <Animated.View style={{
                  opacity,
                  backgroundColor: '#14121E',
                  height: 3,
                  width: 24,
                  borderRadius: 32
              }}></Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }


const MainNavigation = (): React.ReactElement => {
    return (
        <NavigationContainer>
            <MainTab.Navigator
                // screenOptions={{
                //     tabBarStyle: {
                //         marginTop: 54
                //     },
                //     tabBarIndicatorStyle: {
                //         backgroundColor: '#2d3132'
                //     }
                // }}
                tabBar={props => <MyTabBar {...props} />}
                screenOptions={{
                    swipeEnabled: false
                }}
            >
                <MainTab.Screen name={MainTabRoutes.ShoppingTab} component={ShoppingStackNavigator} />
                <MainTab.Screen name={MainTabRoutes.PantryTab} component={PantryStackNavigator} />
            </MainTab.Navigator>
        </NavigationContainer>
    )
};

export default MainNavigation;