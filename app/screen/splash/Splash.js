import { View, Image, ScrollView, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import styles from './style';

export function Splash(props) {
    useEffect(() => {
        let timer = setTimeout(() => {
            props.navigation.replace('Start')
        }, 3000);
        return (() => {
            clearTimeout(timer)
        })
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <StatusBar backgroundColor={'#FFFFFF'} barStyle='dark-content'/>
            <View>
                <Image source={require('../../assets/img/splashlogo.png')} style={styles.splashLogo} />
            </View>
        </ScrollView>

    );
}
