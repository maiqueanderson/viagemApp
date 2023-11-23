import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { List } from "react-native-paper";
import { Appbar } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Viagem Salvador" />
      </Appbar.Header>
      <View style={styles.container}></View>
      <Card.Title
        style={styles.card}
        title="Valor Restante"
        subtitle="R$ 1000,00"
        left={(props) => (
          <Avatar.Icon style={styles.icon1} {...props} icon="cash-check" />
        )}
      />
      <Card.Title
        style={styles.card}
        title="Valor Gasto"
        subtitle="R$ 300,00"
        left={(props) => (
          <Avatar.Icon style={styles.icon2} {...props} icon="cash-remove" />
        )}
      />
      <View style={styles.historic}>
        <List.Section>
          <List.Subheader>Histórico de gastos</List.Subheader>
          <List.Item title="Compras" right={() => <Text>R$ 50,00</Text>} />
          <List.Item title="Alimentação" right={() => <Text>R$ 100,00</Text>} />
        </List.Section>
      </View>
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
    fontSize: 24,
    fontWeight: 700,
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
  },
});

export default HomeScreen;
