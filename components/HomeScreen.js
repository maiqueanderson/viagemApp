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




const HomeScreen = ({navigation}) => {

    //configuração de gasto
    const [diaGasto, setDiaGasto ] = useState('');
    const [valorGasto, setValorGasto ] = useState('0');
  
    const renderDias =  (diaGasto, valorDia, quantidadeDias) => {
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

  
  const adicionarGasto = async () => {
    try {
      // Obtenha a coleção atual de viagens do AsyncStorage
      const viagens = await AsyncStorage.getItem('viagens');
      const viagensArray = viagens ? JSON.parse(viagens) : [];
  
      // Supondo que você queira atualizar o gasto da viagem no índice 0
      const indiceDaViagemParaAtualizar = 0;
  
      // Verifique se a viagem que você deseja atualizar existe na coleção
      if (viagensArray.length > indiceDaViagemParaAtualizar) {
        // Atualize o valor do gasto na viagem desejada
        viagensArray[indiceDaViagemParaAtualizar].gasto = parseFloat(viagensArray[indiceDaViagemParaAtualizar].gasto) + parseFloat(valorGasto); // Novo valor do gasto
        viagensArray[indiceDaViagemParaAtualizar].orcamento = parseFloat(viagensArray[indiceDaViagemParaAtualizar].orcamento) - parseFloat(valorGasto);
        viagensArray[indiceDaViagemParaAtualizar].valorDia[diaGasto -1] = parseFloat(viagensArray[indiceDaViagemParaAtualizar].valorDia[diaGasto -1]) - parseFloat(valorGasto);
       
      }
  
      // Salve a coleção atualizada de viagens de volta no AsyncStorage
      await AsyncStorage.setItem('viagens', JSON.stringify(viagensArray));
  
      // Verifique se o gasto foi atualizado corretamente
      const viagensAtualizadas = await AsyncStorage.getItem('viagens');
      console.log(JSON.parse(viagensAtualizadas));
      
      console.log('Antes de setRefresh');
    setRefresh(!refresh);
    console.log('Após setRefresh');
    hideModal();
      
    } catch (error) {
      console.error('Erro ao adicionar gasto:', error);
    }
  };
  

  useEffect(() => {
    const fetchViagens = async () => {
      try {
        const storedViagens = await AsyncStorage.getItem('viagens');
      const viagensArray = storedViagens ? JSON.parse(storedViagens) : [];

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
    
  
    fetchViagens(refresh);
    
  }, [refresh]);

  //configurações do MODAL
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };


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
    <ScrollView>
      <View>
        <View style={styles.container}></View>
        {viagens.map((viagem, index) => (
          <View key={index}>
            <Text style={styles.city}>{viagem.cidade}</Text>

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
            <Card style={styles.cardTitle}>
              <Card.Content>
                <Text style={styles.cardText}>A GASTAR POR DIA</Text>
              </Card.Content>
            </Card>

            <View style={styles.historic}>
              <List.Section>
                {renderDias(
                  viagem.dia,
                  viagem.valorDia,
                  parseFloat(viagem.dias),
                )}
              </List.Section>
            </View>


            <FAB icon="plus" style={styles.fab} onPress={showModal} />

            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}
              >
                <View style={styles.container}>
                  <Text style={styles.text}>CADASTRAR NOVO GASTO</Text>
                  <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Dia do gasto"
                    value={diaGasto}
                    onChangeText={(diaGasto) => setDiaGasto(diaGasto)}
                  />
                  <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Valor Gasto"
                    value={valorGasto}
                    onChangeText={(valorGasto) => setValorGasto(valorGasto)}
                  />
                 
                  <Button
                    style={styles.modalButton}
                    icon="plus"
                    mode="contained"
                    onPress={async () => {
                      adicionarGasto()
                    }}
                  >
                    Salvar
                  </Button>


                </View>
              </Modal>
            </Portal>
            
              <Button onPress={() => removeViagem(index)}>REMOVER VIAGEM</Button>
          </View>
        ))}
      </View>
    </ScrollView>
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

export default HomeScreen;
