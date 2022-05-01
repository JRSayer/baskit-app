import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import hexToRGBa from '../functions/helperFunctions';
import { updateSelectCategory, updateItemShoppingChecked } from '../redux/reducer';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShoppingStackParamList, ShoppingStackRoutes} from '../navigation/MainRoutes';


type ShoppingScreenProp = StackNavigationProp<ShoppingStackParamList, ShoppingStackRoutes.ShoppingStack>;

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
    const navigation = useNavigation<ShoppingScreenProp>();
    const dispatch = useDispatch()

    console.log(props);
    
    // const [selectedFlag, setSelectedFlag] = useState(props.itemInfo.itemCheckedInList);
    var selectedFlag: boolean = props.itemInfo.itemCheckedInList
    const onToggleSelected = () => {
        dispatch(updateItemShoppingChecked(props.itemInfo.itemId,!selectedFlag))
    }


    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)

    const itemCategoryColor:any = categoriesData.filter(function (it:any) {
        return it.categoryId == props.itemInfo.itemCategory
    })

    const categoryColor:string = itemCategoryColor[0].categoryColor

    const onEditItemPress = () => {
        dispatch(updateSelectCategory(props.itemInfo.itemCategory))
        navigation.navigate(ShoppingStackRoutes.ShoppingItemUpdate, {item: props.itemInfo})
    }
    
    return (
        <View style={itemStyle.itemContainer}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => onEditItemPress()}
            >
                {!selectedFlag ? (
                    <TouchableOpacity style={[itemStyle.itemNotSelectedButton, {borderColor: categoryColor}]}
                        onPress={() => onToggleSelected()}
                    ></TouchableOpacity>
                ):(
                    <TouchableOpacity style={[itemStyle.itemSelectedButton, {backgroundColor: categoryColor}]}
                        onPress={() => onToggleSelected()}
                    >
                        <Ionicons name='ios-checkmark-sharp' color="#fff" size={32}/>
                    </TouchableOpacity>
                )}
                <View style={itemStyle.itemContentContainer}>
                    {props.itemInfo.itemQuantityWanted > 1 ? (
                        <Text style={itemStyle.itemTitle}>{props.itemInfo.itemName} - {props.itemInfo.itemQuantityWanted}</Text>
                    ):(
                        <Text>{props.itemInfo.itemName}</Text>
                    )}
                    {props.itemInfo.itemNotes != '' ? (
                        <Text style={{color: hexToRGBa("#2d3132", 0.4)}}>{props.itemInfo.itemNotes}</Text>
                    ):(<></>)}
                </View>
            </TouchableOpacity>
            <View style={itemStyle.rightContainer}>
                <Ionicons name='ios-reorder-two' color={hexToRGBa("#2d3132", 0.15)} size={28}/>
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
    }
});

export default Item;