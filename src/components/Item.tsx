import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import hexToRGBa from '../functions/helperFunctions';
import { updateSelectCategory, updateItemShoppingChecked, updateItemQuantityOwned, updateItemQuantityWanted } from '../redux/reducer';

import BouncyCheckbox from "react-native-bouncy-checkbox";

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
    
    // const [selectedFlag, setSelectedFlag] = useState(props.itemInfo.itemCheckedInList);
    var selectedFlag: boolean = props.itemInfo.itemCheckedInList
    const onToggleChecked = () => {
        dispatch(updateItemShoppingChecked(props.itemInfo.itemId,!selectedFlag))
    }

    const [checkboxState, setCheckboxState] = React.useState(false);

    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)

    const itemCategoryColor:any = categoriesData.filter(function (it:any) {
        return it.categoryId == props.itemInfo.itemCategory
    })

    const categoryColor:string = itemCategoryColor[0].categoryColor

    const onEditItemPress = () => {
        dispatch(updateSelectCategory(props.itemInfo.itemCategory))
        navigation.navigate(ShoppingStackRoutes.ShoppingItemUpdate, {item: props.itemInfo})
    }

    const onPantryMovePress = () => {        
        const newQuantOwned: number = props.itemInfo.itemQuantityOwned + props.itemInfo.itemQuantityWanted
        dispatch(updateItemQuantityOwned(props.itemInfo.itemId, newQuantOwned))
        dispatch(updateItemShoppingChecked(props.itemInfo.itemId, false))
        dispatch(updateItemQuantityWanted(props.itemInfo.itemId, 0))
    }
    
    return (
        <View style={itemStyle.itemContainer}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => onEditItemPress()}
            >
                <BouncyCheckbox
                    size={56}
                    fillColor={categoryColor}
                    unfillColor="#FFFFFF"
                    disableText={true}
                    style={{marginRight: 12,}}
                    iconStyle={{ borderColor: categoryColor, borderWidth: 5 }}
                    isChecked={selectedFlag}
                    disableBuiltInState
                    onPress={() => onToggleChecked()}
                    iconComponent={
                        <Icon name='check' color="#fff" size={32}/>
                    }
                    />
                <View style={itemStyle.itemContentContainer}>
                    {props.itemInfo.itemQuantityWanted > 1 ? (
                        <Text style={itemStyle.itemTitle}>{props.itemInfo.itemName} - {props.itemInfo.itemQuantityWanted}</Text>
                    ):(
                        <Text numberOfLines={1} style={itemStyle.itemTitle}>{props.itemInfo.itemName}</Text>
                    )}
                    {props.itemInfo.itemNotes != '' ? (
                        <Text numberOfLines={1} style={itemStyle.itemNotes}>{props.itemInfo.itemNotes}</Text>
                    ):(<></>)}
                </View>
            </TouchableOpacity>
            <View style={itemStyle.rightContainer}>
                {selectedFlag ? (
                    <TouchableOpacity
                        onPress={() => onPantryMovePress()}
                    >
                        <Icon name='arrow-right' color={hexToRGBa("#2d3132", 0.15)} size={28}/>
                    </TouchableOpacity>
                ):(<></>)}
            </View>
        </View>
    )
};

const itemStyle = StyleSheet.create({
    itemContainer: {
        marginBottom: 6,
        marginTop: 6,
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
        width: 175,
    },
    itemNotes: {
        color: hexToRGBa("#14121E", 0.35),
        width: 175,
    }
});

export default Item;