import React from 'react'
import { Image } from 'react-native';
import { TouchableOpacity, PermissionsAndroid } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import { Alert } from 'react-native';
import WebView from 'react-native-webview';

const data = {

}

const ExportPdf = () => {
  const pageOptions = {
    orientation: {
      Landscape: 'Landscape',
      Portrait: 'Portrait',
    },
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
        <tbody>
          <tr>
            <th><span>13.Feb.2022</span></th>
            <th><span>Mon</span></th>
            <th><span>Work</span></th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
            <th class ='splite'>
              <span class ='top-left'>L</span>
              <span class ='bottom-right'>T</span>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
          </body>
        </html>
      `;
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
  return (
    // <WebView source={{ html: htmlContent }} />
    <View style={styles.MainContainer}>
      <TouchableOpacity onPress={askPermission}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
          }}
          style={styles.ImageStyle}
        />
        <Text style={styles.text}>Create PDF</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ExportPdf

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'center',
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