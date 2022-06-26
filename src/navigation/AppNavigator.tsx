import * as React from 'react';
import { Animated, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs/src/types'

import Icon from '@expo/vector-icons/MaterialIcons';

import ShoppingScreen from '../screens/ShoppingScreen';
import PantryScreen from '../screens/PantryScreen';
import ItemAddModalScreen from '../screens/ShoppingScreens/ItemAddModalScreen';
import ItemAddModalCategorySelectScreen from '../screens/ShoppingScreens/ItemAddModalCategorySelectScreen'
import ItemAddModalCategoryCreateScreen from '../screens/ShoppingScreens/ItemAddModalCategoryCreateScreen'
import ItemEditModalScreen from '../screens/ShoppingScreens/ItemEditModalScreen'
import ItemCategoryUpdateModalScreen from '../screens/ShoppingScreens/ItemCategoryUpdateModalScreen'
import PantryItemEditModalScreen from '../screens/PantryScreens/PantryItemEditModalScreen'
import PantryItemAddModalScreen from '../screens/PantryScreens/PantryItemAddModalScreen'
import PantryItemAddModalCategorySelectScreen from '../screens/PantryScreens/PantryItemAddModalCategorySelectScreen'
import PantryItemAddModalCategoryCreateScreen from '../screens/PantryScreens/PantryItemAddModalCategoryCreateScreen'
import PantryCategoryUpdateModalScreen from '../screens/PantryScreens/PantryCategoryUpdateModalScreen'

import SettingsScreen from '../screens/SettingsScreen';
import SettingsNotificationsScreen from '../screens/SettingsScreens/SettingsNotificationsScreen';
import SettingsCategoryScreen from '../screens/SettingsScreens/SettingsCategoryScreen';
import SettingsCategoryEditScreen from '../screens/SettingsScreens/SettingsCategoryEditScreen';
import SettingsCategoryAddScreen from '../screens/SettingsScreens/SettingsCategoryAddScreen';
import SettingsItemScreen from '../screens/SettingsScreens/SettingsItemScreen';
import SettingsItemEditScreen from '../screens/SettingsScreens/SettingsItemEditScreen';
import SettingsResetScreen from '../screens/SettingsScreens/SettingsResetScreen';

import { MainTab, MainTabRoutes, ShoppingStack, ShoppingStackRoutes, PantryStack, PantryStackRoutes, SettingsStack, SettingsStackRoutes } from './MainRoutes';
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

const SettingsStackNavigator = (): React.ReactElement => {
    return (
        <SettingsStack.Navigator
            initialRouteName={SettingsStackRoutes.SettingsStack}
            screenOptions={{
                headerShown: false,
                presentation: 'transparentModal',
                cardStyle: {backgroundColor: 'transparent'},
                cardOverlayEnabled: true,
                animationEnabled: true,
                animationTypeForReplace: 'push',
            }}
        >
            <SettingsStack.Screen name={SettingsStackRoutes.SettingsStack} component={SettingsScreen}/>
            <SettingsStack.Screen name={SettingsStackRoutes.SettingsNotifications} component={SettingsNotificationsScreen}/>
            <SettingsStack.Screen name={SettingsStackRoutes.SettingsCatManagement} component={SettingsCategoryScreen}/>
            <SettingsStack.Screen name={SettingsStackRoutes.SettingsCategoryEdit} component={SettingsCategoryEditScreen}/>
            <SettingsStack.Screen name={SettingsStackRoutes.SettingsCategoryAdd} component={SettingsCategoryAddScreen}/>
            <SettingsStack.Screen name={SettingsStackRoutes.SettingsItemManagement} component={SettingsItemScreen}/>
            <SettingsStack.Screen name={SettingsStackRoutes.SettingsItemEdit} component={SettingsItemEditScreen}/>
            <SettingsStack.Screen name={SettingsStackRoutes.SettingsReset} component={SettingsResetScreen}/>
        </SettingsStack.Navigator>
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

          if (route.key.includes('Settings')){
            return (
                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={{ 
                        // flex: 1,
                        // backgroundColor: '#4ef',
                        alignItems: 'flex-end',
                        justifyContent: 'center'
                        }}
                    >
                        {isFocused ? (
                            <Icon name='settings' color={hexToRGBa('#14121E', 1)} size={24}/>
                        ):(
                            <Icon name='settings' color={hexToRGBa('#14121E', 0.25)} size={24}/>
                        )}
                        
                </TouchableOpacity>
            )
          } else {
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
                        // backgroundColor: '#3f5',
                        // borderColor: '#000',
                        // borderWidth: 2
                        }}
                    >
                        {route.key === 'Settings-IsxfSUQhkzT68hE6ze-KI' ? (
                            <Text>S</Text>
                        ):(
                            <></>
                        )}
                        {!isFocused ? (
                            <Animated.Text style={{ 
                                color: hexToRGBa("#14121E", 0.25),
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
            )
          }
  
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
                {route.key === 'Settings-IsxfSUQhkzT68hE6ze-KI' ? (
                    <Text>S</Text>
                ):(
                    <></>
                )}
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
                <MainTab.Screen name={MainTabRoutes.SettingsTab} component={SettingsStackNavigator} />
            </MainTab.Navigator>
        </NavigationContainer>
    )
};

export default MainNavigation;