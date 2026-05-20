import { useFocusEffect } from '@react-navigation/native';
import React, {
  useCallback,
  useState
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

import {
  auth,
  db
} from '../firebaseConfig';

export default function AlterarFotoScreen({ navigation }) {

  const [foto, setFoto] = useState(null);

  useFocusEffect(

    useCallback(() => {

      const usuario = auth.currentUser;

      if (usuario) {

        carregarFotoAtual();

      }

    }, [])

  );

  async function carregarFotoAtual() {

    try {

      const usuario = auth.currentUser;

      if (!usuario) return;

      const usuarioRef = doc(
        db,
        'usuarios',
        usuario.uid
      );

    } catch (error) {

      console.log(error);

    }

  }

  async function abrirGaleria() {

    try {

      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {

        Alert.alert(
          'Permissão negada',
          'Permita acesso à galeria'
        );

        return;
      }

      const resultado =
        await ImagePicker.launchImageLibraryAsync({

          mediaTypes:
            ImagePicker.MediaTypeOptions.Images,

          allowsEditing: true,

          aspect: [1, 1],

          quality: 1,

        });

      if (!resultado.canceled) {

        setFoto(
          resultado.assets[0].uri
        );

      }

    } catch (error) {

      console.log(error);

    }

  }

  async function abrirCamera() {

    try {

      const permissao =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permissao.granted) {

        Alert.alert(
          'Permissão negada',
          'Permita acesso à câmera'
        );

        return;
      }

      const resultado =
        await ImagePicker.launchCameraAsync({

          allowsEditing: true,

          aspect: [1, 1],

          quality: 1,

        });

      if (!resultado.canceled) {

        setFoto(
          resultado.assets[0].uri
        );

      }

    } catch (error) {

      console.log(error);

    }

  }

  async function salvarFoto() {

    try {

      if (!foto) {

        Alert.alert(
          'Erro',
          'Escolha uma foto'
        );

        return;
      }

      const usuario = auth.currentUser;

      if (!usuario) {

        Alert.alert(
          'Erro',
          'Usuário não encontrado'
        );

        return;
      }

      await setDoc(

        doc(
          db,
          'usuarios',
          usuario.uid
        ),

        {
          foto: foto
        },

        {
          merge: true
        }

      );

      Alert.alert(
        'Sucesso',
        'Foto atualizada!'
      );

      navigation.goBack();

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Erro ao salvar foto'
      );

    }

  }

  useFocusEffect(

  useCallback(() => {

    async function carregarFoto() {

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

          if (dados.foto) {

            setFoto(dados.foto);

          }

        }

      } catch (error) {

        console.log(error);

      }

    }

    carregarFoto();

  }, [])

);

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Alterar Foto
      </Text>

      <Image
        source={
          foto
            ? { uri: foto }
            : require('../images/fotoprincipal.png')
        }
        style={styles.foto}
      />

      <Text style={styles.titulo}>
        Escolha uma imagem
        {"\n"}
        <Text style={styles.tituloPequeno}>
        Sua foto será enviada ao Firestore
        </Text>
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={abrirGaleria}
      >

        <Text style={styles.botaoTexto}>
          Escolher da Galeria
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={abrirCamera}
      >

        <Text style={styles.botaoTexto}>
          Tirar Foto
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSalvar}
        onPress={salvarFoto}
      >

        <Text style={styles.botaoTexto}>
          Salvar Foto
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EEF5FF',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0D3B8E',
    marginBottom: 30,
    textAlign: 'center',
  },

  tituloPequeno: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D3B8E',
    marginBottom: 20,
    textAlign: 'center',
  },

  foto: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 35,
    borderWidth: 4,
    borderColor: '#0D6EFD',
    backgroundColor: '#FFF',
  },

  botao: {
    backgroundColor: '#0D6EFD',
    width: '100%',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 15,
  },

  botaoSalvar: {
    backgroundColor: '#28A745',
    width: '100%',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 15,
  },

  botaoTexto: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

});