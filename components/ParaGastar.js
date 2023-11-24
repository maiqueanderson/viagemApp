import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ParaGastar = () => {

  const [days, setDays] = useState(null);


  const criarVariaveisDias = async () => {

    const dias = days;

    for (let i = 1; i <= parseInt(dias); i++) {
      const dia = {
        dia: i,
      };
      console.log(dia);
      
    }
  };

  useEffect(() => {
    const fetchDiasViagem = async () => {
      try {
        const viagensString = await AsyncStorage.getItem("viagens");
        console.log(viagensString);
  
        const viagensArray = viagensString ? JSON.parse(viagensString) : [];
        
        viagensArray.forEach((viagem) => {
          console.log(viagem.dias);
          setDays(viagem.dias)
          
        });
      } catch (error) {
        console.error("Erro ao salvar viagem:", error);
      }
    };
  
    fetchDiasViagem();
  }, []);
  
  

  return (
    <View>
    <Text>Teste do let com base no numero de dias ver console</Text>
     <Button onPress={criarVariaveisDias}>Aperte</Button>
    </View>
  );
};

export default ParaGastar;
