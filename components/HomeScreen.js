import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem vindo a Ferias Econômicas</Text>

      <View style={styles.button}>

      <Button 
        title="Criar uma Viagem"
        onPress={() => navigation.navigate('CriarViagem')}
      />
      </View>
      <View style={styles.button}>

       <Button
        title="Minhas Viagens"
        onPress={() => navigation.navigate('ParaGastar')}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 

    },
    text:{
        fontSize: 24,
        marginBottom: 20
    },
    button:{
        margin: 20
    }
  })

export default HomeScreen;
