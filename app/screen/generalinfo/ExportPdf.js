import React, { useState, useEffect } from 'react'
import { Image } from 'react-native';
import { TouchableOpacity, PermissionsAndroid } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import { Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import moment from 'moment';


const ExportPdf = (props) => {
  const [weekState, setWeekState] = useState([])
  const [info, setInfo] = useState()
  const [weekInfo, setWeekInfo] = useState()
  const [totalData, setTotalData] = useState([])
  const pageOptions = {
    orientation: {
      Landscape: 'Landscape',
      Portrait: 'Portrait',
    },
  }




  const askPermission = () => {
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Pdf creator needs External Storage Write Permission',
            message:
              'Pdf creator needs access to Storage data in your SD Card',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          createPDF();
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }
    if (Platform.OS === 'android') {
      requestExternalWritePermission();
    } else {
      createPDF();
    }
  }
  const createPDF = async () => {
    let options = {
      //Content to print
      html: htmlContent,
      //File Name
      fileName: 'Sleep Diary',
      //File directory
      directory: 'Download',
      base64: true,

    };

    let file = await RNHTMLtoPDF.convert(options)
    // console.log(file.filePath);
    Alert.alert('Successfully Exported', 'Path:' + file.filePath, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open', onPress: () => openFile(file.filePath) }
    ], { cancelable: true });

  }

  const openFile = (filepath) => {
    const path = filepath;// absolute-path-to-my-local-file.
    FileViewer.open(path)
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  }


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

      return (
        `<tbody>
                <tr>
                  <th><p class='data'>${moment(data[0].fullDate).format('D/MMM/YYYY')}</p></th>
                  <th><p class='fullDate'>${moment(data[0].fullDate).format('ddd')}</p></th>
                  <th ><p class='dayInfo'>${data[0].dayInfo}</p></th>
                   <th class='splite'>
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''}
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                   </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 13:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` : ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 14:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 15:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 16:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 17:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 18:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 19:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 20:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 21:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 22:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 23:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 00:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 01:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 02:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 03:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 04:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''} 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 05:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''}
                
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 06:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''}
                 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 07:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''}
                
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 08:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''}
                  
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 09:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''}
                 
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 10:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime()) ? `<span class='bottom-right'>${val.g.info}</span>` :
                      ''}
                  </th>
                  <th class='splite'>
                  ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime() <= val.a.y && val.a.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime() <= val.b.y && val.b.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime() <= val.c.y && val.c.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime() <= val.d.y && val.d.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime() <= val.e.y && val.e.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime() <= val.f.y && val.f.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:00`).getTime() <= val.g.y && val.g.y <= new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime()) ? `<span class='top-left'>${val.g.info}</span>` :
                      ''}
                  
                   ${(new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime() < val.a.y && val.a.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.a.info}</span>` :
          (new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime() < val.b.y && val.b.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.b.info}</span>` :
            (new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime() < val.c.y && val.c.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.c.info}</span>` :
              (new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime() < val.d.y && val.d.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.d.info}</span>` :
                (new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime() < val.e.y && val.e.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.e.info}</span>` :
                  (new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime() < val.f.y && val.f.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.f.info}</span>` :
                    (new Date(`${moment(val.h).format('D/MMM/YYYY')} 11:30`).getTime() < val.g.y && val.g.y < new Date(`${moment(val.h).format('D/MMM/YYYY')} 12:00`)) ? `<span class='bottom-right'>${val.g.info}</span>` :
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


  let getInfo = async () => {
    let weekInfo = props.data 
    let weekData = []
    weekInfo && weekInfo.map((data, index) => {
      Object.keys(data.data).length > 1 && weekData.push([...[data.data], [{
        a: Object.keys(data.data).length > 1 && data.data.alcoDrinks,
        b: Object.keys(data.data).length > 1 && data.data.exerciseTo,
        c: Object.keys(data.data).length > 1 && data.data.exerciseFrom,
        d: Object.keys(data.data).length > 1 && data.data.intoBed,
        e: Object.keys(data.data).length > 1 && data.data.outOfBed,
        f: Object.keys(data.data).length > 1 && data.data.coffee,
        g: Object.keys(data.data).length > 1 && data.data.medication,
        h: Object.keys(data.data).length > 1 && moment(new Date()).format('D/MMM/YYYY')
      }
      ]]);
    })
    setWeekState(weekData)
  }

  useEffect(() => {
    getInfo()
  }, [props.data])

  return (

    <View style={styles.MainContainer}>
      <View style={styles.chooseType}>

        {/* <SelectDropdown
          data={['sss','dddd','ffff']}
          buttonStyle={styles.selectStyle}
          defaultButtonText="Choose"
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
          onSelect={(selectedItem, index) => {
            setInfo(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
          renderDropdownIcon={() => <Image source={require('../../assets/img/open.png')}
            style={styles.iconStyle} />}
        /> */}
      </View>
      <View>
        {weekState ?
          <TouchableOpacity onPress={askPermission} style={{ marginLeft: 60 }}>
            <Image
              source={require('../../assets/img/pdf.png')}
              style={styles.ImageStyle}
            />
          </TouchableOpacity> :
          <TouchableOpacity style={{ marginLeft: 60 }}>
            <Image
              source={require('../../assets/img/pdf.png')}
              style={styles.ImageStyle}
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default ExportPdf

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  ImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'center',
  },
  selectStyle: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#AFC7D1',
    width: 166,
    height: 40,
    paddingHorizontal: 20,
  },
  selectText: {
    color: '#2B91BF',
    fontFamily: "Quicksand-Regular",
  },
});

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
  transform: rotate(128deg);
  width: 33px;
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