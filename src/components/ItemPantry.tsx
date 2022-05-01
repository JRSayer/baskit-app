import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import hexToRGBa from '../functions/helperFunctions';
import { updateSelectCategory, updateItemShoppingChecked } from '../redux/reducer';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PantryStackParamList, PantryStackRoutes} from '../navigation/MainRoutes';


type PantryScreenProp = StackNavigationProp<PantryStackParamList, PantryStackRoutes.PantryStack>;

interface RootState {
    categoriesData: Array<object>
};

type ItemProps = {
    itemInfo: {
        itemCategory: string,
        itemCheckedInList: boolean,
        itemId: string,
        itemName: string,
        itemNotes: string,
        itemQuantityWanted: number,
        itemQuantityOwned: number,
    },
};

function Item(props: ItemProps) {
    const navigation = useNavigation<PantryScreenProp>();
    const dispatch = useDispatch()
    
    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)

    const itemCategoryColor:any = categoriesData.filter(function (it:any) {
        return it.categoryId == props.itemInfo.itemCategory
    })

    const categoryColor:string = itemCategoryColor[0].categoryColor

    const onEditItemPress = () => {
        dispatch(updateSelectCategory(props.itemInfo.itemCategory))
        navigation.navigate(PantryStackRoutes.PantryItemUpdate, {item: props.itemInfo})
    }
    
    return (
        <View style={itemStyle.itemContainer}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => onEditItemPress()}
            >
                <View style={[itemStyle.itemSelectedButton, {backgroundColor: categoryColor}]}>
                    <Text style={itemStyle.itemQuantityText}>{props.itemInfo.itemQuantityOwned}</Text>
                </View>
                <View style={itemStyle.itemContentContainer}>
                    <Text style={itemStyle.itemTitle}>{props.itemInfo.itemName}</Text>
                    {props.itemInfo.itemNotes != '' ? (
                        <Text style={{color: hexToRGBa("#2d3132", 0.4)}}>{props.itemInfo.itemNotes}</Text>
                    ):(<></>)}
                </View>
            </TouchableOpacity>
            <View style={itemStyle.rightContainer}>
                <Ionicons name='ios-arrow-forward-outline' color={hexToRGBa("#2d3132", 0.15)} size={28}/>
            </View>
        </View>
    )
};

const itemStyle = StyleSheet.create({
    itemContainer: {
        marginBottom: 4,
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemContentContainer: {

    },
    itemNotSelectedButton: {
        borderWidth: 5,
        height: 54,
        width: 54,
        borderRadius: 54/2,
        marginRight: 8
    },
    itemSelectedButton: {
        height: 54,
        width: 54,
        borderRadius: 54/2,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightContainer: {
        height: 54,
        width: 54,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        fontWeight: '500',
    },
    itemQuantityText: {
        fontWeight: '500',
        fontSize: 20
    }
});

export default Item;