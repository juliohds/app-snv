import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import codePush from "react-native-code-push";

import {dateInitial} from './src/utils/tempDaysUtils';

import AsyncStorage from '@react-native-community/async-storage';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import ResponderTarefa from './src/pages/responderTarefa';
import CriarTarefa from './src/pages/criarTarefas';
import Pontuacao from './src/pages/pontuacao';

const App: () => React$Node = () => {

  const [tasks, setTasks] = React.useState([]);
  const [pendingDay, setPendingDay] = React.useState(false);
  const [lastDay, setLastDay] = React.useState(dateInitial);

  const today = new Date(Date.now());
  
  const diffDays = React.useMemo(() => {
    const now = new Date(); // Data de hoje
    const past = new Date(lastDay || dateInitial); // Outra data no passado
    const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
    return days;
  }, [lastDay]);
  
  const loadingResources = async () => {
    // zerar o game
    // await AsyncStorage.removeItem('subindo:tasks')
    // await AsyncStorage.removeItem('subindo:lasdaysalved')
    // await AsyncStorage.removeItem('subindo:points')

    const mytasks = JSON.parse(await AsyncStorage.getItem('subindo:tasks'));
    if(mytasks){
      const storageLastDay = JSON.parse(await AsyncStorage.getItem('subindo:lasdaysalved')) || dateInitial;
      setTasks(mytasks);
      setLastDay(storageLastDay);
      if(storageLastDay === `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`){
        return setPendingDay(false)
      }
      const splited = storageLastDay.split("-")
      const dateCompar = new Date(splited[0],splited[1]-1,splited[2]);
      if(dateCompar < today){
        setPendingDay(true)
      }
    }
  }

  React.useEffect(()=>{
      loadingResources()
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>          
          <View style={styles.body}>            
            {tasks.length > 0 && pendingDay && <ResponderTarefa lastDay={lastDay} tasks={tasks} loadingResources={() => loadingResources()} />}
            {tasks.length > 0 && !pendingDay && <Pontuacao />}
            {tasks.length === 0 && <CriarTarefa loadingResources={() => loadingResources()} />}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
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

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
