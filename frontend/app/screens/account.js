import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Pour les icônes (Expo)
import { useRouter } from 'expo-router';

export default function Account() {
    const router = useRouter();

    const handlePress = (option) => {
        console.log(`${option} sélectionné`);
    };

    return (
        <View style={styles.container}>
            {/* Contenu principal */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => handlePress('Retour')}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profil</Text>
                </View>

                {/* Profil */}
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/100' }} // Remplacez avec une vraie URL d'image
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileName}>Nourgo Coulibaly</Text>
                    <Text style={styles.profileEmail}>Nourgo@mail.com</Text>
                </View>

                {/* Options */}
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={styles.optionRow}
                        onPress={() => handlePress('Préférences')}
                    >
                        <View style={styles.optionLeft}>
                            <Ionicons name="settings-outline" size={24} color="black" />
                            <Text style={styles.optionText}>Préférences</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionRow}
                        onPress={() => handlePress('Sécurité du compte')}
                    >
                        <View style={styles.optionLeft}>
                            <Ionicons name="lock-closed-outline" size={24} color="black" />
                            <Text style={styles.optionText}>Sécurité du compte</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="black" />
                    </TouchableOpacity>

                    {/* Barre de progression */}
                    <View style={styles.securityLevel}>
                        <View style={styles.progressBar}>
                            <View style={styles.progressFill} />
                        </View>
                        <Text style={styles.securityText}>Excellent</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.optionRow}
                        onPress={() => handlePress('Support client')}
                    >
                        <View style={styles.optionLeft}>
                            <Ionicons name="help-circle-outline" size={24} color="black" />
                            <Text style={styles.optionText}>Support client</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionRow}
                        onPress={() => handlePress('Déconnexion')}
                    >
                        <View style={styles.optionLeft}>
                            <Ionicons name="log-out-outline" size={24} color="black" />
                            <Text style={styles.optionText}>Déconnexion</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Navbar du bas */}
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
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    profileEmail: {
        fontSize: 14,
        color: '#666',
    },
    optionsContainer: {
        marginTop: 16,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        marginLeft: 12,
        color: '#000',
    },
    securityLevel: {
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 4,
    },
    progressFill: {
        width: '80%', // Progression actuelle (modifiable)
        height: '100%',
        backgroundColor: '#4CAF50',
    },
    securityText: {
        fontSize: 12,
        color: '#4CAF50',
        textAlign: 'left',
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
