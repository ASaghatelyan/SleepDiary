import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './style'

export function AcceptButton(props) {
    return (

        <View style={styles.btn}>
            <TouchableOpacity onPress={props.handleCount}>
                <Image source={require('../../assets/img/accept.png')} style={styles.acceptImg} />
            </TouchableOpacity>
        </View>
    );
}
