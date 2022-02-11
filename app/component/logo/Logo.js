import { View, Text ,Image} from 'react-native';
import React from 'react';
import styles from './style'

export  function Logo(props) {
  return (
    <View style={styles.content}>
     <Image source={require('../../assets/img/logo.png')} style={styles.logo}/>
    </View>
  );
}
