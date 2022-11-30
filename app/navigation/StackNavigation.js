import { View, Text } from 'react-native';
import React from 'react';
import { Start, Splash,PrivacyPolicy } from '../screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
const Stack = createStackNavigator();

export default function StackNavigation(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                <Stack.Screen name="TabNavigation" component={TabNavigation} />

            </Stack.Navigator>
        </NavigationContainer>

    );
}
