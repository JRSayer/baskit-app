import React, { useState } from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, TextInput, ScrollView } from 'react-native'

import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import { SettingsStackParamList, SettingsStackRoutes } from '../../navigation/MainRoutes';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialCIcon from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux'

import AppStyles from '../../../assets/styles/baseStyle';
import hexToRGBa from '../../functions/helperFunctions';
import { updateCategory } from '../../redux/reducer';

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

function SettingsCategoryEditScreen() {
    const navigation = useNavigation<SettingsScreenProp>();
    const route = useRoute<RouteProp<SettingsStackParamList, SettingsStackRoutes.SettingsCategoryEdit>>();
    // const categoriesData:any = useSelector((state: RootState) => state.categoriesData)
    const itemsData:any = useSelector((state: RootState) => state.itemsData)
    const dispatch = useDispatch()

    const itemsInCategory:Array<Item> = itemsData.filter(function (it:any) {
        return it.itemCategory == route.params.category.categoryId && (it.itemQuantityWanted > 0 || it.itemQuantityOwned > 0)
    })

    const [valueCategoryName, setValueCategoryName] = useState(route.params.category.categoryName);
    const [valueCategoryColor, setValueCategoryColor] = useState(route.params.category.categoryColor);
    
    const colors: Array<string> = [
        "#35BBCB", "#0191B5", "#FED915", "#FE7A15", "#41CB35", "#D4DD18", "#FE1515", "#A701B5", 
        "#0133B5", "#01B58A", "#15FED4","#FEAF15", "#FE15D9","#DCDBDD", "#8A8990", "#14121E",
    ]

    const ColorSpot = (colorHex:any) => {
        return (
            <TouchableOpacity style={{
                backgroundColor: colorHex.colorHex,
                height: 64,
                width: 64,
                borderRadius: 64/2,
                // marginBottom: 16,
                marginRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
            }}
                onPress={() => setValueCategoryColor(colorHex.colorHex)}
            >
                {colorHex.colorHex == valueCategoryColor ? (
                    <View style={{
                        backgroundColor: hexToRGBa('#000', 0.3),
                        height: 32,
                        width: 32,
                        borderRadius: 32/2
                    }}></View>
                ) : (<></>)}
            </TouchableOpacity>
        )
    };

    const indexOfColor:number = colors.indexOf(route.params.category.categoryColor) >= 0 ? colors.indexOf(route.params.category.categoryColor) : 0;

    if (indexOfColor > 0){
        colors.splice(colors.indexOf(route.params.category.categoryColor), 1);
        colors.unshift(route.params.category.categoryColor);
    }

    const onUpdateCategory = (categoryName:string, categoryColor:string) => {
        dispatch(updateCategory(route.params.category.categoryId, categoryName, categoryColor));
        navigation.goBack()
    }
    
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex:1, justifyContent: 'flex-end'}}
                keyboardVerticalOffset={96}
            >
            <View style={styles.container}>
                <View style={{flexDirection: 'row', marginBottom: 48, alignItems: 'center'}}>
                    <View style={[styles.settingsPageIconContainer, {
                        height: 64,
                        width: 64,
                        borderRadius: 64/2,
                    }]}>
                        <MaterialIcon name='pie-chart-outlined' color={hexToRGBa("#14121E", 0.5)} size={32}/>
                    </View>
                    <Text style={{fontSize: 20, fontWeight: '700', marginLeft: 16}}>Category Edit</Text>
                </View>
                <View style={[styles.settingItemContainer, {backgroundColor: hexToRGBa(valueCategoryColor, 0.12), marginBottom: 16}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{
                            height: 10,
                            width: 10,
                            borderRadius: 10/2,
                            backgroundColor: valueCategoryColor,
                            marginRight: 10
                        }}></View>
                        <Text style={[styles.settingsPageName, {
                            color: valueCategoryColor
                        }]}>{valueCategoryName}</Text>
                    </View>
                </View>
                <Text style={styles.sectionHeading}>Category name</Text>
                <TextInput 
                    style={[styles.settingItemContainer, {fontWeight: '600',
                    fontSize: 16,}]}
                    numberOfLines={1}
                    onChangeText={valueCategoryName => setValueCategoryName(valueCategoryName)}
                    value={valueCategoryName}
                    placeholder={"Category name"}
                    clearButtonMode={'never'}
                />
                <Text style={[styles.sectionHeading, {marginBottom: 16}]}>Category colour</Text>
                <View style={{height: 64}}>
                    <FlatList
                        data={colors}
                        keyExtractor={item => item.toString()}
                        scrollEnabled={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => {
                            return (
                                <ColorSpot colorHex={item}/>
                            )
                        }}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 40}}>
                    <Text style={[styles.sectionHeading, {marginTop: 0}]}>Items in category</Text>
                    <Text style={[styles.sectionHeading, {marginTop: 0}]}>{itemsInCategory.length}</Text>
                </View>
                {itemsInCategory.length >= 1 ? (
                    <FlatList 
                        data={itemsInCategory}
                        keyExtractor={item => item.itemId}
                        scrollEnabled={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => {
                            return (
                                <View style={[styles.itemChip, {backgroundColor: hexToRGBa(valueCategoryColor, 0.1)}]}>
                                    <Text style={{fontWeight: '500', color: valueCategoryColor}}>{item.itemName}</Text>
                                </View>
                            )
                        }}
                    />
                ):(
                    <Text style={{color: hexToRGBa("#14121E", 0.25), fontStyle: 'italic'}}>There are no items currently in this category</Text>
                )}
                <View style={styles.fabContainerLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[AppStyles.fabButton, {backgroundColor: '#D7D6DA'}]}>
                        <MaterialIcon name='close' color={hexToRGBa("#14121E", 0.25)} size={32}/>
                    </TouchableOpacity>
                </View>
                <View style={AppStyles.fabContainer}>
                    <TouchableOpacity
                        onPress={() => onUpdateCategory(valueCategoryName, valueCategoryColor)}
                        style={styles.fabButton2}>
                        <MaterialIcon name='check' color='#fff' size={32} style={{marginRight: 8}}/>
                        <Text style={{fontWeight: '700', color: '#fff'}}>UPDATE CATEGORY</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </KeyboardAvoidingView>
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
    fabContainerLeft: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        left: 24,
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
    fabButton2: {
        backgroundColor: '#2d3132',
        flexDirection: 'row',
        borderRadius: 32,
        // width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingRight: 24,
        paddingLeft: 16       
    },
    settingItemContainer: {
        backgroundColor: hexToRGBa("#14121E", 0.08),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        borderRadius: 16,
        paddingLeft: 24,
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
    sectionHeading: {
        marginTop: 16,
        marginBottom: 8,
        fontWeight: '600',
        color: hexToRGBa("#14121E", 0.3)
    },
    bottomButtons: {
        flexDirection: 'row',
        marginBottom: 8,
        height: 64,
        justifyContent: 'space-between'
    },
    itemChip: {
        // backgroundColor: hexToRGBa('#2d3132', 0.1),
        // alignItems: 'center',
        justifyContent: 'center',
        height: 54,
        borderRadius: 100,
        marginBottom: 16,
        padding: 16,
        paddingLeft: 24,
        paddingRight: 24,
        marginRight: 10
    }
})

export default SettingsCategoryEditScreen;