// frontend/src/screens/HomeScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { sendMessage } from '@/src/services/api';
import * as Clipboard from 'expo-clipboard';
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
  const flatListRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      Speech.stop();
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

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
      
      const lastUserMessage = messages[messages.length - 2].content;
      
      currentResponseRef.current = '';
      
      await sendMessage(
        lastUserMessage,
        (chunk) => {
          if (!controller.signal.aborted) {
            currentResponseRef.current += chunk;
            setMessages(prev => {
              const newMessages = [...prev];
              return newMessages.map((msg, index) => {
                if (index === newMessages.length - 1 && !msg.isUser) {
                  return { ...msg, content: currentResponseRef.current };
                }
                return msg;
              });
            });
          }
        },
        controller.signal
      );
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Génération arrêtée');
      } else {
        console.error('Erreur:', error);
      }
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

  const copyToClipboard = async (text) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert('Copié', 'Le message a été copié dans le presse-papiers');
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
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

  const renderContent = (content) => {
    if (content.includes('```')) {
      const parts = content.split('```');
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          const [language, ...codeLines] = part.split('\n');
          const code = codeLines.join('\n').trim();
          
          return (
            <View key={index} style={styles.codeBlock}>
              <View style={styles.codeHeader}>
                <Text style={styles.codeLanguage}>{language}</Text>
                <TouchableOpacity 
                  style={styles.codeCopyButton}
                  onPress={() => copyToClipboard(code)}
                >
                  <Text style={styles.codeCopyText}>Copier le code</Text>
                  <Ionicons name="copy-outline" size={14} color="#6c757d" />
                </TouchableOpacity>
              </View>
              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>
                  {code}
                </Text>
              </View>
            </View>
          );
        }
        
        return part.trim() ? (
          <View key={index} style={styles.textSection}>
            {part.split('\n').map((line, lineIndex) => {
              if (/^\d+\.\s/.test(line)) {
                return (
                  <Text key={lineIndex} style={styles.sectionTitle}>
                    {line}
                  </Text>
                );
              } else if (line.trim().startsWith('•')) {
                return (
                  <Text key={lineIndex} style={styles.bulletPoint}>
                    {line}
                  </Text>
                );
              } else if (line.toLowerCase().includes('exemple')) {
                return (
                  <Text key={lineIndex} style={styles.exampleTitle}>
                    {line}
                  </Text>
                );
              } else {
                return (
                  <Text key={lineIndex} style={styles.messageText}>
                    {line}
                  </Text>
                );
              }
            })}
          </View>
        ) : null;
      }).filter(Boolean);
    }
    
    return (
      <View style={styles.textSection}>
        {content.split('\n').map((line, index) => {
          if (/^\d+\.\s/.test(line)) {
            return <Text key={index} style={styles.sectionTitle}>{line}</Text>;
          } else if (line.trim().startsWith('•')) {
            return <Text key={index} style={styles.bulletPoint}>{line}</Text>;
          } else if (line.toLowerCase().includes('exemple')) {
            return <Text key={index} style={styles.exampleTitle}>{line}</Text>;
          } else {
            return <Text key={index} style={styles.messageText}>{line}</Text>;
          }
        })}
      </View>
    );
  };

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
        {renderContent(item.content)}
      </View>
      {!item.isUser && (
        <View style={styles.actionButtons}>
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
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => copyToClipboard(item.content)}
          >
            <Ionicons 
              name="copy-outline" 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={scrollToBottom}
        onLayout={scrollToBottom}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
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
              <Text style={styles.continueText}>Continuer la génération</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    maxWidth: '85%',
    // backgroundColor: '#F2F2F7',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#F2F2F7',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    // backgroundColor: '#F2F2F7',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#000',
    marginVertical: 4,
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
    borderRadius: 15,
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
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 8,
    padding: 4,
  },
  codeBlock: {
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
  },
  codeHeader: {
    backgroundColor: '#2D2D2D',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeLanguage: {
    color: '#E0E0E0',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  codeCopyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  codeCopyText: {
    color: '#E0E0E0',
    fontSize: 12,
    marginRight: 4,
  },
  codeContainer: {
    padding: 12,
  },
  codeText: {
    color: '#E0E0E0',
    fontFamily: 'monospace',
    fontSize: 14,
  },
  textSection: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 8,
  },
  bulletPoint: {
    fontSize: 15,
    color: '#000',
    marginLeft: 16,
    marginVertical: 4,
  },
  exampleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginTop: 12,
    marginBottom: 8,
  },
});

export default ChatScreen;
