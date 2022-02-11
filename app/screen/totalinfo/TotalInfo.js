import { View, ScrollView, StatusBar, Image, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import StarRating from 'react-native-star-rating'; 


export function TotalInfo() {
  const [starCount, setStarCount] = useState(0)
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
                      ]} >
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
                      }]} >
                      <Text style={styles.paginationText}>{item}</Text>
                    </TouchableOpacity>
                  </View> :
                  <View key={index}>
                    <TouchableOpacity style={styles.paginationForm} >
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