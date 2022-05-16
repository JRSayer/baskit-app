import React from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, LogBox } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux'

import Toast from 'react-native-toast-message';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PantryStackParamList, PantryStackRoutes} from '../navigation/MainRoutes';
import { removeItem } from '../redux/reducer';
import AppStyles from '../../assets/styles/baseStyle';
import hexToRGBa from '../functions/helperFunctions';

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

const ToastConfig:any = {
    itemSuccess: (props: any, text1: string) => (
        <View style={{width: '100%', padding: 24}}>
            <View style={{
                backgroundColor: 'rgba(0,0,0,0.85)',
                borderRadius: 100,
                flexDirection: 'row',
                paddingTop: 16,
                paddingBottom: 16,
                paddingLeft: 24,
                paddingRight: 24,
                alignItems: 'center'
            }}>
                <View style={{backgroundColor: props.categoryColor, height: 10, width: 10, borderRadius: 10/2, marginRight: 12}}></View>
                <Text style={{color: '#ffffff', fontWeight: '600', fontSize: 14}}>{text1}</Text>
            </View>
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
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity style={{
                        backgroundColor: hexToRGBa('#14121E', 0.08),
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        paddingRight: 24,
                        borderRadius: 64
                    }}>
                        <MaterialIcon name='category' color={hexToRGBa('#14121E', 0.25)} size={24} style={{marginRight: 8}}/>
                        <Text style={{color: hexToRGBa('#14121E', 0.3), fontWeight: '700'}}>Sort</Text>
                    </TouchableOpacity>
                </View>
                <ListView />
                <View style={AppStyles.fabContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(PantryStackRoutes.PantryItemAdd)}
                        style={AppStyles.fabButton}>
                        <Icon name='plus' color='#fff' size={32}/>
                    </TouchableOpacity>
                </View>
                <Toast config={ToastConfig} position="bottom" bottomOffset={100} visibilityTime={2500} />
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