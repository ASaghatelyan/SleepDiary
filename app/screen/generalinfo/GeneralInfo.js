import { View, ScrollView, StatusBar, Image, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExportPdf from './ExportPdf';
import SelectDropdown from 'react-native-select-dropdown';

export function GeneralInfo(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [totalData, setTotalData] = useState([])
  const [chgideminc, setChgideminc] = useState([])
  const [indexG, setIndexG] = useState(0)


  const getWeekData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('weekData')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
    }
  }


  let getInfo = async () => {
    let weekInfo = await getWeekData()
    weekInfo!==null &&  setTotalData(weekInfo)
  }

  useEffect(() => {
    getInfo()
  }, [])


  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getInfo()
    });
    return unsubscribe;
  }, [props.navigation]);


  useEffect(() => {
    if( totalData.length){
      let arr = []
        console.log(totalData, 'totalData');
        totalData.map((item, index)=>{
        arr.push(index+1)
      })
        setChgideminc([...arr])
    }
  }, [totalData])



return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <StatusBar backgroundColor={'#EFEFEF'} barStyle='dark-content' />
      <View style={styles.topSide}>
        <Text style={styles.headerText}>Information</Text>
      </View>
      <View style={styles.bottomSide}>
        <Text style={styles.title}>Made by Discovery Sleep</Text>
        <Text style={styles.text}>This app stores information locally on your phone. </Text>
        <Text style={styles.text}>This means that the information you put in will be erased if you delete the app. </Text>
        <Text style={styles.text}>It also means that only the operator of the app will have access to user information.</Text>
        <View style={styles.btnView}>
         <View style={styles.dowlandPdf}>
       <View style={styles.chooseView}>
       <Text style={styles.chooseStyle} >Choose Week</Text>
          <SelectDropdown
            data={chgideminc}
            defaultButtonText={'1'}
            onSelect={(selectedItem, index) => {
              setIndexG(selectedItem - 1)
          }}
          buttonStyle={styles.selectStyle}
          buttonTextStyle={styles.selectText}
          dropdownIconPosition='right'
          rowTextStyle={{
            color: '#2B91BF',
            fontFamily: "Quicksand-Regular",
          }}
          dropdownStyle={{
              backgroundColor: '#FFF',
              borderRadius: 10
            }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
          renderDropdownIcon={() => <Image source={require('../../assets/img/open.png')}
            style={styles.iconStyle} />}
          />
       </View>
           <ExportPdf data={totalData[indexG]} weekNumber={indexG+1}/>
         </View>
        </View>
      </View>
      <View style={{alignItems:'center',justifyContent:'center'}}>
      <TouchableOpacity style={styles.btn} onPress={() => {
            setModalVisible(true)
          }}>
            <Image source={require('../../assets/img/reset.png')} style={styles.vectorImg} />
            <Text style={styles.btnText}>Reset Data</Text>
          </TouchableOpacity>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure,that you want to delete all data?</Text>
            <View style={styles.modalBtnView}>
              <View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>No</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={async () => {
                    let data = await AsyncStorage.removeItem('days')
                    let removeStartDate = await AsyncStorage.removeItem('start')
                    let removeWeekData = await AsyncStorage.removeItem('weekData')
                    let removeGlobal = await AsyncStorage.removeItem('globalWeek')
                    let removeFlag = await AsyncStorage.removeItem('flag')
                    setModalVisible(!modalVisible)
                    props.navigation.replace('Start')
                  }}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}


