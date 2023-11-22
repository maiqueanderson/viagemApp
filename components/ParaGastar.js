import React from 'react';
import { View, Text, Button } from 'react-native';

const DetailsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Detalhes da tela</Text>
      <Button
        title="Voltar para a Home"
        onPress={() => navigation.navigate('HomeScreen')}
      />
    </View>
  );
};

export default DetailsScreen;
