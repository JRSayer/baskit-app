import React from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, LogBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import TopListButtons from '../components/TopListButtons';
import Category from '../components/Category';

import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList } from '../navigation/MainRoutes';
type ShoppingScreenNavigationProp = StackNavigationProp<MainTabParamList>;

type Props = {
  navigation: ShoppingScreenNavigationProp;
};

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
                backgroundColor: 'aquamarine'
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

//TODO: https://stackoverflow.com/questions/63132548/react-navigation-5-error-binding-element-navigation-implicitly-has-an-any-ty

function ListScreen({navigation}: Props ) {
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
                <View style={styles.fabContainer}>
                    <TouchableOpacity
                        // onPress={() => navigation.navigate('Modal')}
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