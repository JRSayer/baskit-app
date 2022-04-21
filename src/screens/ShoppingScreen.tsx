import React from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, LogBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import TopListButtons from '../components/TopListButtons';

interface RootState {
    categoriesData: Array<any>
    itemsData: Array<any>
};

function ListView() {
    const categoriesData = useSelector((state: RootState) => state.categoriesData)
    const itemsData = useSelector((state: RootState) => state.itemsData)
    const dispatch = useDispatch()


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'aquamarine'
            }}>
                <Text>Test</Text>
        </View>
    )
};

//TODO: https://stackoverflow.com/questions/63132548/react-navigation-5-error-binding-element-navigation-implicitly-has-an-any-ty

function ListScreen({ navigation }) {
    const dispatch = useDispatch()
    // dispatch(removeCategory("Chilled & Diary"))

    return (
        <>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                {/* <Header title={'List'} /> */}
                {/* <ListView /> */}
                <TopListButtons />
                <ListView />
                <Text>Placeholder - X</Text>
                <View style={styles.fabContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Modal')}
                        style={styles.fabButton}>
                        <Text style={{color: '#fff', fontSize: 32}}>+</Text>
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
        backgroundColor: '#030303',
        borderRadius: 32,
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',       
    },
});

export default ListScreen;