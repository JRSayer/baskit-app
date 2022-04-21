import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';


type ItemProps = {
    itemInfo: {
        itemId: string,
        itemName: string,
        itemNotes: string,
        itemQuantityWanted: number,
        itemQuantityOwned: number,
    },
};

function Item(props: ItemProps) {
    return (
        <View style={itemStyle.itemContainer}>
            <Text>{props.itemInfo.itemName}</Text>
        </View>
    )
};

const itemStyle = StyleSheet.create({
    itemContainer: {
        borderColor: 'black',
        borderWidth: 1,
        margin: 2,
    }
});

export default Item;