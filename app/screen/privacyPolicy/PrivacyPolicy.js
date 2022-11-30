import { View, ScrollView, StatusBar, Image, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import styles from './style';
 import back from '../../assets/img/back.png'

export function PrivacyPolicy(props) {
    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <StatusBar backgroundColor={'#EFEFEF'} barStyle='dark-content' />

            <View style={styles.topSide}>
                <View style={styles.paginationView}>
                    <TouchableOpacity 
                    style={styles.backView}
                    onPress={()=>props.navigation.goBack()}>
                        <Image source={back} style={styles.btn}/>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Privacy Policy</Text>
                </View>
            </View>
            <View style={styles.bottomSide}>
                <View style={styles.itemInfoConteiner}>


                </View>
            </View>

        </ScrollView>
    )
}