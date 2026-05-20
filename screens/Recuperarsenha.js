import React, { useState } from 'react';

import {
  sendPasswordResetEmail
} from 'firebase/auth';

import { auth } from '../firebaseConfig';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';

export default function RecuperarSenhaScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function recuperarSenha() {

    if (!email) {

      Alert.alert(
        'Erro',
        'Digite seu e-mail'
      );

      return;
    }

    try {

      setLoading(true);

      await sendPasswordResetEmail(
        auth,
        email
      );

      Alert.alert(
        'Sucesso',
        'Verifique seu e-mail para redefinir sua senha'
      );

      navigation.navigate('Login');

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Erro ao recuperar senha'
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <View style={styles.container}>

      <View style={styles.topo}>

        <Image
          source={require('../images/fotoprincipal.png')}
          style={styles.logo}
        />

        <Text style={styles.titulo}>
          RECUPERAR OU ALTERAR SENHA
        </Text>

        <Text style={styles.subtitulo}>
          Digite seu e-mail para recuperar sua conta
        </Text>

      </View>

      <TextInput
        placeholder="Digite seu e-mail"
        placeholderTextColor="#888"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={recuperarSenha}
        disabled={loading}
      >

        {
          loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.botaoTexto}>
              Enviar
            </Text>
          )
        }

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.voltar}>
          Voltar para login
        </Text>
      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EEF5FF',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },

  topo: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logo: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    marginBottom: 15,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0D3B8E',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
  },

  input: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDE6F5',
    fontSize: 16,
    elevation: 2,
  },

  botao: {
    backgroundColor: '#0D6EFD',
    padding: 17,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  botaoTexto: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  voltar: {
    textAlign: 'center',
    marginTop: 25,
    color: '#0D6EFD',
    fontWeight: 'bold',
    fontSize: 15,
  },

});