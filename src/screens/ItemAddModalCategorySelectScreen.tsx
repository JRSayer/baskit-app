import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShoppingStackParamList, ShoppingStackRoutes} from '../navigation/MainRoutes';
type ShoppingScreenProp = StackNavigationProp<ShoppingStackParamList, ShoppingStackRoutes.ShoppingStack>;

import hexToRGBa from '../functions/helperFunctions';
import { updateSelectCategory } from '../redux/reducer';

interface RootState {
    categoriesData: Array<object>
    itemsData: Array<object>
    selectCategory: string
};

function CategorySelect(categoryData:any) {
    const navigation = useNavigation<ShoppingScreenProp>();
    const dispatch = useDispatch();

    const onCategoryPress = () => {
        dispatch(updateSelectCategory(categoryData.categoryData.categoryId))
        navigation.goBack();
    }

    return (
        <TouchableOpacity style={modalStyle.categoryContainer}
            onPress={() => onCategoryPress()}
        >
            <View style={{height: 10, width: 10, backgroundColor: categoryData.categoryData.categoryColor, borderRadius:10/2, marginRight: 10}}></View>
            <Text>{categoryData.categoryData.categoryName}</Text>
        </TouchableOpacity>
    )
}

function ItemAddModalScreen() {
    const navigation = useNavigation<ShoppingScreenProp>();

    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)
    const itemsData:any = useSelector((state: RootState) => state.itemsData)
    const selectedCategoryId = useSelector((state: RootState) => state.selectCategory)
    const dispatch = useDispatch()
    // console.log(selectedCategoryId);

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
                    <TouchableOpacity style={[modalStyle.button, modalStyle.confirmButton]}
                        onPress={() => navigation.navigate(ShoppingStackRoutes.ShoppingItemAddCategoryCreate)}
                    >
                        <Text style={{color: 'white'}}>Create New Category</Text>
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    bottomButtons: {
        flexDirection: 'row',
        marginBottom: 8,
        height: 64,
        justifyContent: 'space-between'
    },
    button: {
        width: '100%',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', 
    },
    confirmButton: {
        backgroundColor: '#2d3132',
    },
    textTitle: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 32
    },
    categoryContainer: {
        flexDirection: 'row',
        backgroundColor: hexToRGBa('#2d3132', 0.1),
        alignItems: 'center',
        height: 54,
        borderRadius: 16,
        marginBottom: 16,
        padding: 16
    },
});

export default ItemAddModalScreen;
