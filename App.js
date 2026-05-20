import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/Loginscreen';
import CadastroScreen from './screens/Cadastroscreen';
import DetalhesScreen from './screens/Detalhesscreen';
import FavoritosScreen from './screens/Favoritosscreen';
import MeuPerfilScreen from './screens/Meuperfilscreen';
import RecuperarSenhaScreen from './screens/Recuperarsenha';
import AlterarFotoScreen from './screens/Alterarfotoscreen';
import TelaInicialScreen from './screens/Telainicialscreen';
import BottomTabs from './screens/BottomTabs';
import EditarPerfilScreen from './screens/Editarperfilscreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
        />

        <Stack.Screen
          name="TelaInicial"
          component={BottomTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Detalhes"
          component={DetalhesScreen}
        />

        <Stack.Screen
          name="EditarPerfil"
          component={EditarPerfilScreen}
        />

        <Stack.Screen
          name="Favoritos"
          component={FavoritosScreen}
        />

        <Stack.Screen
          name="MeuPerfil"
          component={MeuPerfilScreen}
        />

        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenhaScreen}
        />

        <Stack.Screen
          name="AlterarFoto"
          component={AlterarFotoScreen}
        />

      </Stack.Navigator>

      <StatusBar style="auto" />

    </NavigationContainer>

  );

}