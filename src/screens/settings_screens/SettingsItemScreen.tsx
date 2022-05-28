import React, { useState } from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, LogBox } from 'react-native'

import {useNavigation} from '@react-navigation/native';
import { SettingsStackParamList, SettingsStackRoutes } from '../../navigation/MainRoutes';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialCIcon from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux'

import AppStyles from '../../../assets/styles/baseStyle';
import hexToRGBa from '../../functions/helperFunctions';

type SettingsScreenProp = StackNavigationProp<SettingsStackParamList, SettingsStackRoutes.SettingsStack>;

interface RootState {
    categoriesData: Array<Category>
    itemsData: Array<object>
};

type Category = {
    categoryId: string,
    categoryName: string,
    categoryColor: string
};

type Item = {
    itemCategory: string,
    itemCheckedInList: boolean,
    itemId: string,
    itemName: string,
    itemNotes: string,
    itemQuantityWanted: number,
    itemQuantityOwned: number,
};

function SettingsNotificationScreen() {
    const navigation = useNavigation<SettingsScreenProp>();
    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)
    const itemsData:any = useSelector((state: RootState) => state.itemsData)

    categoriesData.sort(function (a:Category, b:Category) {
        return a.categoryName.localeCompare(b.categoryName);
    });

    const onPressCategory = (categoryItem: Category) => {
        navigation.navigate(SettingsStackRoutes.SettingsCategoryEdit, {category: categoryItem})
    }
    
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                <View style={{flexDirection: 'row', marginBottom: 48, alignItems: 'center'}}>
                    <View style={[styles.settingsPageIconContainer, {
                        height: 64,
                        width: 64,
                        borderRadius: 64/2,
                    }]}>
                        <MaterialCIcon name='vector-intersection' color={hexToRGBa("#14121E", 0.5)} size={32}/>
                    </View>
                    <Text style={{fontSize: 20, fontWeight: '700', marginLeft: 16}}>Item Management</Text>
                </View>
                <Text style={{
                    marginBottom: 16,
                    color: hexToRGBa("#14121E", 0.25),
                    fontWeight: '600'
                }}>Items: {itemsData.length}</Text>
                {itemsData.length > 0 ? (
                    <FlatList
                        data={itemsData}
                        keyExtractor={item => item.itemId}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                            const itemCategory = categoriesData.filter((obj:Category) => {
                                return obj.categoryId === item.itemCategory
                            })
                            const itemColor = itemCategory[0].categoryColor;
                            return (
                                <TouchableOpacity style={[styles.settingItemContainer, {backgroundColor: hexToRGBa(itemColor, 0.12)}]}
                                    onPress={() => onPressCategory(item)}
                                >
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={{
                                            height: 10,
                                            width: 10,
                                            borderRadius: 10/2,
                                            backgroundColor: itemColor,
                                            marginRight: 10
                                        }}></View>
                                        <Text style={[styles.settingsPageName, {
                                            color: itemColor
                                        }]}>{item.itemName}</Text>
                                    </View>
                                    <View style={{marginRight: 16}}>
                                        <MaterialIcon name='chevron-right' color={hexToRGBa(itemColor, 0.5)} size={28}/>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        style={{marginBottom: 64}}
                    />
                ):(
                    <Text style={{textAlign: 'center', color: '#9e9e9e'}}>You don't have any categories yet</Text>
                )}
                <View style={AppStyles.fabContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[AppStyles.fabButton, {backgroundColor: '#D7D6DA'}]}>
                        <MaterialCIcon name='arrow-left' color={hexToRGBa("#14121E", 0.25)} size={32}/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9FB',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24
    },
    fabContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        right: 24,
        bottom: 48,
        shadowColor: "rgba(0,0,0,0.1)",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    fabButton: {
        backgroundColor: '#2d3132',
        borderRadius: 32,
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',       
    },
    settingItemContainer: {
        backgroundColor: hexToRGBa("#14121E", 0.04),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        borderRadius: 16,
        paddingLeft: 24,
        marginBottom: 8
    },
    settingsPageName: {
        fontWeight: '600',
        fontSize: 16,
        color: hexToRGBa("#14121E", 0.5)
    },
    settingsPageIconContainer: {
        backgroundColor: hexToRGBa("#14121E", 0.08),
        height: 56,
        width: 56,
        borderRadius: 56/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default SettingsNotificationScreen;