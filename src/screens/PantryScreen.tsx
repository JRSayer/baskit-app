import React from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, LogBox } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'

function ListScreen({ navigation }) {
    const dispatch = useDispatch()
    // dispatch(removeCategory("Chilled & Diary"))
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                {/* <Header title={'List'} /> */}
                {/* <ListView /> */}
                <Text>Placeholder - Pantry</Text>
                <View style={styles.fabContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Modal')}
                        style={styles.fabButton}>
                        <Text>+</Text>
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
        backgroundColor: 'black',
        borderRadius: 32,
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',       
    },
})

export default ListScreen