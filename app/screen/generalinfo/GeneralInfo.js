import { View, ScrollView, StatusBar, Image, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExportPdf from './ExportPdf';
import WebView from 'react-native-webview';
import TabeleComp from './TabeleComp';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
import { setSelectedLog } from 'react-native/Libraries/LogBox/Data/LogBoxData';

export function GeneralInfo(props) {
  // const weekState = useRef([])
  const [weekState, setWeekState] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [weekInfo, setWeekInfo] = useState()
  const [totalData, setTotalData] = useState([])

  let getInfo = async () => {
    let weekInfo = await getWeekData()
 
    let weekData = []
   
    weekInfo.map((item, index) => { 
      
      
      return item.map((data) => { 
         
        let x = {
        slotInterval: 30,
        openTime:Object.keys(data.data).length > 1 && new Date(data.data.exerciseFrom.y),
        closeTime:Object.keys(data.data).length > 1 && new Date(data.data.exerciseTo.y)
      }; 
      let startTime = moment(x.openTime, "HH:mm"); 
      let endTime = moment(x.closeTime, "HH:mm") ; 
      let allTimes = []; 
      let time=[]
      while (startTime < endTime) {  
      
       time.push(startTime.format("HH:mm"))
        allTimes.push(new Date(`${moment(data.data.fullDate).format('D/MMM/YYYY')} ${startTime.format("HH:mm")}`).getTime());  
        startTime.add(x.slotInterval, 'minutes');
      }
        Object.keys(data.data).length > 1 && weekData.push([...[data.data], [{
          a: Object.keys(data.data).length > 1 && data.data.alcoDrinks,
          b: Object.keys(data.data).length > 1 && data.data.exerciseTo,
          c: Object.keys(data.data).length > 1 && data.data.exerciseFrom,
          d: Object.keys(data.data).length > 1 && data.data.intoBed,
          e: Object.keys(data.data).length > 1 && data.data.outOfBed,
          f: Object.keys(data.data).length > 1 && data.data.coffee,
          g: Object.keys(data.data).length > 1 && data.data.medication,
          h: Object.keys(data.data).length > 1 && allTimes,
          k: Object.keys(data.data).length > 1 && time
        }
        ]]); 
      })
    }) 
    setWeekState(weekData)
    setTotalData(weekInfo)
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


  
 
 
let [chgideminc, setChgideminc] = useState([ ])
let [indexG, setIndexG] = useState(0)
  useEffect(() => {
    
    if( totalData.length){ 
      let arr = []
      totalData.map((item, index)=>{
        arr.push(index+1) 
      })
      setChgideminc([...arr])
    }

  }, [totalData])
  

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
    ${weekState && weekState.map((data, index) => {
      return data[1].map((val) => {  
       console.log(val);
         return (
          `<tbody>
             <tr>
               <th><p class='data'>${moment(data[0].fullDate).format('D/MMM/YYYY')}</p></th>
               <th><p class='fullDate'>${moment(data[0].fullDate).format('ddd')}</p></th>
               <th ><p class='dayInfo'>${data[0].dayInfo}</p></th>
                <th class='splite'>
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''}
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
                </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` : ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                
                 (val.h.map((item )=>  (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() <=item &&  item <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ))
                   ? `<span class='bottom-right'>Y</span>` : '' } 
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''} 
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''}
             
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''}
              
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''}
             
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''}
               
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''}
              
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
               <th class='splite'>
               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                   ''}
               
                ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.a.info}</span>` :
       (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.b.info}</span>` :
         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.c.info}</span>` :
           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.d.info}</span>` :
             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.e.info}</span>` :
               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.f.info}</span>` :
                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.g.info}</span>` :
                   ''}
               </th>
             </tr>
           </tbody>`)
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
      </View> */}
      {/* <View style={styles.bottomSide}>
        <Text style={styles.title}>Made by Sam Chow</Text>
        <Text style={styles.text}>This app stores information locally on your phone. </Text>
        <Text style={styles.text}>This means that the information you put in will be erased if you delete the app. </Text>
        <Text style={styles.text}>It also means that only the operator of the app will have access to user information.</Text>
        <View style={styles.btnView}>
         <View style={styles.dowlandPdf}>
          <SelectDropdown
            data={`${chgideminc}`}
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
          dropdownStyle={
            {
              backgroundColor: '#FFF',
              borderRadius: 10
            }
          }
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
          renderDropdownIcon={() => <Image source={require('../../assets/img/open.png')}
            style={styles.iconStyle} />}
          />
           <ExportPdf   data= {totalData[indexG]}/>
         </View>
          <TouchableOpacity style={styles.btn} onPress={() => {
            setModalVisible(true)
          }}>
            <Image source={require('../../assets/img/reset.png')} style={styles.vectorImg} />
            <Text style={styles.btnText}>Reset Data</Text>
          </TouchableOpacity>
        </View> 
      </View> */}
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
  top: -3.5px;
  left: -0.5;
  font-size: 5px; 

}
.bottom-right{
  position: absolute;
  right:-0.8;
  bottom: -4.5px;
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






 // const htmlContent = `
  // <html>
  //   <head>
  //     <meta charset="utf-8">
  //     <title>Invoice</title>
  //     <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
  //     <style>
  //       ${htmlStyles}
  //     </style>
  //   </head>
  //   <body>
  //   <div class="App">
  //   <header className='headerTable'>SLEEP DIARY </header>
  //   <table >
  //   <thead>
  //     <tr class='headerSpans'>
  //       <th class='todays'><span >Today's Data</span></th>
  //       <th class='week'><span >Day of the week</span></th>
  //       <th class='typeOfDay'>
  //         <span >Type of Day
  //           <p class='type'>Work,School</p>
  //           <p class='type'>Off,Vacation</p>
  //         </span >
  //       </th>
  //       <th><span>Noon</span></th>
  //       <th><span>1PM</span></th>
  //       <th><span>2</span></th>
  //       <th><span>3</span></th>
  //       <th><span>4</span></th>
  //       <th><span>5</span></th>
  //       <th><span>6PM</span></th>
  //       <th><span>7</span></th>
  //       <th><span>8</span></th>
  //       <th><span>9</span></th>
  //       <th><span>10</span></th>
  //       <th><span>11PM</span></th>
  //       <th><span>Midnight</span></th>
  //       <th><span>1AM</span></th>
  //       <th><span>2</span></th>
  //       <th><span>3</span></th>
  //       <th><span>4</span></th>
  //       <th><span>5</span></th>
  //       <th><span>6AM</span></th>
  //       <th><span>7</span></th>
  //       <th><span>8</span></th>
  //       <th><span>9</span></th>
  //       <th><span>10</span></th>
  //       <th><span>11AM</span></th>
  //     </tr>
  //   </thead>
  //   ${weekState && weekState.map((data, index) => {
  //   return data[1].map((val) => {
  //     return (
  //       `<tbody>
  //            <tr>
  //              <th><p class='data'>${moment(data[0].fullDate).format('D/MMM/YYYY')}</p></th>
  //              <th><p class='fullDate'>${moment(data[0].fullDate).format('ddd')}</p></th>
  //              <th ><p class='dayInfo'>${data[0].dayInfo}</p></th>
  //               <th class='splite'>
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''}
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //               </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 13:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` : ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 14:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 15:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 16:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 17:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 18:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 19:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 20:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 21:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 22:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 23:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 00:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 01:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 02:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 03:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 04:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''} 
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 05:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''}
             
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 06:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''}
              
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 07:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''}
             
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 08:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''}
               
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 09:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''}
              
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 10:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //              <th class='splite'>
  //              ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
  //                     ''}
               
  //               ${(new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.a.info}</span>` :
  //         (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.b.info}</span>` :
  //           (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.c.info}</span>` :
  //             (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.d.info}</span>` :
  //               (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.e.info}</span>` :
  //                 (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.f.info}</span>` :
  //                   (new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 11:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(data[0].fullDate).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.g.info}</span>` :
  //                     ''}
  //              </th>
  //            </tr>
  //          </tbody>`)
  //   })
  // })
  //   }
  
  //   </table>
  //   </div>
  //   </body >
  // </html >
  //   `;

