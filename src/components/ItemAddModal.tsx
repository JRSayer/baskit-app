import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

function ItemAddModal() {
    const [valueName, setValueName] = useState('')
    const [valueNotes, setValueNotes] = useState(null)
    const [valueQuantity, setValueQuantity] = useState('1')

    return (
        <View style={modalStyles.modalContainer}>
            <TextInput
                style={{
                    height: 50,
                    width: '100%',
                    padding: 5,
                    textAlign: 'center',
                    color: 'black',
                    fontWeight: '600',
                    fontSize: 32,
                    marginTop: 16,
                    marginBottom: 48
                }}
                numberOfLines={1}
                onChangeText={valueName => setValueName(valueName)}
                value={valueName}
                placeholder={"Item Name"}
                placeholderTextColor={"rgba(0,0,0,0.4)"}
                clearButtonMode='never'
            />

        </View>
    )
};

const modalStyles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'tomato',
        height: '50%'
    }
});

export default ItemAddModal;