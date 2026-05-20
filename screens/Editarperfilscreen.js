import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import {
  auth,
  db
} from '../firebaseConfig';

import {
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';

export default function EditarPerfilScreen({ navigation }) {

  const [nome, setNome] = useState('');

  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);

  const [loadingDados, setLoadingDados] = useState(true);

  useEffect(() => {

    carregarDados();

  }, []);

  async function carregarDados() {

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

        setNome(
          dados.nome || ''
        );

        setEmail(
          dados.email || ''
        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoadingDados(false);

    }

  }

  async function salvarAlteracoes() {

    try {

      if (!nome || !email) {

        Alert.alert(
          'Erro',
          'Preencha todos os campos'
        );

        return;
      }

      setLoading(true);

      const usuario = auth.currentUser;

      if (!usuario) return;

      await updateDoc(

        doc(
          db,
          'usuarios',
          usuario.uid
        ),

        {
          nome: nome,
          email: email
        }

      );

      Alert.alert(
        'Sucesso',
        'Perfil atualizado!'
      );

      navigation.goBack();

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Erro ao atualizar perfil'
      );

    } finally {

      setLoading(false);

    }

  }

  if (loadingDados) {

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

    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.titulo}>
        Editar Nome
      </Text>

      <Text style={styles.label}>
        Nome
      </Text>

      <TextInput
        placeholder="Digite seu nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={salvarAlteracoes}
        disabled={loading}
      >

        {
          loading ? (

            <ActivityIndicator color="#FFF" />

          ) : (

            <Text style={styles.botaoTexto}>
              Salvar Alterações
            </Text>

          )
        }

      </TouchableOpacity>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF5FF',
  },

  container: {
    flexGrow: 1,
    backgroundColor: '#EEF5FF',
    padding: 25,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0D3B8E',
    marginBottom: 35,
    textAlign: 'center',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D3B8E',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDE6F5',
    fontSize: 16,
  },

  botao: {
    backgroundColor: '#0D6EFD',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  botaoTexto: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

});