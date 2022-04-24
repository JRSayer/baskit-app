import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import hexToRGBa from '../functions/helperFunctions';

import Item from './Item';

type CategoryProps = {
    categoryData: {
        categoryColor: string,
        categoryId: string,
        categoryName: string
    },
};

interface RootState {
    categoriesData: Array<object>
    itemsData: Array<object>
};

function Category(props: CategoryProps) {
    const itemsData:Array<object> = useSelector((state: RootState) => state.itemsData);
    const categoryColor:string = props.categoryData.categoryColor;
    const categoryId:string = props.categoryData.categoryId;
    const itemsInCategory:any = itemsData.filter(function (it:any) {
        return it.itemCategory == categoryId && it.itemQuantityWanted > 0
    })
    console.log(categoryColor);
    console.log(hexToRGBa("#00b0ff", 0.1))

    return (
        <View style={categoryStyle.categoryContainer}>
            <View style={categoryStyle.categoryHeaderContainer}>
                <View style={categoryStyle.categoryHeaderText}>
                    <View style={[categoryStyle.categoryDot, {backgroundColor: categoryColor}]}></View>
                    <Text>{props.categoryData.categoryName}</Text>
                </View>
                <View style={[categoryStyle.categoryHeaderPill, {backgroundColor: hexToRGBa(categoryColor, 0.1)}]}>
                    <Ionicons name='ios-checkmark' color={categoryColor} size={16} style={{marginRight: 3}}/>
                    <Text style={{color: categoryColor}}>{itemsInCategory.length}</Text>
                </View>
            </View>
            {itemsInCategory.length > 0 ? (
                <FlatList
                    data={itemsInCategory}
                    keyExtractor={item => item.itemId}
                    renderItem={({item}) => (
                        <Item itemInfo={item}/>
                    )}
                />
            ):(<></>)}
        </View>
    )
};

const categoryStyle = StyleSheet.create({
    categoryContainer: {
        // borderColor: 'black',
        // borderWidth: 1,
        marginBottom: 24,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: hexToRGBa("#2d3132", 0.1),
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    categoryHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    categoryHeaderText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryDot: {
        height: 10,
        width: 10,
        borderRadius: 10/2,
        marginRight: 8
    },
    categoryHeaderPill: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        paddingLeft: 8,
        paddingRight: 12,
        borderRadius: 50
    },
});

export default Category;