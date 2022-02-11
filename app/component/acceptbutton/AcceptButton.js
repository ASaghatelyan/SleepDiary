import { View, Image } from 'react-native';
import React from 'react';
import styles from './style'

export function AcceptButton() {
    return (
        <View style={styles.btn}>
            <Image source={require('../../assets/img/accept.png')} style={styles.acceptImg} />
        </View>
    );
}
