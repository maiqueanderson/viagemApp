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

const HomeScreen = ({ navigation, route }) => {

  const [refresh, setRefresh] = useState(false);
  //configuração de gasto
  const [diaGasto, setDiaGasto] = useState("1");
  const [valorGasto, setValorGasto] = useState("");

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


  const renderDiasModal = (diaGasto, quantidadeDias) => {
    let dias = [];
  
    for (let i = 1; i <= quantidadeDias; i++) {
      let day = diaGasto[i - 1]; // Dia específico
  
      dias.push(
        <Picker.Item key={i} label={`Dia ${day}`} value={`${day}`} />
      );
    }
  
    return dias;
  };
  

  const [viagens, setViagens] = useState([]);

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

  const adicionarGasto = async () => {
    try {
      // Pega a coleção atual de viagens do AsyncStorage
      const viagens = await AsyncStorage.getItem("viagens");
      const viagensArray = viagens ? JSON.parse(viagens) : [];
      let dia = diaGasto;

      // atualizar o gasto da viagem no índice 0
      const indiceDaViagemParaAtualizar = 0;

      // Verifica se a viagem que o usuario deseja atualizar existe na coleção
      if (viagensArray.length > indiceDaViagemParaAtualizar) {
        // Atualiza o valor do gasto na viagem desejada
        viagensArray[indiceDaViagemParaAtualizar].gasto =
          parseFloat(viagensArray[indiceDaViagemParaAtualizar].gasto) +
          parseFloat(valorGasto); // Novo valor do gasto

        viagensArray[indiceDaViagemParaAtualizar].orcamento =
          parseFloat(viagensArray[indiceDaViagemParaAtualizar].orcamento) -
          parseFloat(valorGasto);
          
          viagensArray[indiceDaViagemParaAtualizar].historicValor[dia -1] =
          parseFloat(viagensArray[indiceDaViagemParaAtualizar].historicValor[dia -1]) +
          parseFloat(valorGasto);
          
          console.log(dia)
        // Atualiza o valor gasto do dia e os outros dias em seguida
        for (
          let i = diaGasto;
          i <= viagensArray[indiceDaViagemParaAtualizar].dias;
          i++
        ) {
          viagensArray[indiceDaViagemParaAtualizar].valorDia[i - 1] =
            parseFloat(
              viagensArray[indiceDaViagemParaAtualizar].valorDia[i - 1]
            ) - parseFloat(valorGasto);
        }
      }

      // Salva a coleção atualizada de viagens de volta no AsyncStorage
      await AsyncStorage.setItem("viagens", JSON.stringify(viagensArray));

      // Verifica se o gasto foi atualizado corretamente
      const viagensAtualizadas = await AsyncStorage.getItem("viagens");
      console.log(JSON.parse(viagensAtualizadas));

      setRefresh(!refresh);
      hideModal();
    } catch (error) {
      console.error("Erro ao adicionar gasto:", error);
    }
  };

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
    if (route.params?.refresh) {
      setRefresh(!refresh);
    }
  }, [route.params?.refresh]);

  //configurações do MODAL
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

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
              <Card.Title
                style={styles.card}
                title="Valor Restante"
                subtitle={"R$ " + viagem.orcamento}
                left={(props) => (
                  <Avatar.Icon
                    style={styles.icon1}
                    {...props}
                    icon="cash-check"
                  />
                )}
              />

              <Card.Title
                style={styles.card}
                title="Valor Gasto"
                subtitle={"R$ " + viagem.gasto}
                left={(props) => (
                  <Avatar.Icon
                    style={styles.icon2}
                    {...props}
                    icon="cash-remove"
                  />
                )}
              />
              <Button
                style={styles.button}
                icon="plus"
                mode="contained"
                onPress={showModal}
              >
                Adicionar Gasto
              </Button>

              <Text style={styles.cardText}>A GASTAR POR DIA</Text>

              <View style={styles.historic}>
                <List.Section>
                  {renderDias(
                    viagem.dia,
                    viagem.valorDia,
                    parseFloat(viagem.dias)
                  )}
                </List.Section>
              </View>

              <Portal>
                <Modal
                  style={styles.modal}
                  visible={visible}
                  onDismiss={hideModal}
                  contentContainerStyle={containerStyle}
                >

                 


                  <View>
                    <Text style={styles.Modaltext}>CADASTRAR NOVO GASTO</Text>

                    <Picker
                    style={styles.inputDia}
                    selectedValue={diaGasto}
                    onValueChange={(itemValue, itemIndex) =>
                      setDiaGasto(itemValue)
                    }
                  >
                 {renderDiasModal(
                    viagem.dia,
                    parseFloat(viagem.dias)
                  )}
                  </Picker>

                    <TextInput
                      style={styles.input}
                      mode="outlined"
                      label="Valor Gasto"
                      keyboardType="numeric"
                      value={valorGasto}
                      onChangeText={(valorGasto) => setValorGasto(valorGasto)}
                    />

                    <Button
                      style={styles.modalButton}
                      icon="plus"
                      mode="contained"
                      onPress={async () => {
                        adicionarGasto();
                      }}
                    >
                      Salvar
                    </Button>
                  </View>
                </Modal>
              </Portal>

              <Button onPress={() => removeViagem(index)}>
                REMOVER VIAGEM
              </Button>
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

export default HomeScreen;
