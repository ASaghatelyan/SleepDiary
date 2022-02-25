import { View, ScrollView, StatusBar, Image, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import styles from './style';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PureChart from 'react-native-pure-chart';
import moment from "moment";

export function TotalInfo(props) {
  const [starCount, setStarCount] = useState(0)
  const [allData, setAllData] = useState([])
  const [sleepTime, setSleepTime] = useState(0)
  const [effectiveSleep, setEffectiveSleep] = useState()
  const [avergeStarsCount, setAvergeStarsCount] = useState()
  const [avergeTimInBed, setAvergeTimeInBed] = useState()
  const [count, setCount] = useState(0)
  const weekDays = ["1", "2", "3", "4", "5", "6", "7", '8', 'All']
  const data = [
    {
      img: require('../../assets/img/alarm.png'),
      title: 'Averge amount of sleep',
      time: sleepTime ? convertMtoH(Math.floor(sleepTime / count)) : '00:00'
    },
    {
      img: require('../../assets/img/bed.png'),
      title: 'Averge amount in bed',
      time: avergeTimInBed ? convertMtoH(Math.floor(avergeTimInBed / count)) : '00:00'
    },
    {
      img: require('../../assets/img/moon.png'),
      title: 'Averge sleep efficiency',
      time: effectiveSleep ? `${Math.floor(effectiveSleep / count)} %` : '0 %'
    },
    {
      title: 'Averge sleep quality',
    },
  ]


  let sampleData = [
    {
      seriesName: 'series1',
      data: [
        { x: '2018-02-01', y: 30 },
        { x: '2018-02-02', y: 200 },
        { x: '2018-02-03', y: 170 },
        { x: '2018-02-04', y: 250 },
        { x: '2018-02-05', y: 10 }
      ],
      color: '#297AB1'
    },
    {
      seriesName: 'series2',
      data: [
        { x: '2018-02-01', y: 20 },
        { x: '2018-02-02', y: 100 },
        { x: '2018-02-03', y: 140 },
        { x: '2018-02-04', y: 550 },
        { x: '2018-02-05', y: 40 }
      ],
      color: 'yellow'
    },
    {
      seriesName: 'series3',
      data: [
        { x: '2018-02-01', y: 40 },
        { x: '2018-02-02', y: 240 },
        { x: '2018-02-03', y: 140 },
        { x: '2018-02-04', y: 230 },
        { x: '2018-02-05', y: 20 }
      ],
      color: '#297AB1'
    },
  ]

  function convertMtoH(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return num = (rhours < 10 ? '0' + rhours : rhours) + " : " + (rminutes < 10 ? "0" + rminutes : rminutes);
  }

  function convertHtoM(timeInHour) {
    var timeParts = timeInHour.split(":");
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
  }


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('days')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
    }
  }

  const getWeekData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('weekData')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
    }
  }


  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getInfo()
    });
    return unsubscribe;
  }, [props.navigation]);

  let getInfo = async () => {
    let infoDay = await getWeekData()
    if (infoDay === null) {
      setSleepTime(0)
      setAvergeStarsCount(0)
      setAvergeTimeInBed(0)
      setEffectiveSleep(0)
      setCount(0)
    }
    infoDay !== null && infoDay.map((item, index) => {
      const a = []
      const starCount = []
      const effectiveSleepTime = []
      const timeInTheBed = []

      let x = 0
      return item.map((item, index) => {
        Object.keys(item.data).length > 1 && setCount(++x)
        a.push(Object.keys(item.data).length > 1 && item.data.results[0].sleepTime)
        setSleepTime(a.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0))

        starCount.push(Object.keys(item.data).length > 1 && item.data.starCount)
        starCount.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0)
        setAvergeStarsCount(starCount.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0));

        effectiveSleepTime.push(Object.keys(item.data).length > 1 && item.data.results[0].effective)
        setEffectiveSleep(effectiveSleepTime.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0));

        timeInTheBed.push(Object.keys(item.data).length > 1 && item.data.results[0].timeInBed)
        setAvergeTimeInBed(timeInTheBed.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0))
      })
    })
    setAllData(infoDay)
  }



  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <StatusBar backgroundColor={'#EFEFEF'} barStyle='dark-content' />

      <View style={styles.topSide}>
        <View style={styles.paginationView}>

          {weekDays.map((item, index) => {
            return (
              index === 0 ?
                <View key={index}>
                  <TouchableOpacity
                    style={
                      [styles.paginationForm,
                      {
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10
                      }
                      ]}>
                    <Text style={styles.paginationText}>{item}</Text>
                  </TouchableOpacity>
                </View> :
                (index === 8) ?
                  <View key={index}>
                    <TouchableOpacity style={
                      [styles.paginationForm,
                      {
                        borderTopRightRadius: 10,
                        borderBottomEndRadius: 10,
                        width: 55
                      }]}>
                      <Text style={styles.paginationText}>{item}</Text>
                    </TouchableOpacity>
                  </View> :
                  <View key={index}>
                    <TouchableOpacity style={styles.paginationForm}>
                      <Text style={styles.paginationText}>{item}</Text>
                    </TouchableOpacity>
                  </View>
            )
          })}
        </View>
      </View>
      <View style={styles.bottomSide}>
        <View style={styles.itemInfoConteiner}>
          {data.map((item, index) => {
            return (
              <View style={styles.itemInfo} key={index}>
                {item.img ? <Image source={item.img} style={styles.itemImg} /> : null}
                <Text style={styles.infoTitle}>{item.title}</Text>
                {
                  item.time ?
                    <Text style={styles.infoText}>{item.time}</Text>
                    :
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={avergeStarsCount / count}
                      selectedStar={(rating) => setStarCount(rating)}
                      emptyStar={require('../../assets/img/empatyStar.png')}
                      fullStar={require('../../assets/img/fullStar.png')}
                      halfStar={require('../../assets/img/halfStar.png')}
                      starSize={24}
                      starStyle={{ marginTop: 16 }}
                    />
                }
              </View>
            )
          })}
          {/*<PureChart data={sampleData} type='bar' />*/}
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btn}>
            <Image source={require('../../assets/img/vector.png')} style={styles.vectorImg} />
            <Text style={styles.btnText}>Development</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}
