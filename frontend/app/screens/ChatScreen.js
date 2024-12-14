// frontend/src/screens/HomeScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { sendMessage } from '@/src/services/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Speech from 'expo-speech';

const ChatScreen = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const currentResponseRef = useRef('');
  const abortControllerRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      Speech.stop();
    };
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');
    
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      content: userMessage, 
      isUser: true 
    }]);

    setIsTyping(true);
    currentResponseRef.current = '';

    try {
      const controller = new AbortController();
      abortControllerRef.current = controller;
      
      await sendMessage(
        userMessage, 
        (chunk) => {
          if (!controller.signal.aborted) {
            currentResponseRef.current += chunk;
            setMessages(prev => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              
              if (!lastMessage || lastMessage.isUser) {
                return [...newMessages, {
                  id: Date.now(),
                  content: currentResponseRef.current,
                  isUser: false
                }];
              } else {
                return newMessages.map((msg, index) => {
                  if (index === newMessages.length - 1) {
                    return { ...msg, content: currentResponseRef.current };
                  }
                  return msg;
                });
              }
            });
          }
        },
        controller.signal
      );
    } catch (error) {
      if (error.name === 'AbortError') {
        currentResponseRef.current = "Génération arrêtée";
        setMessages(prev => prev.map((msg, index) => 
          index === prev.length - 1 && !msg.isUser 
            ? { ...msg, content: currentResponseRef.current }
            : msg
        ));
      } else {
        console.error('Erreur:', error);
        setMessages(prev => [...prev, {
          id: Date.now(),
          content: "Désolé, une erreur s'est produite.",
          isUser: false
        }]);
      }
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsTyping(false);
      setIsStopped(true);
    }
  };

  const handleContinue = async () => {
    setIsTyping(true);
    setIsStopped(false);
    
    try {
      const controller = new AbortController();
      abortControllerRef.current = controller;
      
      const lastUserMessage = messages[messages.length - 2].content + "\n[CONTINUE]";
      
      await sendMessage(
        lastUserMessage,
        (chunk) => {
          if (!controller.signal.aborted) {
            currentResponseRef.current += chunk;
            setMessages(prev => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              
              if (!lastMessage || lastMessage.isUser) {
                return [...newMessages, {
                  id: Date.now(),
                  content: chunk,
                  isUser: false
                }];
              } else {
                return newMessages.map((msg, index) => {
                  if (index === newMessages.length - 1) {
                    return { ...msg, content: msg.content + chunk };
                  }
                  return msg;
                });
              }
            });
          }
        },
        controller.signal
      );
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsTyping(false);
      setIsStopped(false);
      abortControllerRef.current = null;
    }
  };

  const handleSpeak = async (text) => {
    try {
      if (isSpeaking) {
        await Speech.stop();
        setIsSpeaking(false);
        return;
      }

      setIsSpeaking(true);
      await Speech.speak(text, {
        language: 'fr-FR',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => {
          setIsSpeaking(false);
        },
        onError: (error) => {
          console.error('Erreur de synthèse vocale:', error);
          setIsSpeaking(false);
        }
      });
    } catch (error) {
      console.error('Erreur:', error);
      setIsSpeaking(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      startTimer();
      setInputMessage("Enregistrement en cours...");
      
      await Speech.speak('Je vous écoute', {
        language: 'fr-FR',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => {
          console.log('Prêt à écouter');
        },
        onError: (error) => {
          console.error('Erreur de synthèse vocale:', error);
          stopRecording();
        }
      });
    } catch (error) {
      console.error('Erreur au démarrage:', error);
      stopRecording();
    }
  };

  const stopRecording = async () => {
    try {
      await Speech.stop();
      setIsRecording(false);
      stopTimer();
      await Speech.speak('Enregistrement terminé', {
        language: 'fr-FR',
        pitch: 1.0,
        rate: 0.9
      });
    } catch (error) {
      console.error('Erreur à l\'arrêt:', error);
    } finally {
      setIsRecording(false);
      stopTimer();
    }
  };

  const handleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleBack}
      >
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Yoori Bot</Text>
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      {!item.isUser && (
        <View style={styles.avatarContainer}>
          <Ionicons name="medical" size={20} color="#666" />
        </View>
      )}
      <View style={[
        styles.messageBubble,
        item.isUser ? styles.userMessage : styles.aiMessage
      ]}>
        <Text style={[
          styles.messageText,
          item.isUser && styles.userMessageText
        ]}>{item.content}</Text>
      </View>
      {!item.isUser && (
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleSpeak(item.content)}
        >
          <Ionicons 
            name={isSpeaking ? "volume-high" : "volume-medium-outline"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesList}
      />

      {(isTyping || isStopped) && (
        <View style={styles.footer}>
          {isTyping ? (
            <TouchableOpacity 
              style={styles.stopButton}
              onPress={handleStop}
            >
              <Ionicons name="refresh-outline" size={16} color="#666666" />
              <Text style={styles.stopText}>Arrêter de générer...</Text>
            </TouchableOpacity>
          ) : isStopped && (
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Ionicons name="play" size={16} color="#666666" />
              <Text style={styles.continueText}>Continuer la g��nération</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.inputContainer}>
        <TouchableOpacity 
          style={[styles.voiceButton, isRecording && styles.voiceButtonActive]}
          onPress={handleRecording}
        >
          <Ionicons 
            name={isRecording ? "mic" : "mic-outline"} 
            size={24} 
            color={isRecording ? "#FF0000" : "#007AFF"} 
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Envoyer un message..."
          value={isRecording ? `⏺ ${formatTime(recordingTime)}` : inputMessage}
          onChangeText={setInputMessage}
          onSubmitEditing={handleSend}
          editable={!isRecording}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
          disabled={isRecording}
        >
          <Ionicons 
            name="arrow-up" 
            size={24} 
            color={isRecording ? "#999" : "#007AFF"} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  menuButton: {
    padding: 8,
  },
  messageContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F2F2F7',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#000',
  },
  userMessageText: {
    color: '#fff',
  },
  messageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  actionButton: {
    marginRight: 16,
    padding: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    marginBottom: 8,
  },
  regenerateText: {
    color: '#666',
    fontSize: 15,
    marginLeft: 8,
  },
  messagesList: {
    paddingVertical: 16,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 20,
    marginVertical: 8,
    width: 250,
    alignSelf: 'center',
  },
  stopText: {
    color: '#666666',
    fontSize: 15,
    textAlign: 'center',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 20,
    marginVertical: 8,
    width: 250,
    alignSelf: 'center',
  },
  continueText: {
    color: '#666666',
    fontSize: 15,
    marginLeft: 8,
    textAlign: 'center',
  },
  voiceButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  voiceButtonActive: {
    backgroundColor: '#FFE5E5',
  }
});

export default ChatScreen;
