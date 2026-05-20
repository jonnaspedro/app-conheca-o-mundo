import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
} from 'react-native';

import {
  signOut
} from 'firebase/auth';

import {
  doc,
  getDoc
} from 'firebase/firestore';

import {
  auth,
  db
} from '../firebaseConfig';

export default function PerfilScreen({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState('');
  const [favoritos, setFavoritos] = useState(0);
  const [dataCriacao, setDataCriacao] = useState('');

  useFocusEffect(

    useCallback(() => {

      buscarDadosUsuario();

    }, [])

  );

  async function buscarDadosUsuario() {

    try {

      const usuario = auth.currentUser;

      if (!usuario) return;

      setEmail(usuario.email);

      const dataConta = new Date(
        usuario.metadata.creationTime
      );

      setDataCriacao(
        dataConta.getFullYear()
      );

      const docRef = doc(
        db,
        'usuarios',
        usuario.uid
      );

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        const dados = docSnap.data();

        setNome(dados.nome || '');

        setFoto(dados.foto || '');

        setFavoritos(
          dados.favoritos
            ? dados.favoritos.length
            : 0
        );

      }

    } catch (error) {

      console.log(error);

    }

  }

  async function sair() {

    try {

      await signOut(auth);

      navigation.replace('Login');

    } catch (error) {

      Alert.alert(
        'Erro',
        'Erro ao sair da conta'
      );

    }

  }

  return (

    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.topo}>

        <Image
          source={
            foto
              ? { uri: foto }
              : require('../images/fotoprincipal.png')
          }
          style={styles.foto}
        />

        <Text style={styles.nome}>
          {nome || 'Usuário'}
        </Text>

        <Text style={styles.email}>
          {email}
        </Text>

      </View>

      <View style={styles.infoContainer}>

        <View style={styles.infoCard}>

          <Text style={styles.infoNumero}>
            {favoritos}
          </Text>

          <Text style={styles.infoTexto}>
            Favoritos
          </Text>

        </View>

        <View style={styles.infoCard}>

          <Text style={styles.infoNumero}>
            {dataCriacao}
          </Text>

          <Text style={styles.infoTexto}>
            Conta criada
          </Text>

        </View>

      </View>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('EditarPerfil')
        }
      >

        <Text style={styles.cardTexto}>
          Editar Nome
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('AlterarFoto')
        }
      >

        <Text style={styles.cardTexto}>
          Alterar Foto
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('RecuperarSenha')
        }
      >

        <Text style={styles.cardTexto}>
          Alterar Senha
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSair}
        onPress={sair}
      >

        <Text style={styles.textoSair}>
          Sair da Conta
        </Text>

      </TouchableOpacity>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#EEF5FF',
    padding: 25,
  },

  topo: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },

  foto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#0D6EFD',
  },

  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D3B8E',
  },

  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 6,
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  infoCard: {
    backgroundColor: '#FFF',
    width: '48%',
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    elevation: 2,
  },

  infoNumero: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D6EFD',
  },

  infoTexto: {
    fontSize: 15,
    color: '#666',
    marginTop: 5,
  },

  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
    elevation: 2,
  },

  cardTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D3B8E',
  },

  botaoSair: {
    backgroundColor: '#FF3B30',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 30,
  },

  textoSair: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

});