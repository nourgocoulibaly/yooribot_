import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { removeToken } from '../src/utils/auth';
import AuthGuard from '../src/components/AuthGuard';

export default function Home() {
    const router = useRouter();

    const handleLogout = async () => {
        await removeToken();
        Alert.alert('Déconnexion', 'Vous êtes déconnecté');
        router.push('/');
    };

    return (
        <AuthGuard>
            <View style={styles.container}>
                <Button title="Se déconnecter" onPress={handleLogout} />
            </View>
        </AuthGuard>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
