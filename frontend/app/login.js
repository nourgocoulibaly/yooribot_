import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import api from '../src/services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                Alert.alert('Erreur', 'Veuillez remplir tous les champs');
                return;
            }

            const response = await api.loginUser(email, password);
            Alert.alert('Succès', 'Connexion réussie');
            router.push('/screens/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Erreur', error.message || 'Identifiants incorrects');
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
                <View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Connexion à</Text>
                        <Text style={[styles.text, styles.noTopMargin]}>Votre Compte</Text>
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
                    <View style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>Se Connecter</Text>
                    </TouchableOpacity>
                    <View style={styles.subscribeContainer}>
                        <Text style={styles.subscribeText}>Créer un compte? 
                            <Link href="./register"><Text style={styles.subscribeTextBold}> S'inscrire</Text></Link>
                        </Text>
                    </View>
                    <View style={styles.horizontalLine} />
                    <Text style={styles.textScrib}>Continuer avec un compte</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
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
    text: {
        marginTop: 200,
        fontSize: 40,
        fontWeight: '400',
        alignSelf: 'flex-start',
    },
    noTopMargin: {
        marginTop: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 20,
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
    forgotPasswordContainer: {
        marginTop: 10,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#000000',
        textAlign: 'right',
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
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
        zIndex: 1,
    },
});