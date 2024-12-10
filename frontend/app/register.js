import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link,useRouter } from 'expo-router';
import api from '../src/services/api';
import { Alert } from 'react-native';


export default function Signon() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            if (!fullName || !email || !password) {
                Alert.alert('Erreur', 'Veuillez remplir tous les champs');
                return;
            }

            const userData = {
                username: fullName,
                email: email,
                password: password
            };

            console.log('Sending data:', userData);

            const response = await api.registerUser(userData);
            console.log('Registration success:', response);

            Alert.alert('Succès', 'Inscription réussie');
            router.push('./login');
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Erreur', error.toString());
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.layout}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Créez Votre</Text>
                <Text style={[styles.text, styles.textNoTopMargin]}>Compte</Text>
            </View>
            <View style={styles.inputContainer}>   
                <Ionicons name="person-outline" size={20} color="black" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    onChangeText={setFullName}
                    value={fullName}
                    placeholder="Entrez Votre Nom et Prénom"
                />
            </View>
            <View style={styles.inputContainer}> 
                <Ionicons name="mail-outline" size={20} color="black" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Entrez Votre Adresse Email"
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="black" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Entrez Votre Mot de Passe"
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity 
                style={styles.button}
                onPress={handleRegister}
            >
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
            <View style={styles.subscribeContainer}>
            <Text style={styles.subscribeText}>Vous avez déjà un compte? 
                <Link href="./login">
                    <Text style={styles.subscribeTextBold}> Connectez-vous</Text>
                </Link>
            </Text>
            <View style={styles.horizontalLine} />
                    <Text style={styles.textScrib}>Continuer avec un compte</Text>
            </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 30,
    },
    textContainer: {
        marginBottom: 30,
    },
    backButton: {
        marginTop: 20,
    },
    text: {
        marginTop: 150,
        fontSize: 45,
        fontWeight: '400',
        alignSelf: 'flex-start',
    },
    textNoTopMargin: {
        marginTop: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 15,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        width: '100%',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        height: 50,
        flex: 1,
        padding: 15,
        fontSize: 16,
    },
    button: {
        borderRadius: 10,
         marginTop: 20,
         backgroundColor: '#000000',
         padding: 10,
         width: '100%',
     },
     buttonText: {
        color: "#f1f1f1",
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'center',
    },
    subscribeContainer: {
        marginTop: 30,
    },
    subscribeText: {
        fontSize: 14,
        color: '#000000',
        textAlign: 'center',
        fontWeight: '400',
    },
    subscribeTextBold: {
        fontWeight: 'bold',
    },
    horizontalLine: {
        marginTop: 40,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        marginVertical: 20,
        width: '100%',
        opacity: 0.2,
    },
    textScrib: {
        fontSize: 16,
        fontWeight: 400, 
        textAlign: 'center',
    },
})
