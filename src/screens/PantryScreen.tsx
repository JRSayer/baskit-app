import React from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, LogBox } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PantryStackParamList, PantryStackRoutes} from '../navigation/MainRoutes';
import { removeItem } from '../redux/reducer';

import CategoryPantry from '../components/CategoryPantry';

type PantryScreenProp = StackNavigationProp<PantryStackParamList, PantryStackRoutes.PantryStack>;

interface RootState {
    categoriesData: Array<object>
    itemsData: Array<object>
};

function ListView() {
    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)
    const itemsData:any = useSelector((state: RootState) => state.itemsData)
    const dispatch = useDispatch()
    
    console.log(itemsData);
    

    return (
        <View
            style={{
                flex: 1,
                // backgroundColor: 'aquamarine',
                marginTop: 16,
                marginBottom: 32
            }}>
                {categoriesData.length !== 0 && itemsData.length !== 0 ? (
                    <FlatList
                        data={categoriesData}
                        keyExtractor={item => item.categoryId}
                        renderItem={({item}) => {
                            //Checking if a category contains items that are "wanted"
                            const itemFilter = itemsData.filter(function (it:any) {
                                return it.itemCategory == item.categoryId && it.itemQuantityOwned > 0
                            })
                            if (itemFilter.length > 0) {
                                return (
                                    <CategoryPantry categoryData={item}/>
                                )
                            }
                            else {
                                return (<></>)
                            }
                        }}
                    />
                ):(
                    <Text style={{textAlign: 'center', color: '#9e9e9e'}}>We don't have items/categories yet</Text>
                )}
        </View>
    )
};

function ListScreen() {
    const navigation = useNavigation<PantryScreenProp>();

    return (
        <>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                {/* <Header title={'List'} /> */}
                <ListView />
                <Text>Placeholder - Pantry</Text>
                <View style={styles.fabContainer}>
                    <TouchableOpacity
                        // onPress={() => navigation.navigate()}
                        onPress={() => console.log("pressed")}
                        style={styles.fabButton}>
                        <Ionicons name='ios-add' color='#fff' size={28} style={{marginLeft: 3}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

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
})

export default ListScreen