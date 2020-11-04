import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const myButton = (props) => {
  return <TouchableOpacity style={styles.button} {...props}><Text style={{...props.textStyle}, styles.textButton}>{props.text}</Text></TouchableOpacity>;
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2c2f33',
    padding: 15,    
  },
  textButton: {
    textAlign: 'center',
    color: Colors.white,
    fontWeight: '700',
  },
});


export default myButton;