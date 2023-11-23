import React from 'react';
import { View, Text, Button } from 'react-native';
import { Appbar } from 'react-native-paper';

const DetailsScreen = ({ navigation }) => {
  return (
    <Appbar.Header>
    <Appbar.BackAction onPress={() => navigation.navigate('HomeScreen')} />
    <Appbar.Content title="Novo Gasto" />
  </Appbar.Header>
  );
};

export default DetailsScreen;
