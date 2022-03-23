import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Loading(props) {
  const [weekState, setWeekState] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [weekInfo, setWeekInfo] = useState()
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
    props.navigation.navigate('GeneralInfo', { allData: weekInfo ? weekInfo : [] })
  }





  useEffect(() => {

    getInfo()

  }, []);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getInfo()
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View>
      <Text>Loading</Text>
    </View>
  )
}