import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


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
            {!selectedFlag ? (
                <TouchableOpacity style={[itemStyle.itemNotSelectedButton, {borderColor: categoryColor}]}
                    onPress={() => setSelectedFlag(true)}
                ></TouchableOpacity>
            ):(
                <TouchableOpacity style={[itemStyle.itemSelectedButton, {backgroundColor: categoryColor}]}
                    onPress={() => setSelectedFlag(false)}
                ></TouchableOpacity>
            )}
            <View style={itemStyle.itemContentContainer}>
                <Text>{props.itemInfo.itemName}</Text>
                {props.itemInfo.itemNotes != '' ? (
                    <Text>{props.itemInfo.itemNotes}</Text>
                ):(<></>)}
                <Text>Wanted: {props.itemInfo.itemQuantityWanted}</Text>
            </View>
        </View>
    )
};

const itemStyle = StyleSheet.create({
    itemContainer: {
        marginBottom: 4,
        marginTop: 4,
        flexDirection: 'row',
    },
    itemContentContainer: {
        backgroundColor: 'lime'
    },
    itemNotSelectedButton: {
        borderWidth: 5,
        height: 54,
        width: 54,
        borderRadius: 54/2,
        marginRight: 8
    },
    itemSelectedButton: {
        backgroundColor: '#feda23',
        height: 54,
        width: 54,
        borderRadius: 54/2,
        marginRight: 8
    }
});

export default Item;