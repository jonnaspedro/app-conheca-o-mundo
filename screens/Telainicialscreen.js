import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';

import {
  signOut
} from 'firebase/auth';

import {
  auth
} from '../firebaseConfig';

export default function TelaInicialScreen({ navigation }) {

  const [paises, setPaises] = useState([]);
  const [paisesFiltrados, setPaisesFiltrados] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    buscarPaises();

  }, []);

  async function buscarPaises() {

    try {

      const response = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,capital,flags,currencies'
      );

      const dados = await response.json();

      const paisesOrdenados = dados.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );

      setPaises(paisesOrdenados);

      setPaisesFiltrados(paisesOrdenados);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  function pesquisarPais(texto) {

    setPesquisa(texto);

    const resultado = paises.filter((pais) =>

      pais.name.common
        .toLowerCase()
        .includes(texto.toLowerCase())

    );

    setPaisesFiltrados(resultado);

  }

  function abrirDetalhes(pais) {

    navigation.navigate(
      'Detalhes',
      {
        nomePais: pais.name.common
      }
    );

  }

  function renderItem({ item }) {

    return (

      <TouchableOpacity
        style={styles.card}
        onPress={() => abrirDetalhes(item)}
      >

        <Image
          source={{
            uri: item.flags.png
          }}
          style={styles.bandeira}
        />

        <View style={styles.info}>

          <Text style={styles.nomePais}>
            {item.name.common}
          </Text>

          <Text style={styles.capital}>
            Capital: {item.capital ? item.capital[0] : 'Sem capital'}
          </Text>

          <Text style={styles.verMais}>
            Toque para ver detalhes
          </Text>

        </View>

      </TouchableOpacity>

    );

  }

  if (loading) {

    return (

      <View style={styles.loadingContainer}>

        <ActivityIndicator
          size="large"
          color="#0D6EFD"
        />

      </View>

    );

  }

  return (

    <View style={styles.container}>

      <View style={styles.topo}>

        <Text style={styles.titulo}>
          Países
        </Text>

      </View>

      <TextInput
        placeholder="Pesquisar país..."
        placeholderTextColor="#999"
        style={styles.input}
        value={pesquisa}
        onChangeText={pesquisarPais}
      />

      <FlatList
        data={paisesFiltrados}
        keyExtractor={(item) => item.name.common}
        renderItem={renderItem}
        showsVerticalScrollIndicator={true}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EEF5FF',
    paddingTop: 60,
    paddingHorizontal: 15,
  },

  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D3B8E',
  },

  sair: {
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 16,
  },

  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 16,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  bandeira: {
    width: 55,
    height: 40,
    borderRadius: 8,
    marginRight: 15,
  },

  info: {
    flex: 1,
  },

  nomePais: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },

  capital: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  verMais: {
    marginTop: 8,
    color: '#0D6EFD',
    fontWeight: 'bold',
    fontSize: 13,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF5FF',
  },

});