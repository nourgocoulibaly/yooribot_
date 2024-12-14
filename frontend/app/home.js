import React, { useEffect } from 'react';
import {StyleSheet, Layout, Text, View} from 'react-native';
// import { Layout, Text, View } from 'react-native';
import { Link } from 'expo-router';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider } from '@ui-kitten/components';

export default function HomeScreen() {

  return (
    // <ApplicationProvider {...eva} theme={eva.light}>
    <View>
      <View style={styles.layout}>
        <Text style={styles.h1}>Bienvenue sur</Text>
        <Text style={styles.h1}>Yoori Bot</Text>
        <Text style={styles.textDescription}>Commencez à discuter avec Yoori Bot maintenant.</Text>
        <Text>Vous pouvez me demander n'importe quoi.</Text>
        <Link href="/screens/homePage" style={styles.button}>
          <Text style={styles.buttonText}>Commencer</Text>
        </Link>
      </View>
      <Text style={styles.text}>Version 1.0.0</Text>
    </View>
    // </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  h1: {
    fontSize: 55,
    fontWeight: 400,
    color: '#000000',
  },

  text:{
    marginTop:75,
    marginBottom: 10,
    textAlign: 'center',
  },

  textDescription : {
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
  },

  button: {
    position: 'absolute',
    bottom: 0,
    width: 350,
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 20,
  },

  buttonText: {
    color: "#f1f1f1",
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  }
}); 