import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';

import {
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

import {
  auth,
  db
} from '../firebaseConfig';

export default function DetalhesPaisScreen({ route }) {

  const { nomePais } = route.params;

  const [pais, setPais] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {

    buscarPais();

  }, []);

  async function buscarPais() {

    try {

      const response = await fetch(

        `https://restcountries.com/v3.1/name/${nomePais}?fields=name,flags,capital,region,subregion,population,languages,currencies,continents`

      );

      const dados = await response.json();

      setPais(dados[0]);

      verificarFavorito(dados[0].name.common);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  async function verificarFavorito(nome) {

    try {

      const usuario = auth.currentUser;

      if (!usuario) return;

      const docRef = doc(
        db,
        'usuarios',
        usuario.uid
      );

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        const dados = docSnap.data();

        const favoritos = dados.favoritos || [];

        setFavoritado(
          favoritos.includes(nome)
        );

      }

    } catch (error) {

      console.log(error);

    }

  }

  async function favoritarPais() {

    try {

      const usuario = auth.currentUser;

      if (!usuario) return;

      const docRef = doc(
        db,
        'usuarios',
        usuario.uid
      );

      const docSnap = await getDoc(docRef);

      let favoritos = [];

      if (docSnap.exists()) {

        favoritos =
          docSnap.data().favoritos || [];

      }

      if (favoritos.includes(
        pais.name.common
      )) {

        favoritos = favoritos.filter(
          item =>
            item !== pais.name.common
        );

        setFavoritado(false);

      } else {

        favoritos.push(
          pais.name.common
        );

        setFavoritado(true);

      }

      await setDoc(

        docRef,

        {
          favoritos: favoritos
        },

        {
          merge: true
        }

      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Erro ao favoritar país'
      );

    }

  }

  if (loading) {

    return (

      <View style={styles.loading}>

        <ActivityIndicator
          size="large"
          color="#0D6EFD"
        />

      </View>

    );

  }

  const moedas = pais.currencies
    ? Object.values(
        pais.currencies
      )
        .map(item => item.name)
        .join(', ')
    : 'Sem informação';

  const idiomas = pais.languages
    ? Object.values(
        pais.languages
      ).join(', ')
    : 'Sem informação';

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Image
        source={{
          uri: pais.flags.png
        }}
        style={styles.bandeira}
      />

      <Text style={styles.nome}>
        {pais.name.common}
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={favoritarPais}
      >

        <Text style={styles.botaoTexto}>

          {
            favoritado
              ? 'Remover dos Favoritos'
              : 'Adicionar aos Favoritos'
          }

        </Text>

      </TouchableOpacity>

      <View style={styles.card}>

        <Text style={styles.info}>
          Capital: {pais.capital?.[0] || 'Sem capital'}
        </Text>

        <Text style={styles.info}>
          Região: {pais.region}
        </Text>

        <Text style={styles.info}>
          Sub-região: {pais.subregion}
        </Text>

        <Text style={styles.info}>
          Continente: {pais.continents?.[0]}
        </Text>

        <Text style={styles.info}>
          População: {pais.population.toLocaleString()}
        </Text>

        <Text style={styles.info}>
          Moeda: {moedas}
        </Text>

        <Text style={styles.info}>
          Idiomas: {idiomas}
        </Text>

      </View>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EEF5FF',
    padding: 20,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bandeira: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginTop: 20,
  },

  nome: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0D3B8E',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
  },

  info: {
    fontSize: 17,
    color: '#333',
    marginBottom: 15,
    lineHeight: 25,
  },

  botao: {
    backgroundColor: '#0D6EFD',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 25,
  },

  botaoTexto: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

});