import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { icons } from 'react-native-elements';
import RootNavigator from './src/navigations/RootNavigator';
import HomeScreen from './src/screens/HomeScreen';
import { AppRegistry } from 'react-native';
import { OriginContextProvider, DestinationContextProvider } from './src/contexts/contexts';
import { name as appName } from './app.json';
import * as firebase from 'firebase/app';
import 'firebase/database'; // Import additional Firebase modules if needed.
 // Import the Firebase Realtime Database module if you're using the

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  databaseURL: '', // Optional if you don't need it
};

firebase.initializeApp(firebaseConfig); // Initialize Firebase with your config

const MainApp = () => {
  return (
    <DestinationContextProvider>
      <OriginContextProvider>
        <RootNavigator />
      </OriginContextProvider>
    </DestinationContextProvider>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('main', () => MainApp);
