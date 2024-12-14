import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { getToken } from '../utils/auth';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function AuthGuard({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getToken();
            if (token) {
                setIsAuthenticated(true);
            } else {
                router.push('/login'); // Redirige vers la page de connexion si non connecté
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return isAuthenticated ? children : null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
