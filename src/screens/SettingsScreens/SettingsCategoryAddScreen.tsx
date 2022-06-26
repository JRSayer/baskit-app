import React, { useState } from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, TextInput, ScrollView } from 'react-native'

import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import { SettingsStackParamList, SettingsStackRoutes } from '../../navigation/MainRoutes';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialCIcon from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux'

import AppStyles from '../../../assets/styles/baseStyle';
import hexToRGBa from '../../functions/helperFunctions';
import { addCategory, updateCategory } from '../../redux/reducer';

type SettingsScreenProp = StackNavigationProp<SettingsStackParamList, SettingsStackRoutes.SettingsStack>;

interface RootState {
    categoriesData: Array<Category>
};

type Category = {
    categoryId: string,
    categoryName: string,
    categoryColor: string
};

function SettingsCategoryEditScreen() {
    const navigation = useNavigation<SettingsScreenProp>();
    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)
    const dispatch = useDispatch()

    const [valueCategoryName, setValueCategoryName] = useState("");
    const [valueCategoryColor, setValueCategoryColor] = useState("#35BBCB");
    
    const colors: Array<string> = [
        "#35BBCB", "#0191B5", "#FED915", "#FE7A15", "#41CB35", "#D4DD18", "#FE1515", "#A701B5", 
        "#0133B5", "#01B58A", "#15FED4","#FEAF15", "#FE15D9","#DCDBDD", "#8A8990", "#14121E",
    ]

    const ColorSpot = (colorHex:any) => {
        return (
            <TouchableOpacity style={{
                backgroundColor: colorHex.colorHex,
                height: 64,
                width: 64,
                borderRadius: 64/2,
                // marginBottom: 16,
                marginRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
            }}
                onPress={() => setValueCategoryColor(colorHex.colorHex)}
            >
                {colorHex.colorHex == valueCategoryColor ? (
                    <View style={{
                        backgroundColor: hexToRGBa('#000', 0.3),
                        height: 32,
                        width: 32,
                        borderRadius: 32/2
                    }}></View>
                ) : (<></>)}
            </TouchableOpacity>
        )
    };

    const onAddCategory = (categoryName:string, categoryColor:string) => {
        dispatch(addCategory(categoryName, categoryColor))
        navigation.goBack()
    }
    
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex:1, justifyContent: 'flex-end'}}
                keyboardVerticalOffset={96}
            >
            <View style={styles.container}>
                <View style={{flexDirection: 'row', marginBottom: 48, alignItems: 'center'}}>
                    <View style={[styles.settingsPageIconContainer, {
                        height: 64,
                        width: 64,
                        borderRadius: 64/2,
                    }]}>
                        <MaterialIcon name='pie-chart-outlined' color={hexToRGBa("#14121E", 0.5)} size={32}/>
                    </View>
                    <Text style={{fontSize: 20, fontWeight: '700', marginLeft: 16}}>Category Create</Text>
                </View>
                <View style={[styles.settingItemContainer, {backgroundColor: hexToRGBa(valueCategoryColor, 0.12), marginBottom: 16}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{
                            height: 10,
                            width: 10,
                            borderRadius: 10/2,
                            backgroundColor: valueCategoryColor,
                            marginRight: 10
                        }}></View>
                        <Text style={[styles.settingsPageName, {
                            color: valueCategoryColor
                        }]}>{valueCategoryName}</Text>
                    </View>
                </View>
                <Text style={styles.sectionHeading}>Category name</Text>
                <TextInput 
                    style={[styles.settingItemContainer, {fontWeight: '600',
                    fontSize: 16,}]}
                    numberOfLines={1}
                    onChangeText={valueCategoryName => setValueCategoryName(valueCategoryName)}
                    value={valueCategoryName}
                    placeholder={"Category name"}
                    clearButtonMode={'never'}
                />
                <Text style={[styles.sectionHeading, {marginBottom: 16}]}>Category colour</Text>
                <View style={{height: 64}}>
                    <FlatList
                        data={colors}
                        keyExtractor={item => item.toString()}
                        scrollEnabled={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => {
                            return (
                                <ColorSpot colorHex={item}/>
                            )
                        }}
                    />
                </View>
                <View style={styles.fabContainerLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[AppStyles.fabButton, {backgroundColor: '#D7D6DA'}]}>
                        <MaterialIcon name='close' color={hexToRGBa("#14121E", 0.25)} size={32}/>
                    </TouchableOpacity>
                </View>
                <View style={AppStyles.fabContainer}>
                    <TouchableOpacity
                        onPress={() => onAddCategory(valueCategoryName, valueCategoryColor)}
                        style={styles.fabButton2}>
                        <MaterialIcon name='check' color='#fff' size={32} style={{marginRight: 8}}/>
                        <Text style={{fontWeight: '700', color: '#fff'}}>CREATE CATEGORY</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </KeyboardAvoidingView>
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
    fabContainerLeft: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        left: 24,
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
    fabButton2: {
        backgroundColor: '#2d3132',
        flexDirection: 'row',
        borderRadius: 32,
        // width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingRight: 24,
        paddingLeft: 16       
    },
    settingItemContainer: {
        backgroundColor: hexToRGBa("#14121E", 0.08),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        borderRadius: 16,
        paddingLeft: 24,
    },
    settingsPageName: {
        fontWeight: '600',
        fontSize: 16,
        color: hexToRGBa("#14121E", 0.5)
    },
    settingsPageIconContainer: {
        backgroundColor: hexToRGBa("#14121E", 0.08),
        height: 56,
        width: 56,
        borderRadius: 56/2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionHeading: {
        marginTop: 16,
        marginBottom: 8,
        fontWeight: '600',
        color: hexToRGBa("#14121E", 0.3)
    },
    bottomButtons: {
        flexDirection: 'row',
        marginBottom: 8,
        height: 64,
        justifyContent: 'space-between'
    },
    itemChip: {
        // backgroundColor: hexToRGBa('#2d3132', 0.1),
        // alignItems: 'center',
        justifyContent: 'center',
        height: 54,
        borderRadius: 100,
        marginBottom: 16,
        padding: 16,
        paddingLeft: 24,
        paddingRight: 24,
        marginRight: 10
    }
})

export default SettingsCategoryEditScreen;