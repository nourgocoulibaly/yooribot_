import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard() {
    const router = useRouter();

    const handlePress = (option) => {
        console.log(`${option} sélectionné`);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => handlePress('Retour')}>
                        <Text style={styles.headerIcon}>{'<'}</Text>
                    </TouchableOpacity>
                    <Link href="/screens/account"><Text style={styles.headerIcon}>...</Text></Link>

                    {/* <TouchableOpacity onPress={() => handlePress('/screens/account')}>
                        <Text style={styles.headerIcon}>...</Text>
                    </TouchableOpacity> */}
                </View>

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Yoori Bot</Text>
                </View>

                {/* Description Cards */}
                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handlePress('Option 1')}
                    >
                        <Text style={styles.cardText}>
                            Se souvient de ce que l'utilisateur a dit plus tôt dans la conversation
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handlePress('Option 2')}
                    >
                        <Text style={styles.cardText}>
                            Permettre à l'utilisateur de fournir des corrections de suivi avec AI
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handlePress('Option 3')}
                    >
                        <Text style={styles.cardText}>
                            Connaissance limitée du monde et des événements après 2021
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.footerButton}
                        onPress={() => router.push('/screens/ChatScreen')}
                    >
                        <Text style={styles.footerText}>Envoyer un message.</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => router.push('/screens/dashboard')}>
                    <Ionicons name="home-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/screens/assistantAi')}>
                    <Ionicons name="grid-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/screens/history')}>
                    <Ionicons name="time-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/screens/account')}>
                    <Ionicons name="person-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerIcon: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    cardContainer: {
        marginBottom: 32,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
    footer: {
        alignItems: 'center',
        marginTop: 'auto',
    },
    footerButton: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    footerText: {
        fontSize: 16,
        color: '#000',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
});
