import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'

function hexToRGBa(h: string, a: number) {
    let r = 0, g = 0, b = 0;
  
    // 3 digits
    if (h.length == 4) {
      const r: string = "0x" + h[1] + h[1];
      const g: string = "0x" + h[2] + h[2];
      const b: string = "0x" + h[3] + h[3];
  
    // 6 digits
    } else if (h.length == 7) {
      const r: string = "0x" + h[1] + h[2];
      const g: string = "0x" + h[3] + h[4];
      const b: string = "0x" + h[5] + h[6];
    }
    //rgb(r,g,b,a)
    return "rgba("+ +r + "," + +g + "," + +b + "," + +a + ")";
};

function TopListButtons() {
    return (
        <View style={styles.listTopButtonsContainer}>
            <TouchableOpacity
                style={[styles.listTopButton, {backgroundColor: '#030303'}]}>
                <Text style={{color: '#fff'}}>Move Selected</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.listTopButton, {backgroundColor: hexToRGBa('#030303', 0.1)}]}>
                <Text>Sort</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    listTopButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listTopButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 64
    },
});

export default TopListButtons;