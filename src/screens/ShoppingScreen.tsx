import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, LogBox, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';

import Toast from 'react-native-toast-message';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShoppingStackParamList, ShoppingStackRoutes} from '../navigation/MainRoutes';

import { updateItemShoppingChecked, updateItemQuantityOwned, updateItemQuantityWanted } from '../redux/reducer';

import Category from '../components/Category';
import { _resetInitialState } from '../redux/reducer';
import AppStyles from '../../assets/styles/baseStyle';
import hexToRGBa from '../functions/helperFunctions';

type ShoppingScreenProp = StackNavigationProp<ShoppingStackParamList, ShoppingStackRoutes.ShoppingStack>;

interface RootState {
    categoriesData: Array<object>
    itemsData: Array<object>
};

type Category = {
    category: {
        categoryColor: string,
        categoryId: string,
        categoryName: string
    }
}
type Item = {
    itemId: string,
    itemCategory: string,
    itemName: string,
    itemNotes: string,
    itemQuantityWanted: number,
    itemQuantityOwned: number,
    itemCheckedInList: boolean
}

function ListView() {
    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)
    const itemsData:any = useSelector((state: RootState) => state.itemsData)
    const dispatch = useDispatch()

    return (
        <View
            style={{
                flex: 1,
                marginTop: 16,
                marginBottom: 32
            }}>
                {categoriesData.length !== 0 && itemsData.length !== 0 ? (
                    <FlatList
                        data={categoriesData}
                        keyExtractor={item => item.categoryId}
                        renderItem={({item}) => {
                            //Checking if a category contains items that are "wanted"
                            const itemFilter = itemsData.filter(function (it:any) {
                                return it.itemCategory == item.categoryId && it.itemQuantityWanted > 0
                            })
                            if (itemFilter.length > 0) {
                                return (
                                    <Category categoryData={item}/>
                                )
                            }
                            else {
                                return (<></>)
                            }
                        }}
                    />
                ):(
                    <Text style={{textAlign: 'center', color: '#9e9e9e'}}>We don't have items/categories yet</Text>
                )}
        </View>
    )
};

const ToastConfig:any = {
    itemSuccess: (props: any, text1: string) => (
        <View style={{width: '100%', padding: 24}}>
            <View style={{
                backgroundColor: 'rgba(0,0,0,0.85)',
                borderRadius: 100,
                flexDirection: 'row',
                paddingTop: 24,
                paddingBottom: 24,
                paddingLeft: 32,
                paddingRight: 32,
                alignItems: 'center'
            }}>
                {/* <View style={{backgroundColor: props.categoryColor, height: 10, width: 10, borderRadius: 10/2, marginRight: 12}}></View>
                <Text style={{color: '#ffffff', fontWeight: '600', fontSize: 14}}>{text1}</Text> */}
                <Text style={{color: '#fff'}}>Test item</Text>
            </View>
        </View>
    )
};

function ListScreen() {
    const dispatch = useDispatch()
    const navigation = useNavigation<ShoppingScreenProp>();
    const itemsData:any = useSelector((state: RootState) => state.itemsData)

    const onResetPress = () => {
        // dispatch(_resetInitialState())
    }

    const onMoveSelectedPress = () => {
        itemsData.forEach(function(element: Item){
            if (element.itemCheckedInList){
                const newQuantOwned: number = element.itemQuantityOwned + element.itemQuantityWanted
                dispatch(updateItemQuantityOwned(element.itemId, newQuantOwned))
                dispatch(updateItemShoppingChecked(element.itemId, false))
                dispatch(updateItemQuantityWanted(element.itemId, 0))
            }
        })
    }

    return (
        <>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                {/* <TouchableOpacity
                    onPress={() => onResetPress()}
                >
                    <Text>RESET</Text>
                </TouchableOpacity> */}
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={{
                        backgroundColor: '#14121E',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        paddingRight: 24,
                        borderRadius: 64,
                    }}
                        onPress={() => onMoveSelectedPress()}
                    >
                        <Icon name='arrow-right' color='#fff' size={24} style={{marginRight: 8}}/>
                        <Text style={{color: '#fff', fontWeight: '700'}}>Move selected</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: hexToRGBa('#14121E', 0.08),
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        paddingRight: 24,
                        borderRadius: 64
                    }}>
                        <MaterialIcon name='category' color={hexToRGBa('#14121E', 0.25)} size={24} style={{marginRight: 8}}/>
                        <Text style={{color: hexToRGBa('#14121E', 0.3), fontWeight: '700'}}>Sort</Text>
                    </TouchableOpacity>
                </View>
                <ListView />
                <View style={AppStyles.fabContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(ShoppingStackRoutes.ShoppingItemAdd)}
                        style={AppStyles.fabButton}>
                        <Icon name='plus' color='#fff' size={32}/>
                    </TouchableOpacity>
                </View>
                <Toast config={ToastConfig} position="bottom" bottomOffset={100} visibilityTime={2500} />
            </View>
            {/* <Toast config={ToastConfig}/> */}
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9FB',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24
    },
});

export default ListScreen;