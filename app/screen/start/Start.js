import { View, ScrollView, StatusBar, Image, Text, TextInput, Modal } from 'react-native';
import React, { useState,Fragment } from 'react';
import styles from './style'
import { GlobalButton, Logo } from '../../component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


export function Start(props) {
    const [dayInfo, setDayInfo] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [input, setInput] = useState()


    const startDate = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('start', JSON.stringify(value))
        } catch (e) {
        }
    }
    return (
        
        <ScrollView contentContainerStyle={styles.scrollView}>
            <StatusBar backgroundColor={'#FFFFFF'} barStyle='dark-content' />
            <Logo />
            <View style={styles.groupView}>
                <Image source={require('../../assets/img/group.png')} style={styles.group} />
                <Text style={styles.startText}>
                    When would you like to start monitoring your sleep?
                </Text>
            </View >

            <View style={styles.chooseView}>
                <Image
                    source={require('../../assets/img/calendarstart.png')}
                    style={styles.calendarImg}
                />
                <TextInput placeholder='Choose day' placeholderTextColor={'#232326'} editable={false} style={{ flex: 1, color: '#232326', marginLeft: 15 }} value={input} />
                <TouchableOpacity style={{ padding: 5 }} onPress={() => setModalVisible(true)}>
                    <Image source={require('../../assets/img/open.png')} style={styles.openImg} />
                </TouchableOpacity>
            </View>
            <View>
               {dayInfo ? <GlobalButton text={'Continue'} handlePress={() => {
                    startDate(dayInfo)
                    props.navigation.replace('TabNavigation')
                     
                }} />: <GlobalButton text={'Continue'}   /> }
                <Modal
                    style={{ width: 500, height: 500 }}
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                      
                    }}> 
                    <Calendar
                       hideArrows={true}
                       disableMonthChange={true}
                       enableSwipeMonths={true}
                        minDate={`${(moment(new Date()).format('DD MMM YYYY'))}`}
                        renderHeader={(date) => {
                            console.log(date);
                            return (<Text style={{ color: "#000" }}> {moment(date[0]).format('DD MMM YYYY')}</Text>)
                        }}
                        maxDate={`${moment(new Date()).format('DD MMM YYYY')}`}
                        renderHeader={(date) => {
                            console.log(date);
                            return (<Text style={{ color: "#000" }}> {moment(date[0]).format('DD MMM YYYY')}</Text>)
                        }}
                        onDayLongPress={(e) => {
                            console.log(`e`, e)
                        }}
                        onMonthChange={(e) => {
                            console.log(`e`, e)
                        }}
                        onPressArrowLeft={(goBack) => {
                            goBack()
                        }}
                        
                        enableSwipeMonths
                        onPressArrowRight={(goFuture) => {
                            goFuture()
                        }}
                        onDayPress={(e) => {
                            setInput(moment(e.dateString).format('DD MMM YYYY'))
                            setDayInfo(moment(e.dateString).format('DD MMM YYYY'))
                            setModalVisible(!modalVisible)
                           
                        }}
                        firstDay={1}
                        style={{ height: "100%",marginTop: Platform.OS === 'ios' ? 35 : 1 }}
                    />
                </Modal>
            </View>
        </ScrollView>
    );
}
