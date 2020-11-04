


import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import cadete from '../../img/cadete.jpeg';
import lihona from '../../img/lihona.jpeg';
import recruta from '../../img/recruta.jpeg';
import capitao from '../../img/capitao.jpeg';
import comandante from '../../img/comandante.jpeg';
import grandeAlmirante from '../../img/grande-almirante.jpeg';
import almirante from '../../img/almirante.jpeg';
import tenente from '../../img/tenente.jpeg';
import { dateInitial } from '../../utils/tempDaysUtils';


const Pontuacao = () => {
  const [points, setPoints] = useState(0)
  
  const loadingPoints = async () => {
    setPoints(JSON.parse(await AsyncStorage.getItem('subindo:points')));
  }

  React.useEffect(() => {
    loadingPoints()
  })

  const getImage = () => {
    if(points < 10000){
      return recruta;
    } else if (points < 20000) {
      return cadete;
    } else if (points < 30000) {
      return lihona;
    }
    else if (points < 40000) {
      return tenente;
    }
    else if (points < 50000) {
      return comandante;
    }
    else if (points < 60000) {
      return capitao;
    }
    else if (points < 70000) {
      return almirante;
    }
    else {
      return grandeAlmirante;
    }
  }

  
  const getText = () => {
    if(points < 10000){
      return "recruta";
    } else if (points < 20000) {
      return "cadete";
    } else if (points < 30000) {
      return "lihona";
    }
    else if (points < 40000) {
      return "tenente";
    }
    else if (points < 50000) {
      return "comandante";
    }
    else if (points < 60000) {
      return "capitao";
    }
    else if (points < 70000) {
      return "almirante";
    }
    else {
      return "Grande Almirante";
    }
  }


  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Pontuação Atual</Text>
      <Text style={styles.sectionDescription}>
      Até agora nessa <Text style={styles.highlight}>Temporada</Text> você conseguiu esses pontos.
      </Text>

      <View style={styles.containerImg}><Image source={getImage()} style={styles.img} /></View>
      <Text style={styles.eloText}>{getText()}</Text>
      <View><Text style={styles.points}>{points}</Text></View>
      {!points && <View><Text>A Temporada ainda não começou, vai começar em: {dateInitial}</Text></View>}
      <Text style={styles.mepoints}>Pontos</Text>
    </View>
    );
}

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
  },  
  mepoints: {
    fontSize: 20,
    textAlign: 'center'

  },
  eloText: {
    fontSize: 40,
    textAlign: 'center'
  },
  containerImg: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  subpoints: {
    fontSize: 20,
    textAlign: 'center'
  },  
  points: {
    fontSize: 90,
    textAlign: 'center'
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

export default Pontuacao;