

import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddInfo, TotalInfo } from '../screen';
import { GeneralInfo } from '../screen/generalinfo';



const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: 'red',
                tabBarActiveBackgroundColor: '#2B91BF',
                tabBarInactiveBackgroundColor: '#2B91BF',
                tabBarStyle: {
                    height: 75
                }
            })}
        >
            <Tab.Screen name="AddInfo" component={AddInfo}
                options={{
                    headerShown: false,
                    title: "",
                    tabBarIcon: ({ focused }) => (
                        <View style={style.content}>
                        {focused ?
                            <View style={style.tabIconBg}>
                                <Image style={[style.tabIcon, { tintColor: focused ? '#FFC430' : null }]} source={require("../assets/img/calendar.png")} />
                            </View> :
                            <Image style={[style.tabIcon, { tintColor: focused ? '#FFC430' : null }]} source={require("../assets/img/calendar.png")} />}
                    </View>
                    )
                }
                }
            />
            <Tab.Screen name="TotalInfo" component={TotalInfo}
                options={{
                    headerShown: false,
                    title: "",
                    tabBarIcon: ({ focused }) => (
                        <View style={style.content}>
                            {focused ?
                                <View style={style.tabIconBg}>
                                    <Image style={[style.tabIcon, { tintColor: focused ? '#FFC430' : null }]} source={require("../assets/img/notepad.png")} />
                                </View> :
                                <Image style={[style.tabIcon, { tintColor: focused ? '#FFC430' : null }]} source={require("../assets/img/notepad.png")} />}
                        </View>
                    )
                }
                }
            />
            <Tab.Screen name="GeneralInfo" component={GeneralInfo}
                options={{
                    headerShown: false,
                    title: "",
                    tabBarIcon: ({ focused }) => (
                        <View style={style.content}>
                            {focused ?
                                <View style={style.tabIconBg}>
                                    <Image style={[style.tabIcon, { tintColor: focused ? '#FFC430' : null }]} source={require("../assets/img/Info.png")} />
                                </View> :
                                <Image style={[style.tabIcon, { tintColor: focused ? '#FFC430' : null }]} source={require("../assets/img/Info.png")} />}
                        </View>
                    )
                }
                }
            />
        </Tab.Navigator>

    );
}
let style = StyleSheet.create({
    content: {
        paddingTop: 13,
        alignItems: "center",
    },
    tabIconBg: {
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabIcon: {
        width: 20,
        height: 20,
    },
    tabIconPlus: {
        width: 50,
        height: 50
    },
    cycleColor: {
        width: 4,
        height: 4,
        backgroundColor: "#F2BE9B",
        borderRadius: 2,
    },
    cycle: {
        width: 4,
        height: 4,
        backgroundColor: "#F1F7FF",
    }
})