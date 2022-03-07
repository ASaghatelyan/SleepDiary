import { View, ScrollView, StatusBar, Image, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExportPdf from './ExportPdf';
import WebView from 'react-native-webview';
import TabeleComp from './TabeleComp';
import moment from 'moment';


export function GeneralInfo(props) {
  // const weekState = useRef([])
  const [weekState, setSeekState] = useState([])
  const [modalVisible, setModalVisible] = useState(false);



  let getInfo = async () => {
    let weekInfo = await getWeekData()
    setSeekState(weekInfo)
  }

  const getWeekData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('weekData')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
    }
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



  //  weekState.current.map((item,index)=>{
  //   // 
  //   return   item.map((data)=>{
  //     Object.keys(data.data).length>1 && console.log(data.data,'dddaattaa');
  //    }) 


  //  })

  // weekState.current.map((item, index) => {
  //   return item.map((data) => {

  //   })
  // })


  const htmlContent = `
  <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice</title>
      <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
      <style>
        ${htmlStyles}
      </style>
    </head>
    <body>
    <div class="App">
    <header className='headerTable'>SLEEP DIARY </header>
    <table >
    <thead>
      <tr class='headerSpans'>
        <th class='todays'><span >Today's Data</span></th>
        <th class='week'><span >Day of the week</span></th>
        <th class='typeOfDay'>
          <span >Type of Day
            <p class='type'>Work,School</p>
            <p class='type'>Off,Vacation</p>
          </span >
        </th>
        <th><span>Noon</span></th>
        <th><span>1PM</span></th>
        <th><span>2</span></th>
        <th><span>3</span></th>
        <th><span>4</span></th>
        <th><span>5</span></th>
        <th><span>6PM</span></th>
        <th><span>7</span></th>
        <th><span>8</span></th>
        <th><span>9</span></th>
        <th><span>10</span></th>
        <th><span>11PM</span></th>
        <th><span>Midnight</span></th>
        <th><span>1AM</span></th>
        <th><span>2</span></th>
        <th><span>3</span></th>
        <th><span>4</span></th>
        <th><span>5</span></th>
        <th><span>6AM</span></th>
        <th><span>7</span></th>
        <th><span>8</span></th>
        <th><span>9</span></th>
        <th><span>10</span></th>
        <th><span>11AM</span></th>
      </tr>
    </thead>
    ${weekState.map((item, index) => {
    let arr = []

    return item.map((data) => {
      let alco = Object.keys(data.data).length > 1 && data.data.alcoDrinks.info
      let exerciseFrom = Object.keys(data.data).length > 1 && data.data.exerciseFrom.info
      let exerciseTo = Object.keys(data.data).length > 1 && data.data.exerciseTo.info
      let goToBed = Object.keys(data.data).length > 1 && data.data.intoBed.info
      let outOfBed = Object.keys(data.data).length > 1 && data.data.outOfBed.info

      Object.keys(data.data).length > 1 && console.log(data.data);
      // let all = [alco , exerciseFrom , exerciseTo , goToBed, outOfBed]
      let all = alco
      let allTime = (Object.keys(data.data).length > 1 && (data.data.alcoDrinks.x || data.data.exerciseTo.x || data.data.exerciseFrom.x || data.data.intoBed.x || data.data.outOfBed.x))

      Object.keys(data.data).length > 1 &&  arr.push([
        Object.keys(data.data).length > 1 && data.data.alcoDrinks,
        Object.keys(data.data).length > 1 && data.data.exerciseTo,
        Object.keys(data.data).length > 1 && data.data.exerciseFrom,
        Object.keys(data.data).length > 1 && data.data.intoBed,
        Object.keys(data.data).length > 1 && data.data.outOfBed
      ])
      console.log(arr, 'ssssss');
      if (Object.keys(data.data).length > 1) {
        return (
          `<tbody>
            <tr>
              <th><p class='data'>${moment(data.data.fullDate).format('D/MMM/YYYY')}</p></th>
              <th><p class='fullDate'>${moment(data.data.fullDate).format('ddd')}</p></th>
              <th ><p class='dayInfo'>${data.data.dayInfo}</p></th>
               <th class='splite'>
                <span class='top-left'>${('06:00' <= allTime && allTime <= "06:30") ? all : ''}</span> 
                <span class='bottom-right'>${('00:31' <= allTime && allTime < "01:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('01:00' <= allTime && allTime <= "01:30") ? all : ''}</span>
                <span class='bottom-right'>${('01:31' <= allTime && allTime < "02:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('02:00' <= allTime && allTime <= "02:30") ? all : ''}</span>
                <span class='bottom-right'>${('02:31' <= allTime && allTime < "03:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('03:00' <= allTime && allTime <= "03:30") ? all : ''}</span>
                <span class='bottom-right'>${('03:31' <= allTime && allTime < "04:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('04:00' <= allTime && allTime <= "04:30") ? all : ''}</span>
                <span class='bottom-right'>${('04:31' <= allTime && allTime < "05:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('05:00' <= allTime && allTime <= "05:30") ? all : ''}</span>
                <span class='bottom-right'>${('05:31' <= allTime && allTime < "06:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('06:00' <= allTime && allTime <= "06:30") ? all : ''}</span>
                <span class='bottom-right'>${('06:31' <= allTime && allTime < "07:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('07:00' <= allTime && allTime <= "07:30") ? all : ''}</span>
                <span class='bottom-right'>${('07:31' <= allTime && allTime < "08:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('08:00' <= allTime && allTime <= "08:30") ? all : ''}</span>
                <span class='bottom-right'>${('08:31' <= allTime && allTime < "09:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('09:00' <= allTime && allTime <= "09:30") ? all : ''}</span>
                <span class='bottom-right'>${('09:31' <= allTime && allTime < "10:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('10:00' <= allTime && allTime <= "10:30") ? all : ''}</span>
                <span class='bottom-right'>${('10:31' <= allTime && allTime < "11:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('11:00' <= allTime && allTime <= "11:30") ? all : ''}</span>
                <span class='bottom-right'>${('11:31' <= allTime && allTime < "12:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('12:00' <= allTime && allTime <= "12:30") ? all : ''}</span>
                <span class='bottom-right'>${('12:31' <= allTime && allTime < "13:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('13:00' <= allTime && allTime <= "13:30") ? all : ''}</span>
                <span class='bottom-right'>${('13:31' <= allTime && allTime < "14:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('14:00' <= allTime && allTime <= "14:30") ? all : ''}</span>
                <span class='bottom-right'>${('14:31' <= allTime && allTime < "15:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('15:00' <= allTime && allTime <= "15:30") ? all : ''}</span>
                <span class='bottom-right'>${('15:31' <= allTime && allTime < "16:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('16:00' <= allTime && allTime <= "16:30") ? all : ''}</span>
                <span class='bottom-right'>${('16:31' <= allTime && allTime < "17:00") ? all : ''}</span>
              <th class='splite'>
                <span class='top-left'>${('17:00' <= allTime && allTime <= "17:30") ? all : ''}</span>
                <span class='bottom-right'>${('17:31' <= allTime && allTime < "18:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('18:00' <= allTime && allTime <= "18:30") ? all : ''}</span>
                <span class='bottom-right'>${('18:31' <= allTime && allTime < "19:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('19:00' <= allTime && allTime <= "19:30") ? all : ''}</span>
                <span class='bottom-right'>${('19:31' <= allTime && allTime < "20:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('20:00' <= allTime && allTime <= "20:30") ? all : ''}</span>
                <span class='bottom-right'>${('20:31' <= allTime && allTime < "21:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('21:00' <= allTime && allTime <= "21:30") ? all : ''}</span>
                <span class='bottom-right'>${('22:31' <= allTime && allTime < "23:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('22:00' <= allTime && allTime <= "22:30") ? all : ''}</span>
                <span class='bottom-right'>${('22:31' <= allTime && allTime < "23:00") ? all : ''}</span>
              </th>
              <th class='splite'>
                <span class='top-left'>${('23:00' <= allTime && allTime <= "23:30") ? all : ''}</span>
                <span class='bottom-right'>${('23:31' <= allTime && allTime < "00:00") ? all : ''}</span>
              </th>
            </tr>
          </tbody>`
        )
      }
    })
  })
    }
    </table>
    </div>
    </body >
  </html >
    `;




  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <StatusBar backgroundColor={'#EFEFEF'} barStyle='dark-content' />
      {/* <View style={styles.topSide}>
        <Text style={styles.headerText}>Information</Text>
      </View>
      <View style={styles.bottomSide}>
        <Text style={styles.title}>Made by Sam Chow</Text>
        <Text style={styles.text}>This app stores information locally on your phone. </Text>
        <Text style={styles.text}>This means that the information you put in will be erased if you delete the app. </Text>
        <Text style={styles.text}>It also means that only the operator of the app will have access to user information.</Text>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btn} onPress={() => {
            setModalVisible(true)
          }}>
            <Image source={require('../../assets/img/reset.png')} style={styles.vectorImg} />
            <Text style={styles.btnText}>Reset Data</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      {/* <ExportPdf/> */}
      {/* <TabeleComp/> */}
      <WebView
        source={{ html: htmlContent }}
      />
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

const htmlStyles = `
.App {
  text-align: center;
  width: 100%
}
.headerTable{
  font-size:20px;
  font-weight: bold;padding: 10px;
}
* table, th ,td{
  position: relative;
  border:1px solid black; 
}
// .headerSpans th:nth-child(n+4) {
//   -ms-writing-mode: tb-lr;
//   -webkit-writing-mode: vertical-lr;
//   writing-mode: vertical-lr;
//   // transform: rotate(-180deg);
//   white-space: nowrap;
// }
.headerSpans  th span  {
      -ms-writing-mode: tb-rl;
      -webkit-writing-mode: vertical-rl;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      white-space: nowrap;
}
.headerSpans th span{
  font-size: 16px;
}
.dayInfo {
  width: 90px;
}
.fullDate{
  width: 55px;
}
.data{
  width: 120px;
}
.splite{
  width: 35px;
  height: 30px;
}
.splite span{
  font-size: 14px;
}

.splite::after{
  content: "";
  display: block;
  position: absolute;
  border: 1px solid black;
  transform: rotate(133deg);
  width: 38px;
  top: 13px;
  left: -7px;
  border-radius:20px
}
.top-left{
  position: absolute;
  top: -1px;
  left: 1;
}
.bottom-right{
  position: absolute;
  right:1;
  bottom: -3px;
}
.todays{
  // padding: 5px;
}
.todays span{ 
  text-align: center;
  line-height: 1px;
}
.week{
  // width: 150px;
  // padding: 5px;
}
.week span{ 
  text-align: center;
}
.typeOfDay{
  // width:150px;
  // padding-left: 5px;
  // padding-right:5px
}
.typeOfDay span{ 
  text-align: center; 
}
.type{
  font-size: 11px; 
  text-align: center;
  line-height: 1px;  
}
`;