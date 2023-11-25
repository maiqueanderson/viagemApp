import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CriarViagem = ({ navigation }) => {
  const [viagens, setViagens] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const removeViagem = async (indexToRemove) => {
    try {
      const updatedViagens = viagens.filter(
        (_, index) => index !== indexToRemove
      );
      // Atualiza a lista de viagens após a remoção
      setViagens(updatedViagens);

      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem("viagens", JSON.stringify(updatedViagens));
    } catch (error) {
      console.error("Erro ao remover viagem:", error);
    }
  };

  useEffect(() => {
    const fetchViagens = async () => {
      try {
        const storedViagens = await AsyncStorage.getItem('viagens');
        if (storedViagens !== null && storedViagens !== '[]') {
          // Viagens existem no AsyncStorage
          setViagens(JSON.parse(storedViagens));
        } else {
          // Não há viagens cadastradas, navegue para outra tela
          navigation.navigate('CriarViagem');
        }
      } catch (error) {
        console.error('Erro ao carregar viagens:', error);
      }
    };
  
    fetchViagens();
  }, [refresh]);

  //configurações do MODAL
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  //configurações do formulario
  const [cidade, setCidade] = useState("");
  const [dias, setDias] = useState("");
  const [orcamento, setOrcamento] = useState("");

  const checkViagensCollection = async () => {
    try {
      const viagens = await AsyncStorage.getItem("viagens");
      if (viagens === null) {
        // Se a coleção 'viagens' não existir, crie uma coleção vazia
        await AsyncStorage.setItem("viagens", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Erro ao verificar a coleção de viagens:", error);
    }
  };

  checkViagensCollection();
  return (
    <View style={styles.container}>
                  <Text style={styles.text}>CADASTRAR NOVA VIAGEM</Text>
                  <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Cidade"
                    value={cidade}
                    onChangeText={(cidade) => setCidade(cidade)}
                  />
                  <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Quantidade de dias da viagem"
                    value={dias}
                    onChangeText={(dias) => setDias(dias)}
                  />
                  <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Digite o valor do orçamento da viagem"
                    value={orcamento}
                    onChangeText={(orcamento) => setOrcamento(orcamento)}
                  />
                  <Button
                    style={styles.modalButton}
                    icon="plus"
                    mode="contained"
                    onPress={async () => {
                      try {
                        const viagem = {
                          cidade: cidade,
                          dias: dias,
                          orcamento: orcamento,
                          gasto: 0
                        };

                        const viagens = await AsyncStorage.setItem("viagens");
                        const viagensArray = viagens ? JSON.parse(viagens) : [];

                        viagensArray.push(viagem);
                        await AsyncStorage.setItem(
                          "viagens",
                          JSON.stringify(viagensArray)
                        );
                        navigation.navigate('HomeScreen');
                        setRefresh(!refresh);
                        
                        
                        
                        
                      } catch (error) {
                        console.error("Erro ao salvar viagem:", error);
                      }
                    }}
                  >
                    Nova viagem
                  </Button>


                </View>
                
  );
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: 700,
    color: "#446a1c",
    fontSize: "20px",
  },
  button: {
    margin: 20,
  },
  card: {
    borderWidth: "1px",
    borderRadius: "20px",
    borderColor: "#dbdbdb",
    margin: "10px",
    padding: "20px",
  },
  cardTitle: {
    borderWidth: "1px",
    borderRadius: "20px",
    borderColor: "#dbdbdb",
    margin: "10px",
    backgroundColor: "#dce7cc",
  },
  icon1: {
    backgroundColor: "#a8d496",
  },
  icon2: {
    backgroundColor: "#ff9696",
  },

  historic: {
    margin: 10,
    borderWidth: "1px",
    borderRadius: "20px",
    borderColor: "#dbdbdb",
    backgroundColor: "#fff",
  },
  fab: {
    position: "sticky",
    alignItems: "center",
    width: "50px",
    height: "50px",
    margin: 20,
    bottom: 10,
    left: "90vw",
  },
  input: {
    width: "80vw",
    margin: 16,
  },
  modalButton: {
    width: "80vw",
    marginTop: 20,
  },
  city: {
    fontSize: "40px",
    fontWeight: 700,
    padding: 20,
    color: "#dce7cc",
    textTransform: "uppercase",
    backgroundColor: "#446a1c",
    textAlign: "center",
    marginBottom: "30px",
    borderEndStartRadius: "30px",
    borderEndEndRadius: "30px",
  },
  cardText: {
    fontSize: "15px",
    textAlign: "center",
    color: "#446a1c",
    fontWeight: "700",
  },
});

export default CriarViagem;

