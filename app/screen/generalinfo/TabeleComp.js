import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


export default function TabeleComp() {
let state = {
    tableHead: [`Today's Data`,  `Day of the week`, `Type of Day Work,School,Off,Vacation`, 'Noon','1PM','2','3','4','5','6PM','7','8','9','10','11PM',],
    tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
    tableData: [
      ['1', '2', '3'],
      ['a', 'b', 'c'],
      ['1', '2', '3'],
      ['a', 'b', 'c']
    ]
  }
  return (
    <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={[styles.textHead,]}/>
          <Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={[styles.textHead,]}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
      </View>
  )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 70,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    textHead: { textAlign: 'center',color:'red' , transform: [{ rotate: '-0deg' }]},
    text: { textAlign: 'center',color:'red', }
  });