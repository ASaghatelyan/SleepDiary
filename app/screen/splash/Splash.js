import { View, Image, ScrollView, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Splash(props) {

    const getStartDate = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('start')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    let date = async () => {
        let loadDate = await getStartDate()
        let timer = setTimeout(() => {
            loadDate ? props.navigation.replace('TabNavigation') : props.navigation.replace('Start')
        }, 3000);
        return (() => {
            clearTimeout(timer)
        })
    }


    useEffect(() => {
        date()
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <StatusBar backgroundColor={'#FFFFFF'} barStyle='dark-content' />
            <View>
                <Image source={require('../../assets/img/splashlogo.png')} style={styles.splashLogo} />
            </View>
        </ScrollView>

    );
}
