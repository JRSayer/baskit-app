import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, LogBox, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShoppingStackParamList, ShoppingStackRoutes} from '../navigation/MainRoutes';

import Category from '../components/Category';


type ShoppingScreenProp = StackNavigationProp<ShoppingStackParamList, ShoppingStackRoutes.ShoppingStack>;

interface RootState {
    categoriesData: Array<object>
    itemsData: Array<object>
};

type Category = {
    category: {
        categoryColor: string,
        categoryId: string,
        categoryName: string
    }
}

function ListView() {
    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)
    const itemsData:any = useSelector((state: RootState) => state.itemsData)
    const dispatch = useDispatch()

    return (
        <View
            style={{
                flex: 1,
                // backgroundColor: 'aquamarine',
                marginTop: 16,
                marginBottom: 32
            }}>
                {categoriesData.length !== 0 ? (
                    <FlatList
                        data={categoriesData}
                        keyExtractor={item => item.categoryId}
                        renderItem={({item}) => {
                            //Checking if a category contains items that are "wanted"
                            const itemFilter = itemsData.filter(function (it:any) {
                                return it.itemCategory == item.categoryId && it.itemQuantityWanted > 0
                            })
                            if (itemFilter.length > 0) {
                                return (
                                    <Category categoryData={item}/>
                                )
                            }
                            else {
                                return (<></>)
                            }
                        }}
                    />
                ):(
                    <Text>We don't have categories! ::Sad Face::</Text>
                )}
        </View>
    )
};

function ListScreen() {
    const dispatch = useDispatch()
    const navigation = useNavigation<ShoppingScreenProp>();

    return (
        <>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                <ListView />
                <View style={styles.fabContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(ShoppingStackRoutes.ShoppingItemAdd)}
                        style={styles.fabButton}>
                        <Ionicons name='ios-add' color='#fff' size={28} style={{marginLeft: 3}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F6',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24
    },
    fabContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        right: 24,
        bottom: 48,
        shadowColor: "rgba(0,0,0,0.1)",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    fabButton: {
        backgroundColor: '#2d3132',
        borderRadius: 32,
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',       
    },
});

export default ListScreen;