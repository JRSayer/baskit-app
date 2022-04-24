import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

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
    console.log(itemsInCategory);
    

    return (
        <View style={categoryStyle.categoryContainer}>
            <Text>{props.categoryData.categoryName}</Text>
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
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 8
    }
});

export default Category;