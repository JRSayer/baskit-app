import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Platform, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShoppingStackParamList, ShoppingStackRoutes} from '../navigation/MainRoutes';
type ShoppingScreenProp = StackNavigationProp<ShoppingStackParamList, ShoppingStackRoutes.ShoppingStack>;

import hexToRGBa from '../functions/helperFunctions';
import { addCategory } from '../redux/reducer';

interface RootState {
    categoriesData: Array<object>
    selectCategoryId: string
};

function ItemAddModalScreen() {
    const navigation = useNavigation<ShoppingScreenProp>();

    const categoriesData:any = useSelector((state: RootState) => state.categoriesData)
    const selectedCategoryId = useSelector((state: RootState) => state.selectCategoryId)
    const dispatch = useDispatch()

    const [valueCategoryName, setValueCategoryName] = useState('');
    const [valueCategoryColor, setValueCategoryColor] = useState('#35BBCB')

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

    const onCreateCategory = (categoryName:string, categoryColor:string) => {
        dispatch(addCategory(categoryName, categoryColor));
        navigation.goBack()
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex:1, justifyContent: 'flex-end'}}
            keyboardVerticalOffset={96}
        >
            <View style={modalStyle.container}>
                <TextInput 
                    style={modalStyle.textInputName}
                    numberOfLines={1}
                    onChangeText={valueCategoryName => setValueCategoryName(valueCategoryName)}
                    value={valueCategoryName}
                    placeholder={"Category name"}
                    clearButtonMode={'never'}
                />
                <Text style={modalStyle.inputHeading}>Colour</Text>
                <FlatList
                    data={colors}
                    keyExtractor={item => item.toString()}
                    // numColumns={4}
                    scrollEnabled={true}
                    horizontal={true}
                    // columnWrapperStyle={{justifyContent: 'space-between'}}
                    renderItem={({item}) => {
                        return (
                            <ColorSpot colorHex={item}/>
                        )
                    }}
                    style={{marginBottom: 24}}
                />
                <Text style={modalStyle.inputHeading}>Preview</Text>
                <View style={[modalStyle.categoryContainer, {backgroundColor: hexToRGBa(valueCategoryColor, 0.1)}]}>
                    <View style={{height: 10, width: 10, backgroundColor: valueCategoryColor, borderRadius:10/2, marginRight: 10}}></View>
                    {valueCategoryName.length > 0 ? (
                        <Text>{valueCategoryName}</Text>
                    ):(
                        <Text style={{color: hexToRGBa("#2d3132", 0.5)}}>Category Name</Text>
                    )}
                </View>
                <View style={modalStyle.bottomButtons}>
                    <TouchableOpacity style={[modalStyle.button, modalStyle.cancelButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name='close' color={hexToRGBa("#14121E", 0.25)} size={32}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[modalStyle.button, modalStyle.addButton]}
                        onPress={() => onCreateCategory(valueCategoryName, valueCategoryColor)}
                    >
                        <Icon name='check' color={"#fff"} size={32} style={{marginRight: 8}}/>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>CREATE CATEGORY</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

const modalStyle = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#F4F6F6',
        // backgroundColor: 'yellow',
        padding: 24,
        // height: 250,
        justifyContent: 'flex-end', 
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
    },
    bottomButtons: {
        flexDirection: 'row',
        marginBottom: 8,
        height: 64,
        justifyContent: 'space-between'
    },
    button: {
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', 
    },
    cancelButton: {
        // backgroundColor: '#c0c1c2',
        backgroundColor: hexToRGBa("#2d3132", 0.08),
        width: 64
    },
    addButton: {
        backgroundColor: '#2d3132',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingRight: 32
    },
    inputHeading: {
        marginBottom: 8,
        color: hexToRGBa("#2d3132", 0.5)
    },
    textInputName: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 24,
        marginBottom: 32
    },
    textInputNotes: {
        backgroundColor: hexToRGBa("#2d3132", 0.05),
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        height: 56
    },
    textInputQuantity: {
        backgroundColor: hexToRGBa("#2d3132", 0.05),
        padding: 16,
        borderRadius: 16,
        // marginBottom: 16,
        height: 56
    },
    textInputCategory: {
        backgroundColor: hexToRGBa("#2d3132", 0.05),
        padding: 16,
        borderRadius: 16,
        // marginBottom: 16,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    categoryContainer: {
        flexDirection: 'row',
        // backgroundColor: hexToRGBa('#2d3132', 0.1),
        alignItems: 'center',
        height: 54,
        borderRadius: 16,
        marginBottom: 48,
        padding: 16
    },
});

export default ItemAddModalScreen;
