import React, { useState } from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, LogBox } from 'react-native'

import {useNavigation} from '@react-navigation/native';
import { SettingsStackParamList, SettingsStackRoutes } from '../../navigation/MainRoutes';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialCIcon from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

import AppStyles from '../../../assets/styles/baseStyle';
import hexToRGBa from '../../functions/helperFunctions';
import RNSwitch from '../../components/RNSwitch';

type SettingsScreenProp = StackNavigationProp<SettingsStackParamList, SettingsStackRoutes.SettingsStack>;

function SettingsNotificationScreen() {
    const navigation = useNavigation<SettingsScreenProp>();
    const [switchState, setSwitchState] = useState(false);
    const onHandlePressNotification = (value:boolean) => {
        console.log("press");
        setSwitchState(value);
    }
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                <View style={{flexDirection: 'row', marginBottom: 48, alignItems: 'center'}}>
                    <View style={[styles.settingsPageIconContainer, {
                        height: 64,
                        width: 64,
                        borderRadius: 64/2,
                    }]}>
                        <MaterialIcon name='notifications-active' color={hexToRGBa("#14121E", 0.5)} size={32}/>
                    </View>
                    <Text style={{fontSize: 20, fontWeight: '700', marginLeft: 16}}>Notifications</Text>
                </View>
                <View style={styles.settingItemContainer}>
                    <Text style={styles.settingsPageName}>Notifications enabled</Text>
                    <View style={{marginRight: 16}}>
                        <RNSwitch handleOnPress={onHandlePressNotification} value={switchState}/>
                    </View>
                </View>
                <View style={[styles.settingItemContainer, {marginLeft: 24}]}>
                    <Text style={styles.settingsPageName}>Push notifications</Text>
                    <View style={{marginRight: 16}}>
                        <RNSwitch handleOnPress={onHandlePressNotification} value={switchState}/>
                    </View>
                </View>
                <View style={[styles.settingItemContainer, {marginLeft: 24}]}>
                    <Text style={styles.settingsPageName}>SMS notifications</Text>
                    <View style={{marginRight: 16}}>
                        <RNSwitch handleOnPress={onHandlePressNotification} value={switchState}/>
                    </View>
                </View>
                <View style={styles.settingItemContainer}>
                    <Text style={styles.settingsPageName}>Notification frequency</Text>
                    <Text style={[styles.settingsPageName, {color: hexToRGBa("#14121E", 0.25), marginRight: 24}]}>Daily</Text>
                </View>
                <View style={AppStyles.fabContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[AppStyles.fabButton, {backgroundColor: '#D7D6DA'}]}>
                        <MaterialCIcon name='arrow-left' color={hexToRGBa("#14121E", 0.25)} size={32}/>
                    </TouchableOpacity>
                </View>
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
    settingItemContainer: {
        backgroundColor: hexToRGBa("#14121E", 0.04),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        borderRadius: 16,
        paddingLeft: 24,
        marginBottom: 8
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
})

export default SettingsNotificationScreen;