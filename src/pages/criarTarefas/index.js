


import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MyTextInput from '../../components/input';
import MyButton from '../../components/button';
import AwesomeAlert from 'react-native-awesome-alerts';


import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';

const CriarTarefa = (props) => {
  const [tasks, setTasks] = React.useState(["","","",""]);
  const [showAlert, setShowAlert] = React.useState(false);
  const [showAlertError, setShowAlertError] = React.useState(false);

  const refInputA = React.useRef (null);
  const refInputB = React.useRef (null);
  const refInputC = React.useRef (null);
  const refInputD = React.useRef (null);

  const salvarTarefas = () => {
    if(tasks[0] === "" || tasks[1] === "" || tasks[2] === "" || tasks[3] === ""){
      setShowAlertError(true);
    } else {
      setShowAlert(true);
    }
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Primeiro Passo ()</Text>
      <Text style={styles.sectionDescription}>
      Informe quais <Text style={styles.highlight}>Tarefas</Text> deseja fazer nessa temporada.
      </Text>

      <MyTextInput fowardRef={refInputA} returnKeyType="next" onChangeText={(text) => setTasks([text, tasks[1], tasks[2], tasks[3]])} onSubmitEditing={() => { refInputB.current.focus(); }} style={styles.textInput} placeholder="Digite a Tarefa 01" />
      <MyTextInput fowardRef={refInputB} returnKeyType="next" onChangeText={(text) => setTasks([tasks[0], text, tasks[2], tasks[3]])} onSubmitEditing={() => { refInputC.current.focus(); }} style={styles.textInput} placeholder="Digite a Tarefa 02" />
      <MyTextInput fowardRef={refInputC} returnKeyType="next" onChangeText={(text) => setTasks([tasks[0], tasks[1], text, tasks[3]])} onSubmitEditing={() => { refInputD.current.focus(); }} style={styles.textInput} placeholder="Digite a Tarefa 03" />
      <MyTextInput fowardRef={refInputD} returnKeyType="done" onChangeText={(text) => setTasks([tasks[0], tasks[1], tasks[2], text])} onSubmitEditing={() => salvarTarefas()} style={styles.textInput} placeholder="Digite a Tarefa 04" />

      <MyButton onPress={() => salvarTarefas()} text="CADASTRAR TAREFAS" />      
      
      <AwesomeAlert
        show={showAlertError}
        showProgress={false}
        title="Erro"
        message="Preencha todas as tarefas antes de começar uma temporada!"
        closeOnTouchOutside
        closeOnHardwareBackPress={false}    
        showConfirmButton            
        confirmText="Ok, vou preencher"
        confirmButtonColor="#2c2f33"
        onConfirmPressed={() => setShowAlertError(false)}
      />
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Ateção"
        message="Você tem certeza das tarefas que selecionou? Você não poderá mudar depois durante a temporada"
        closeOnTouchOutside
        closeOnHardwareBackPress={false}
        showCancelButton
        showConfirmButton
        cancelText="Não, cancelar"
        confirmText="Sim, enviar"
        confirmButtonColor="#2c2f33"
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={async () => { await AsyncStorage.setItem('subindo:tasks', JSON.stringify(tasks)); setShowAlert(false); props.loadingResources(); }}
      />
    </View>
    );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#323',
    
  },
  textButton: {
    backgroundColor: Colors.white,
  },
  textInput: {
    backgroundColor: Colors.lighter,
    marginTop: 20
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

export default CriarTarefa;