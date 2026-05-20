# 🌍 Conheça o Mundo

Aplicativo mobile desenvolvido em React Native que permite aos usuários explorar informações sobre países do mundo, realizar autenticação e personalizar seu perfil.

## 🚀 Tecnologias

- React Native
- Firebase Authentication
- Axios
- React Hooks
- React Navigation

## 📱 Funcionalidades

- Cadastro e login de usuários
- Recuperação de senha
- Listagem de países
- Busca de países
- Exibição de detalhes
- Perfil do usuário

## 🔗 API´s Utilizadas
Link:https://restcountries.com

    # Get all countries (filtered by fields)
    https://restcountries.com/v3.1/all?fields=name,capital,currencies

    # Get country by name
    https://restcountries.com/v3.1/name/peru

    # Get country by code
    https://restcountries.com/v3.1/alpha/co

    # Filter response fields
    https://restcountries.com/v3.1/{service}?fields={field},{field},{field}

## ▶️ Como executar

```bash
npm install -g expo-cli
npm install react-native-elements
npm install @react-navigation/native
expo install react-native-screens react-native-safe-area-context
npm install react-native-vector-icons
npm install @react-navigation/native-stack
expo install @expo/vector-icons
npm install --save react-native-screens react-native-safe-area-context
npm install axios
npm install firebase
npm install @react-navigation/bottom-tabs
npm install
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npx expo install expo-image-picker

Build com EAS - EXPO

- npm install eas-cli
- eas login
  - E-mail
  - Senha
- eas build:configure
  - yes
  - yes
  - enter
  - ALL
- eas build -p android --profile preview
  - Entra no Link e espera o APK
```

## 📚 Objetivo

Praticar desenvolvimento mobile com React Native utilizando autenticação, consumo de APIs públicas e gerenciamento de estado com Hooks.