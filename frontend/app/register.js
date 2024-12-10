import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { registerUser } from '../src/services/api';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const response = await registerUser({ username, email, password });
            Alert.alert('Succès', response.message);
            router.push('/login');
        } catch (error) {
            Alert.alert('Erreur', error.message || 'Échec de l\'inscription');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Mot de passe"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                style={styles.input}
            />
            <Button title="S'inscrire" onPress={handleRegister} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    input: { marginBottom: 16, padding: 8, borderWidth: 1, borderRadius: 4 },
});
