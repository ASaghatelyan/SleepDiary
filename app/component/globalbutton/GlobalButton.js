import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './style'

export function GlobalButton(props) {
    return (
        <View style={{flex:1,alignItems:'center'}}>
            <TouchableOpacity style={styles.btn} onPress={props.handlePress}>
                <Text style={styles.btnText}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
}
