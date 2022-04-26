import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import hexToRGBa from '../functions/helperFunctions';


interface RootState {
    categoriesData: Array<object>
};

type ItemProps = {
    itemInfo: {
        itemCategory: string,
        itemId: string,
        itemName: string,
        itemNotes: string,
        itemQuantityWanted: number,
        itemQuantityOwned: number,
    },
};

function Item(props: ItemProps) {
    const [selectedFlag, setSelectedFlag] = useState(false);
    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)

    const itemCategoryColor:any = categoriesData.filter(function (it:any) {
        return it.categoryId == props.itemInfo.itemCategory
    })

    const categoryColor:string = itemCategoryColor[0].categoryColor
    
    return (
        <View style={itemStyle.itemContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {!selectedFlag ? (
                    <TouchableOpacity style={[itemStyle.itemNotSelectedButton, {borderColor: categoryColor}]}
                        onPress={() => setSelectedFlag(true)}
                    ></TouchableOpacity>
                ):(
                    <TouchableOpacity style={[itemStyle.itemSelectedButton, {backgroundColor: categoryColor}]}
                        onPress={() => setSelectedFlag(false)}
                    >
                        <Ionicons name='ios-checkmark-sharp' color="#fff" size={32}/>
                    </TouchableOpacity>
                )}
                <View style={itemStyle.itemContentContainer}>
                    {props.itemInfo.itemQuantityWanted > 0 ? (
                        <Text style={itemStyle.itemTitle}>{props.itemInfo.itemName} - {props.itemInfo.itemQuantityOwned}</Text>
                    ):(
                        <Text>{props.itemInfo.itemName}</Text>
                    )}
                    {props.itemInfo.itemNotes != '' ? (
                        <Text style={{color: hexToRGBa("#2d3132", 0.4)}}>{props.itemInfo.itemNotes}</Text>
                    ):(<></>)}
                </View>
            </View>
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