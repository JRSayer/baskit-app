import { NavigationRouteContext } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../redux/reducer';

interface RootState {
    categoriesData: Array<object>
    itemsData: Array<object>
    selectCategoryId: string
};

function ItemAddModal() {
    const categoriesData:Array<object> = useSelector((state: RootState) => state.categoriesData)
    const itemsData:Array<object> = useSelector((state: RootState) => state.itemsData)
    const dispatch = useDispatch();

    const [valueName, setValueName] = useState('')
    const [valueNotes, setValueNotes] = useState('')
    const [valueQuantity, setValueQuantity] = useState('1')
    const selectCategoryId = useSelector((state: RootState) => state.selectCategoryId)
    var selectCategoryName = "No category name found";
    // if (categoriesData.length > 0) {
    //     var selectCategoryName:string = categoriesData.find(o => o.categoryId == selectCategoryId).categoryName
    // }

    const onPressAddItem = (itemCategoryId:string, itemName:string, itemNotes:string, itemQWanted:string) => {
        //check if item with matching name && notes && category:
        //If true: add quantity to the existing item -> give toast
        //If false: add new item -> give toast
        dispatch(addItem(itemCategoryId, itemName, itemNotes, parseInt(itemQWanted), 0))
    }

    return (
        <View style={modalStyles.modalContainer}>
            <TextInput
                style={{
                    height: 50,
                    width: '100%',
                    padding: 5,
                    textAlign: 'center',
                    color: 'black',
                    fontWeight: '600',
                    fontSize: 32,
                    marginTop: 16,
                    marginBottom: 48
                }}
                numberOfLines={1}
                onChangeText={valueName => setValueName(valueName)}
                value={valueName}
                placeholder={"Item Name"}
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                clearButtonMode='never'
            />
            <TextInput 
                style={{
                    backgroundColor: 'lightgrey'
                }}
                numberOfLines={1}
                onChangeText={valueNotes => setValueNotes(valueNotes)}
                value={valueNotes}
                placeholder={"Additional notes"}
            />
            <Text>Category: {selectCategoryId}</Text>
            <TextInput 
                style={{
                    backgroundColor: 'lightgrey'
                }}
                numberOfLines={1}
                onChangeText={valueQuantity => setValueQuantity(valueQuantity)}
                value={valueQuantity}
                keyboardType={'numeric'}
                placeholder={"1+"}
                clearButtonMode={'never'}
            />
            <TouchableOpacity
                style={modalStyles.button}
                onPress={() => onPressAddItem(selectCategoryId, valueName, valueNotes, valueQuantity)}
            >
                <Text>Add item</Text>
            </TouchableOpacity>
        </View>
    )
};

const modalStyles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'tomato',
        height: '50%',
        padding: 24
    },
    button: {
        backgroundColor: 'cadetblue',
        height: 64,
        borderRadius: 64/2
    }
});

export default ItemAddModal;