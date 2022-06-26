import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShoppingStackParamList, ShoppingStackRoutes} from '../../navigation/MainRoutes';
type ShoppingScreenProp = StackNavigationProp<ShoppingStackParamList, ShoppingStackRoutes.ShoppingStack>;

import hexToRGBa from '../../functions/helperFunctions';
import { updateSelectCategory } from '../../redux/reducer';

interface RootState {
    categoriesData: Array<object>
    itemsData: Array<object>
    selectCategory: string
};

type Category = {
    categoryId: string,
    categoryName: string,
    categoryColor: string
}

function CategorySelect(categoryData:any) {
    const navigation = useNavigation<ShoppingScreenProp>();
    const dispatch = useDispatch();

    const onCategoryPress = () => {
        dispatch(updateSelectCategory(categoryData.categoryData.categoryId))
        navigation.goBack();
    }

    return (
        <TouchableOpacity style={[modalStyle.categoryContainer, {backgroundColor: hexToRGBa(categoryData.categoryData.categoryColor, 0.1)}]}
            onPress={() => onCategoryPress()}
        >
            <View style={{height: 8, width: 8, backgroundColor: categoryData.categoryData.categoryColor, borderRadius:8/2, marginRight: 10}}></View>
            <Text style={{fontWeight: '600', color: categoryData.categoryData.categoryColor}}>{categoryData.categoryData.categoryName}</Text>
        </TouchableOpacity>
    )
}

function ItemAddModalScreen() {
    const navigation = useNavigation<ShoppingScreenProp>();

    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)
    const itemsData:any = useSelector((state: RootState) => state.itemsData)
    const selectedCategoryId = useSelector((state: RootState) => state.selectCategory)
    const dispatch = useDispatch()

    categoriesData.sort(function (a:Category, b:Category) {
        return a.categoryName.localeCompare(b.categoryName);
    });

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex:1, justifyContent: 'flex-end'}}
            keyboardVerticalOffset={96}
        >
            <View style={modalStyle.container}>
                <Text style={modalStyle.textTitle}>Select a category</Text>
                <View style={{maxHeight: 300, marginBottom: 16}}>
                    <FlatList 
                        data={categoriesData}
                        keyExtractor={item => item.categoryId}
                        renderItem={({item}) => {
                            return (
                                <CategorySelect categoryData={item}/>
                            )
                        }}
                    />
                </View>
                <View style={modalStyle.bottomButtons}>
                    {/* <TouchableOpacity style={[modalStyle.button, modalStyle.confirmButton]}
                        onPress={() => navigation.navigate(ShoppingStackRoutes.ShoppingItemAddCategoryCreate)}
                    >
                        <Text style={{color: 'white'}}>Create New Category</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={[modalStyle.button, modalStyle.cancelButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name='close' color={hexToRGBa("#14121E", 0.25)} size={32}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[modalStyle.button, modalStyle.addButton]}
                        onPress={() => navigation.navigate(ShoppingStackRoutes.ShoppingItemAddCategoryCreate)}
                    >
                        <MaterialIcon name='create' color={hexToRGBa("#14121E", 0.25)} size={32} style={{marginRight: 8}}/>
                        <Text style={{color: hexToRGBa("#14121E", 0.25), fontSize: 16, fontWeight: '600'}}>NEW CATEGORY</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

const modalStyle = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#F4F6F6',
        // backgroundColor: 'yellow',
        padding: 24,
        // height: 250,
        justifyContent: 'flex-end', 
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
    },
    bottomButtons: {
        flexDirection: 'row',
        marginBottom: 8,
        height: 64,
        justifyContent: 'space-between'
    },
    button: {
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', 
    },
    cancelButton: {
        // backgroundColor: '#c0c1c2',
        backgroundColor: hexToRGBa("#2d3132", 0.08),
        width: 64
    },
    addButton: {
        backgroundColor: hexToRGBa("#2d3132", 0.08),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingRight: 32
    },
    confirmButton: {
        backgroundColor: '#2d3132',
    },
    textTitle: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 24,
        marginBottom: 32
    },
    categoryContainer: {
        flexDirection: 'row',
        backgroundColor: hexToRGBa('#2d3132', 0.1),
        alignItems: 'center',
        height: 54,
        borderRadius: 16,
        marginBottom: 16,
        padding: 16,
        paddingHorizontal: 20
    },
});

export default ItemAddModalScreen;
