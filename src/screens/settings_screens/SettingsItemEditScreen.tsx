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
    categoriesData: Array<object>
    itemsData: Array<object>
    selectCategoryId: string
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

function SettingsItemEditScreen() {
    const navigation = useNavigation<SettingsScreenProp>();
    const route = useRoute<RouteProp<SettingsStackParamList, SettingsStackRoutes.SettingsItemEdit>>();
    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)
    const itemsData:any = useSelector((state: RootState) => state.itemsData)
    const selectedCategoryId = useSelector((state: RootState) => state.selectCategoryId)
    const dispatch = useDispatch()

    const [valueItemName, setValueItemName] = useState(route.params.item.itemName);
    const [valueItemNotes, setValueItemNotes] = useState(route.params.item.itemNotes);
    const [valueItemQuantityWanted, setValueItemQuantityWanted] = useState((route.params.item.itemQuantityWanted).toString());
    const [valueItemQuantityOwned, setValueItemQuantityOwned] = useState((route.params.item.itemQuantityOwned).toString());

    var itemCategoryName:string = categoriesData.find((o:any) => o.categoryId == selectedCategoryId).categoryName;
    var itemCategoryColor:string = categoriesData.find((o:any) => o.categoryId == selectedCategoryId).categoryColor;

    const onUpdateItem = (valueItemName:string, valueItemNotes:string, valueItemQuantityWanted:string, valueItemQuantityOwned:string) => {
        // dispatch(updateCategory(route.params.category.categoryId, categoryName, categoryColor));
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
                        <MaterialCIcon name='vector-intersection' color={hexToRGBa("#14121E", 0.5)} size={32}/>
                    </View>
                    <Text style={{fontSize: 20, fontWeight: '700', marginLeft: 16}}>Item Edit</Text>
                </View>
                <Text style={[styles.sectionHeading, {marginTop: 0}]}>Item name</Text>
                <TextInput 
                    style={[styles.settingItemContainer, {fontWeight: '600',
                    fontSize: 16,}]}
                    numberOfLines={1}
                    onChangeText={valueItemName => setValueItemName(valueItemName)}
                    value={valueItemName}
                    placeholder={"Item name"}
                    clearButtonMode={'never'}
                />
                <Text style={styles.sectionHeading}>Item notes</Text>
                <TextInput 
                    style={[styles.settingItemContainer, {fontWeight: '600',
                    fontSize: 16,}]}
                    numberOfLines={1}
                    onChangeText={valueItemNotes => setValueItemNotes(valueItemNotes)}
                    value={valueItemNotes}
                    placeholder={"Item notes"}
                    clearButtonMode={'never'}
                />
                <Text style={styles.sectionHeading}>Item category</Text>
                <View style={[styles.settingItemContainer, {backgroundColor: hexToRGBa(itemCategoryColor, 0.12)}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{
                            height: 10,
                            width: 10,
                            borderRadius: 10/2,
                            backgroundColor: itemCategoryColor,
                            marginRight: 10
                        }}></View>
                        <Text style={[styles.settingsPageName, {
                            color: itemCategoryColor
                        }]}>{itemCategoryName}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{width: '46%'}}>
                        <Text style={styles.sectionHeading}>Quantity wanted</Text>
                        <TextInput 
                            style={[styles.settingItemContainer, {fontWeight: '600',
                            fontSize: 16, }]}
                            numberOfLines={1}
                            onChangeText={valueItemQuantityWanted => setValueItemQuantityWanted(valueItemQuantityWanted)}
                            value={valueItemQuantityWanted}
                            placeholder={"Item notes"}
                            clearButtonMode={'never'}
                        />
                    </View>
                    <View style={{width: '46%'}}>
                        <Text style={styles.sectionHeading}>Quantity wanted</Text>
                        <TextInput 
                            style={[styles.settingItemContainer, {fontWeight: '600',
                            fontSize: 16,}]}
                            numberOfLines={1}
                            onChangeText={valueItemQuantityOwned => setValueItemQuantityOwned(valueItemQuantityOwned)}
                            value={valueItemQuantityOwned.toString()}
                            placeholder={"1+"}
                            keyboardType='numeric'
                            clearButtonMode={'never'}
                        />
                    </View>
                </View>
                <View style={styles.fabContainerLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[AppStyles.fabButton, {backgroundColor: '#D7D6DA'}]}>
                        <MaterialIcon name='close' color={hexToRGBa("#14121E", 0.25)} size={32}/>
                    </TouchableOpacity>
                </View>
                <View style={AppStyles.fabContainer}>
                    <TouchableOpacity
                        onPress={() => onUpdateItem(valueItemName, valueItemNotes, valueItemQuantityWanted, valueItemQuantityOwned)}
                        style={styles.fabButton2}>
                        <MaterialIcon name='check' color='#fff' size={32} style={{marginRight: 8}}/>
                        <Text style={{fontWeight: '700', color: '#fff'}}>UPDATE ITEM</Text>
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

export default SettingsItemEditScreen;