

import * as React from 'react';
import { View, Image, StyleSheet ,Platform} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddInfo, TotalInfo,GeneralInfo, Loading} from '../screen'; 



const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#fff',
                tabBarActiveBackgroundColor: '#2B91BF',
                tabBarInactiveBackgroundColor: '#2B91BF',
                tabBarStyle: {
                    backgroundColor: '#2B91BF',
                    paddingTop:12,
                   height:Platform.OS === 'android' ? 75 : 70
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
            {/* <Tab.Screen name="Loading" component={Loading}
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
            /> */}
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
        justifyContent: 'center',
       
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