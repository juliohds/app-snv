


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import MyButton from '../../components/button';
import AsyncStorage from '@react-native-community/async-storage';


const ResponderTarefa = (props) => {

  const [a, setA] = useState(null)
  const [b, setB] = useState(null)
  const [c, setC] = useState(null)
  const [d, setD] = useState(null)

  const showPoints = async () => {
    const splited = props.lastDay.split("-");
    const time = new Date(splited[0], splited[1], splited[2]);
    const outraData = new Date(splited[0], splited[1], splited[2]);
    outraData.setDate(time.getDate() + 1)
    outraData.setMonth(outraData.getDate() === 1 ? time.getMonth() + 1 : time.getMonth())
    const outroMes = outraData.getMonth();
    await AsyncStorage.setItem('subindo:lasdaysalved', JSON.stringify(`${outraData.getFullYear()}-${outroMes}-${outraData.getDate()}`));
    const points = JSON.parse(await AsyncStorage.getItem('subindo:points')) || 5000;
    await AsyncStorage.setItem('subindo:points', JSON.stringify(a + b + c + d + points));
    setA(null)
    setB(null)
    setC(null)
    setD(null)
    props.loadingResources();
  }

  const computed = (points, i) => {
    if(i === 0){
      setA(points)
    } else if(i === 1){
      setB(points)
    } else if(i === 2){
      setC(points)
    } else if(i === 3){
      setD(points)
    }
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Dia {props.lastDay}</Text>
      <Text style={styles.sectionDescription}>
      Atualize suas <Text style={styles.highlight}>Tarefas</Text> para mostrar sua pontuação.
      </Text>

      <View style={styles.engine}>
        {props.tasks.map((v,i) => (
          (i === 0 && a === null || i === 1 && b === null || i === 2 && c === null || i === 3 && d === null) && <View key={v+i} style={styles.item}>
          <Text style={styles.itemText}>{v}</Text>
            <View style={{flexDirection:'row'}}>
            <MyButton onPress={() => computed(250, i)} text="Vitória" />  
            <MyButton onPress={() => computed(-250, i)} text="Derrota" />              
            </View>
          </View>))
        }
        {
         (a !== null && b !== null && c !== null && d !== null) && <MyButton onPress={() => showPoints()} text="VER PONTUAÇÃO" />
        }
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  item:{
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.lighter,
    padding: 15,
    marginTop: 20,
  },
  
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    marginTop: 20,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default ResponderTarefa;