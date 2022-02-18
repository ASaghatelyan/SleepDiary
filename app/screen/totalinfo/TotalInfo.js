import { View, ScrollView, StatusBar, Image, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PureChart from 'react-native-pure-chart';
import moment from "moment";

export function TotalInfo(props) {
  const [starCount, setStarCount] = useState(0)
  const [allData, setAllData] = useState([])
  const weekDays = ["1", "2", "3", "4", "5", "6", "7", '8', 'All']
  const data = [
    {
      img: require('../../assets/img/alarm.png'),
      title: 'Averge amount of sleep',
      time: '07:15'
    },
    {
      img: require('../../assets/img/bed.png'),
      title: 'Averge amount in bed',
      time: '07:15'
    },
    {
      img: require('../../assets/img/moon.png'),
      title: 'Averge sleep efficiency',
      time: '70 %'
    },
    {
      title: 'Averge sleep quality',
    },
  ]


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('days')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }
  // useEffect(()=>{

  // },[])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getInfo()
    });
    return unsubscribe;
  }, [props.navigation]);

  let getInfo = async () => {
    let infoDay = await getData()
    setAllData(infoDay)
  }
  console.log(allData);

  let sampleData = [
    {
      seriesName: 'series1',
      data: [
        {x: '2018-02-01', y: 30},
        {x: '2018-02-02', y: 200},
        {x: '2018-02-03', y: 170},
        {x: '2018-02-04', y: 250},
        {x: '2018-02-05', y: 10}
      ],
      color: '#297AB1'
    },
    {
      seriesName: 'series2',
      data: [
        {x: '2018-02-01', y: 20},
        {x: '2018-02-02', y: 100},
        {x: '2018-02-03', y: 140},
        {x: '2018-02-04', y: 550},
        {x: '2018-02-05', y: 40}
      ],
      color: 'yellow'
    },
    {
      seriesName: 'series3',
      data: [
        {x: '2018-02-01', y: 40},
        {x: '2018-02-02', y: 240},
        {x: '2018-02-03', y: 140},
        {x: '2018-02-04', y: 230},
        {x: '2018-02-05', y: 20}
      ],
      color: '#297AB1'
    },
  ]
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
                      rating={starCount}
                      selectedStar={(rating) => setStarCount(rating)}
                      emptyStar={require('../../assets/img/empatyStar.png')}
                      fullStar={require('../../assets/img/fullStar.png')}
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
