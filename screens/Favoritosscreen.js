import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';

import {
  auth,
  db
} from '../firebaseConfig';

import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove
} from 'firebase/firestore';

export default function FavoritosScreen({ navigation }) {

  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    buscarFavoritos();

  }, []);

  async function buscarFavoritos() {

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

        const lista =
          dados.favoritos || [];

        const paisesDetalhados =
          await Promise.all(

            lista.map(async (pais) => {

              const response =
                await fetch(

                  `https://restcountries.com/v3.1/name/${pais}?fields=name,flags,capital`

                );

              const dadosPais =
                await response.json();

              return dadosPais[0];

            })

          );

        setFavoritos(
          paisesDetalhados
        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  async function removerFavorito(nomePais) {

    try {

      const usuario = auth.currentUser;

      if (!usuario) return;

      const docRef = doc(
        db,
        'usuarios',
        usuario.uid
      );

      await updateDoc(docRef, {
        favoritos: arrayRemove(nomePais)
      });

      setFavoritos((prevFavoritos) =>
        prevFavoritos.filter(
          (pais) => pais.name.common !== nomePais
        )
      );

    } catch (error) {

      console.log(error);

    }

  }

  function renderItem({ item }) {

    return (

      <View
        style={styles.card}
      >

        <TouchableOpacity
          style={styles.cardInfo}
          onPress={() =>

            navigation.navigate(
              'DetalhesPais',
              {
                nomePais:
                  item.name.common
              }
            )

          }
        >

          <Image
            source={{
              uri: item.flags.png
            }}
            style={styles.bandeira}
          />

          <View>

            <Text style={styles.nome}>
              {item.name.common}
            </Text>

            <Text style={styles.capital}>
              {item.capital?.[0]}
            </Text>

          </View>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.removerBotao}
          onPress={() => removerFavorito(item.name.common)}
        >
          <Text style={styles.removerTexto}>
            Remover
          </Text>
        </TouchableOpacity>

      </View>

    );

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

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Favoritos
      </Text>

      <FlatList
        data={favoritos}
        keyExtractor={(item) =>
          item.name.common
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EEF5FF',
    padding: 20,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0D3B8E',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  cardInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  bandeira: {
    width: 60,
    height: 45,
    borderRadius: 8,
    marginRight: 15,
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },

  capital: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },

  removerBotao: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8D7DA',
    borderRadius: 12,
  },

  removerTexto: {
    color: '#842029',
    fontWeight: 'bold',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});