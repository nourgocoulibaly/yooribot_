// frontend/src/screens/HomeScreen.js
import React, { useState, useRef } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { sendMessage } from '@/src/services/api';

const HomeScreen = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const currentResponseRef = useRef('');

  const handleSend = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage;
    setCurrentMessage('');
    
    // Ajouter le message de l'utilisateur
    setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: userMessage, 
        isUser: true 
    }]);

    setIsTyping(true);
    currentResponseRef.current = '';

    try {
        await sendMessage(userMessage, (chunk) => {
            currentResponseRef.current += chunk;
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                
                if (!lastMessage || lastMessage.isUser) {
                    // Créer un nouveau message AI
                    return [...newMessages, {
                        id: Date.now(),
                        text: currentResponseRef.current,
                        isUser: false
                    }];
                } else {
                    // Mettre à jour le dernier message
                    return newMessages.map((msg, index) => {
                        if (index === newMessages.length - 1) {
                            return { ...msg, text: currentResponseRef.current };
                        }
                        return msg;
                    });
                }
            });
        });
    } catch (error) {
        console.error('Erreur:', error);
        setMessages(prev => [...prev, {
            id: Date.now(),
            text: "Désolé, une erreur s'est produite.",
            isUser: false
        }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.isUser ? styles.userMessage : styles.aiMessage
          ]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={currentMessage}
          onChangeText={setCurrentMessage}
          placeholder="Tapez votre message..."
          onSubmitEditing={handleSend}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageBubble: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#000',
  },
  inputContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default HomeScreen;
