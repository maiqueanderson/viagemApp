import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import {
  Avatar,
  Card,
  Divider,
  List,
  FAB,
  Portal,
  Modal,
  Button,
  TextInput,
  Appbar,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../assets/logo.png";

const Historic = ({ navigation, route }) => {

  const [refresh, setRefresh] = useState(false);

  const renderDias = (diaGasto, valorDia, quantidadeDias) => {
    let dias = [];

    for (let i = 1; i <= quantidadeDias; i++) {
      let day = diaGasto[i - 1]; // Dia específico
      let valor = valorDia[i - 1]; // Valor associado ao dia

      dias.push(
        <View key={i}>
          <List.Item
            title={`${day}º DIA`}
            right={() => <Text>{`R$ ${valor}`}</Text>}
          />
          <Divider />
        </View>
      );
    }

    return dias;
  };



  const [viagens, setViagens] = useState([]);



  useEffect(() => {
    const fetchViagens = async () => {
      try {
        const storedViagens = await AsyncStorage.getItem("viagens");

        if (storedViagens !== null && storedViagens !== "[]") {
          setViagens(JSON.parse(storedViagens));
        } else {
          navigation.navigate("CriarViagem");
        }
      } catch (error) {
        console.error("Erro ao carregar viagens:", error);
      }
    };

    fetchViagens();
  }, [refresh, navigation]);

 
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Toda vez que a tela receber foco (navegação para esta tela), atualize o estado
      setRefresh((prevRefresh) => !prevRefresh);
    });

    return unsubscribe;
  }, [navigation]);


  const checkViagensCollection = async () => {
    try {
      const viagens = await AsyncStorage.getItem("viagens");
      if (viagens === null) {
        // Se a coleção 'viagens' não existir, cria uma coleção vazia
        await AsyncStorage.setItem("viagens", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Erro ao verificar a coleção de viagens:", error);
    }
  };

  checkViagensCollection();

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Image style={styles.tinyLogo} source={Logo} />
      </View>

      <ScrollView>
        <View>
          {viagens.map((viagem, index) => (
            <View key={index}>
              <Text style={styles.cityText}>{viagem.cidade}</Text>
              
              <Text style={styles.cardText}>HISTÓRICO DE GASTOS</Text>

              <View style={styles.historic}>
                <List.Section>
                  {renderDias(
                    viagem.dia,
                    viagem.historicValor,
                    parseFloat(viagem.dias)
                  )}
                </List.Section>
              </View>

            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    alignItems: "center",
    height: 400,
  },
  tinyLogo: {
    width: 150,
    height: 94,
    margin: 25,
    top: 15
    
   
  },
  text: {
    fontWeight: "bold",
    color: "#204f72",
    fontSize: 20,
  },
  Modaltext: {
    fontWeight: "bold",
    color: "#204f72",
    fontSize: 20,
    margin: 50,
    marginBottom: 0,
    marginTop: 20,
  },
  button: {
    margin: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#dbdbdb",
    margin: 10,
    padding: 20,
  },
  cardTitle: {
    borderWidth: 1,
    borderColor: "#dbdbdb",
    margin: 10,
    backgroundColor: "#64bbf7",
  },
  icon1: {
    backgroundColor: "#a8d496",
  },
  icon2: {
    backgroundColor: "#ff9696",
  },

  historic: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#dbdbdb",
    backgroundColor: "#fff",
  },
  fab: {
    alignItems: "center",
    width: 50,
    height: 50,
    margin: 20,
    bottom: 10,
    left: 280,
  },
  input: {
    width: 300,
    margin: 16,
  },
  inputDia:{
    width: 300,
    margin: 16,
    backgroundColor: '#e9f0f6',
    color: '#204f72',
  },
  modalButton: {
    margin: 15,
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  city: {
    backgroundColor: "#204f72",
    alignItems: 'center',

  },

  cityText: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 20,
    color: "#204f72",
    textTransform: "uppercase",
    textAlign: "center",
  },
  cardText: {
    fontSize: 20,
    textAlign: "center",
    color: "#204f72",
    fontWeight: "bold",
    margin: 15,
  },
});

export default Historic;
