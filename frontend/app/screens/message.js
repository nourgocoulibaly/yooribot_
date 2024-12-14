import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [text, setText] = useState('');

  const handleSendMessage = () => {
    if (text.trim()) {
      console.log('Message envoyé:', text);
      setText(''); // Réinitialise le champ après envoi
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Expliquer l'informatique quantique en termes simples</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          <Image source={require('../../assets/images/icon.png')} style={styles.icon} />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>
            L'informatique quantique est un nouveau type d'informatique qui s'appuie sur les principes de la mécanique quantique pour traiter les données. Alors que les ordinateurs traditionnels utilisent des bits pour représenter et traiter les données, les ordinateurs quantiques utilisent des bits quantiques, ou qubits, qui peuvent représenter 0, 1 ou les deux simultanément.
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.stopButton}>
          <View style={styles.stopIcon} />
          <Text style={styles.stopText}>Arrêter de générer...</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Envoyer un message"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSendMessage}
        >
          <Ionicons name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 48,
    height: 48,
  },
  textBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  text: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  stopIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#000',
    borderRadius: 4,
    marginRight: 8,
  },
  stopText: {
    fontSize: 14,
    color: '#333333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 40,
  },
  sendButton: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
});
