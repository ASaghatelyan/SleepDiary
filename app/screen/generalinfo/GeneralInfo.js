import { View, ScrollView, StatusBar, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExportPdf  from './ExportPdf';
import WebView from 'react-native-webview';
import TabeleComp from './TabeleComp';

const htmlContent = `
        <html>
          <head>
            <meta charset="utf-8">
            <title>Invoice</title>
            <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
            <style>
              // ${htmlStyles}
            </style>
          </head>
          <body>
            <header>
              <h1>Invoice</h1>
             
            </header>
           
              <table class="inventory">
                <thead>
                  <tr>
                    <th><span>Item</span></th>
                    <th><span>Description</span></th>
                    <th><span>Rate</span></th>
                    <th><span>Quantity</span></th>
                    <th><span>Price</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span>Front End Consultation</span></td>
                    <td><span>Experience Review</span></td>
                    <td><span data-prefix>$</span><span>amtt</span></td>
                    <td><span>4</span></td>
                    <td><span data-prefix>$</span><span> ddfsdfs</span></td>
                  </tr>
                </tbody>
              </table>
              <table class="balance">
                <tr>
                  <th><span>Total</span></th>
                  <td><span data-prefix>$</span><span>ddddddd</span></td>
                </tr>
                <tr>
                  <th><span>Amount Paid</span></th>
                  <td><span data-prefix>$</span><span>0.00</span></td>
                </tr>
                <tr>
                  <th><span>Balance Due</span></th>
                  <td><span data-prefix>$</span><span>ddddddddd</span></td>
                </tr>
              </table>
           
            </aside>
          </body>
        </html>
      `;

export function GeneralInfo() {


  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
       <StatusBar backgroundColor={'#EFEFEF'} barStyle='dark-content' />
      <View style={styles.topSide}>
        <Text style={styles.headerText}>Information</Text>
      </View>
      <View style={styles.bottomSide}>
        <Text style={styles.title}>Made by Sam Chow</Text>
        <Text style={styles.text}>This app stores information locally on your phone. </Text>
        <Text style={styles.text}>This means that the information you put in will be erased if you delete the app. </Text>
        <Text style={styles.text}>It also means that only the operator of the app will have access to user information.</Text>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btn}  onPress={async()=>{
            let data = await AsyncStorage.removeItem('days')
          }}>
            <Image source={require('../../assets/img/reset.png')} style={styles.vectorImg} />
            <Text style={styles.btnText}>Reset Data</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/*<ExportPdf/>*/}
      {/* <TabeleComp/> */}
      {/* <WebView

  source={{html:htmlContent}}
   /> */}
    </ScrollView>
  );
}

const htmlStyles = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}

h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }

/* table */

table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }

/* page */

html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
html { background: #999; cursor: default; }

body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }

/* header */

header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }

header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }

/* article */

article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }

article address { float: left; font-size: 125%; font-weight: bold; }

/* table meta & balance */

table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after { clear: both; content: ""; display: table; }

/* table meta */

table.meta th { width: 40%; }
table.meta td { width: 60%; }

/* table items */

table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }

table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: right; width: 12%; }
table.inventory td:nth-child(4) { text-align: right; width: 12%; }
table.inventory td:nth-child(5) { text-align: right; width: 12%; }

/* table balance */

table.balance th, table.balance td { width: 50%; }
table.balance td { text-align: right; }

/* aside */

aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
`;
