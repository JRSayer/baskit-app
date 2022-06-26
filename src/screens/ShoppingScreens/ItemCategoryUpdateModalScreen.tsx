import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Platform, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ShoppingStackParamList, ShoppingStackRoutes} from '../../navigation/MainRoutes';
type ShoppingScreenProp = StackNavigationProp<ShoppingStackParamList, ShoppingStackRoutes.ShoppingStack>;

import hexToRGBa from '../../functions/helperFunctions';
import { addCategory, updateCategory } from '../../redux/reducer';

interface RootState {
    categoriesData: Array<object>
    selectCategoryId: string
    itemsData: Array<Item>
};

type Item = {
    itemCategory: string,
    itemCheckedInList: boolean,
    itemId: string,
    itemName: string,
    itemNotes: string,
    itemQuantityWanted: number,
    itemQuantityOwned: number,
};

function ItemAddModalScreen() {
    const navigation = useNavigation<ShoppingScreenProp>();
    const route = useRoute<RouteProp<ShoppingStackParamList, ShoppingStackRoutes.ShoppingCategoryUpdate>>();

    const categoriesData:Array<object> = useSelector((state: RootState) => state.categoriesData)
    const itemsData:Array<Item> = useSelector((state: RootState) => state.itemsData);
    const selectedCategoryId:string = useSelector((state: RootState) => state.selectCategoryId)
    const dispatch = useDispatch()

    const itemsInCategory:Array<Item> = itemsData.filter(function (it:any) {
        return it.itemCategory == route.params.category.categoryId && (it.itemQuantityWanted > 0 || it.itemQuantityOwned > 0)
    })

    const [valueCategoryName, setValueCategoryName] = useState(route.params.category.categoryName);
    const [valueCategoryColor, setValueCategoryColor] = useState(route.params.category.categoryColor);

    //A400 -> https://materialui.co/colors/
    const colors: Array<string> = [
        "#FF1744", "#F50057", "#D500F9", "#651FFF", "#3D5AFE", "#2979FF", "#00B0FF", "#00E5FF",
        "#1DE9B6", "#00E676", "#76FF03", "#C6FF00", "#FFEA00", "#FFC400", "#FF9100", "#FF3D00",
    ]

    const colors2: Array<string> = [
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

    const onUpdateCategory = (categoryName:string, categoryColor:string) => {
        // console.log("id: "+route.params.category.categoryId)
        // console.log("name: "+categoryName)
        // console.log("color: "+categoryColor)
        dispatch(updateCategory(route.params.category.categoryId, categoryName, categoryColor));
        navigation.goBack()
    }

    //set to index value or if not found set index to 0
    const indexOfColor:number = colors.indexOf(route.params.category.categoryColor) >= 0 ? colors.indexOf(route.params.category.categoryColor) : 0;

    if (indexOfColor > 0){
        colors.splice(colors.indexOf(route.params.category.categoryColor), 1);
        colors.unshift(route.params.category.categoryColor);
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
                    data={colors2}
                    keyExtractor={item => item.toString()}
                    scrollEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    // getItemLayout={(data, index) => (
                    //     {length: colors.length, offset: colors.length * index, index}
                    //   )}
                    // initialScrollIndex={indexOfColor}
                    // onScrollToIndexFailed={() => {}}
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
                <Text style={modalStyle.inputHeading}>Items in category</Text>
                <FlatList 
                    data={itemsInCategory}
                    keyExtractor={item => item.itemId}
                    scrollEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => {
                        return (
                            <View style={[modalStyle.itemChip, {backgroundColor: hexToRGBa(valueCategoryColor, 0.1)}]}>
                                <Text style={{fontWeight: '500',}}>{item.itemName}</Text>
                            </View>
                        )
                    }}
                />
                <View style={modalStyle.bottomButtons}>
                    <TouchableOpacity style={[modalStyle.button, modalStyle.cancelButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[modalStyle.button, modalStyle.addButton]}
                        onPress={() => onUpdateCategory(valueCategoryName, valueCategoryColor)}
                    >
                        <Text style={{color: 'white'}}>Update Category</Text>
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    bottomButtons: {
        flexDirection: 'row',
        marginBottom: 8,
        height: 64,
        justifyContent: 'space-between'
    },
    button: {
        width: '48%',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', 
    },
    cancelButton: {
        // backgroundColor: '#c0c1c2',
        backgroundColor: hexToRGBa("#2d3132", 0.2) 
    },
    addButton: {
        backgroundColor: '#2d3132',
    },
    inputHeading: {
        marginBottom: 8,
        color: hexToRGBa("#2d3132", 0.5)
    },
    textInputName: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 16,
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
        marginBottom: 16,
        padding: 16
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
});

export default ItemAddModalScreen;
