import React, { useState } from 'react';

import {
  signInWithEmailAndPassword
} from 'firebase/auth';

import {
  doc,
  getDoc
} from 'firebase/firestore';

import {
  auth,
  db
} from '../firebaseConfig';

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

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function fazerLogin() {

    if (!email || !senha) {

      Alert.alert(
        'Erro',
        'Preencha todos os campos'
      );

      return;
    }

    try {

      setLoading(true);

      const usuario = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );

      const uid = usuario.user.uid;

      const docRef = doc(db, 'usuarios', uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        console.log('Dados do usuário:', docSnap.data());

      }

      Alert.alert(
        'Sucesso',
        'Login realizado!'
      );

      navigation.navigate('TelaInicial');

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'E-mail ou senha inválidos'
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
          CONHEÇA{"\n"}
          O MUNDO
        </Text>

        <Text style={styles.subtitulo}>
          Explore. Descubra. Viaje.
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

      <TextInput
        placeholder="Digite sua senha"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={fazerLogin}
        disabled={loading}
      >

        {
          loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.botaoTexto}>
              Entrar
            </Text>
          )
        }

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('RecuperarSenha')}
      >
        <Text style={styles.link}>
          Esqueceu sua senha?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.cadastro}>
          Não possui conta?
          <Text style={styles.linkAzul}>
            {' '}Cadastre-se
          </Text>
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
    width: 240,
    height: 240,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0D3B8E',
    textAlign: 'center',
    lineHeight: 40,
  },

  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
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

  link: {
    textAlign: 'center',
    marginTop: 20,
    color: '#0D6EFD',
    fontWeight: 'bold',
    fontSize: 15,
  },

  cadastro: {
    textAlign: 'center',
    marginTop: 25,
    color: '#555',
    fontSize: 15,
  },

  linkAzul: {
    color: '#0D6EFD',
    fontWeight: 'bold',
  },

});