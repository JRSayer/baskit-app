import React from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, LogBox } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PantryStackParamList, PantryStackRoutes} from '../navigation/MainRoutes';
import { removeItem } from '../redux/reducer';

type PantryScreenProp = StackNavigationProp<PantryStackParamList, PantryStackRoutes.PantryStack>;

interface RootState {
    categoriesData: Array<object>
    itemsData: Array<object>
};

function ListScreen() {
    const navigation = useNavigation<PantryScreenProp>();
    const itemsData:any = useSelector((state: RootState) => state.itemsData)
    const dispatch = useDispatch()

    return (
        <>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                {/* <Header title={'List'} /> */}
                {/* <ListView /> */}
                <Text>Placeholder - Pantry</Text>
                <FlatList
                        data={itemsData}
                        keyExtractor={item => item.itemId}
                        renderItem={({item}) => {
                            return(
                                <TouchableOpacity style={{backgroundColor: 'lime', marginBottom: 10}}
                                    onPress={() => dispatch(removeItem(item.itemId))}
                                >
                                    <Text>{item.itemName}</Text>
                                    <Text>Item ID: {item.itemId}</Text>
                                    <Text>Category: {item.itemCategory}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
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