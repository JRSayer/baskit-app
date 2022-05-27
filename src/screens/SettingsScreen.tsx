import React from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, FlatList, LogBox } from 'react-native'

import {useNavigation} from '@react-navigation/native';
import { SettingsStackParamList, SettingsStackRoutes } from '../navigation/MainRoutes';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialCIcon from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

import hexToRGBa from '../functions/helperFunctions';

type SettingsScreenProp = StackNavigationProp<SettingsStackParamList, SettingsStackRoutes.SettingsStack>;

function ListScreen() {
    const navigation = useNavigation<SettingsScreenProp>();
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
                        <MaterialIcon name='settings' color={hexToRGBa("#14121E", 0.5)} size={32}/>
                    </View>
                    <Text style={{fontSize: 20, fontWeight: '700', marginLeft: 16}}>Settings</Text>
                </View>
                <View style={styles.settingsPageContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.settingsPageIconContainer}>
                            <MaterialIcon name='notifications-active' color={hexToRGBa("#14121E", 0.5)} size={28}/>
                        </View>
                        <Text style={styles.settingsPageName}>Notifications</Text>
                    </View>
                    <MaterialIcon name='chevron-right' color={hexToRGBa("#14121E", 0.25)} size={28}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsPageContainer}
                    onPress={() => navigation.navigate(SettingsStackRoutes.SettingsCatManagement)}
                >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.settingsPageIconContainer}>
                            <MaterialCIcon name='database' color={hexToRGBa("#14121E", 0.5)} size={28}/>
                        </View>
                        <Text style={styles.settingsPageName}>Category Management</Text>
                    </View>
                    <MaterialIcon name='chevron-right' color={hexToRGBa("#14121E", 0.25)} size={28}/>
                </View>
                <View style={styles.settingsPageContainer}>
                <TouchableOpacity style={styles.settingsPageContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.settingsPageIconContainer}>
                            <MaterialCIcon name='vector-intersection' color={hexToRGBa("#14121E", 0.5)} size={28}/>
                        </View>
                        <Text style={styles.settingsPageName}>Item Management</Text>
                    </View>
                    <MaterialIcon name='chevron-right' color={hexToRGBa("#14121E", 0.25)} size={28}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsPageContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.settingsPageIconContainer}>
                            <MaterialCIcon name='palette-swatch' color={hexToRGBa("#14121E", 0.5)} size={28}/>
                        </View>
                        <Text style={styles.settingsPageName}>Customisation</Text>
                    </View>
                    <MaterialIcon name='chevron-right' color={hexToRGBa("#14121E", 0.25)} size={28}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsPageContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.settingsPageIconContainer}>
                            <MaterialIcon name='support' color={hexToRGBa("#14121E", 0.5)} size={28}/>
                        </View>
                        <Text style={styles.settingsPageName}>Help</Text>
                    </View>
                    <MaterialIcon name='chevron-right' color={hexToRGBa("#14121E", 0.25)} size={28}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsPageContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.settingsPageIconContainer}>
                            <MaterialIcon name='info-outline' color={hexToRGBa("#14121E", 0.5)} size={28}/>
                        </View>
                        <Text style={styles.settingsPageName}>About</Text>
                    </View>
                    <MaterialIcon name='chevron-right' color={hexToRGBa("#14121E", 0.25)} size={28}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsPageContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={[styles.settingsPageIconContainer, {backgroundColor: hexToRGBa('#FE1515', 0.08)}]}>
                            <MaterialCIcon name='restart' color='#FE1515' size={28}/>
                        </View>
                        <Text style={[styles.settingsPageName, {color: '#FE1515'}]}>Reset Data</Text>
                    </View>
                    <MaterialIcon name='chevron-right' color={hexToRGBa("#14121E", 0.25)} size={28}/>
                </TouchableOpacity>
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
    settingsPageContainer: {
        // backgroundColor: 'rgba(200, 160, 178, .3)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    settingsPageName: {
        marginLeft: 16,
        fontWeight: '700',
        fontSize: 16,
        color: hexToRGBa("#14121E", 0.75)
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

export default ListScreen