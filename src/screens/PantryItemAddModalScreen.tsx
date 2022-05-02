import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Modal from "react-native-modal";

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PantryStackParamList, PantryStackRoutes} from '../navigation/MainRoutes';
type ShoppingScreenProp = StackNavigationProp<PantryStackParamList, PantryStackRoutes.PantryStack>;

import hexToRGBa from '../functions/helperFunctions';
import { addItem, updateItemQuantityOwned } from '../redux/reducer';

interface RootState {
    categoriesData: Array<object>
    itemsData: Array<object>
    selectCategoryId: string
};

function ItemAddModalScreen() {
    const navigation = useNavigation<ShoppingScreenProp>();

    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)
    const itemsData:any = useSelector((state: RootState) => state.itemsData)
    const selectedCategoryId = useSelector((state: RootState) => state.selectCategoryId)
    const dispatch = useDispatch()

    const [valueItemName, setValueItemName] = useState('');
    const [valueItemNotes, setValueItemNotes] = useState(''); //want this to be null ideally
    const [valueItemQuantity, setValueItemQuantity] = useState('1');

    var itemCategoryName:string = "Create a category"
    var itemCategoryColor:string = '#a9a9a9'
    if (categoriesData.length > 0) {
        if (categoriesData.find((o:any) => o.categoryId == selectedCategoryId) === undefined) {
            //dispatch(updateSelectCategory(null)) <- need to set the update category to null as a category with the ID currently stored can't be found
        }
        else {
            itemCategoryName = categoriesData.find((o:any) => o.categoryId == selectedCategoryId).categoryName;
            itemCategoryColor = categoriesData.find((o:any) => o.categoryId == selectedCategoryId).categoryColor;
        }
    }

    const onAddItem = (itemCategoryId:string,itemName:string,itemNotes:string,itemQuantityOwned:string) => {
        var existingItem:any;
        //check if notes is just spaces
        if (itemNotes.trim().length === 0){
            itemNotes = ''
            existingItem = itemsData.filter((obj:any) => {
                return obj.itemName.toLowerCase() == itemName.toLowerCase() && obj.itemNotes.toLowerCase() == itemNotes.toLowerCase() && obj.itemCategory == itemCategoryId
            })
        } else {
            existingItem = itemsData.filter((obj:any) => {
                return obj.itemName.toLowerCase() == itemName.toLowerCase() && obj.itemNotes.toLowerCase() == itemNotes.toLowerCase() && obj.itemCategory == itemCategoryId
            })
        }

        if (existingItem.length > 0){
            dispatch(updateItemQuantityOwned(existingItem[0].itemId, parseInt(itemQuantityOwned)))
        } else {
            dispatch(addItem(itemCategoryId, itemName, itemNotes, 0, parseInt(itemQuantityOwned)))
        }
        navigation.goBack()
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex:1, justifyContent: 'flex-end'}}
            keyboardVerticalOffset={96}
        >
            <View style={modalStyle.container}>
                <TextInput 
                    style={modalStyle.textInputName}
                    numberOfLines={1}
                    onChangeText={valueItemName => setValueItemName(valueItemName)}
                    value={valueItemName}
                    placeholder={"Item Name"}
                    clearButtonMode={'never'}
                />
                <Text style={modalStyle.inputHeading}>Notes</Text>
                <TextInput 
                    style={modalStyle.textInputNotes}
                    numberOfLines={1}
                    onChangeText={valueItemNotes => setValueItemNotes(valueItemNotes)}
                    value={valueItemNotes}
                    placeholder={"Item notes"}
                    clearButtonMode={'never'}
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 32
                }}>
                    <View style={{width: '65%'}}>
                        <Text style={modalStyle.inputHeading}>Category</Text>
                        <TouchableOpacity style={modalStyle.textInputCategory}
                            onPress={() => navigation.navigate(PantryStackRoutes.PantryItemAddCategorySelect)}
                        >
                            <View style={{height: 10, width: 10, backgroundColor: itemCategoryColor, borderRadius:10/2, marginRight: 10}}></View>
                            <Text>{itemCategoryName}</Text>
                        </TouchableOpacity>
                    </View>
                    <View></View>
                    <View style={{width: '30%'}}>
                        <Text style={modalStyle.inputHeading}>Owned</Text>
                        <TextInput 
                            style={modalStyle.textInputQuantity}
                            numberOfLines={1}
                            onChangeText={valueItemQuantity => setValueItemQuantity(valueItemQuantity)}
                            value={valueItemQuantity.toString()}
                            placeholder={"1+"}
                            keyboardType='numeric'
                            clearButtonMode={'never'}
                        />
                    </View>
                </View>
                <View style={modalStyle.bottomButtons}>
                    <TouchableOpacity style={[modalStyle.button, modalStyle.cancelButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[modalStyle.button, modalStyle.addButton]}
                        onPress={() => onAddItem(selectedCategoryId, valueItemName, valueItemNotes, valueItemQuantity)}
                    >
                        <Text style={{color: 'white'}}>Add item</Text>
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
        width: '48%',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', 
    },
    cancelButton: {
        // backgroundColor: '#c0c1c2',
        backgroundColor: hexToRGBa("#2d3132", 0.2) 
    },
    addButton: {
        backgroundColor: '#2d3132',
    },
    inputHeading: {
        marginBottom: 4,
        color: hexToRGBa("#2d3132", 0.5)
    },
    textInputName: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 32
    },
    textInputNotes: {
        backgroundColor: hexToRGBa("#2d3132", 0.05),
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        height: 56
    },
    textInputQuantity: {
        backgroundColor: hexToRGBa("#2d3132", 0.05),
        padding: 16,
        borderRadius: 16,
        // marginBottom: 16,
        height: 56
    },
    textInputCategory: {
        backgroundColor: hexToRGBa("#2d3132", 0.05),
        padding: 16,
        borderRadius: 16,
        // marginBottom: 16,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default ItemAddModalScreen;
