import React, { useState } from 'react';

import {
  createUserWithEmailAndPassword
} from 'firebase/auth';

import {
  doc,
  setDoc
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
  ScrollView,
  ActivityIndicator
} from 'react-native';

export default function CadastroScreen({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function cadastrarUsuario() {

    if (!nome || !email || !senha || !confirmarSenha) {

      Alert.alert(
        'Erro',
        'Preencha todos os campos'
      );

      return;
    }

    if (senha !== confirmarSenha) {

      Alert.alert(
        'Erro',
        'As senhas não coincidem'
      );

      return;
    }

    if (senha.length < 6) {

      Alert.alert(
        'Erro',
        'A senha deve ter no mínimo 6 caracteres'
      );

      return;
    }

    try {

      setLoading(true);

      const usuario = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      await setDoc(
        doc(db, 'usuarios', usuario.user.uid),
        {
          nome: nome,
          email: email,
          criadoEm: new Date()
        }
      );

      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso!'
      );

      navigation.navigate('Login');

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Erro ao cadastrar usuário'
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.topo}>

        <Image
          source={require('../images/fotoprincipal.png')}
          style={styles.logo}
        />

        <Text style={styles.titulo}>
          CRIAR CONTA
        </Text>

        <Text style={styles.subtitulo}>
          Cadastre-se para explorar o mundo
        </Text>

      </View>

      <TextInput
        placeholder="Nome completo"
        placeholderTextColor="#888"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

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

      <TextInput
        placeholder="Confirme sua senha"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.input}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={cadastrarUsuario}
        disabled={loading}
      >

        {
          loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.botaoTexto}>
              Cadastrar
            </Text>
          )
        }

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.login}>
          Já possui conta?
          <Text style={styles.linkAzul}>
            {' '}Entrar
          </Text>
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
    justifyContent: 'center',
  },

  topo: {
    alignItems: 'center',
    marginBottom: 35,
  },

  logo: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    marginBottom: 15,
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0D3B8E',
  },

  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
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

  login: {
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