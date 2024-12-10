import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '../src/services/api';
import { setToken } from '../src/utils/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await loginUser({ email, password });
            await setToken(response.token);
            Alert.alert('Succès', 'Connexion réussie');
            router.replace('home');
        } catch (error) {
            Alert.alert('Erreur', error.message || 'Échec de la connexion');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Mot de passe"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                style={styles.input}
            />
            <Button title="Se connecter" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        padding: 16 
    },
    input: { 
        marginBottom: 16, 
        padding: 8, 
        borderWidth: 1, 
        borderRadius: 4 
    },
});
