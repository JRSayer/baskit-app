import React from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, LogBox } from 'react-native'

import {useNavigation} from '@react-navigation/native';
import { SettingsStackParamList, SettingsStackRoutes } from '../navigation/MainRoutes';
import { StackNavigationProp } from '@react-navigation/stack';

type SettingsScreenProp = StackNavigationProp<SettingsStackParamList, SettingsStackRoutes.SettingsStack>;

function ListScreen() {
    const navigation = useNavigation<SettingsScreenProp>();
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                {/* <Header title={'List'} /> */}
                {/* <View style={AppStyles.fabContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(PantryStackRoutes.PantryItemAdd)}
                        style={AppStyles.fabButton}>
                        <Icon name='plus' color='#fff' size={32}/>
                    </TouchableOpacity>
                </View> */}
                <Text>Settings</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9FB',
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