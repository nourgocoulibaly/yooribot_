import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Historique() {
    const router = useRouter();

    const handlePress = (option) => {
        console.log(`${option} sélectionné`);
    };
    // Données pour les éléments d'historique
    const todayHistory = [
        'Combien de pompes par jour',
        'Top 10 des meilleurs films de tous les temps',
        'Parle moi des meilleurs lieux en visiter en ...',
    ];
    const yesterdayHistory = [
        'Combien de pompes par jour',
        'Top 10 des meilleurs films de tous les temps',
        'Parle moi des meilleurs lieux en visiter en ...',
        '...',
        '...',
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Historique</Text>
                <TouchableOpacity>
                    <Ionicons name="create-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Barre de recherche */}
            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color="#A0A0A0" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Recherche..."
                    placeholderTextColor="#A0A0A0"
                />
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* Section "Aujourd'hui" */}
            <View style={styles.historySection}>
                <Text style={styles.sectionTitle}>Aujourd'hui</Text>
                {todayHistory.map((item, index) => (
                    <View key={index} style={styles.historyItem}>
                        <Text style={styles.historyText}>{item}</Text>
                    </View>
                ))}
            </View>

            {/* Section "Hier" */}
            <View style={styles.historySection}>
                <Text style={styles.sectionTitle}>Hier</Text>
                {yesterdayHistory.map((item, index) => (
                    <View key={index} style={styles.historyItem}>
                        <Text style={styles.historyText}>{item}</Text>
                    </View>
                ))}
            </View>
            </ScrollView>

            {/* Navbar */}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
        marginLeft: 10,
    },
    filterButton: {
        backgroundColor: '#000',
        borderRadius: 8,
        padding: 8,
    },
    historySection: {
        marginHorizontal: 16,
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    historyItem: {
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        padding: 12,
        marginBottom: 8,
    },
    historyText: {
        fontSize: 14,
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
