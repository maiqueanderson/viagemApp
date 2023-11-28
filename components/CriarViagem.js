import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from '../assets/logo2.png';

const CriarViagem = ({ navigation }) => {
  const [viagens, setViagens] = useState([]);

  //configurações do formulario
  const [cidade, setCidade] = useState("");
  const [dias, setDias] = useState("");
  const [orcamento, setOrcamento] = useState("");

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

<View >
        
        <Image
        style={styles.tinyLogo}
        source={Logo}
      />
        </View>
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
        keyboardType="numeric"
        value={dias}
        onChangeText={(dias) => setDias(dias)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Digite o valor do orçamento da viagem"
        keyboardType="numeric"
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
              gasto: "0",
              dia: Array.from({ length: dias }, (_, i) => i + 1),
              valorDia: Array.from({ length: dias }, (_, i) => {
                const incremento = orcamento / dias;
                let valorAtual = 0;

                for (let j = 0; j <= i; j++) {
                  valorAtual += incremento;
                }
                return valorAtual;
              }),
              historicValor: Array.from({ length: dias }, (_, i) => {
                let valorAtual = 0;
                return valorAtual;
              }),
            };

            let viagensArray = await AsyncStorage.getItem("viagens");
            viagensArray = viagensArray ? JSON.parse(viagensArray) : [];

            // Verifica se já existe uma viagem
            if (viagensArray.length > 0) {
              // Substitui a viagem existente
              viagensArray[0] = viagem;
            } else {
              // Cria uma nova viagem
              viagensArray.push(viagem);
            }

            await AsyncStorage.setItem("viagens", JSON.stringify(viagensArray));
            navigation.navigate("HomeScreen", { refresh: true });
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
    fontWeight: "bold",
    color: "#204f72",
    fontSize: 20,
  },
  button: {
    margin: 20,
  },
  tinyLogo: {
    margin: 20,
    width: 150,
    height: 94
   },
   city: {
    fontSize: 40,
    padding: 20,
    backgroundColor: "#204f72",
    width: 360

  },

  input: {
    width: 300,
    margin: 16,
  },
  modalButton: {
    width: "80vw",
    marginTop: 20,
  },
});

export default CriarViagem;
